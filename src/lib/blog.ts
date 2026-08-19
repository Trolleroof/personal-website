import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');
const POST_FILENAME = 'index.md';

export interface BlogClip {
  src: string;
  label: string;
}

export interface BlogLink {
  label: string;
  href: string;
}

export interface BlogPostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  clips?: BlogClip[];
  links?: BlogLink[];
}

export interface BlogPostMeta extends BlogPostFrontmatter {
  slug: string;
  /** Human-readable date for display, e.g. "Aug 12, 2026". */
  dateLabel: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

function normalizeDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  const str = String(value ?? '').trim();
  const isoMatch = str.match(/^(\d{4}-\d{2}-\d{2})/);
  return isoMatch ? isoMatch[1] : str;
}

function formatDateLabel(isoDate: string): string {
  const normalized = normalizeDate(isoDate);
  const parsed = new Date(`${normalized}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return normalized;
  }
  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function parseDate(isoDate: string): number {
  const normalized = normalizeDate(isoDate);
  const parsed = new Date(`${normalized}T12:00:00`);
  return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
}

function isBlogPostDir(name: string): boolean {
  if (name.startsWith('_')) {
    return false;
  }

  const dirPath = path.join(BLOG_DIR, name);
  if (!fs.statSync(dirPath).isDirectory()) {
    return false;
  }

  return fs.existsSync(path.join(dirPath, POST_FILENAME));
}

function listBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter(isBlogPostDir)
    .sort();
}

function readBlogPost(slug: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, slug, POST_FILENAME), 'utf8');
  const { data, content } = matter(raw);

  const title = String(data.title ?? slug);
  const date = normalizeDate(data.date);
  const excerpt = String(data.excerpt ?? '');

  return {
    slug,
    title,
    date,
    dateLabel: formatDateLabel(date),
    excerpt,
    clips: Array.isArray(data.clips) ? (data.clips as BlogClip[]) : undefined,
    links: Array.isArray(data.links) ? (data.links as BlogLink[]) : undefined,
    content: content.trim(),
  };
}

export function getBlogPosts(): BlogPostMeta[] {
  return listBlogSlugs()
    .map((slug) => {
      const post = readBlogPost(slug);
      const { content: _content, ...meta } = post;
      return meta;
    })
    .sort((a, b) => parseDate(b.date) - parseDate(a.date));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  if (!listBlogSlugs().includes(slug)) {
    return undefined;
  }
  return readBlogPost(slug);
}
