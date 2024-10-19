import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import NewPostForm from './NewPostForm';
import Post from './Post';
import { blogPostsState } from '../../shared/state/atom';
import axios from 'axios';

interface PostType {
  id: number;
  title: string;
  content: string;
  contentType: string;
  image: string;
  updatedAt: Date;
  likes: number;
  comments: any[];
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useRecoilState<PostType[]>(blogPostsState);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          'http://157.66.27.65:8080/api/CMSContent/get-articles',
          {
            params: {
              sortBy: 'CreatedAt',
              isDescending: true,
              pageNumber: 1,
              pageSize: 10,
            },
          }
        );
        if (response.data.success) {
          const fetchedPosts = response.data.data.map((item: any) => ({
            id: item.contentId,
            title: item.title,
            content: item.content,
            contentType: item.contentType,
            image: item.image,
            updatedAt: new Date(item.updatedAt),
            likes: 0, // Initialize likes
            comments: [], // Initialize comments
          }));
          setPosts(fetchedPosts);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [setPosts]);

  const addPost = (newPost: PostType) => {
    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId: number) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <main className="max-w-2xl mx-auto p-4">
        <NewPostForm addPost={addPost} />
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            handleLike={handleLike}
            animated={true} // Assume all posts are animated for simplicity
          />
        ))}
      </main>
    </div>
  );
};

export default Blog;
export type { PostType };
