import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const alt =
  "Hasnain Raza — Full-Stack Agentic AI Engineer & Automation Developer";

/**
 * Branded OpenGraph Social Sharing Card (1200x630) using Next.js native ImageResponse.
 * Uses the brand color system: Cream (#F2E9D8), Ink Black (#171717), and Orange (#E87527).
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#171717",
          padding: "70px 80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle Accent Glow */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            backgroundColor: "#E87527",
            opacity: 0.12,
            filter: "blur(90px)",
          }}
        />

        {/* Top Header: Monogram + Category Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                backgroundColor: "#E87527",
                color: "#171717",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "26px",
                fontWeight: 900,
                letterSpacing: "-1px",
              }}
            >
              HR
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#F2E9D8",
                  letterSpacing: "-0.5px",
                }}
              >
                Hasnain Raza
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#E87527",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                }}
              >
                Agentic AI Engineer
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "999px",
              border: "1px solid rgba(232, 117, 39, 0.4)",
              backgroundColor: "rgba(232, 117, 39, 0.08)",
              color: "#E87527",
              fontFamily: "monospace",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "1px",
            }}
          >
            PORTFOLIO // 2026
          </div>
        </div>

        {/* Middle: Main Core Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "980px",
          }}
        >
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#F2E9D8",
              letterSpacing: "-1.5px",
              margin: 0,
            }}
          >
            Building Intelligent Systems with{" "}
            <span style={{ color: "#E87527" }}>AI Agents</span> &amp;{" "}
            <span style={{ color: "#E87527" }}>Voice Automation</span>
          </h1>

          <p
            style={{
              fontSize: "22px",
              lineHeight: 1.45,
              color: "#94A3B8",
              margin: 0,
              fontWeight: 400,
            }}
          >
            Turning repetitive business operations into autonomous, intelligent
            workflows and scalable full-stack applications.
          </p>
        </div>

        {/* Bottom Bar: Stack Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(242, 233, 216, 0.12)",
          }}
        >
          {[
            "Agentic AI",
            "Voice AI",
            "N8N Automation",
            "Next.js",
            "Python",
            "CRM Integration",
          ].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                backgroundColor: "rgba(242, 233, 216, 0.06)",
                border: "1px solid rgba(242, 233, 216, 0.12)",
                color: "#F2E9D8",
                fontSize: "14px",
                fontFamily: "monospace",
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

