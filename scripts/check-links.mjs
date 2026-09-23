#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const DATA_DIR = join(ROOT, "src/data");

function getFiles(dir) {
  let results = [];
  const list = readdirSync(dir);
  for (const file of list) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath));
    } else if (/\.(ts|tsx|js|mjs)$/.test(file)) {
      results.push(filePath);
    }
  }
  return results;
}

const URL_REGEX = /https:\/\/[^\s"'`,)\\]+/g;
const files = getFiles(DATA_DIR);
const urls = new Set();

for (const f of files) {
  const content = readFileSync(f, "utf8");
  const matches = content.match(URL_REGEX);
  if (matches) {
    for (const m of matches) {
      // Clean trailing punctuation
      const clean = m.replace(/[.;]+$/, "");
      urls.add(clean);
    }
  }
}

const KNOWN_EXCEPTIONS = [
  { pattern: /linkedin\.com/, note: "LinkedIn returns 999 to bots" },
  { pattern: /onlinelibrary\.wiley\.com/, note: "Wiley returns 403 to bots (verified in browser)" },
  { pattern: /swyamsharma\.vercel\.app/, note: "Target production domain (pending deploy)" },
];

console.log(`Checking ${urls.size} URLs from src/data/**...\n`);

let hasError = false;

for (const url of Array.from(urls).sort()) {
  const exception = KNOWN_EXCEPTIONS.find((e) => e.pattern.test(url));
  if (exception) {
    console.log(`[EXEMPT] ${url} (${exception.note})`);
    continue;
  }

  try {
    const res = await fetch(url, {
      method: "HEAD",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });

    // If HEAD fails or gives 405 Method Not Allowed, fallback to GET
    let status = res.status;
    if (status === 405 || status === 403) {
      const getRes = await fetch(url, {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(10000),
      });
      status = getRes.status;
    }

    if (status >= 200 && status < 400) {
      console.log(`[  ${status}  ] ${url}`);
    } else {
      console.error(`[  ${status}  ] FAIL: ${url}`);
      hasError = true;
    }
  } catch (err) {
    console.error(`[ ERROR ] ${url}: ${err.message}`);
    hasError = true;
  }
}

if (hasError) {
  console.error("\nSome links failed validation.");
  process.exit(1);
} else {
  console.log("\nAll checked links passed validation.");
  process.exit(0);
}
