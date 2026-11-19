import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogPostContent from '@/components/BlogPostContent';
import JsonLd from '@/components/JsonLd';
import s from '../blog.module.css';
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { AUTHOR } from '@/lib/site';
import { blogPostingSchema, breadcrumbSchema, graph } from '@/lib/structured-data';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: 'Post not found' };
  }

  const url = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    authors: [{ name: AUTHOR.name, url: '/' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: 'article',
      publishedTime: new Date(`${post.date}T12:00:00Z`).toISOString(),
      authors: [AUTHOR.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const allPosts = getBlogPosts();
  const otherPosts = allPosts.filter((p) => p.slug !== slug);

  if (!post) {
    notFound();
  }

  const wordCount = post.content.split(/\s+/).filter(Boolean).length;

  return (
    <>
      <JsonLd
        json={graph(
          blogPostingSchema({ ...post, preview: post.excerpt }, wordCount),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        )}
      />
      <main className={`${s.page} ${s.main}`} data-theme="manuscript">
        <article className={s.article}>
          <p className={s.back}>
            <Link href="/blog">writing</Link>
          </p>
          <header>
            <h1 className={s.title}>{post.title}</h1>
            <p className={s.meta}>
              {post.venue && <span className={s.venue}>{post.venue}</span>}
              {post.monthLabel}
            </p>
          </header>
              {post.clips && post.clips.length > 0 && (
                <div className="blog-post-clips" aria-label="Media clips">
                  {post.clips.map((clip) => {
                    const isImage = /\.(gif|png|jpe?g|webp)$/i.test(clip.src);

                    return (
                      <figure key={clip.src} className="blog-clip-figure">
                        {isImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={clip.src}
                            alt={clip.label}
                            className="blog-clip-media"
                            loading="lazy"
                          />
                        ) : (
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls
                            preload="metadata"
                            aria-label={clip.label}
                            className="blog-clip-media"
                          >
                            <source src={clip.src} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        )}
                        <figcaption className="blog-clip-caption">{clip.label}</figcaption>
                      </figure>
                    );
                  })}
                </div>
              )}
              <BlogPostContent content={post.content} />
              {post.links && post.links.length > 0 && (
                <div className="blog-post-links">
                  {post.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blog-ext-link"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
        </article>
        {otherPosts.length > 0 && (
          <aside className={s.more}>
            <h2 className={s.moreLabel}>also</h2>
            <ul className={s.moreList}>
              {otherPosts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className={s.post}>
                    <span>
                      {p.venue && <span className={s.venue}>{p.venue}</span>}
                      <span className={s.postTitle}>{p.title}</span>
                    </span>
                    <span className={s.dates}>{p.monthLabel}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </main>
    </>
  );
}
