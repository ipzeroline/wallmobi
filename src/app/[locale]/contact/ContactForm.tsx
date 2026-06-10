"use client";

import { useState } from "react";

type ContactFormProps = {
  dict: {
    nameLabel: string;
    emailFieldLabel: string;
    messageLabel: string;
    submitButton: string;
    successMessage: string;
    errorMessage: string;
    validationName: string;
    validationEmail: string;
    validationMessage: string;
  };
};

export default function ContactForm({ dict }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = dict.validationName;
    if (!email.trim()) {
      newErrors.email = dict.validationEmail;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = dict.validationEmail;
    }
    if (!message.trim()) newErrors.message = dict.validationMessage;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSuccess(null);

    try {
      // Simulate API call to send message
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", width: "100%" }}>
      {success === true && (
        <div style={{ padding: "1rem 1.25rem", background: "rgba(76, 217, 100, 0.08)", border: "1px solid #4cd964", borderRadius: "12px", color: "var(--text-1)", fontSize: "0.95rem", lineHeight: "1.5" }}>
          ✅ {dict.successMessage}
        </div>
      )}
      {success === false && (
        <div style={{ padding: "1rem 1.25rem", background: "rgba(255, 59, 48, 0.08)", border: "1px solid #ff3b30", borderRadius: "12px", color: "var(--text-1)", fontSize: "0.95rem", lineHeight: "1.5" }}>
          ❌ {dict.errorMessage}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <label htmlFor="name" style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-2)" }}>{dict.nameLabel}</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          required
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "10px",
            border: errors.name ? "1px solid #ff3b30" : "1px solid var(--line)",
            background: "var(--bg-alt)",
            color: "var(--text-1)",
            fontSize: "0.95rem",
            outline: "none",
            transition: "border-color 0.2s"
          }}
        />
        {errors.name && <span style={{ color: "#ff3b30", fontSize: "0.82rem", marginTop: "0.2rem" }}>{errors.name}</span>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <label htmlFor="email" style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-2)" }}>{dict.emailFieldLabel}</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "10px",
            border: errors.email ? "1px solid #ff3b30" : "1px solid var(--line)",
            background: "var(--bg-alt)",
            color: "var(--text-1)",
            fontSize: "0.95rem",
            outline: "none",
            transition: "border-color 0.2s"
          }}
        />
        {errors.email && <span style={{ color: "#ff3b30", fontSize: "0.82rem", marginTop: "0.2rem" }}>{errors.email}</span>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <label htmlFor="message" style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-2)" }}>{dict.messageLabel}</label>
        <textarea
          id="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
          required
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "10px",
            border: errors.message ? "1px solid #ff3b30" : "1px solid var(--line)",
            background: "var(--bg-alt)",
            color: "var(--text-1)",
            fontSize: "0.95rem",
            outline: "none",
            transition: "border-color 0.2s",
            resize: "vertical"
          }}
        />
        {errors.message && <span style={{ color: "#ff3b30", fontSize: "0.82rem", marginTop: "0.2rem" }}>{errors.message}</span>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary"
        style={{
          marginTop: "0.5rem",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          width: "100%",
          padding: "0.8rem"
        }}
      >
        {loading ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="animate-spin" style={{ marginRight: "4px" }}>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" />
              <path d="M4 12a8 8 0 018-8V4" />
            </svg>
            <span>{dict.submitButton}...</span>
          </>
        ) : (
          dict.submitButton
        )}
      </button>
    </form>
  );
}
