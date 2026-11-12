import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

/**
 * Branded Favicon (32x32) using Next.js App Router ImageResponse.
 * Uses the approved HR Monogram with Ink Black (#171717) and Orange (#E87527).
 */
export default function Icon() {
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
          borderRadius: "7px",
          border: "1.5px solid #E87527",
          fontSize: 16,
          fontWeight: 800,
          fontFamily: "sans-serif",
          letterSpacing: "-0.5px",
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

