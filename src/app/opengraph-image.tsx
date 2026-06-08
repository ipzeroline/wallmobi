import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Wallpapers for your phone`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#fbfbfd",
          color: "#1d1d1f",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#0071e3,#54f0ff)" }} />
          <div style={{ fontSize: 34, letterSpacing: -1, fontWeight: 600 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 1.02, letterSpacing: -4, fontWeight: 600, maxWidth: 980 }}>
            Made for your phone.
          </div>
          <div style={{ marginTop: 26, fontSize: 32, color: "#6e6e73", maxWidth: 900 }}>
            Original AI-generated wallpapers. Free to download in high resolution.
          </div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {["#1b6ca8", "#7b4bd6", "#c8443f", "#5fb03d", "#bb8a44"].map((c) => (
            <div key={c} style={{ width: 92, height: 56, borderRadius: 14, background: c }} />
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
