"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function FullscreenPreview({
  src,
  title,
  locale,
}: {
  src: string;
  title: string;
  locale: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"lock" | "home">("lock");
  const [currentTime, setCurrentTime] = useState("09:41");
  const [currentDate, setCurrentDate] = useState("Wednesday, June 7");

  useEffect(() => {
    if (!isOpen) return;

    // Update clock to current local time
    const updateTime = () => {
      const now = new Date();
      
      // Time format (HH:MM)
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);

      // Date format (localized)
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        month: "long",
        day: "numeric",
      };
      
      try {
        const lang = locale === "en" ? "en-US" : locale;
        setCurrentDate(now.toLocaleDateString(lang, options));
      } catch {
        setCurrentDate(now.toLocaleDateString("en-US", options));
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 15000); // update every 15 seconds

    // Prevent body scroll when preview is open
    document.body.style.overflow = "hidden";

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, [isOpen, locale]);

  // UI translations
  const t = {
    btnOpen: locale === "th" ? "ดูตัวอย่างหน้าจอ" : "Preview Screen",
    btnClose: locale === "th" ? "ปิด" : "Close",
    modeLock: locale === "th" ? "หน้าจอล็อก" : "Lock Screen",
    modeHome: locale === "th" ? "หน้าจอโฮม" : "Home Screen",
    charge: locale === "th" ? "ชาร์จแล้ว 100%" : "100% Charged",
  };

  return (
    <>
      <button
        className="btn btn-soft"
        onClick={() => setIsOpen(true)}
        style={{ width: "100%", marginTop: "0.6rem", gap: "0.5rem" }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
        {t.btnOpen}
      </button>

      {isOpen && (
        <div className="preview-overlay" role="dialog" aria-modal="true">
          {/* Controls Bar */}
          <div className="preview-controls">
            <button
              className={`preview-btn ${mode === "lock" ? "active" : ""}`}
              onClick={() => setMode("lock")}
            >
              {t.modeLock}
            </button>
            <button
              className={`preview-btn ${mode === "home" ? "active" : ""}`}
              onClick={() => setMode("home")}
            >
              {t.modeHome}
            </button>
            <button
              className="preview-btn preview-close"
              onClick={() => setIsOpen(false)}
            >
              {t.btnClose}
            </button>
          </div>

          {/* Phone Body Frame */}
          <div className="preview-phone-chassis">
            {/* Dynamic Island cutout */}
            <div
              style={{
                position: "absolute",
                top: "11px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "95px",
                height: "25px",
                backgroundColor: "#000",
                borderRadius: "15px",
                zIndex: 100,
              }}
            />

            {/* Background Image */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
              <Image
                src={src}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                style={{ objectFit: "cover", pointerEvents: "none" }}
                priority
                unoptimized
              />
            </div>

            {/* Simulated UI Screen */}
            <div className="preview-screen">
              {/* StatusBar */}
              <div className="preview-statusbar">
                <span>{currentTime}</span>
                <div className="preview-statusbar-right">
                  {/* Signal Icon */}
                  <svg width="15" height="10" viewBox="0 0 16 10" fill="currentColor">
                    <rect x="0" y="8" width="2" height="2" rx="0.5" />
                    <rect x="3" y="6" width="2" height="4" rx="0.5" />
                    <rect x="6" y="4" width="2" height="6" rx="0.5" />
                    <rect x="9" y="2" width="2" height="8" rx="0.5" />
                    <rect x="12" y="0" width="2" height="10" rx="0.5" />
                  </svg>
                  {/* Wifi Icon */}
                  <svg width="13" height="10" viewBox="0 0 16 12" fill="currentColor">
                    <path d="M8 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-4.2-3.8c.3-.3.8-.3 1.1 0 .9.9 2.1 1.4 3.1 1.4s2.2-.5 3.1-1.4c.3-.3.8-.3 1.1 0s.3.8 0 1.1c-1.2 1.2-2.8 1.9-4.2 1.9s-3-.7-4.2-1.9c-.3-.3-.3-.8 0-1.1zm-2.8-2.8a6.3 6.3 0 0 1 9-.1c.3.3.3.8 0 1.1s-.8.3-1.1 0a4.7 4.7 0 0 0-6.8.1c-.3.3-.8.3-1.1 0s-.3-.8 0-1.1zM1 2.6c3.9-3.5 10.1-3.5 14 0c.3.3.3.8 0 1.1s-.8.3-1.1 0a8.8 8.8 0 0 0-11.8 0c-.3.3-.8.3-1.1 0s-.3-.8 0-1.1z" />
                  </svg>
                  {/* Battery Icon */}
                  <svg width="20" height="10" viewBox="0 0 24 12" fill="currentColor">
                    <rect x="1" y="1" width="20" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="3" y="3" width="16" height="6" rx="1" />
                    <path d="M22 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Mode: LOCK SCREEN */}
              {mode === "lock" && (
                <>
                  <div className="preview-lock-center">
                    {/* Simulated Lock icon */}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "0.4rem", opacity: 0.85 }}>
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <div className="preview-lock-date">{currentDate}</div>
                    <div className="preview-lock-time">{currentTime}</div>
                    <div className="preview-lock-widgets">
                      <div className="preview-lock-widget-pill">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span>{t.charge}</span>
                      </div>
                    </div>
                  </div>

                  <div className="preview-lock-bottom">
                    {/* Flashlight button */}
                    <div className="preview-lock-btn" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6c0-2.2-1.8-4-4-4h-4C7.8 2 6 3.8 6 6v1l4 3v7c0 1.1.9 2 2 2s2-.9 2-2v-7l4-3V6z" />
                        <line x1="12" y1="12" x2="12" y2="12.01" strokeWidth="3" />
                      </svg>
                    </div>
                    {/* Camera button */}
                    <div className="preview-lock-btn" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    </div>
                  </div>
                </>
              )}

              {/* Mode: HOME SCREEN */}
              {mode === "home" && (
                <>
                  {/* Grid of mock apps */}
                  <div className="preview-home-grid">
                    <div className="preview-home-app">
                      <div className="preview-home-app-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                          <circle cx="12" cy="13" r="4" />
                        </svg>
                      </div>
                      <span className="preview-home-app-label">Camera</span>
                    </div>

                    <div className="preview-home-app">
                      <div className="preview-home-app-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <polygon points="12 2 2 7 12 12 22 7 12 2" />
                          <polyline points="2 17 12 22 22 17" />
                          <polyline points="2 12 12 17 22 12" />
                        </svg>
                      </div>
                      <span className="preview-home-app-label">Gallery</span>
                    </div>

                    <div className="preview-home-app">
                      <div className="preview-home-app-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <circle cx="12" cy="12" r="10" />
                          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                        </svg>
                      </div>
                      <span className="preview-home-app-label">Browser</span>
                    </div>

                    <div className="preview-home-app">
                      <div className="preview-home-app-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                      <span className="preview-home-app-label">Chat</span>
                    </div>

                    <div className="preview-home-app">
                      <div className="preview-home-app-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M9 18V5l12-2v13" />
                          <circle cx="6" cy="18" r="3" />
                          <circle cx="18" cy="16" r="3" />
                        </svg>
                      </div>
                      <span className="preview-home-app-label">Music</span>
                    </div>

                    <div className="preview-home-app">
                      <div className="preview-home-app-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                      </div>
                      <span className="preview-home-app-label">Settings</span>
                    </div>
                  </div>

                  {/* Simulated Dock */}
                  <div className="preview-home-dock">
                    <div className="preview-home-app">
                      <div className="preview-home-app-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                    </div>
                    <div className="preview-home-app">
                      <div className="preview-home-app-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      </div>
                    </div>
                    <div className="preview-home-app">
                      <div className="preview-home-app-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                    </div>
                    <div className="preview-home-app">
                      <div className="preview-home-app-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-6h2zm0-8h-2V7h2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Home Indicator */}
              <div className="preview-home-indicator" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
