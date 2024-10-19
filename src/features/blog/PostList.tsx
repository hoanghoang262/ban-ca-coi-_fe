import React from 'react';
import Post from './Post';

interface PostListProps {
  posts: any[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
