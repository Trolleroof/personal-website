import type { Metadata } from 'next';
import TopBar from '@/components/TopBar';
import Marquee from '@/components/Marquee';
import BlogList from '@/components/BlogList';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Notes, build logs, and reflections from Nikhil Prabhu.',
};

export default function BlogPage() {
  return (
    <>
      <TopBar />
      <Marquee />
      <div className="page-wrap blog-page-wrap">
        <div className="blog-page-main">
          <div className="panel">
            <div className="panel-header">Blogs</div>
            <div className="panel-body">
       
              <BlogList />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
