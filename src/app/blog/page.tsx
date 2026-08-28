import type { Metadata } from 'next';
import Marquee from '@/components/Marquee';
import BlogList from '@/components/BlogList';
import JsonLd from '@/components/JsonLd';
import { getBlogPosts } from '@/lib/blog';
import { blogSchema, breadcrumbSchema, graph } from '@/lib/structured-data';

const description =
  'Build logs and research writeups by Nikhil Prabhu on robot learning, world models, reinforcement learning, and agent systems.';

export const metadata: Metadata = {
  title: 'Blog',
  description,
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog — Nikhil Prabhu',
    description,
    url: '/blog',
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="blog-page-shell">
      <JsonLd
        json={graph(
          blogSchema(posts),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
          ]),
        )}
      />
      <Marquee />
      <main className="blog-page-wrap">
        <h1 className="sr-only">Blog — build logs and research writeups by Nikhil Prabhu</h1>
        <div className="panel blog-page-panel">
          <div className="panel-header">Blogs</div>
          <div className="panel-body blog-panel-body">
            <BlogList />
          </div>
        </div>
      </main>
    </div>
  );
}
