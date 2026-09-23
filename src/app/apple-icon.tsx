import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#171717",
          borderRadius: "36px",
          fontSize: "72px",
          fontWeight: 700,
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        SS
      </div>
    ),
    { ...size }
  );
}
