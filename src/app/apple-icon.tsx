import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

/**
 * Branded Apple Touch Icon (180x180) using Next.js App Router ImageResponse.
 * Uses the approved HR Monogram with Ink Black (#171717) and Orange (#E87527).
 */
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
          color: "#E87527",
          borderRadius: "36px",
          border: "4px solid #E87527",
          fontSize: 88,
          fontWeight: 800,
          fontFamily: "sans-serif",
          letterSpacing: "-2px",
        }}
      >
        HR
      </div>
    ),
    {
      ...size,
    }
  );
}

