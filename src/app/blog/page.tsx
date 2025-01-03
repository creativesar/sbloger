'use client';
import { useState, useEffect } from 'react';

interface Comment {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
  }
}

const fetchComments = async (): Promise<Comment[]> => {
  const response = await fetch('https://dummyjson.com/comments');
  const data = await response.json();
  return data.comments;
};

// Remove unused useComments and handleAddComment
const BlogPage = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchComments().then(setComments).catch(console.error);
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-5xl font-extrabold mb-6 text-gray-900">Blog Page</h1>
      <p className="text-lg text-gray-700 mb-6">This is the blog page.</p>
      {/* Render comments */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="mt-6 p-4 bg-white shadow-md rounded-lg">
              <h5 className="text-lg font-semibold">{comment.user.username}</h5>
              <p className="text-gray-700">{comment.body}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 mt-4">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
