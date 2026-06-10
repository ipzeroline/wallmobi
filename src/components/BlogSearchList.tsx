"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { type Locale } from "@/i18n/config";
import BlogViewCounter from "./BlogViewCounter";

interface BlogSearchListProps {
  posts: BlogPost[];
  locale: Locale;
  siteName: string;
}

const POSTS_PER_PAGE = 20;

export default function BlogSearchList({ posts, locale, siteName }: BlogSearchListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    const title = (post.title[locale] || "").toLowerCase();
    const excerpt = (post.excerpt[locale] || "").toLowerCase();
    const tags = post.tags.map((t) => t.toLowerCase());
    
    return (
      title.includes(query) ||
      excerpt.includes(query) ||
      tags.some((tag) => tag.includes(query))
    );
  });

  // Calculate pagination boundaries
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Smooth scroll back up to the top of the blog grid
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Find the header or top section to scroll to
    const targetElement = document.getElementById("blog-header");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 180, behavior: "smooth" });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset pagination on search
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Localized dictionary for all target locales
  const placeholders: Record<string, string> = {
    en: "Search articles by title, tags...",
    th: "ค้นหาบทความด้วยชื่อ, แท็ก...",
    vi: "Tìm kiếm bài viết bằng tiêu đề, thẻ...",
    my: "ခေါင်းစဉ်၊ တဂ်များဖြင့် ဆောင်းပါး ရှာရန်...",
    lo: "ຄົ້ນຫາບົດຄວາມດ້ວຍຊື່, ແທັກ...",
    km: "ស្វែងរកអត្ថបទតាមចំណងជើង ស្លាក..."
  };

  const noResults: Record<string, string> = {
    en: "No articles found matching your search.",
    th: "ไม่พบบทความที่ตรงกับการค้นหาของคุณ",
    vi: "Không tìm thấy bài viết nào khớp với tìm kiếm.",
    my: "ရှာဖွေမှုနှင့် ကိုက်ညီသော ဆောင်းပါး မရှိပါ။",
    lo: "ບໍ່ພົບບົດຄວາມທີ່ຕົງກັບການຄົ້ນຫາຂອງທ່ານ",
    km: "រកមិនឃើញអត្ថបទដែលត្រូវគ្នានឹងការស្វែងរករបស់អ្នកទេ។"
  };

  const resetText: Record<string, string> = {
    en: "Clear search",
    th: "ล้างการค้นหา",
    vi: "Xóa tìm kiếm",
    my: "ပြန်လည်စတင်ရန်",
    lo: "ລ້າງການຄົ້ນຫາ",
    km: "សម្អាតការស្វែងរក"
  };

  const readMoreText: Record<string, string> = {
    en: "Read more",
    th: "อ่านต่อ",
    vi: "Đọc thêm",
    my: "ဆက်လက်ဖတ်ရှုရန်",
    lo: "ອ່ານຕໍ່",
    km: "អានបន្ថែម"
  };

  const placeholder = placeholders[locale] || placeholders.en;

  return (
    <div>
      {/* Search Input Container */}
      <div 
        id="blog-header"
        style={{ 
          position: "relative", 
          maxWidth: "480px", 
          margin: "1.5rem 0 2.5rem",
          display: "flex",
          alignItems: "center"
        }}
      >
        <span 
          style={{ 
            position: "absolute", 
            left: "14px", 
            color: "var(--text-3)", 
            display: "flex", 
            alignItems: "center",
            pointerEvents: "none"
          }}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: "12px 40px 12px 42px",
            fontSize: "0.95rem",
            background: "var(--bg-alt)",
            border: "1px solid var(--line)",
            borderRadius: "12px",
            color: "var(--text-1)",
            outline: "none",
            transition: "border-color 0.2s var(--ease), box-shadow 0.2s var(--ease)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--accent)";
            e.target.style.boxShadow = "0 0 0 4px rgba(0, 113, 227, 0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--line)";
            e.target.style.boxShadow = "none";
          }}
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            style={{
              position: "absolute",
              right: "12px",
              background: "none",
              border: "none",
              color: "var(--text-3)",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              transition: "background 0.2s var(--ease)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--line)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            aria-label="Clear search"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 ? (
        <div 
          style={{ 
            textAlign: "center", 
            padding: "4rem 2rem", 
            border: "1px dashed var(--line)", 
            borderRadius: "18px",
            background: "rgba(0, 0, 0, 0.01)"
          }}
        >
          <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "1rem" }}>🔍</span>
          <p style={{ color: "var(--text-2)", marginBottom: "1.25rem", fontSize: "1.05rem" }}>
            {noResults[locale] || noResults.en}
          </p>
          <button
            onClick={handleClearSearch}
            className="btn btn-secondary"
            style={{ padding: "8px 16px", borderRadius: "10px", fontSize: "0.9rem" }}
          >
            {resetText[locale] || resetText.en}
          </button>
        </div>
      ) : (
        /* Blog Grid */
        <div>
          <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))" }}>
            {currentPosts.map((post) => (
              <article key={post.slug} style={{ minWidth: 0 }}>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid var(--line)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    textDecoration: "none",
                    color: "inherit",
                    background: "var(--bg-alt)",
                    transition: "transform 0.2s var(--ease), border-color 0.2s var(--ease)",
                    height: "100%",
                  }}
                  className="hover-card-anim"
                >
                  <div
                    style={{
                      height: "170px",
                      background: "linear-gradient(135deg, var(--line) 0%, var(--bg) 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderBottom: "1px solid var(--line)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title[locale]}
                        width={640}
                        height={340}
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          fontSize: "2.5rem",
                          opacity: 0.25,
                          fontWeight: 800,
                          letterSpacing: "-2px",
                          color: "var(--text-1)",
                        }}
                      >
                        {siteName}
                      </div>
                    )}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "12px",
                        left: "16px",
                        display: "flex",
                        gap: "6px",
                        zIndex: 2,
                      }}
                    >
                      {post.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: "0.75rem",
                            background: "var(--surface)",
                            border: "1px solid var(--line)",
                            padding: "2px 8px",
                            borderRadius: "20px",
                            color: "var(--text-2)",
                            fontWeight: 500,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                          }}
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <div 
                      style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        fontSize: "0.82rem", 
                        color: "var(--text-3)", 
                        marginBottom: "0.5rem" 
                      }}
                    >
                      <time dateTime={post.published}>
                        {new Date(post.published).toLocaleDateString(locale === "en" ? "en-US" : locale, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      <BlogViewCounter slug={post.slug} locale={locale} increment={false} />
                    </div>
                    
                    <h2
                      style={{
                        fontSize: "1.15rem",
                        fontWeight: 600,
                        marginBottom: "0.6rem",
                        lineHeight: "1.4",
                        color: "var(--text-1)",
                      }}
                    >
                      {post.title[locale]}
                    </h2>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-2)",
                        lineHeight: "1.5",
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {post.excerpt[locale]}
                    </p>
                    <div
                      style={{
                        marginTop: "auto",
                        paddingTop: "1rem",
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        color: "var(--text-1)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {readMoreText[locale] || readMoreText.en} →
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Premium Pagination Controls */}
          {totalPages > 1 && (
            <div 
              style={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                gap: "8px", 
                marginTop: "3rem",
                flexWrap: "wrap"
              }}
            >
              {/* Previous Button */}
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                style={{
                  width: "38px",
                  height: "38px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--bg-alt)",
                  border: "1px solid var(--line)",
                  borderRadius: "50%",
                  color: "var(--text-1)",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  opacity: currentPage === 1 ? 0.35 : 1,
                  transition: "all 0.2s var(--ease)",
                  outline: "none"
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 1) e.currentTarget.style.borderColor = "var(--text-3)";
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== 1) e.currentTarget.style.borderColor = "var(--line)";
                }}
                aria-label="Previous page"
              >
                ←
              </button>

              {/* Page Number Buttons */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                const isActive = currentPage === page;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    style={{
                      width: "38px",
                      height: "38px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.95rem",
                      fontWeight: isActive ? "600" : "500",
                      background: isActive ? "var(--accent)" : "var(--bg-alt)",
                      border: "1px solid " + (isActive ? "var(--accent)" : "var(--line)"),
                      borderRadius: "50%",
                      color: isActive ? "#ffffff" : "var(--text-1)",
                      cursor: "pointer",
                      transition: "all 0.2s var(--ease)",
                      outline: "none"
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.borderColor = "var(--text-3)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.borderColor = "var(--line)";
                    }}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                style={{
                  width: "38px",
                  height: "38px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--bg-alt)",
                  border: "1px solid var(--line)",
                  borderRadius: "50%",
                  color: "var(--text-1)",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  opacity: currentPage === totalPages ? 0.35 : 1,
                  transition: "all 0.2s var(--ease)",
                  outline: "none"
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== totalPages) e.currentTarget.style.borderColor = "var(--text-3)";
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== totalPages) e.currentTarget.style.borderColor = "var(--line)";
                }}
                aria-label="Next page"
              >
                →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
