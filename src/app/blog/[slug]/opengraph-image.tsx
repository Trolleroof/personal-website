import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from '@/lib/og';
import { AUTHOR } from '@/lib/site';
import { getBlogPost, getBlogPosts } from '@/lib/blog';

/** Prerender one card per post instead of generating them on demand. */
export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export const alt = `Blog post — ${AUTHOR.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * Per-post card. `opengraph-image` is scoped to its own route segment, so the
 * one in `app/blog` does not serve `/blog/[slug]` — this file fills that gap.
 * Post thumbnails are unsuitable as the image itself (GIFs at 674x364).
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  return renderOgCard({
    eyebrow: 'Blog',
    title: post?.title ?? 'Blog',
    subtitle: post?.excerpt,
  });
}
