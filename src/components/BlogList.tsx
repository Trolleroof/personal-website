import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';

const BlogList: React.FC = () => {
  const posts = getBlogPosts();

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="blog-list">
      {posts.map((post) => (
        <article key={post.slug} className="blog-item">
          <div className="blog-header">
            <h3 className="blog-title">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
          </div>
          <div className="blog-meta">
            <span className="blog-date">{post.date}</span>
          </div>
          <p className="blog-excerpt">{post.excerpt}</p>
          <Link href={`/blog/${post.slug}`} className="blog-read-link">
            Read more →
          </Link>
        </article>
      ))}
    </div>
  );
};

export default BlogList;
