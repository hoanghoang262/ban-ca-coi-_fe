import React from 'react';
import { User, Calendar, FileText, X } from 'lucide-react';
import { ContentItem } from '../../shared/state/atom';
import defaultImage from '../../assets/default-blog.webp';
import { motion } from 'framer-motion';

interface ContentDetailProps {
  selectedItem: ContentItem | null;
  setSelectedItem: (item: ContentItem | null) => void;
  formatDate: (dateString: string) => string;
}

const ContentDetail: React.FC<ContentDetailProps> = ({
  selectedItem,
  setSelectedItem,
  formatDate,
}) => {
  if (!selectedItem) return null;

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
          onClick={() => setSelectedItem(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">{selectedItem.title}</h2>
        <motion.img
          src={selectedItem.image ? selectedItem.image : defaultImage}
          alt={selectedItem.title}
          className="w-full h-96 object-cover rounded-md mb-4"
          onError={(e) => (e.currentTarget.src = defaultImage)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <User className="h-4 w-4 mr-1" />
          <span>{selectedItem.createByName}</span>
          <Calendar className="h-4 w-4 ml-4 mr-1" />
          <span>{formatDate(selectedItem.createdAt)}</span>
          <FileText className="h-4 w-4 ml-4 mr-1" />
          <span>{selectedItem.contentType}</span>
        </div>
        {selectedItem.updatedAt && (
          <p className="text-sm text-gray-500 mb-4">
            Updated: {formatDate(selectedItem.updatedAt)}
          </p>
        )}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-700 mb-6"
        >
          {selectedItem.content}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default ContentDetail;
