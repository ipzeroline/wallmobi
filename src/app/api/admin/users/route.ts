import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getSessionUser, hashPassword } from "@/lib/auth";
import { serverErrorResponse } from "@/lib/api-response";

const allowedRoles = new Set(["member", "staff", "super_admin"]);

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "super_admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const [rows] = await pool.query(
      "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC"
    );
    return NextResponse.json({ users: rows });
  } catch (err: any) {
    console.error("Admin users list error:", err);
    return serverErrorResponse(err.message);
  }
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "super_admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const { name, email, password, role } = await req.json();
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }
    if (!allowedRoles.has(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const emailLower = email.toLowerCase().trim();

    // Check if user exists
    const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [emailLower]);
    if ((existing as any).length > 0) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const passwordHash = hashPassword(password);
    await pool.query(
      "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
      [name, emailLower, passwordHash, role]
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Admin user create error:", err);
    return serverErrorResponse(err.message);
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "super_admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const { userId, role } = await req.json();
    if (!userId || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!allowedRoles.has(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Prevent demoting oneself
    if (userId === user.id) {
      return NextResponse.json({ error: "Cannot change your own role" }, { status: 400 });
    }

    await pool.query("UPDATE users SET role = ? WHERE id = ?", [role, userId]);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Admin user update error:", err);
    return serverErrorResponse(err.message);
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== "super_admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    if (parseInt(userId, 10) === user.id) {
      return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 });
    }

    await pool.query("DELETE FROM users WHERE id = ?", [userId]);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Admin user delete error:", err);
    return serverErrorResponse(err.message);
  }
}
