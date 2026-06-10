import sharp from "sharp";

type SessionUser = {
  id: number;
  name: string;
  email: string;
  role: string;
} | null;

export function canViewOriginalImage(user: SessionUser) {
  return Boolean(user);
}

export function watermarkSvg(svgContent: string, text: string): string {
  const closingSvgIndex = svgContent.lastIndexOf("</svg>");
  if (closingSvgIndex === -1) return svgContent;

  const escapedText = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  const watermarkElement = `
    <g style="pointer-events:none;">
      <style>
        .svg-watermark {
          fill: rgba(255, 255, 255, 0.24);
          font-family: Helvetica, Arial, sans-serif;
          font-size: 64px;
          font-weight: 800;
          letter-spacing: 2px;
        }
        .svg-watermark-sub {
          fill: rgba(255, 255, 255, 0.16);
          font-family: Helvetica, Arial, sans-serif;
          font-size: 30px;
          font-weight: 700;
          letter-spacing: 1px;
        }
      </style>
      <g transform="rotate(-35, 540, 1170)">
        <text x="50%" y="48%" text-anchor="middle" dominant-baseline="middle" class="svg-watermark">${escapedText}</text>
        <text x="50%" y="53%" text-anchor="middle" dominant-baseline="middle" class="svg-watermark-sub">SIGN IN FOR ORIGINAL - WALLMOBI.COM</text>
      </g>
    </g>
  `;

  return svgContent.slice(0, closingSvgIndex) + watermarkElement + svgContent.slice(closingSvgIndex);
}

export async function watermarkBinary(buffer: Buffer, text: string): Promise<Buffer> {
  const image = sharp(buffer, { animated: true });
  const metadata = await image.metadata();
  const width = metadata.width || 1080;
  const height = metadata.height || 1920;

  const watermarkFontSize = Math.max(34, Math.floor(width * 0.07));
  const subFontSize = Math.max(18, Math.floor(width * 0.032));
  const svgOverlay = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .watermark {
          fill: rgba(255, 255, 255, 0.24);
          font-family: Helvetica, Arial, sans-serif;
          font-size: ${watermarkFontSize}px;
          font-weight: 800;
          letter-spacing: 2px;
          text-anchor: middle;
          dominant-baseline: middle;
        }
        .watermark-sub {
          fill: rgba(255, 255, 255, 0.16);
          font-family: Helvetica, Arial, sans-serif;
          font-size: ${subFontSize}px;
          font-weight: 700;
          letter-spacing: 1px;
          text-anchor: middle;
          dominant-baseline: middle;
        }
      </style>
      <g transform="rotate(-35, ${width / 2}, ${height / 2})">
        <text x="${width / 2}" y="${height / 2}" class="watermark">${text}</text>
        <text x="${width / 2}" y="${height / 2 + Math.floor(width * 0.08)}" class="watermark-sub">SIGN IN FOR ORIGINAL - WALLMOBI.COM</text>
      </g>
    </svg>
  `;

  return image
    .composite([{ input: Buffer.from(svgOverlay), top: 0, left: 0 }])
    .toBuffer();
}
