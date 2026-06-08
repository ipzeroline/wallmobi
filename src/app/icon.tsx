import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(135deg, #e7a44b 0%, #c8443f 38%, #7b4bd6 72%, #1f9aa6 100%)",
          borderRadius: 16,
        }}
      />
    ),
    { ...size }
  );
}
