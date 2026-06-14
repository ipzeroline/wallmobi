import pool from "@/lib/db";

export const reviewLocales = ["en", "th"] as const;
export type ReviewLocale = (typeof reviewLocales)[number];

export type PublicReview = {
  id: number;
  locale: ReviewLocale;
  rating: number;
  title: string;
  body: string;
  reviewerName: string;
  createdAt: string;
};

export function isReviewLocale(value: string | null | undefined): value is ReviewLocale {
  return reviewLocales.includes(value as ReviewLocale);
}

export function normalizeRating(value: unknown) {
  const rating = Number(value);
  return Number.isInteger(rating) && rating >= 1 && rating <= 5 ? rating : null;
}

export async function getApprovedReviews(locale: ReviewLocale, limit = 50): Promise<PublicReview[]> {
  const [rows] = await pool.query(
    `SELECT r.id, r.locale, r.rating, r.title, r.body, r.created_at, u.name AS reviewer_name
     FROM reviews r
     JOIN users u ON u.id = r.user_id
     WHERE r.status = 'approved' AND r.locale = ?
     ORDER BY r.approved_at DESC, r.created_at DESC
     LIMIT ?`,
    [locale, limit]
  );

  return (rows as any[]).map((row) => ({
    id: row.id,
    locale: row.locale,
    rating: row.rating,
    title: row.title,
    body: row.body,
    reviewerName: row.reviewer_name,
    createdAt: new Date(row.created_at).toISOString(),
  }));
}
