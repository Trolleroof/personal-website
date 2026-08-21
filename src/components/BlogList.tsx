import Image from 'next/image';
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
        <article
          key={post.slug}
          className={`blog-item${post.thumbnail ? ' blog-item--with-thumb' : ''}`}
        >
          <Link href={`/blog/${post.slug}`} className="blog-item-link">
            <div className="blog-item-top">
              {post.thumbnail && (
                <div className="blog-item-media">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    width={640}
                    height={336}
                    className="blog-thumb"
                  />
                </div>
              )}
              <div className="blog-item-body">
                <div className="blog-header">
                  <h3 className="blog-title">{post.title}</h3>
                </div>
                <div className="blog-meta">
                  <span className="blog-date">{post.dateLabel}</span>
                </div>
                <p className="blog-excerpt">{post.preview}</p>
              </div>
            </div>
            <div className="blog-item-footer">
              <span className="blog-read-link">Read more →</span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default BlogList;
