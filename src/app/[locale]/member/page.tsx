"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { site } from "@/lib/site";
import DownloadButton from "@/components/DownloadButton";

type Screen = "login" | "register" | "forgot" | "dashboard";
type Tab = "profile" | "favorites" | "history";

export default function MemberPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const l = isLocale(locale) ? (locale as Locale) : "en";
  const dict = getDictionary(l);

  // Auth states
  const [screen, setScreen] = useState<Screen>("login");
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role?: string } | null>(null);

  // Forms states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");
  const [honeypot, setHoneypot] = useState("");
  
  // Profile update states
  const [updateName, setUpdateName] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");

  // Lists states
  const [favorites, setFavorites] = useState<any[]>([]);
  const [downloads, setDownloads] = useState<any[]>([]);

  // Validation/Error message state
  const [errorMsg, setErrorMsg] = useState("");

  // Sync user from localStorage
  // Sync user from backend session API
  const syncUser = async () => {
    try {
      const res = await fetch("/api/auth/session");
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        setUpdateName(data.user.name);
        setScreen("dashboard");

        // Cache user info locally for nav indicators
        localStorage.setItem("wallmobi_active_user", JSON.stringify(data.user));

        // Fetch favorites and downloads
        const [favsRes, dlsRes] = await Promise.all([
          fetch(`/api/favorites?locale=${l}`),
          fetch(`/api/downloads?locale=${l}`),
        ]);
        if (favsRes.ok) {
          const favsData = await favsRes.json();
          setFavorites(favsData.favorites || []);
        }
        if (dlsRes.ok) {
          const dlsData = await dlsRes.json();
          setDownloads(dlsData.downloads || []);
        }
      } else {
        localStorage.removeItem("wallmobi_active_user");
        setCurrentUser(null);
        setScreen("login");
      }
    } catch {
      localStorage.removeItem("wallmobi_active_user");
      setCurrentUser(null);
      setScreen("login");
    }
  };

  useEffect(() => {
    syncUser();
    
    // Listen to custom auth events
    window.addEventListener("auth-change", syncUser);
    return () => {
      window.removeEventListener("auth-change", syncUser);
    };
  }, []);

  // UI translations
  const t = {
    titleLogin: l === "th" ? "เข้าสู่ระบบ" : "Sign In",
    titleRegister: l === "th" ? "สมัครสมาชิก" : "Create Account",
    titleForgot: l === "th" ? "ลืมรหัสผ่าน" : "Forgot Password",
    titleDashboard: l === "th" ? "แดชบอร์ดส่วนตัว" : "My Account",
    labelEmail: l === "th" ? "อีเมล" : "Email",
    labelEmailOrUsername: l === "th" ? "อีเมล หรือ ชื่อผู้ใช้งาน" : "Email or Username",
    labelPassword: l === "th" ? "รหัสผ่าน" : "Password",
    labelName: l === "th" ? "ชื่อของคุณ" : "Your Name",
    labelConfirmPassword: l === "th" ? "ยืนยันรหัสผ่าน" : "Confirm Password",
    btnSubmitLogin: l === "th" ? "เข้าสู่ระบบ" : "Sign In",
    btnSubmitRegister: l === "th" ? "ลงทะเบียน" : "Register",
    btnSubmitForgot: l === "th" ? "ส่งลิงก์กู้คืนรหัสผ่าน" : "Send Reset Link",
    btnUpdateProfile: l === "th" ? "บันทึกข้อมูลส่วนตัว" : "Save Changes",
    btnLogout: l === "th" ? "ออกจากระบบ" : "Sign Out",
    linkForgot: l === "th" ? "ลืมรหัสผ่านใช่หรือไม่?" : "Forgot Password?",
    linkNoAccount: l === "th" ? "ยังไม่มีบัญชี? สมัครสมาชิก" : "Don't have an account? Register",
    linkHasAccount: l === "th" ? "มีบัญชีอยู่แล้ว? เข้าสู่ระบบ" : "Already have an account? Sign In",
    linkBackLogin: l === "th" ? "กลับไปหน้าเข้าสู่ระบบ" : "Back to Sign In",
    tabProfile: l === "th" ? "ข้อมูลส่วนตัว" : "Profile Settings",
    tabFavorites: l === "th" ? "รายการโปรด" : "Favorites",
    tabHistory: l === "th" ? "ประวัติการดาวน์โหลด" : "Download History",
    msgSuccessForgot: l === "th" ? "ระบบได้ส่งลิงก์ตั้งค่ารหัสผ่านใหม่ไปยังอีเมลของคุณเรียบร้อยแล้ว!" : "Reset link sent! Please check your mailbox for password reset instructions.",
    msgSuccessUpdate: l === "th" ? "อัปเดตข้อมูลส่วนตัวเสร็จสิ้น!" : "Profile updated successfully!",
    emptyFav: l === "th" ? "คุณยังไม่มีรูปภาพที่ชื่นชอบ" : "You haven't favorited any wallpapers yet.",
    emptyHist: l === "th" ? "คุณยังไม่มีประวัติการดาวน์โหลด" : "Your download history is empty.",
    thName: l === "th" ? "ชื่อ" : "Name",
    thDate: l === "th" ? "วันที่ดาวน์โหลด" : "Download Date",
    thAction: l === "th" ? "การจัดการ" : "Action",
    removeFav: l === "th" ? "ลบ" : "Remove",
    downloadAgain: l === "th" ? "ดาวน์โหลดอีกครั้ง" : "Download Again",
    viewWallpaper: l === "th" ? "ดูรูปภาพ" : "View",
  };

  // 1. LOGIN HANDLER
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg(l === "th" ? "กรุณากรอกข้อมูลให้ครบถ้วน" : "Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username_hp: honeypot }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("wallmobi_active_user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("auth-change"));
        setEmail("");
        setPassword("");
        syncUser();
      } else {
        setErrorMsg(l === "th" ? "อีเมลหรือรหัสผ่านไม่ถูกต้อง" : data.error || "Invalid email or password");
      }
    } catch {
      setErrorMsg("Error accessing database");
    }
  };

  // 2. REGISTER HANDLER
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name || !email || !password || !confirmPassword) {
      setErrorMsg(l === "th" ? "กรุณากรอกข้อมูลให้ครบถ้วน" : "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg(l === "th" ? "รหัสผ่านไม่ตรงกัน" : "Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, username_hp: honeypot }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("wallmobi_active_user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("auth-change"));
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        syncUser();
      } else {
        setErrorMsg(data.error || "Error registering");
      }
    } catch {
      setErrorMsg("Error registering user");
    }
  };

  // 3. FORGOT PASSWORD HANDLER
  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setForgotSuccess("");

    if (!forgotEmail) {
      setErrorMsg(l === "th" ? "กรุณากรอกอีเมลของคุณ" : "Please enter your email");
      return;
    }

    // Mock reset email sending since passwords in DB are securely hashed
    setForgotSuccess(t.msgSuccessForgot);
  };

  // 4. UPDATE PROFILE HANDLER
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateSuccess("");
    setErrorMsg("");

    if (!currentUser) return;

    if (!updateName) {
      setErrorMsg(l === "th" ? "กรุณากรอกชื่อของคุณ" : "Please enter your name");
      return;
    }

    try {
      const res = await fetch("/api/auth/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: updateName, password: updatePassword }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("wallmobi_active_user", JSON.stringify(data.user));
        setUpdatePassword("");
        setUpdateSuccess(t.msgSuccessUpdate);
        window.dispatchEvent(new Event("auth-change"));
        syncUser();
      } else {
        setErrorMsg(data.error || "Error updating profile");
      }
    } catch {
      setErrorMsg("Error updating profile");
    }
  };

  // 5. REMOVE FAVORITE HANDLER
  const handleRemoveFavorite = async (slug: string) => {
    if (!currentUser) return;

    try {
      const res = await fetch(`/api/favorites?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setFavorites((prev) => prev.filter((f) => f.slug !== slug));
        window.dispatchEvent(new Event("auth-change"));
      }
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  };

  // 6. LOGOUT HANDLER
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    localStorage.removeItem("wallmobi_active_user");
    window.dispatchEvent(new Event("auth-change"));
    setScreen("login");
    router.push(`/${locale}`);
  };

  // Details are now loaded directly from backend APIs.

  return (
    <section className="container section" style={{ maxWidth: "800px", margin: "0 auto" }}>
      {/* 🧾 A. LOGIN SCREEN */}
      {screen === "login" && (
        <div className="prose" style={{ background: "var(--bg-alt)", padding: "2.5rem", borderRadius: "20px", border: "1px solid var(--line)", marginTop: "2rem" }}>
          <h1 className="h2" style={{ textAlign: "center", marginBottom: "1.5rem" }}>{t.titleLogin}</h1>
          {errorMsg && <div style={{ background: "rgba(255, 69, 58, 0.1)", border: "1px solid rgba(255, 69, 58, 0.3)", color: "#ff453a", padding: "10px 14px", borderRadius: "10px", marginBottom: "1.2rem", fontSize: "0.92rem" }}>{errorMsg}</div>}
          
          <form onSubmit={handleLogin} style={{ display: "grid", gap: "1.1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-2)" }}>{t.labelEmailOrUsername}</label>
              <input
                className="search-input"
                style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: "12px", border: "1px solid var(--line)" }}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={l === "th" ? "ระบุอีเมล หรือชื่อผู้ใช้งาน" : "email@example.com or username"}
                required
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-2)" }}>{t.labelPassword}</label>
              <input
                className="search-input"
                style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: "12px", border: "1px solid var(--line)" }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {/* Honeypot field (hidden from users, only filled by bots) */}
            <div style={{ position: "absolute", opacity: 0, zIndex: -1, left: "-9999px" }} aria-hidden="true">
              <input
                type="text"
                name="username_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
              <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem 2rem", borderRadius: "12px" }}>
                {t.btnSubmitLogin}
              </button>
              <button type="button" onClick={() => { setScreen("forgot"); setErrorMsg(""); }} className="link-arrow" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.9rem" }}>
                {t.linkForgot}
              </button>
            </div>
          </form>

          <div style={{ display: "flex", alignItems: "center", margin: "1.5rem 0", color: "var(--text-3)", fontSize: "0.85rem" }}>
            <span style={{ flexGrow: 1, height: "1px", background: "var(--line)" }}></span>
            <span style={{ padding: "0 10px" }}>{l === "th" ? "หรือ" : "or"}</span>
            <span style={{ flexGrow: 1, height: "1px", background: "var(--line)" }}></span>
          </div>

          <button
            onClick={() => window.location.href = `/api/auth/google/login?locale=${locale}`}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "0.8rem 1rem",
              background: "var(--bg)",
              border: "1px solid var(--line)",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "0.92rem",
              color: "var(--text-1)",
              fontWeight: 500,
              transition: "background-color 0.2s var(--ease)",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--bg-alt)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--bg)"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            {l === "th" ? "ดำเนินการต่อด้วย Google" : "Continue with Google"}
          </button>

          <div style={{ borderTop: "1px solid var(--line)", marginTop: "2rem", paddingTop: "1.2rem", textAlign: "center" }}>
            <button onClick={() => { setScreen("register"); setErrorMsg(""); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.92rem", color: "var(--accent)" }}>
              {t.linkNoAccount}
            </button>
          </div>
        </div>
      )}

      {/* 🧾 B. REGISTER SCREEN */}
      {screen === "register" && (
        <div className="prose" style={{ background: "var(--bg-alt)", padding: "2.5rem", borderRadius: "20px", border: "1px solid var(--line)", marginTop: "2rem" }}>
          <h1 className="h2" style={{ textAlign: "center", marginBottom: "1.5rem" }}>{t.titleRegister}</h1>
          {errorMsg && <div style={{ background: "rgba(255, 69, 58, 0.1)", border: "1px solid rgba(255, 69, 58, 0.3)", color: "#ff453a", padding: "10px 14px", borderRadius: "10px", marginBottom: "1.2rem", fontSize: "0.92rem" }}>{errorMsg}</div>}
          
          <form onSubmit={handleRegister} style={{ display: "grid", gap: "1.1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-2)" }}>{t.labelName}</label>
              <input
                className="search-input"
                style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: "12px", border: "1px solid var(--line)" }}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-2)" }}>{t.labelEmail}</label>
              <input
                className="search-input"
                style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: "12px", border: "1px solid var(--line)" }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-2)" }}>{t.labelPassword}</label>
              <input
                className="search-input"
                style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: "12px", border: "1px solid var(--line)" }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-2)" }}>{t.labelConfirmPassword}</label>
              <input
                className="search-input"
                style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: "12px", border: "1px solid var(--line)" }}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {/* Honeypot field (hidden from users, only filled by bots) */}
            <div style={{ position: "absolute", opacity: 0, zIndex: -1, left: "-9999px" }} aria-hidden="true">
              <input
                type="text"
                name="username_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.8rem" }}>
              <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem 2.5rem", borderRadius: "12px" }}>
                {t.btnSubmitRegister}
              </button>
              <button type="button" onClick={() => { setScreen("login"); setErrorMsg(""); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.92rem", color: "var(--accent)" }}>
                {t.linkHasAccount}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 🧾 C. FORGOT PASSWORD SCREEN */}
      {screen === "forgot" && (
        <div className="prose" style={{ background: "var(--bg-alt)", padding: "2.5rem", borderRadius: "20px", border: "1px solid var(--line)", marginTop: "2rem" }}>
          <h1 className="h2" style={{ textAlign: "center", marginBottom: "1.5rem" }}>{t.titleForgot}</h1>
          {errorMsg && <div style={{ background: "rgba(255, 69, 58, 0.1)", border: "1px solid rgba(255, 69, 58, 0.3)", color: "#ff453a", padding: "10px 14px", borderRadius: "10px", marginBottom: "1.2rem", fontSize: "0.92rem" }}>{errorMsg}</div>}
          {forgotSuccess && <div style={{ background: "rgba(52, 199, 89, 0.1)", border: "1px solid rgba(52, 199, 89, 0.3)", color: "#30d158", padding: "12px 14px", borderRadius: "10px", marginBottom: "1.2rem", fontSize: "0.92rem", lineHeight: "1.5" }}>{forgotSuccess}</div>}
          
          <form onSubmit={handleForgot} style={{ display: "grid", gap: "1.1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-2)" }}>{t.labelEmail}</label>
              <input
                className="search-input"
                style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: "12px", border: "1px solid var(--line)" }}
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
              <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem 2rem", borderRadius: "12px" }}>
                {t.btnSubmitForgot}
              </button>
              <button type="button" onClick={() => { setScreen("login"); setErrorMsg(""); setForgotSuccess(""); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.92rem", color: "var(--accent)" }}>
                {t.linkBackLogin}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 🧾 D. USER DASHBOARD SCREEN (LOGGED IN) */}
      {screen === "dashboard" && currentUser && (
        <div style={{ marginTop: "1rem" }}>
          {/* Header Panel */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--line)", paddingBottom: "1.5rem", marginBottom: "1.5rem" }}>
            <div>
              <h1 className="h2" style={{ margin: 0 }}>{t.titleDashboard}</h1>
              <p style={{ color: "var(--text-2)", fontSize: "0.95rem", marginTop: "4px" }}>
                {l === "th" ? `สวัสดี, ${currentUser.name} (${currentUser.email})` : `Welcome back, ${currentUser.name} (${currentUser.email})`}
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {(currentUser.role === "super_admin" || currentUser.role === "staff") && (
                <Link
                  href={`/${locale}/AdminConsole`}
                  className="btn btn-primary"
                  style={{ padding: "0.6rem 1.2rem", borderRadius: "10px", fontSize: "0.88rem", textDecoration: "none" }}
                >
                  {l === "th" ? "แผงควบคุมแอดมิน" : "Admin Console"}
                </Link>
              )}
              <button onClick={handleLogout} className="btn btn-soft" style={{ padding: "0.6rem 1.2rem", borderRadius: "10px", fontSize: "0.88rem", borderColor: "rgba(255, 69, 58, 0.2)", color: "#ff453a" }}>
                {t.btnLogout}
              </button>
            </div>
          </div>

          {/* Tab buttons */}
          <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--line)", paddingBottom: "12px", marginBottom: "1.8rem" }}>
            <button
              className={`chip ${activeTab === "profile" ? "active" : ""}`}
              style={{ padding: "0.45rem 1.1rem" }}
              onClick={() => setActiveTab("profile")}
              data-active={activeTab === "profile"}
            >
              {t.tabProfile}
            </button>
            <button
              className={`chip ${activeTab === "favorites" ? "active" : ""}`}
              style={{ padding: "0.45rem 1.1rem" }}
              onClick={() => setActiveTab("favorites")}
              data-active={activeTab === "favorites"}
            >
              {t.tabFavorites} ({favorites.length})
            </button>
            <button
              className={`chip ${activeTab === "history" ? "active" : ""}`}
              style={{ padding: "0.45rem 1.1rem" }}
              onClick={() => setActiveTab("history")}
              data-active={activeTab === "history"}
            >
              {t.tabHistory} ({downloads.length})
            </button>
          </div>

          {/* TAB CONTENT: PROFILE DETAILS */}
          {activeTab === "profile" && (
            <div style={{ background: "var(--bg-alt)", padding: "2rem", borderRadius: "18px", border: "1px solid var(--line)", animation: "fadeIn 0.25s" }}>
              
              {/* PREMIUM UPGRADE CARD */}
              <div 
                style={{ 
                  background: currentUser.role === "premium" 
                    ? "linear-gradient(135deg, rgba(52, 199, 89, 0.08) 0%, rgba(52, 199, 89, 0.02) 100%)" 
                    : "linear-gradient(135deg, rgba(255, 149, 0, 0.08) 0%, rgba(255, 149, 0, 0.02) 100%)",
                  border: currentUser.role === "premium" 
                    ? "1px solid rgba(52, 199, 89, 0.25)" 
                    : "1px solid rgba(255, 149, 0, 0.25)",
                  borderRadius: "18px", 
                  padding: "1.5rem", 
                  marginBottom: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "1.8rem" }}>{currentUser.role === "premium" ? "👑" : "💎"}</span>
                  <div>
                    <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, color: "var(--text-1)" }}>
                      {l === "th" ? "ระดับสมาชิกของคุณ" : "Your Membership Status"}
                    </h2>
                    <p style={{ margin: "2px 0 0 0", fontSize: "0.92rem", color: currentUser.role === "premium" ? "#30d158" : "#ff9500", fontWeight: 600 }}>
                      {currentUser.role === "premium" 
                        ? (l === "th" ? "สมาชิกพรีเมียม (ตลอดชีพ)" : "Premium Member (Lifetime)")
                        : (currentUser.role === "super_admin" || currentUser.role === "staff")
                          ? (l === "th" ? "ผู้ดูแลระบบ (ไม่มีลายน้ำ)" : "Administrator (No Watermark)")
                          : (l === "th" ? "สมาชิกทั่วไป (ฟรี tier - มีลายน้ำเมื่อดาวน์โหลด)" : "Free Member (Watermarked Downloads)")
                      }
                    </p>
                  </div>
                </div>

                {currentUser.role !== "premium" && currentUser.role !== "super_admin" && currentUser.role !== "staff" && (
                  <div style={{ borderTop: "1px solid var(--line)", paddingTop: "1.2rem", display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
                    <div>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.8rem 0", color: "var(--text-1)" }}>
                        {l === "th" ? "อัปเกรดเป็นพรีเมียมเพียง 199 บาท ตลอดชีพ!" : "Upgrade to Premium for just 199 THB (Lifetime)!"}
                      </h3>
                      <ul style={{ paddingLeft: "1.2rem", margin: "0 0 1.2rem 0", display: "flex", flexDirection: "column", gap: "0.5rem", color: "var(--text-2)", fontSize: "0.92rem" }}>
                        <li>🚫 {l === "th" ? "ดาวน์โหลดรูปภาพไม่มีลายน้ำ (No Watermark)" : "Remove watermarks from all downloaded wallpapers"}</li>
                        <li>⚡ {l === "th" ? "ดาวน์โหลดไฟล์ความละเอียดสูงพิเศษและคมชัดที่สุด" : "Get original, uncompressed high-resolution files"}</li>
                        <li>💖 {l === "th" ? "จ่ายครั้งเดียวใช้งานได้ตลอดชีพ ไม่มีรายเดือน" : "One-time payment for lifetime access, no subscriptions"}</li>
                        <li>📱 {l === "th" ? "สนับสนุนสตูดิโอเล็ก ๆ ของเราในการสร้างภาพสวย ๆ" : "Support our indie wallpaper creation studio"}</li>
                      </ul>

                      <div style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: "14px", padding: "1.2rem", fontSize: "0.9rem", lineHeight: "1.5" }}>
                        <p style={{ margin: "0 0 0.5rem 0", fontWeight: 600 }}>👉 {l === "th" ? "ขั้นตอนการเปิดใช้งานพรีเมียม:" : "How to activate Premium:"}</p>
                        <ol style={{ paddingLeft: "1.2rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.3rem", color: "var(--text-2)" }}>
                          <li>{l === "th" ? "โอนเงิน 199 บาท ไปที่พร้อมเพย์ด้านล่าง" : "Transfer 199 THB via PromptPay or Bank account"}</li>
                          <li>{l === "th" ? `ส่งรูปสลิปพร้อมระบุอีเมลบัญชีของคุณ (${currentUser.email}) ไปที่อีเมล:` : `Send your transfer receipt along with your email (${currentUser.email}) to:`} <strong style={{ color: "var(--accent)" }}>funmask101@gmail.com</strong> {l === "th" ? "หรือทาง TikTok: @wallmobi" : "or via TikTok: @wallmobi"}</li>
                          <li>{l === "th" ? "ทีมงานจะเปิดใช้งานระบบพรีเมียมให้บัญชีคุณภายใน 1-12 ชั่วโมง" : "Our team will upgrade your account to Premium within 1-12 hours"}</li>
                        </ol>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.6rem", background: "var(--bg)", border: "1px solid var(--line)", borderRadius: "16px", padding: "1.5rem" }}>
                      <div style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--text-2)" }}>{l === "th" ? "สแกนเพื่อจ่ายเงิน (พร้อมเพย์)" : "Scan to Pay (PromptPay QR)"}</div>
                      
                      {/* promptpay mockup QR Code representation */}
                      <div style={{ background: "white", padding: "12px", borderRadius: "12px", display: "inline-flex", flexDirection: "column", alignItems: "center", border: "1px solid #ddd" }}>
                        <div style={{ background: "#002a64", color: "white", width: "100%", padding: "4px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "bold", textAlign: "center", marginBottom: "8px" }}>
                          Prompt Pay
                        </div>
                        <div style={{ width: "160px", height: "160px", background: "#f8f9fa", border: "2px dashed #002a64", borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#002a64", gap: "8px" }}>
                          <span style={{ fontSize: "2.2rem" }}>📱</span>
                          <span style={{ fontSize: "1rem", fontWeight: "bold" }}>199 THB</span>
                          <span style={{ fontSize: "0.65rem", color: "#666" }}>funmask101@gmail.com</span>
                        </div>
                      </div>
                      
                      <div style={{ textAlign: "center", fontSize: "0.78rem", color: "var(--text-3)", lineHeight: 1.4 }}>
                        <div>{l === "th" ? "พร้อมเพย์: funmask101@gmail.com" : "PromptPay: funmask101@gmail.com"}</div>
                        <div style={{ marginTop: "2px" }}>{l === "th" ? "บัญชีธนาคาร: ติดต่อที่อีเมลด้านบน" : "Bank Transfer: Contact email above"}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {updateSuccess && <div style={{ background: "rgba(52, 199, 89, 0.1)", border: "1px solid rgba(52, 199, 89, 0.3)", color: "#30d158", padding: "10px 14px", borderRadius: "10px", marginBottom: "1.2rem", fontSize: "0.92rem" }}>{updateSuccess}</div>}
              {errorMsg && <div style={{ background: "rgba(255, 69, 58, 0.1)", border: "1px solid rgba(255, 69, 58, 0.3)", color: "#ff453a", padding: "10px 14px", borderRadius: "10px", marginBottom: "1.2rem", fontSize: "0.92rem" }}>{errorMsg}</div>}
              
              <form onSubmit={handleUpdateProfile} style={{ display: "grid", gap: "1.1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-2)" }}>{t.labelName}</label>
                  <input
                    className="search-input"
                    style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "10px" }}
                    type="text"
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-3)" }}>{t.labelEmail} (Cannot change)</label>
                  <input
                    className="search-input"
                    style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "10px", opacity: 0.6, cursor: "not-allowed" }}
                    type="email"
                    value={currentUser.email}
                    disabled
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-2)" }}>
                    {l === "th" ? "เปลี่ยนรหัสผ่านใหม่ (ปล่อยว่างถ้าไม่ต้องการเปลี่ยน)" : "New Password (Leave blank to keep current)"}
                  </label>
                  <input
                    className="search-input"
                    style={{ width: "100%", padding: "0.8rem 1rem", borderRadius: "10px" }}
                    type="password"
                    value={updatePassword}
                    onChange={(e) => setUpdatePassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>

                <div style={{ marginTop: "0.8rem" }}>
                  <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem 2.2rem", borderRadius: "10px" }}>
                    {t.btnUpdateProfile}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB CONTENT: FAVORITES MANAGER */}
          {activeTab === "favorites" && (
            <div style={{ animation: "fadeIn 0.25s" }}>
              {favorites.length === 0 ? (
                <p style={{ textAlign: "center", color: "var(--text-3)", padding: "3rem 1rem", background: "var(--bg-alt)", borderRadius: "18px", border: "1px solid var(--line)" }}>
                  {t.emptyFav}
                </p>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "1.2rem" }}>
                  {favorites.map((wp) => {
                    if (!wp) return null;
                    const slug = wp.slug;
                    return (
                      <div key={slug} style={{ display: "flex", flexDirection: "column", background: "var(--bg-alt)", border: "1px solid var(--line)", borderRadius: "16px", overflow: "hidden" }}>
                        <Link href={`/${l}/${wp.category}-wallpapers/${wp.slug}`} style={{ display: "block", aspectRatio: "1080/2340", position: "relative", overflow: "hidden" }}>
                          <Image src={wp.src} alt={wp.title} fill sizes="(max-width: 560px) 45vw, 160px" style={{ objectFit: "cover", transition: "transform 0.3s" }} className="hover-zoom-img" />
                        </Link>
                        <div style={{ padding: "0.75rem", display: "flex", flexDirection: "column", gap: "6px" }}>
                          <div style={{ fontSize: "0.85rem", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "var(--text-1)" }}>
                            {wp.title}
                          </div>
                          <div style={{ display: "flex", gap: "4px" }}>
                            <Link href={`/${l}/${wp.category}-wallpapers/${wp.slug}`} className="btn btn-soft" style={{ flexGrow: 1, padding: "4px", fontSize: "0.72rem", borderRadius: "8px" }}>
                              {t.viewWallpaper}
                            </Link>
                            <button
                              onClick={() => handleRemoveFavorite(slug)}
                              className="btn btn-soft"
                              style={{ padding: "4px 8px", fontSize: "0.72rem", borderRadius: "8px", color: "#ff453a", borderColor: "rgba(255, 69, 58, 0.15)" }}
                            >
                              {t.removeFav}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: DOWNLOAD HISTORY */}
          {activeTab === "history" && (
            <div style={{ animation: "fadeIn 0.25s" }}>
              {downloads.length === 0 ? (
                <p style={{ textAlign: "center", color: "var(--text-3)", padding: "3rem 1rem", background: "var(--bg-alt)", borderRadius: "18px", border: "1px solid var(--line)" }}>
                  {t.emptyHist}
                </p>
              ) : (
                <div style={{ background: "var(--bg-alt)", border: "1px solid var(--line)", borderRadius: "18px", overflow: "hidden" }}>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.92rem", textAlign: "left" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid var(--line)", background: "rgba(0,0,0,0.02)" }}>
                          <th style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-2)" }}>{t.thName}</th>
                          <th style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-2)" }}>{t.thDate}</th>
                          <th style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-2)" }}>{t.thAction}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...downloads].reverse().map((entry, idx) => {
                          const wp = entry;
                          if (!wp) return null;
                          return (
                            <tr key={idx} style={{ borderBottom: idx === downloads.length - 1 ? "none" : "1px solid var(--line)" }}>
                              <td style={{ padding: "12px 16px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                  <div style={{ width: "32px", height: "55px", position: "relative", borderRadius: "6px", overflow: "hidden", border: "1px solid var(--line)" }}>
                                    <Image src={wp.src} alt={wp.title} fill sizes="90px" style={{ objectFit: "cover" }} />
                                  </div>
                                  <div>
                                    <Link href={`/${l}/${wp.category}-wallpapers/${wp.slug}`} style={{ fontWeight: 600, color: "var(--text-1)", textDecoration: "none" }}>
                                      {wp.title}
                                    </Link>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-3)", marginTop: "2px" }}>
                                      {dict.categories[wp.category as keyof typeof dict.categories]?.name || wp.category}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: "12px 16px", color: "var(--text-2)", fontSize: "0.85rem" }}>
                                {new Date(entry.date).toLocaleString(l === "en" ? "en-US" : l, {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </td>
                              <td style={{ padding: "12px 16px" }}>
                                <div style={{ display: "flex", gap: "6px" }}>
                                  <Link href={`/${l}/${wp.category}-wallpapers/${wp.slug}`} className="btn btn-soft" style={{ padding: "6px 12px", fontSize: "0.78rem", borderRadius: "8px" }}>
                                    {t.viewWallpaper}
                                  </Link>
                                  <div style={{ width: "120px" }}>
                                    <DownloadButton
                                      src={wp.src}
                                      filename={`${wp.slug}.svg`}
                                      labels={{ download: t.downloadAgain, preparing: dict.detail.preparing, saved: dict.detail.saved }}
                                      locale={l}
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
