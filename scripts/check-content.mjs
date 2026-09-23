#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();

const SCAN_DIRS = ["src", "content", "public"];
const SCAN_FILES = ["README.md"];
const SCAN_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".mdx",
  ".md",
  ".json",
  ".svg",
  ".css",
]);

// Rules: each pattern fails the build if found
const RULES = [
  {
    name: "em dash (U+2014)",
    pattern: /\u2014/,
  },
  {
    name: "swyam.me",
    pattern: /swyam\.me/i,
  },
  {
    name: "template identity",
    // Allow "dillionverma/portfolio" URL in credit lines everywhere
    pattern:
      /dillion\.io|Atomic Finance|Shopify|Nvidia|Splunk|Mitre|Buildspace|Waterloo|Laurier|Chat Collect|llm\.report|Automatic Chat|dub\.sh|hello@example\.com|\+123456789|pub-83c5db439b40468498f97946200806f7/i,
  },
  {
    name: "Dillion name in source (allowed in README/LICENSE for credit)",
    pattern: /Dillion/,
    excludeFiles: ["README.md", "LICENSE"],
    // Allow the credit link URL
    excludeLinePattern: /dillionverma\/portfolio/,
  },
  {
    name: "phone number",
    pattern: /8588077790/,
  },
  {
    name: "banned phrasing",
    pattern: /\b13x\b|elite|Production AI/i,
  },
  {
    name: "Clinikally in visible copy",
    pattern: /Clinikally|clinikally/,
    // Allow inside href/URL strings that point to the repo
    excludeLinePattern: /href|url|Source|github\.com/i,
  },
];

function collectFiles(dir) {
  const results = [];
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      if (entry === "node_modules" || entry === ".next" || entry === ".git")
        continue;
      const full = join(dir, entry);
      const stat = statSync(full);
      if (stat.isDirectory()) {
        results.push(...collectFiles(full));
      } else if (SCAN_EXTENSIONS.has("." + entry.split(".").pop())) {
        results.push(full);
      }
    }
  } catch {
    // Directory doesn't exist
  }
  return results;
}

let violations = 0;

const files = [
  ...SCAN_DIRS.flatMap((d) => collectFiles(join(ROOT, d))),
  ...SCAN_FILES.map((f) => join(ROOT, f)).filter((f) => {
    try {
      statSync(f);
      return true;
    } catch {
      return false;
    }
  }),
];

for (const file of files) {
  const rel = relative(ROOT, file);
  const basename = rel.split("/").pop();
  let content;
  try {
    content = readFileSync(file, "utf-8");
  } catch {
    continue;
  }

  const lines = content.split("\n");

  for (const rule of RULES) {
    if (rule.excludeFiles && rule.excludeFiles.includes(basename)) continue;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (rule.pattern.test(line)) {
        if (rule.excludeLinePattern && rule.excludeLinePattern.test(line))
          continue;
        console.error(
          `FAIL: ${rule.name} in ${rel}:${i + 1}: ${line.trim().slice(0, 120)}`
        );
        violations++;
      }
    }
  }
}

if (violations > 0) {
  console.error(`\n${violations} content violation(s) found. Build aborted.`);
  process.exit(1);
} else {
  console.log("Content check passed.");
}
