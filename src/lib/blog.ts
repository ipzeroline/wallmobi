import type { Locale } from "@/i18n/config";

export type LocalizedText = Record<Locale, string>;

export type BlogSection =
  | { type: "paragraph"; text: LocalizedText }
  | { type: "heading"; text: LocalizedText; level: 2 | 3 }
  | { type: "list"; items: LocalizedText[] }
  | { type: "quote"; text: LocalizedText; author?: LocalizedText };

export type BlogPost = {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  coverImage?: string;
  ogImage?: string;
  published: string;
  updated?: string;
  author: string;
  tags: string[];
  takeaways?: LocalizedText[];
  faqs?: { question: LocalizedText; answer: LocalizedText }[];
  content: BlogSection[];
};

import blogPostsJson from "@/data/blog-posts.json";
export const blogPosts: BlogPost[] = blogPostsJson as unknown as BlogPost[];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts];
}
