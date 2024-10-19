import React, { useState } from 'react';
import { ThumbsUp, MessageCircle, Share2, Send } from 'lucide-react';

interface PostProps {
  post: any;
  handleLike: (postId: number) => void;
  animated: boolean;
}

const Post: React.FC<PostProps> = ({ post, handleLike, animated }) => {
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({});

  const handleNewComment = (postId: number) => {
    if (newComments[postId]?.trim()) {
      const updatedComments = [
        ...post.comments,
        {
          id: post.comments.length + 1,
          author: 'Current User',
          content: newComments[postId],
        },
      ];
      post.comments = updatedComments;
      setNewComments({ ...newComments, [postId]: '' });
    }
  };

  return (
    <div
      className={`mb-6 bg-white shadow-lg border-blue-300 border overflow-hidden transition-all duration-500 ease-out p-4 rounded-lg transform ${
        animated
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-10 scale-95'
      }`}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          {post.title[0]}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{post.title}</h3>
          <p className="text-sm text-gray-500">
            {post.updatedAt.toLocaleDateString()}
          </p>
        </div>
      </div>
      <p className="text-lg text-gray-700 mb-4">{post.content}</p>
      <div className="flex flex-col items-start space-y-4">
        <div className="flex items-center justify-between w-full text-gray-500 text-sm">
          <span>{post.likes} Likes</span>
          <span>{post.comments.length} Comments</span>
        </div>
        <div className="flex items-center space-x-4 w-full border-y border-blue-200 py-1">
          <button
            onClick={() => handleLike(post.id)}
            className="flex-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center"
          >
            <ThumbsUp className="mr-2 h-5 w-5" />
            Like
          </button>
          <button className="flex-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center">
            <MessageCircle className="mr-2 h-5 w-5" />
            Comment
          </button>
          <button className="flex-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center">
            <Share2 className="mr-2 h-5 w-5" />
            Share
          </button>
        </div>
        <div className="w-full space-y-2">
          {post.comments.map((comment: any) => (
            <div key={comment.id} className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                {comment.author[0]}
              </div>
              <div className="bg-blue-50 rounded-2xl p-2 flex-grow">
                <p className="font-semibold text-gray-800">{comment.author}</p>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              CU
            </div>
            <div className="flex-grow relative">
              <input
                placeholder="Write a comment..."
                value={newComments[post.id] || ''}
                onChange={(e) =>
                  setNewComments({
                    ...newComments,
                    [post.id]: e.target.value,
                  })
                }
                className="rounded-full pr-10 bg-blue-50 border-blue-200 text-gray-700 placeholder-gray-400 w-full py-2 px-4"
              />
              <button
                onClick={() => handleNewComment(post.id)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-transparent hover:bg-transparent"
              >
                <Send className="h-5 w-5 text-blue-600 hover:text-blue-800 transition-colors duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
