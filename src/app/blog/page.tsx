import type { Metadata } from 'next';
import Link from 'next/link';
import BlogList from '@/components/BlogList';
import JsonLd from '@/components/JsonLd';
import { getBlogPosts } from '@/lib/blog';
import { blogSchema, breadcrumbSchema, graph } from '@/lib/structured-data';
import s from './blog.module.css';

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
    <div className={s.page} data-theme="manuscript">
      <JsonLd
        json={graph(
          blogSchema(posts),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
          ]),
        )}
      />
      <main className={s.main}>
        <p className={s.back}>
          <Link href="/">home</Link>
        </p>
        <h1 className={s.label}>Writing</h1>
        <BlogList />
      </main>
    </div>
  );
}
