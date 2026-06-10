export function wallpaperImageUrl(slug: string, options?: { width?: number }) {
  const params = new URLSearchParams({ slug });
  if (options?.width) {
    params.set("w", String(options.width));
  }
  return `/api/wallpapers/image?${params.toString()}`;
}

export function imageExtension(src: string) {
  const pathname = /^https?:\/\//i.test(src) ? new URL(src).pathname : src;
  const match = pathname.match(/\.(png|jpe?g|webp|gif|svg)$/i);
  return match ? `.${match[1].toLowerCase().replace("jpeg", "jpg")}` : ".png";
}

export function imageMimeType(src: string) {
  const ext = imageExtension(src);
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  if (ext === ".jpg") return "image/jpeg";
  return "image/png";
}
