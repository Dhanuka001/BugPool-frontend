// components/Feed.js
import React, { useEffect, useState } from 'react';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);  // Assuming data is an array of posts
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className="feed-container w-full max-w-3xl mx-auto p-4 space-y-6">
      {/* Loop through posts and display them */}
      {posts.map((post) => (
        <div
          key={post._id}
          className="post bg-gray-800 text-white p-6 rounded-lg shadow-md"
        >
          {/* User Info */}
          <div className="user-info flex items-center mb-4">
            <img
              src={post.user.profilePicture || '/default-profile.png'}
              alt={post.user.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="font-bold text-lg">{post.user.name}</h3>
              <p className="text-sm text-gray-400">{new Date(post.createdAt).toLocaleString()}</p>
            </div>
          </div>

          {/* Post Content */}
          <p className="text-lg whitespace-pre-wrap break-words">{post.content}</p>

          {/* Optional: Display code syntax highlighting (if it's a code post) */}
          {post.contentType === 'code' && (
            <pre className="bg-gray-900 p-4 rounded-lg mt-4">
              <code className="text-yellow-400">{post.content}</code>
            </pre>
          )}

          {/* Interaction Buttons (Like, Comment, etc.) */}
          <div className="interactions mt-4 flex space-x-4">
            <button
              className="like-button text-gray-300 hover:text-green-500"
              onClick={() => handleLike(post._id)}
            >
              Like
            </button>
            <button
              className="comment-button text-gray-300 hover:text-blue-500"
              onClick={() => handleComment(post._id)}
            >
              Comment
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // Functions to handle like and comment buttons (you can replace these with actual functionality)
  function handleLike(postId) {
    console.log('Liked post', postId);
    // You can add API calls here to like the post in the database
  }

  function handleComment(postId) {
    console.log('Comment on post', postId);
    // You can add functionality to show comments or open a comment modal
  }
};

export default Feed;


