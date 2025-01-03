'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Comment {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
  };
}

const fetchComments = async (): Promise<Comment[]> => {
  const response = await fetch('https://dummyjson.com/comments');
  const data = await response.json();
  return data.comments;
};

const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchComments()
      .then(setComments)
      .catch(console.error);
  }, []);

  return { comments, setComments };
};

const Blog1 = () => {
  const { comments, setComments } = useComments();
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');

  const handleAddComment = () => {
    if (username.trim() && comment.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        body: comment,
        postId: 1,
        user: {
          id: comments.length + 1,
          username,
        },
      };
      setComments([newComment, ...comments]);
      setUsername('');
      setComment('');
    } else {
      alert('Please enter both a name and a comment.');
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row items-center mb-10">
        <div className="md:w-1/2">
          <Image
            src="/images/blog01.jpg"
            alt="AI in Healthcare"
            width={900}
            height={400}
            className="rounded-lg mb-6 mx-auto"
          />
        </div>
        <div className="md:w-1/2 md:pl-10">
          <h1 className="text-5xl font-extrabold mb-6 text-gray-900">
            AI in Healthcare: Revolutionizing Patient Care
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Artificial Intelligence (AI) is transforming the healthcare industry by improving patient care, enhancing diagnostics, and streamlining administrative processes. AI-powered tools are enabling healthcare professionals to provide more accurate and personalized treatments, ultimately leading to better patient outcomes.
          </p>
          <ul className="list-disc list-inside mb-6">
            <li className='text-gray-600'><b className='text-lg text-gray-700'>Predictive Analytics:</b> AI algorithms are analyzing patient data to predict potential health issues and recommend preventive measures.</li>
            <li className='text-gray-600'><b className='text-lg text-gray-700'>Advanced Diagnostics:</b> AI-powered diagnostic tools are assisting doctors in identifying diseases and conditions with greater accuracy and speed.</li>
            <li className='text-gray-600'><b className='text-lg text-gray-700'>Telemedicine:</b> AI-driven telemedicine platforms are enabling remote consultations, making healthcare more accessible to patients in remote areas.</li>
            <li className='text-gray-600'><b className='text-gray-700'>Pro Tip:</b> Stay informed about the latest AI advancements in healthcare to leverage these technologies for better patient care.</li>
          </ul>
          <p className="text-lg text-gray-700 mb-6">
            AI is revolutionizing healthcare by providing innovative solutions that enhance patient care and improve operational efficiency. As AI technologies continue to evolve, their impact on the healthcare industry will only grow, making it essential for healthcare professionals to stay updated and embrace these advancements.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <b>Conclusion:</b> AI is transforming healthcare by improving patient care and enhancing diagnostics. By staying informed and adopting AI-powered tools, healthcare professionals can provide better and more personalized treatments.
          </p>
        </div>
      </div>
      {/* Comments Section */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Comments</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your Name"
            className="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white shadow focus:outline-none text-gray-900 placeholder-gray-400"
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment here..."
            className="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white shadow focus:outline-none text-gray-900 placeholder-gray-400"
            rows={2}
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg"
          >
            Submit Comment
          </button>
        </div>
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

export default Blog1;
