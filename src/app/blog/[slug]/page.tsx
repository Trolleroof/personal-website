import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Marquee from '@/components/Marquee';
import BlogPostContent from '@/components/BlogPostContent';
import JsonLd from '@/components/JsonLd';
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
      <Marquee />
      <main className="blog-post-wrap">
        <div className="panel">
          <div className="panel-header blog-post-panel-header">
            <Link href="/blog" className="blog-back-link">
              ← All blogs
            </Link>
          </div>
          <div className="panel-body blog-post-body">
            <article className="blog-post-article">
              <header className="blog-post-header">
                <h1 className="blog-post-title">{post.title}</h1>
                <div className="blog-meta">
                  <span className="blog-date">{post.dateLabel}</span>
                </div>
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
          </div>
        </div>
        {otherPosts.length > 0 && (
          <div className="panel">
            <div className="panel-header">More Posts</div>
            <div className="panel-body other-posts-panel">
              <ul className="other-posts-list">
                {otherPosts.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="other-post-link">
                      <span className="other-post-title">{p.title}</span>
                      <span className="other-post-date">{p.dateLabel}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
