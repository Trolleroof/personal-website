import type { Metadata } from 'next';
import Marquee from '@/components/Marquee';
import BlogList from '@/components/BlogList';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Blogs — Nikhil Prabhu',
  description: 'Notes, build logs, and reflections from Nikhil Prabhu.',
};

export default function BlogPage() {
  return (
    <>
      <Marquee />
      <main className="blog-page-wrap">
        <div className="panel blog-page-panel">
          <div className="panel-header">Blogs</div>
          <div className="panel-body blog-panel-body">
            <p className="blog-page-intro">Notes, build logs, and reflections.</p>
            <BlogList />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
