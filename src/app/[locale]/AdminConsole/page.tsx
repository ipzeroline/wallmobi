"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { categorySlugs } from "@/lib/site";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";

type Tab = "overview" | "wallpapers" | "users";
const WALLPAPERS_PER_PAGE = 20;

export default function AdminDashboard() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";

  const activeLocale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(activeLocale);

  const getCategoryName = (slug: string) => {
    const key = slug as keyof typeof dict.categories;
    return dict.categories[key]?.name || slug;
  };

  // Auth & UI States
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Data States
  const [stats, setStats] = useState<any>({ totalWallpapers: 0, totalUsers: 0, totalDownloads: 0, totalFavorites: 0 });
  const [topDownloaded, setTopDownloaded] = useState<any[]>([]);
  const [wallpapersList, setWallpapersList] = useState<any[]>([]);
  const [wallpapersTotal, setWallpapersTotal] = useState(0);
  const [usersList, setUsersList] = useState<any[]>([]);

  // Search and Pagination States
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [wpSearchQuery, setWpSearchQuery] = useState("");
  const [debouncedWpSearchQuery, setDebouncedWpSearchQuery] = useState("");
  const [wpCategoryFilter, setWpCategoryFilter] = useState("all");
  const [previewWp, setPreviewWp] = useState<any | null>(null);
  const [wpCurrentPage, setWpCurrentPage] = useState(1);
  const [userCurrentPage, setUserCurrentPage] = useState(1);

  // Form States - Upload Wallpaper
  const [manualFile, setManualFile] = useState<File | null>(null);
  const [manualFileUrl, setManualFileUrl] = useState("");
  const [manualCategory, setManualCategory] = useState("anime");
  const [manualWidth, setManualWidth] = useState(1080);
  const [manualHeight, setManualHeight] = useState(2340);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  // Form States - Add Staff
  const [staffName, setStaffName] = useState("");
  const [staffEmail, setStaffEmail] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [staffRole, setStaffRole] = useState("staff");

  const syncSession = async () => {
    try {
      const res = await fetch("/api/auth/session");
      if (res.ok) {
        const data = await res.json();
        if (data.user && (data.user.role === "super_admin" || data.user.role === "staff")) {
          setCurrentUser(data.user);
          loadStats();
          loadWallpapers();
          if (data.user.role === "super_admin") {
            loadUsers();
          }
        } else {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    } catch {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    syncSession();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedWpSearchQuery(wpSearchQuery.trim());
    }, 300);
    return () => window.clearTimeout(timer);
  }, [wpSearchQuery]);

  useEffect(() => {
    if (currentUser && activeTab === "wallpapers") {
      loadWallpapersPage(wpCurrentPage);
    }
  }, [activeTab, activeLocale, currentUser, wpCategoryFilter, wpCurrentPage, debouncedWpSearchQuery]);

  const loadStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setTopDownloaded(data.topDownloaded || []);
      }
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  };

  const loadWallpapersPage = async (
    page = wpCurrentPage,
    category = wpCategoryFilter,
    query = debouncedWpSearchQuery
  ) => {
    try {
      const params = new URLSearchParams({
        locale: activeLocale,
        page: String(page),
        limit: String(WALLPAPERS_PER_PAGE),
        category,
        q: query,
      });
      const res = await fetch(`/api/admin/wallpapers?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setWallpapersList(data.wallpapers || []);
        setWallpapersTotal(data.pagination?.total || 0);
      }
    } catch (err) {
      console.error("Failed to load wallpapers:", err);
    }
  };

  const loadWallpapers = () => loadWallpapersPage(wpCurrentPage);

  const loadUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsersList(data.users || []);
      }
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  };

  // Actions
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setManualFile(file);
    setUploading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setManualFileUrl(data.url);
        setManualWidth(data.width || 1080);
        setManualHeight(data.height || 2340);
        setSuccessMsg(locale === "th" ? "อัปโหลดรูปภาพสำเร็จ กดปุ่มวิเคราะห์ด้วย AI เพื่อสร้างข้อมูล SEO และบันทึก" : "Image uploaded. Click Analyze with AI to generate SEO data and save.");
      } else {
        setErrorMsg(data.error || (locale === "th" ? "อัปโหลดรูปภาพล้มเหลว" : "Failed to upload image."));
        setManualFile(null);
      }
    } catch {
      setErrorMsg(locale === "th" ? "เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ" : "Error uploading image.");
      setManualFile(null);
    } finally {
      setUploading(false);
    }
  };

  const triggerAiAnalysis = async (imageUrl: string, uploadedWidth = manualWidth, uploadedHeight = manualHeight) => {
    if (!imageUrl) {
      setErrorMsg(locale === "th" ? "กรุณาเลือกรูปภาพก่อนวิเคราะห์ด้วย AI" : "Please choose an image before analyzing with AI.");
      return;
    }

    setErrorMsg("");
    setSuccessMsg("");
    setAnalyzing(true);
    try {
      const res = await fetch("/api/admin/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ src: imageUrl, category_slug: manualCategory }),
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        const { category_slug, title, slug, color, descriptions, tags, width, height } = resData.data;

        const selectedCategory = manualCategory || category_slug || "aesthetic";
        const finalTitle = title || `${selectedCategory} Mobile Wallpaper`;
        const finalSlug = slug || `${selectedCategory}-wallpaper-${Date.now().toString(36)}`;
        const finalDescriptions = descriptions || {};
        const finalTags = Array.isArray(tags) ? tags : [selectedCategory, "wallpaper", "mobile wallpaper", "lock screen"];
        const finalWidth = width || uploadedWidth || 1080;
        const finalHeight = height || uploadedHeight || 2340;

        const saveRes = await fetch("/api/admin/wallpapers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: finalSlug,
            category_slug: selectedCategory,
            color: color || "#ff9500",
            src: imageUrl,
            width: finalWidth,
            height: finalHeight,
            title: finalTitle,
            descriptions: {
              ...finalDescriptions,
              en: finalDescriptions.en || `Free high-resolution ${finalTitle} mobile wallpaper for home screen and lock screen.`,
              th: finalDescriptions.th || `วอลเปเปอร์มือถือ ${finalTitle} ฟรี ความละเอียดสูง เหมาะสำหรับหน้าจอโฮมและหน้าจอล็อก`,
            },
            tags: finalTags,
          }),
        });

        const saveData = await saveRes.json();
        if (saveRes.ok) {
          setSuccessMsg(
            locale === "th"
              ? `อัปโหลด วิเคราะห์ SEO และบันทึก "${finalTitle}" เรียบร้อยแล้ว`
              : `Uploaded, analyzed SEO, and saved "${finalTitle}".`
          );
          setManualFile(null);
          setManualFileUrl("");
          setManualWidth(1080);
          setManualHeight(2340);
          setWpSearchQuery("");
          setDebouncedWpSearchQuery("");
          setWpCategoryFilter(selectedCategory);
          setWpCurrentPage(1);
          loadWallpapersPage(1, selectedCategory, "");
          loadStats();
        } else {
          setErrorMsg(saveData.error || (locale === "th" ? "บันทึกวอลเปเปอร์ไม่สำเร็จ" : "Failed to save wallpaper."));
        }
      } else {
        setErrorMsg(resData.error || "Failed to analyze image with AI.");
      }
    } catch {
      setErrorMsg("Error during AI analysis.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDeleteWallpaper = async (id: number) => {
    if (!confirm("Are you sure you want to delete this wallpaper?")) return;
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch(`/api/admin/wallpapers?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSuccessMsg("Wallpaper deleted successfully.");
        loadWallpapers();
        loadStats();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to delete.");
      }
    } catch {
      setErrorMsg("Error deleting wallpaper.");
    }
  };

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!staffName || !staffEmail || !staffPassword || !staffRole) {
      setErrorMsg("Please fill in all staff fields.");
      return;
    }

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: staffName,
          email: staffEmail,
          password: staffPassword,
          role: staffRole,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(`Account for "${staffName}" created successfully!`);
        setStaffName("");
        setStaffEmail("");
        setStaffPassword("");
        loadUsers();
      } else {
        setErrorMsg(data.error || "Failed to create staff account.");
      }
    } catch {
      setErrorMsg("Error creating staff account.");
    }
  };

  const handleUpdateRole = async (userId: number, role: string) => {
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role }),
      });

      if (res.ok) {
        setSuccessMsg("User role updated successfully.");
        loadUsers();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to update role.");
      }
    } catch {
      setErrorMsg("Error updating user role.");
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Are you sure you want to delete this user? All their history and favorites will be permanently deleted.")) return;
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch(`/api/admin/users?userId=${userId}`, { method: "DELETE" });
      if (res.ok) {
        setSuccessMsg("User deleted successfully.");
        loadUsers();
        loadStats();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to delete user.");
      }
    } catch {
      setErrorMsg("Error deleting user.");
    }
  };

  // Wallpapers search, filter & pagination
  const totalWpPages = Math.max(1, Math.ceil(wallpapersTotal / WALLPAPERS_PER_PAGE));
  const visibleWallpapers = wallpapersList;
  const wpStartItem = wallpapersTotal === 0 ? 0 : (wpCurrentPage - 1) * WALLPAPERS_PER_PAGE + 1;
  const wpEndItem = Math.min(wpCurrentPage * WALLPAPERS_PER_PAGE, wallpapersTotal);

  // Users search & pagination (50 items per page)
  const filteredUsers = usersList.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearchQuery.toLowerCase())
  );
  const totalUserPages = Math.ceil(filteredUsers.length / 50);
  const visibleUsers = filteredUsers.slice((userCurrentPage - 1) * 50, userCurrentPage * 50);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "5rem 1rem", color: "var(--text-3)" }}>
        Loading admin dashboard...
      </div>
    );
  }

  if (!currentUser) {
    return (
      <section className="container section admin-denied" style={{ maxWidth: "500px", margin: "3rem auto", textAlign: "center" }}>
        <div className="admin-denied-card" style={{ background: "var(--bg-alt)", padding: "3rem 2rem", borderRadius: "20px", border: "1px solid var(--line)" }}>
          <h1 style={{ color: "#ff453a", marginBottom: "1rem" }}>Access Denied</h1>
          <p style={{ color: "var(--text-2)", marginBottom: "2rem" }}>
            You do not have permissions to access the Admin Panel. Please sign in with an Admin account.
          </p>
          <Link href={`/${locale}/member`} className="btn btn-primary" style={{ padding: "0.8rem 2rem" }}>
            Go to Login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container section admin-console" style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header Panel */}
      <div className="admin-console-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--line)", paddingBottom: "1.5rem", marginBottom: "1.5rem" }}>
        <div>
          <h1 className="h2" style={{ margin: 0 }}>⚙️ Admin</h1>
          <p style={{ color: "var(--text-2)", fontSize: "0.95rem", marginTop: "4px" }}>
            <strong>{currentUser.name}</strong> · {currentUser.role === "super_admin" ? "Super Admin" : "Staff"}
          </p>
        </div>
        <Link href={`/${locale}/member`} className="btn btn-soft" style={{ padding: "0.6rem 1.2rem", borderRadius: "10px" }}>
          Member
        </Link>
      </div>

      {/* Alerts */}
      {errorMsg && <div style={{ background: "rgba(255, 69, 58, 0.1)", border: "1px solid rgba(255, 69, 58, 0.3)", color: "#ff453a", padding: "12px 16px", borderRadius: "10px", marginBottom: "1.2rem", fontSize: "0.92rem" }}>{errorMsg}</div>}
      {successMsg && <div style={{ background: "rgba(52, 199, 89, 0.1)", border: "1px solid rgba(52, 199, 89, 0.3)", color: "#30d158", padding: "12px 16px", borderRadius: "10px", marginBottom: "1.2rem", fontSize: "0.92rem" }}>{successMsg}</div>}

      {/* Tabs */}
      <div className="admin-tabs" style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--line)", paddingBottom: "12px", marginBottom: "1.8rem" }}>
        <button
          className={`chip ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => { setActiveTab("overview"); setErrorMsg(""); setSuccessMsg(""); }}
          data-active={activeTab === "overview"}
        >
          Overview Statistics
        </button>
        <button
          className={`chip ${activeTab === "wallpapers" ? "active" : ""}`}
          onClick={() => { setActiveTab("wallpapers"); setErrorMsg(""); setSuccessMsg(""); }}
          data-active={activeTab === "wallpapers"}
        >
          Wallpapers ({wallpapersList.length})
        </button>
        {currentUser.role === "super_admin" && (
          <button
            className={`chip ${activeTab === "users" ? "active" : ""}`}
            onClick={() => { setActiveTab("users"); setErrorMsg(""); setSuccessMsg(""); }}
            data-active={activeTab === "users"}
          >
            User & Staff Management ({usersList.length})
          </button>
        )}
      </div>

      {/* 📊 A. TAB: OVERVIEW */}
      {activeTab === "overview" && (
        <div style={{ display: "grid", gap: "2rem" }}>
          {/* Metrics Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            <div style={{ background: "linear-gradient(135deg, rgba(88, 86, 214, 0.15), rgba(88, 86, 214, 0.05))", border: "1px solid rgba(88, 86, 214, 0.2)", padding: "1.8rem", borderRadius: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--accent)" }}>{stats.totalWallpapers}</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-2)", fontWeight: 600, marginTop: "4px" }}>Total Wallpapers</div>
            </div>
            <div style={{ background: "linear-gradient(135deg, rgba(255, 149, 0, 0.15), rgba(255, 149, 0, 0.05))", border: "1px solid rgba(255, 149, 0, 0.2)", padding: "1.8rem", borderRadius: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#ff9500" }}>{stats.totalUsers}</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-2)", fontWeight: 600, marginTop: "4px" }}>Registered Members</div>
            </div>
            <div style={{ background: "linear-gradient(135deg, rgba(52, 199, 89, 0.15), rgba(52, 199, 89, 0.05))", border: "1px solid rgba(52, 199, 89, 0.2)", padding: "1.8rem", borderRadius: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#34c759" }}>{stats.totalDownloads}</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-2)", fontWeight: 600, marginTop: "4px" }}>Total Downloads</div>
            </div>
            <div style={{ background: "linear-gradient(135deg, rgba(255, 45, 85, 0.15), rgba(255, 45, 85, 0.05))", border: "1px solid rgba(255, 45, 85, 0.2)", padding: "1.8rem", borderRadius: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#ff2d55" }}>{stats.totalFavorites}</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-2)", fontWeight: 600, marginTop: "4px" }}>User Favorites</div>
            </div>
          </div>

          {/* Top Wallpapers list */}
          <div style={{ background: "var(--bg-alt)", border: "1px solid var(--line)", padding: "1.8rem", borderRadius: "20px" }}>
            <h3 style={{ margin: "0 0 1.2rem 0", fontSize: "1.1rem" }}>🔥 Top 5 Downloaded Wallpapers</h3>
            {topDownloaded.length === 0 ? (
              <p style={{ color: "var(--text-3)", fontSize: "0.9rem" }}>No download logs recorded yet.</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "1rem" }}>
                {topDownloaded.map((wp, idx) => (
                  <div key={idx} style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: "12px", overflow: "hidden", textAlign: "center", paddingBottom: "10px" }}>
                    <div style={{ aspectRatio: "1080/2340", position: "relative", width: "100%" }}>
                      <Image src={wp.src} alt={wp.slug} fill sizes="160px" style={{ objectFit: "cover" }} />
                    </div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, marginTop: "8px", color: "var(--text-1)", padding: "0 8px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {wp.slug}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-3)", marginTop: "2px" }}>
                      📥 {wp.downloads_count} downloads
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🖼️ B. TAB: WALLPAPERS */}
      {activeTab === "wallpapers" && (
        <div className="admin-two-col" style={{ display: "grid", gap: "2rem", alignItems: "start" }}>
          {/* Wallpapers List */}
          <div style={{ background: "var(--bg-alt)", border: "1px solid var(--line)", borderRadius: "20px", overflow: "hidden" }}>
            {/* Filter Bar */}
            <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid var(--line)", display: "flex", gap: "12px", alignItems: "center", background: "rgba(0,0,0,0.01)", flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", flex: 1, minWidth: "200px" }}>
                <span style={{ fontSize: "1.1rem" }}>🔍</span>
                <input
                  className="search-input"
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "10px", fontSize: "0.88rem", border: "1px solid var(--line)" }}
                  type="text"
                  value={wpSearchQuery}
                  onChange={(e) => {
                    setWpSearchQuery(e.target.value);
                    setWpCurrentPage(1);
                  }}
                  placeholder={locale === "th" ? "ค้นหาชื่อรูป หรือ slug..." : "Search wallpaper by title or slug..."}
                />
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-2)" }}>{locale === "th" ? "หมวดหมู่:" : "Category:"}</label>
                <select
                  value={wpCategoryFilter}
                  onChange={(e) => {
                    setWpCategoryFilter(e.target.value);
                    setWpCurrentPage(1);
                  }}
                  style={{ padding: "8px 12px", fontSize: "0.85rem", borderRadius: "10px", background: "var(--bg)", border: "1px solid var(--line)" }}
                >
                  <option value="all">{locale === "th" ? "ทั้งหมด" : "All Categories"}</option>
                  {categorySlugs.map((slug) => (
                    <option key={slug} value={slug}>
                      {getCategoryName(slug)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid var(--line)" }}>
                    <th style={{ padding: "12px 16px" }}>Preview</th>
                    <th style={{ padding: "12px 16px" }}>Title / Slug</th>
                    <th style={{ padding: "12px 16px" }}>Category</th>
                    <th style={{ padding: "12px 16px" }}>Downloads</th>
                    <th style={{ padding: "12px 16px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleWallpapers.map((wp) => (
                    <tr key={wp.id} style={{ borderBottom: "1px solid var(--line)" }}>
                      <td style={{ padding: "12px 16px" }}>
                        <div 
                          onClick={() => setPreviewWp(wp)}
                          style={{ width: "40px", height: "70px", position: "relative", borderRadius: "6px", overflow: "hidden", border: "1px solid var(--line)", cursor: "pointer" }}
                          title={locale === "th" ? "คลิกเพื่อดูตัวอย่าง" : "Click to preview"}
                        >
                          <Image src={wp.src} alt={wp.slug} fill sizes="40px" style={{ objectFit: "cover" }} />
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ fontWeight: 600, color: "var(--text-1)" }}>{wp.title || "Untitled"}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>{wp.slug}</div>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span className="chip" style={{ fontSize: "0.75rem", padding: "2px 8px" }}>{wp.category_slug}</span>
                      </td>
                      <td style={{ padding: "12px 16px", fontWeight: 500 }}>{wp.downloads_count}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            onClick={() => handleDeleteWallpaper(wp.id)}
                            style={{ padding: "5px 10px", fontSize: "0.78rem", border: "1px solid rgba(255, 69, 58, 0.2)", borderRadius: "8px", background: "none", color: "#ff453a", cursor: "pointer" }}
                          >
                            {locale === "th" ? "ลบ" : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Wallpapers Pagination Controls */}
            {totalWpPages > 1 && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.5rem", borderTop: "1px solid var(--line)" }}>
                <button
                  className="btn btn-soft"
                  style={{ padding: "6px 12px", fontSize: "0.82rem", borderRadius: "8px" }}
                  disabled={wpCurrentPage === 1}
                  onClick={() => setWpCurrentPage((p) => Math.max(1, p - 1))}
                >
                  ◀ Previous
                </button>
                <span style={{ fontSize: "0.85rem", color: "var(--text-3)", fontWeight: 500 }}>
                  {locale === "th"
                    ? `หน้า ${wpCurrentPage} จาก ${totalWpPages} • แสดง ${wpStartItem}-${wpEndItem} จาก ${wallpapersTotal} รูป`
                    : `Page ${wpCurrentPage} of ${totalWpPages} • Showing ${wpStartItem}-${wpEndItem} of ${wallpapersTotal} wallpapers`}
                </span>
                <button
                  className="btn btn-soft"
                  style={{ padding: "6px 12px", fontSize: "0.82rem", borderRadius: "8px" }}
                  disabled={wpCurrentPage === totalWpPages}
                  onClick={() => setWpCurrentPage((p) => Math.min(totalWpPages, p + 1))}
                >
                  Next ▶
                </button>
              </div>
            )}
          </div>

          {/* Upload Wallpaper Form */}
          <div style={{ background: "var(--bg-alt)", border: "1px solid var(--line)", padding: "1.5rem", borderRadius: "20px" }}>
            <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.05rem" }}>{locale === "th" ? "อัปโหลดวอลเปเปอร์" : "Upload Wallpaper"}</h3>
            <div style={{ display: "grid", gap: "1rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-2)" }}>{locale === "th" ? "หมวดหมู่" : "Category"}</label>
                <select
                  className="search-input"
                  style={{ width: "100%", padding: "8px 10px", fontSize: "0.85rem", background: "var(--bg)", border: "1px solid var(--line)", borderRadius: "10px" }}
                  value={manualCategory}
                  onChange={(e) => setManualCategory(e.target.value)}
                  disabled={uploading || analyzing}
                >
                  {categorySlugs.map((slug) => (
                    <option key={slug} value={slug}>
                      {getCategoryName(slug)} ({slug})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-2)" }}>{locale === "th" ? "แนบรูปภาพ" : "Attach Image"}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading || analyzing}
                  style={{ fontSize: "0.82rem" }}
                />
                {uploading && <div style={{ fontSize: "0.78rem", color: "var(--text-3)", marginTop: "4px" }}>{locale === "th" ? "กำลังอัปโหลดรูปภาพ..." : "Uploading image..."}</div>}
                {manualFile && !uploading && (
                  <div style={{ fontSize: "0.76rem", color: "var(--text-3)", marginTop: "4px", wordBreak: "break-word" }}>
                    {manualFile.name}
                  </div>
                )}
                {analyzing && <div style={{ fontSize: "0.78rem", color: "var(--accent)", marginTop: "4px", fontWeight: "600" }}>{locale === "th" ? "AI กำลังวิเคราะห์ SEO และบันทึก..." : "AI is analyzing SEO and saving..."}</div>}
              </div>

              {manualFileUrl && (
                <div style={{ display: "grid", gap: "6px" }}>
                  <div style={{ position: "relative", width: "100%", aspectRatio: "1080/2340", maxHeight: "180px", borderRadius: "10px", overflow: "hidden", border: "1px solid var(--line)" }}>
                    <Image src={manualFileUrl} alt="Uploaded preview" fill sizes="320px" style={{ objectFit: "cover" }} unoptimized />
                  </div>
                  <div style={{ fontSize: "0.76rem", color: "var(--text-3)" }}>
                    {locale === "th" ? "ขนาดไฟล์ภาพ:" : "Image size:"} {manualWidth} x {manualHeight}px
                  </div>
                </div>
              )}

              <button
                className="btn"
                type="button"
                onClick={() => triggerAiAnalysis(manualFileUrl)}
                disabled={!manualFileUrl || uploading || analyzing}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "13px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.22)",
                  background: !manualFileUrl || uploading || analyzing
                    ? "linear-gradient(135deg, #8e8e93, #636366)"
                    : "linear-gradient(135deg, #007aff 0%, #5856d6 55%, #af52de 100%)",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "0.92rem",
                  boxShadow: !manualFileUrl || uploading || analyzing
                    ? "none"
                    : "0 12px 26px rgba(0, 122, 255, 0.32)",
                  opacity: !manualFileUrl || uploading || analyzing ? 0.68 : 1,
                  cursor: !manualFileUrl || uploading || analyzing ? "not-allowed" : "pointer",
                }}
              >
                {analyzing
                  ? (locale === "th" ? "กำลังวิเคราะห์..." : "Analyzing...")
                  : (locale === "th" ? "วิเคราะห์ด้วย AI" : "Analyze with AI")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 👥 C. TAB: USER & STAFF MANAGEMENT (SUPER ADMIN ONLY) */}
      {activeTab === "users" && currentUser.role === "super_admin" && (
        <div className="admin-two-col" style={{ display: "grid", gap: "2rem", alignItems: "start" }}>
          {/* Users List */}
          <div style={{ background: "var(--bg-alt)", border: "1px solid var(--line)", borderRadius: "20px", overflow: "hidden" }}>
            {/* Search Input */}
            <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid var(--line)", display: "flex", gap: "10px", alignItems: "center", background: "rgba(0,0,0,0.01)" }}>
              <span style={{ fontSize: "1.1rem" }}>🔍</span>
              <input
                className="search-input"
                style={{ width: "100%", padding: "8px 12px", borderRadius: "10px", fontSize: "0.88rem", border: "1px solid var(--line)" }}
                type="text"
                value={userSearchQuery}
                onChange={(e) => {
                  setUserSearchQuery(e.target.value);
                  setUserCurrentPage(1);
                }}
                placeholder={locale === "th" ? "ค้นหาชื่อ หรืออีเมลสมาชิก..." : "Search user by name or email..."}
              />
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "rgba(0,0,0,0.02)", borderBottom: "1px solid var(--line)" }}>
                    <th style={{ padding: "12px 16px" }}>User Info</th>
                    <th style={{ padding: "12px 16px" }}>Role</th>
                    <th style={{ padding: "12px 16px" }}>Joined</th>
                    <th style={{ padding: "12px 16px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleUsers.map((u) => (
                    <tr key={u.id} style={{ borderBottom: "1px solid var(--line)" }}>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ fontWeight: 600, color: "var(--text-1)" }}>{u.name}</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--text-3)" }}>{u.email}</div>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          className="chip"
                          style={{
                            fontSize: "0.75rem",
                            padding: "2px 8px",
                            background: u.role === "super_admin" ? "rgba(255, 45, 85, 0.15)" : u.role === "staff" ? "rgba(88, 86, 214, 0.15)" : u.role === "premium" ? "rgba(255, 149, 0, 0.15)" : "",
                            color: u.role === "super_admin" ? "#ff2d55" : u.role === "staff" ? "#5856d6" : u.role === "premium" ? "#ff9500" : "",
                          }}
                        >
                          {u.role === "premium" ? (locale === "th" ? "Premium Member" : "Premium Member") : u.role}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: "0.8rem", color: "var(--text-2)" }}>
                        {new Date(u.created_at).toLocaleDateString(locale)}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", gap: "6px" }}>
                          {u.id !== currentUser.id && (
                            <>
                              <select
                                value={u.role}
                                onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                                style={{ padding: "4px 8px", fontSize: "0.78rem", borderRadius: "6px", background: "var(--bg)", border: "1px solid var(--line)" }}
                              >
                                <option value="member">Member</option>
                                <option value="premium">Premium Member</option>
                                <option value="staff">Staff</option>
                                <option value="super_admin">Super Admin</option>
                              </select>
                              <button
                                onClick={() => handleDeleteUser(u.id)}
                                style={{ padding: "4px 8px", fontSize: "0.78rem", border: "1px solid rgba(255, 69, 58, 0.15)", borderRadius: "6px", background: "none", color: "#ff453a", cursor: "pointer" }}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Users Pagination Controls */}
            {totalUserPages > 1 && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.5rem", borderTop: "1px solid var(--line)" }}>
                <button
                  className="btn btn-soft"
                  style={{ padding: "6px 12px", fontSize: "0.82rem", borderRadius: "8px" }}
                  disabled={userCurrentPage === 1}
                  onClick={() => setUserCurrentPage((p) => Math.max(1, p - 1))}
                >
                  ◀ Previous
                </button>
                <span style={{ fontSize: "0.85rem", color: "var(--text-3)", fontWeight: 500 }}>
                  Page {userCurrentPage} of {totalUserPages}
                </span>
                <button
                  className="btn btn-soft"
                  style={{ padding: "6px 12px", fontSize: "0.82rem", borderRadius: "8px" }}
                  disabled={userCurrentPage === totalUserPages}
                  onClick={() => setUserCurrentPage((p) => Math.min(totalUserPages, p + 1))}
                >
                  Next ▶
                </button>
              </div>
            )}
          </div>

          {/* Add Staff Form */}
          <div style={{ background: "var(--bg-alt)", border: "1px solid var(--line)", padding: "1.5rem", borderRadius: "20px" }}>
            <h3 style={{ margin: "0 0 1.2rem 0", fontSize: "1.05rem" }}>👥 Create Staff Account</h3>
            <form onSubmit={handleAddStaff} style={{ display: "grid", gap: "1rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-2)" }}>Staff Name</label>
                <input
                  className="search-input"
                  style={{ width: "100%", padding: "8px 10px", fontSize: "0.85rem" }}
                  type="text"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  placeholder="Staff Name"
                  required
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-2)" }}>Email / Username</label>
                <input
                  className="search-input"
                  style={{ width: "100%", padding: "8px 10px", fontSize: "0.85rem" }}
                  type="text"
                  value={staffEmail}
                  onChange={(e) => setStaffEmail(e.target.value)}
                  placeholder="staff@wallmobi.com"
                  required
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-2)" }}>Temporary Password</label>
                <input
                  className="search-input"
                  style={{ width: "100%", padding: "8px 10px", fontSize: "0.85rem" }}
                  type="password"
                  value={staffPassword}
                  onChange={(e) => setStaffPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-2)" }}>Role</label>
                <select
                  className="search-input"
                  style={{ width: "100%", padding: "8px 10px", fontSize: "0.85rem", background: "var(--bg)" }}
                  value={staffRole}
                  onChange={(e) => setStaffRole(e.target.value)}
                >
                  <option value="staff">Staff (Limited Management)</option>
                  <option value="super_admin">Super Admin (All permissions)</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: "0.6rem 1rem", borderRadius: "10px", fontSize: "0.88rem", marginTop: "0.5rem" }}>
                Create Staff Account
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 📱 Wallpaper Preview Modal Overlay */}
      {previewWp && (
        <div
          onClick={() => setPreviewWp(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "1rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--bg-alt)",
              border: "1px solid var(--line)",
              borderRadius: "24px",
              width: "360px",
              maxWidth: "100%",
              padding: "1.5rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4 style={{ margin: 0, fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "240px", textAlign: "left" }}>
                {previewWp.title || "Preview"}
              </h4>
              <button
                onClick={() => setPreviewWp(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-2)",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  lineHeight: 1,
                  padding: 0,
                }}
              >
                &times;
              </button>
            </div>

            {/* Mobile Mockup Screen */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1080/2340",
                borderRadius: "20px",
                overflow: "hidden",
                border: "8px solid #111115",
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                background: "#000",
              }}
            >
              <Image src={previewWp.src} alt={previewWp.slug} fill sizes="min(80vw, 420px)" style={{ objectFit: "cover" }} unoptimized />
            </div>

            <div style={{ fontSize: "0.82rem", color: "var(--text-3)", textAlign: "left", display: "flex", flexDirection: "column", gap: "4px" }}>
              <div><strong>Slug:</strong> {previewWp.slug}</div>
              <div><strong>Category:</strong> <span className="chip" style={{ fontSize: "0.75rem", padding: "1px 6px" }}>{previewWp.category_slug}</span></div>
              <div><strong>Downloads:</strong> {previewWp.downloads_count}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
