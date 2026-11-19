import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import s from '@/app/blog/blog.module.css';

const BlogList = () => {
  const posts = getBlogPosts();

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className={s.list}>
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`} className={s.post}>
          <span>
            {post.venue && <span className={s.venue}>{post.venue}</span>}
            <span className={s.postTitle}>{post.title}</span>
            <span className={s.excerpt}>{post.preview}</span>
          </span>
          <span className={s.dates}>{post.monthLabel}</span>
        </Link>
      ))}
    </div>
  );
};

export default BlogList;
