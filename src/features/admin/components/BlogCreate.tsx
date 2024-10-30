import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { userInfoState } from '../../../shared/state/atom';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogUpdateAndCreate: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const userInfo = useRecoilValue(userInfoState);

  const [formData, setFormData] = useState({
    createBy: userInfo?.id,
    title: '',
    content: '',
    contentType: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/CMSContent/add-content`,
        formData
      );
      if (response.data.success) {
        toast.success('Content added successfully.');
        onClose(); // Call onClose to close the form and refetch data
      }
    } catch (error) {
      setError('Error adding content.');
      toast.error('Error adding content.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Add New Content</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full mb-4 p-2 border rounded"
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Content"
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="text"
            name="contentType"
            value={formData.contentType}
            onChange={handleChange}
            placeholder="Content Type"
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full mb-4 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </motion.div>
    </motion.div>
  );
};

export default BlogUpdateAndCreate;
