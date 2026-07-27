import { ImageResponse } from "next/og";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "Plus";
  const tag = post?.tag ?? "Blog";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          background: "#F5EDE4",
        }}
      >
        {/* Tag label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 20,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#C87F6E",
            }}
          >
            {tag}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            paddingTop: 40,
            paddingBottom: 40,
          }}
        >
          <span
            style={{
              fontSize: title.length > 60 ? 44 : title.length > 40 ? 52 : 60,
              color: "#1A1A1A",
              lineHeight: 1.2,
              fontWeight: 600,
            }}
          >
            {title}
          </span>
        </div>

        {/* Bottom branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #E8DDD2",
            paddingTop: 24,
          }}
        >
          <span
            style={{
              fontSize: 28,
              color: "#C87F6E",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            Plus
          </span>
          <span
            style={{
              fontSize: 16,
              color: "#8A7E76",
            }}
          >
            meetyourplus.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
