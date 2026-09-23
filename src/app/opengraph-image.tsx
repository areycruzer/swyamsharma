import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { DATA } from "@/data/resume";

export const alt = "Swyam Sharma";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

async function loadLocalFile(relativePath: string): Promise<Buffer | null> {
  try {
    return await readFile(join(process.cwd(), relativePath));
  } catch {
    return null;
  }
}

export default async function Image() {
  try {
    // Load fonts and avatar from the local filesystem (no dependency on prod URL)
    const [cabinetGroteskBuf, clashDisplayBuf, avatarBuf] = await Promise.all([
      loadLocalFile("public/fonts/CabinetGrotesk-Medium.ttf"),
      loadLocalFile("public/fonts/ClashDisplay-Semibold.ttf"),
      loadLocalFile("public/me.jpg"),
    ]);

    const avatarSrc = avatarBuf
      ? `data:image/jpeg;base64,${avatarBuf.toString("base64")}`
      : undefined;

    const fonts: { name: string; data: Buffer; weight: 400 | 600 | 700; style: "normal" }[] = [];
    if (cabinetGroteskBuf) {
      fonts.push({
        name: "Cabinet Grotesk",
        data: cabinetGroteskBuf,
        weight: 400,
        style: "normal",
      });
    }
    if (clashDisplayBuf) {
      fonts.push({
        name: "Clash Display",
        data: clashDisplayBuf,
        weight: 600,
        style: "normal",
      });
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#ffffff",
            padding: "40px",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#fafafa",
              padding: "40px",
              border: "1px solid #e5e5e5",
              borderRadius: "12px",
              position: "relative",
            }}
          >
            {avatarSrc && (
              <div
                style={{
                  position: "absolute",
                  top: "40px",
                  left: "40px",
                  display: "flex",
                }}
              >
                <img
                  src={avatarSrc}
                  alt={DATA.name}
                  width={140}
                  height={140}
                  style={{
                    borderRadius: "24px",
                    border: "4px solid #e5e5e5",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                height: "100%",
                width: "100%",
              }}
            >
              <div
                style={{
                  fontFamily: "Clash Display",
                  fontSize: "48px",
                  fontWeight: 600,
                  lineHeight: 1.1,
                  color: "#000000",
                  marginBottom: "12px",
                  letterSpacing: "-0.02em",
                }}
              >
                Swyam Sharma
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: "#404040",
                  marginBottom: "16px",
                }}
              >
                Full-Stack & Agentic AI Engineer
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#f59e0b",
                    color: "white",
                    borderRadius: "8px",
                    padding: "6px 12px",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  SIH 2025 Winner
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#e5e5e5",
                    color: "#404040",
                    borderRadius: "8px",
                    padding: "6px 12px",
                    fontSize: "14px",
                  }}
                >
                  swyamsharma.vercel.app
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        ...size,
        fonts: fonts.length > 0 ? fonts : undefined,
      }
    );
  } catch (error) {
    console.error("Error generating OpenGraph image:", error);
    return new Response(
      `Failed to generate image: ${error instanceof Error ? error.message : "Unknown error"}`,
      { status: 500 }
    );
  }
}
