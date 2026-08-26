import type { Metadata } from 'next';
import Marquee from '@/components/Marquee';
import BlogList from '@/components/BlogList';

export const metadata: Metadata = {
  title: 'blogs',
  description: 'Notes, build logs, and reflections from Nikhil Prabhu.',
};

export default function BlogPage() {
  return (
    <div className="blog-page-shell">
      <Marquee />
      <main className="blog-page-wrap">
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
