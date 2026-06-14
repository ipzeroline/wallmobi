import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { serverErrorResponse } from "@/lib/api-response";

const allowedStatuses = new Set(["pending", "approved", "rejected"]);

async function requireAdmin() {
  const user = await getSessionUser();
  if (!user || (user.role !== "super_admin" && user.role !== "staff")) return null;
  return user;
}

export async function GET(req: Request) {
  try {
    const user = await requireAdmin();
    if (!user) return NextResponse.json({ error: "Access denied" }, { status: 403 });

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "pending";
    const where = allowedStatuses.has(status) ? "WHERE r.status = ?" : "";
    const params = allowedStatuses.has(status) ? [status] : [];

    const [rows] = await pool.query(
      `SELECT r.id, r.user_id, r.locale, r.rating, r.title, r.body, r.status, r.admin_note,
              r.created_at, r.approved_at, u.name AS reviewer_name, u.email AS reviewer_email,
              a.name AS approved_by_name
       FROM reviews r
       JOIN users u ON u.id = r.user_id
       LEFT JOIN users a ON a.id = r.approved_by
       ${where}
       ORDER BY r.created_at DESC
       LIMIT 200`,
      params
    );

    return NextResponse.json({ reviews: rows });
  } catch (err: any) {
    console.error("Admin reviews GET error:", err);
    return serverErrorResponse(err.message);
  }
}

export async function PUT(req: Request) {
  try {
    const user = await requireAdmin();
    if (!user) return NextResponse.json({ error: "Access denied" }, { status: 403 });

    const { id, status, adminNote } = await req.json();
    const reviewId = Number(id);
    if (!Number.isInteger(reviewId) || reviewId <= 0 || !allowedStatuses.has(status)) {
      return NextResponse.json({ error: "Invalid review update" }, { status: 400 });
    }

    if (status === "approved") {
      await pool.query(
        `UPDATE reviews
         SET status = 'approved', admin_note = ?, approved_by = ?, approved_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [adminNote || null, user.id, reviewId]
      );
    } else {
      await pool.query(
        `UPDATE reviews
         SET status = ?, admin_note = ?, approved_by = NULL, approved_at = NULL
         WHERE id = ?`,
        [status, adminNote || null, reviewId]
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Admin reviews PUT error:", err);
    return serverErrorResponse(err.message);
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await requireAdmin();
    if (!user) return NextResponse.json({ error: "Access denied" }, { status: 403 });

    const { searchParams } = new URL(req.url);
    const reviewId = Number(searchParams.get("id"));
    if (!Number.isInteger(reviewId) || reviewId <= 0) {
      return NextResponse.json({ error: "Invalid review id" }, { status: 400 });
    }

    await pool.query("DELETE FROM reviews WHERE id = ?", [reviewId]);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Admin reviews DELETE error:", err);
    return serverErrorResponse(err.message);
  }
}
