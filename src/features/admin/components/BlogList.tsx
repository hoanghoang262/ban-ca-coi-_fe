import React from 'react';
import { ContentItem } from '../../../shared/state/atom';

interface BlogListProps {
  blogs: ContentItem[];
  onEdit: (blog: ContentItem) => void;
  onView: (blog: ContentItem) => void;
}

const BlogList: React.FC<BlogListProps> = ({ blogs, onEdit, onView }) => {
  return (
    <ul className="space-y-4">
      {blogs.map((blog) => (
        <li
          key={blog.contentId}
          className="border p-4 rounded shadow-sm flex justify-between items-center"
        >
          <span className="font-semibold">{blog.title}</span>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(blog)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => onView(blog)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              View
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BlogList;
