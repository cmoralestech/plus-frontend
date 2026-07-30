import { ImageResponse } from "next/og";

// Site-wide default social card.
//
// This replaces public/og-image.png and public/twitter-card.png, whose text
// never rendered — they shipped as a bare mark on a dark field. Generating the
// card keeps the wordmark and tagline guaranteed-present. Route segments with
// their own opengraph-image (e.g. /blog/[slug]) still override this.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Plus — Private Dating for People with More to Offer";

const BG = "#141210";
const MARK = "#8C1D1D";
const CREAM = "#EFE7DC";
const MUTED = "#8A7E76";
const ACCENT = "#C87F6E";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: BG,
        }}
      >
        {/* Mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 96,
              background: MARK,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", position: "relative", width: 48, height: 48 }}>
              <div
                style={{
                  position: "absolute",
                  left: 18,
                  top: 0,
                  width: 12,
                  height: 48,
                  background: CREAM,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 18,
                  width: 48,
                  height: 12,
                  background: CREAM,
                }}
              />
            </div>
          </div>
          <span
            style={{
              marginLeft: 28,
              fontSize: 64,
              color: CREAM,
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            Plus
          </span>
        </div>

        {/* Tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 52, color: CREAM, lineHeight: 1.25, fontWeight: 500 }}>
            Private dating for people
          </span>
          <span style={{ fontSize: 52, color: CREAM, lineHeight: 1.25, fontWeight: 500 }}>
            with more to offer
          </span>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #2E2A24",
            paddingTop: 26,
          }}
        >
          <span style={{ fontSize: 24, color: ACCENT }}>
            Verified profiles · Free for Plus members
          </span>
          <span style={{ fontSize: 22, color: MUTED }}>meetyourplus.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
