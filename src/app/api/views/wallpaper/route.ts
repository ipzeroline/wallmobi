import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isSafeSlug } from "@/lib/api-response";

const filePath = path.join(process.cwd(), "src/data/wallpaper-views.json");

// In-memory fallback map in case filesystem is read-only (e.g. serverless deployments)
const memoryViews = new Map<string, number>();

// Helper to read views
function readViews(): Record<string, number> {
  try {
    if (!fs.existsSync(filePath)) {
      if (process.env.NODE_ENV === "production") {
        return {};
      }
      try {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, JSON.stringify({}));
      } catch (e) {
        // Read-only filesystem fallback
        const fallback: Record<string, number> = {};
        memoryViews.forEach((val, key) => {
          fallback[key] = val;
        });
        return fallback;
      }
      return {};
    }
    const data = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(data);
    
    // Sync memory cache
    Object.keys(parsed).forEach((key) => {
      memoryViews.set(key, parsed[key]);
    });
    
    return parsed;
  } catch (error) {
    const fallback: Record<string, number> = {};
    memoryViews.forEach((val, key) => {
      fallback[key] = val;
    });
    return fallback;
  }
}

// Helper to write views
function writeViews(views: Record<string, number>) {
  // Sync to memory cache
  Object.keys(views).forEach((key) => {
    memoryViews.set(key, views[key]);
  });

  if (process.env.NODE_ENV === "production") {
    return;
  }

  try {
    fs.writeFileSync(filePath, JSON.stringify(views, null, 2));
  } catch (error) {
    console.warn("Failed to write wallpaper views to filesystem, using memory cache:", error);
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug || !isSafeSlug(slug)) {
    return NextResponse.json({ error: "Missing slug parameter" }, { status: 400 });
  }

  const views = readViews();
  const count = views[slug] || 0;

  return NextResponse.json({ count });
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug || !isSafeSlug(slug)) {
    return NextResponse.json({ error: "Missing slug parameter" }, { status: 400 });
  }

  const views = readViews();
  const count = (views[slug] || 0) + 1;
  views[slug] = count;
  writeViews(views);

  return NextResponse.json({ count });
}
