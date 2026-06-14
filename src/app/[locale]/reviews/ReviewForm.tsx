"use client";

import { useState } from "react";
import Link from "next/link";

type ReviewFormProps = {
  locale: "en" | "th";
  user: { name: string; email: string } | null;
};

const copy = {
  en: {
    signInTitle: "Sign in to write a review",
    signInBody: "Only registered members can submit WallMobi reviews. Reviews are published after admin approval.",
    signInButton: "Sign in or create account",
    formTitle: "Write your WallMobi review",
    rating: "Rating",
    title: "Review title",
    titlePlaceholder: "Fast downloads and clean wallpapers",
    body: "Your review",
    bodyPlaceholder: "Tell other users what you liked, how you use WallMobi, and what could be improved.",
    submit: "Submit for approval",
    submitting: "Submitting...",
    success: "Review submitted. It will appear after admin approval.",
  },
  th: {
    signInTitle: "เข้าสู่ระบบเพื่อเขียนรีวิว",
    signInBody: "เฉพาะสมาชิกเท่านั้นที่ส่งรีวิว WallMobi ได้ รีวิวจะแสดงบนหน้าเว็บหลัง admin อนุมัติ",
    signInButton: "เข้าสู่ระบบหรือสมัครสมาชิก",
    formTitle: "เขียนรีวิว WallMobi",
    rating: "คะแนน",
    title: "หัวข้อรีวิว",
    titlePlaceholder: "ดาวน์โหลดเร็ว วอลเปเปอร์สวย ใช้ง่าย",
    body: "รีวิวของคุณ",
    bodyPlaceholder: "เล่าว่าชอบอะไร ใช้งาน WallMobi อย่างไร และอยากให้ปรับปรุงอะไร",
    submit: "ส่งรีวิวเพื่อรออนุมัติ",
    submitting: "กำลังส่ง...",
    success: "ส่งรีวิวแล้ว รีวิวจะแสดงหลัง admin อนุมัติ",
  },
};

export default function ReviewForm({ locale, user }: ReviewFormProps) {
  const t = copy[locale];
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!user) {
    return (
      <section style={{ border: "1px solid var(--line)", background: "var(--bg-alt)", borderRadius: "16px", padding: "1.5rem" }}>
        <h2 style={{ margin: "0 0 0.6rem", fontSize: "1.25rem" }}>{t.signInTitle}</h2>
        <p style={{ margin: "0 0 1.1rem", color: "var(--text-2)", lineHeight: 1.6 }}>{t.signInBody}</p>
        <Link href={`/${locale}/member#register`} className="btn btn-primary" style={{ padding: "0.75rem 1rem", borderRadius: "10px" }}>
          {t.signInButton}
        </Link>
      </section>
    );
  }

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, rating, title, body }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to submit review.");
        return;
      }

      setTitle("");
      setBody("");
      setRating(5);
      setMessage(t.success);
    } catch {
      setError("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ border: "1px solid var(--line)", background: "var(--bg-alt)", borderRadius: "16px", padding: "1.5rem" }}>
      <h2 style={{ margin: "0 0 0.35rem", fontSize: "1.25rem" }}>{t.formTitle}</h2>
      <p style={{ margin: "0 0 1.2rem", color: "var(--text-3)", fontSize: "0.92rem" }}>{user.name}</p>

      {message && <div style={{ marginBottom: "1rem", color: "#30d158", fontWeight: 700 }}>{message}</div>}
      {error && <div style={{ marginBottom: "1rem", color: "#ff453a", fontWeight: 700 }}>{error}</div>}

      <form onSubmit={submitReview} style={{ display: "grid", gap: "1rem" }}>
        <label style={{ display: "grid", gap: "0.45rem", color: "var(--text-2)", fontWeight: 700 }}>
          {t.rating}
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="search-input"
            style={{ padding: "0.8rem", borderRadius: "10px", border: "1px solid var(--line)", background: "var(--bg)" }}
          >
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>{value} / 5</option>
            ))}
          </select>
        </label>

        <label style={{ display: "grid", gap: "0.45rem", color: "var(--text-2)", fontWeight: 700 }}>
          {t.title}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            required
            className="search-input"
            placeholder={t.titlePlaceholder}
            style={{ padding: "0.8rem", borderRadius: "10px", border: "1px solid var(--line)" }}
          />
        </label>

        <label style={{ display: "grid", gap: "0.45rem", color: "var(--text-2)", fontWeight: 700 }}>
          {t.body}
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            minLength={20}
            maxLength={2000}
            required
            className="search-input"
            placeholder={t.bodyPlaceholder}
            rows={7}
            style={{ padding: "0.8rem", borderRadius: "10px", border: "1px solid var(--line)", resize: "vertical" }}
          />
        </label>

        <button className="btn btn-primary" type="submit" disabled={loading} style={{ justifyContent: "center", padding: "0.85rem 1rem", borderRadius: "10px" }}>
          {loading ? t.submitting : t.submit}
        </button>
      </form>
    </section>
  );
}
