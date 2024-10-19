import React, { useState } from 'react';
import { Image, Smile, Video, X } from 'lucide-react';

interface NewPostFormProps {
  addPost: (newPost: any) => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ addPost }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [title, setTitle] = useState('');
  const [contentType, setContentType] = useState('Blog');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (url: string) => {
    setImage(url);
    setImagePreview(url);
  };

  const handleNewPost = async () => {
    if (newPost.trim() && title.trim()) {
      const post = {
        title,
        content: newPost,
        contentType,
        image,
        updatedAt: new Date(),
        likes: 0,
        comments: [],
      };
      addPost(post);
      resetForm();
    }
  };

  const resetForm = () => {
    setNewPost('');
    setTitle('');
    setImage('');
    setImagePreview('');
    setIsExpanded(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-6">
      {/* Header - Always visible */}
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium shadow-md">
            <span className="text-lg">CU</span>
          </div>
          <div onClick={() => setIsExpanded(true)} className="flex-grow">
            <div
              className={`bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2.5 cursor-pointer transition-colors duration-200 ${
                isExpanded ? 'hidden' : 'block'
              }`}
            >
              <span className="text-gray-600">What's on your mind?</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Form */}
      {isExpanded && (
        <div className="px-4 pb-4">
          {/* Form Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Create post</h3>
            <button
              onClick={resetForm}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 mb-4" />

          {/* Title Input */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 text-lg font-medium placeholder-gray-500 focus:outline-none mb-2"
          />

          {/* Content Textarea */}
          <textarea
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full min-h-[150px] resize-none px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none mb-4"
          />

          {/* Image Preview */}
          {imagePreview && (
            <div className="relative mb-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={() => {
                  setImage('');
                  setImagePreview('');
                }}
                className="absolute top-2 right-2 p-1.5 bg-gray-900/70 hover:bg-gray-900/90 rounded-full transition-colors duration-200"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          )}

          {/* Add to Post Section */}
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">
                Add to your post
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const url = prompt('Enter image URL:');
                    if (url) handleImageChange(url);
                  }}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
                >
                  <Image className="h-6 w-6 text-green-500" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200">
                  <Smile className="h-6 w-6 text-yellow-500" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200">
                  <Video className="h-6 w-6 text-red-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Content Type Select */}
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
          >
            <option value="Blog">Blog</option>
            <option value="Service">Service</option>
          </select>

          {/* Post Button */}
          <button
            onClick={handleNewPost}
            disabled={!title.trim() || !newPost.trim()}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-semibold transition-colors duration-200"
          >
            Post
          </button>
        </div>
      )}

      {/* Footer - Only shown when not expanded */}
      {!isExpanded && (
        <>
          <div className="h-px bg-gray-200 mx-4" />
          <div className="grid grid-cols-3 p-2">
            <button className="flex items-center justify-center space-x-2 py-2.5 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <Video className="h-6 w-6 text-red-500" />
              <span className="text-gray-600 font-medium">Live Video</span>
            </button>
            <button
              className="flex items-center justify-center space-x-2 py-2.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              onClick={() => {
                setIsExpanded(true);
                const url = prompt('Enter image URL:');
                if (url) handleImageChange(url);
              }}
            >
              <Image className="h-6 w-6 text-green-500" />
              <span className="text-gray-600 font-medium">Photo/Video</span>
            </button>
            <button className="flex items-center justify-center space-x-2 py-2.5 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <Smile className="h-6 w-6 text-yellow-500" />
              <span className="text-gray-600 font-medium">
                Feeling/Activity
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
