import React, { useState } from 'react';
import { ContentItem } from '../../../shared/state/atom';

interface BlogModalProps {
  blog: ContentItem | null;
  onClose: () => void;
  onSave: (blog: ContentItem) => void;
}

const BlogModal: React.FC<BlogModalProps> = ({ blog, onClose, onSave }) => {
  const [formData, setFormData] = useState<ContentItem>({
    contentId: blog?.contentId || 0,
    createdBy: blog?.createdBy || 0,
    createByName: blog?.createByName || '',
    title: blog?.title || '',
    content: blog?.content || '',
    contentType: blog?.contentType || '',
    image: blog?.image || '',
    createdAt: blog?.createdAt || '',
    updatedAt: blog?.updatedAt || null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal">
      <h2>{blog ? 'Edit Blog' : 'Create Blog'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
          required
        />
        <input
          name="contentType"
          value={formData.contentType}
          onChange={handleChange}
          placeholder="Content Type"
          required
        />
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default BlogModal;
