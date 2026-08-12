import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TopBar from '@/components/TopBar';
import Marquee from '@/components/Marquee';
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
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <TopBar />
      <Marquee />
      <div className="page-wrap blog-page-wrap">
        <div className="blog-page-main">
          <div className="panel">
            <div className="panel-header">Blog</div>
            <div className="panel-body blog-post-body">
              <Link href="/blog" className="blog-back-link">
                ← All blogs
              </Link>
              <header className="blog-post-header">
                <h1 className="blog-post-title">{post.title}</h1>
                <div className="blog-meta">
                  <span className="blog-date">{post.date}</span>
                  {post.readTime && (
                    <>
                      <span className="blog-date">•</span>
                      <span className="blog-read-time">{post.readTime}</span>
                    </>
                  )}
                  {post.tag && (
                    <>
                      <span className="blog-date">•</span>
                      <span className="blog-tag">{post.tag}</span>
                    </>
                  )}
                </div>
              </header>
              <div className="blog-post-content">
                {post.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
