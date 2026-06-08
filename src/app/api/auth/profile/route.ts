import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getSessionUser, hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, password } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (password) {
      const passwordHash = hashPassword(password);
      await pool.query(
        "UPDATE users SET name = ?, password_hash = ? WHERE id = ?",
        [name, passwordHash, user.id]
      );
    } else {
      await pool.query(
        "UPDATE users SET name = ? WHERE id = ?",
        [name, user.id]
      );
    }

    return NextResponse.json({ success: true, user: { name, email: user.email } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
