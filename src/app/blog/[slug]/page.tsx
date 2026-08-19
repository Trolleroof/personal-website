import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Marquee from '@/components/Marquee';
import ProfileCard from '@/components/ProfileCard';
import ProfileQuote from '@/components/ProfileQuote';
import Footer from '@/components/Footer';
import { getBlogPost, getBlogPosts } from '@/lib/blog';

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

  return {
    title: `${post.title} — Nikhil Prabhu`,
    description: post.excerpt,
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

  return (
    <>
      <Marquee />
      <main className="page-wrap">
        <div className="col-left">
          <ProfileCard />
          {otherPosts.length > 0 && (
            <div className="panel">
              <div className="panel-header">More Posts</div>
              <div className="panel-body other-posts-panel">
                <ul className="other-posts-list">
                  {otherPosts.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}`} className="other-post-link">
                        <span className="other-post-title">{p.title}</span>
                        <span className="other-post-date">{p.date}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <ProfileQuote />
        </div>
        <div className="col-right">
          <div className="panel">
            <div className="panel-header">{post.title}</div>
            <div className="panel-body blog-post-body">
              <Link href="/blog" className="blog-back-link">
                ← Back to all blogs
              </Link>
              <article className="blog-post-article">
                <header className="blog-post-header">
                  <h1 className="blog-post-title">{post.title}</h1>
                  <div className="blog-meta">
                    <span className="blog-date">{post.date}</span>
                  </div>
                </header>
                {post.clips && post.clips.length > 0 && (
                  <div className="blog-post-clips" aria-label="Video clips">
                    {post.clips.map((clip) => (
                      <figure key={clip.src} className="blog-clip-figure">
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          controls
                          preload="metadata"
                          aria-label={clip.label}
                          className="blog-clip-video"
                        >
                          <source src={clip.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <figcaption className="blog-clip-caption">{clip.label}</figcaption>
                      </figure>
                    ))}
                  </div>
                )}
                <div className="blog-post-content">
                  {post.body.map((block, idx) =>
                    typeof block === 'string' ? (
                      <p key={idx}>{block}</p>
                    ) : (
                      <h2 key={idx}>{block.heading}</h2>
                    ),
                  )}
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
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
