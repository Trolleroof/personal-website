import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type BlogPostContentProps = {
  content: string;
};

const BlogPostContent: React.FC<BlogPostContentProps> = ({ content }) => {
  return (
    <div className="blog-post-content blog-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default BlogPostContent;
