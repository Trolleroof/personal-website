import { PROFILE, type BlogPost } from '@/lib/data';

export function getBlogPosts(): BlogPost[] {
  return PROFILE.blog;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return PROFILE.blog.find((post) => post.slug === slug);
}
