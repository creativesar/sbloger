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

const Blog3 = () => {
  const { comments, setComments } = useComments();
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');

  const handleAddComment = () => {
    if (username.trim() && comment.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        body: comment,
        postId: 3,
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
            src="/images/blog03.jpg"
            alt="AI in Finance"
            width={900}
            height={400}
            className="rounded-lg mb-6 mx-auto"
          />
        </div>
        <div className="md:w-1/2 md:pl-10">
          <h1 className="text-5xl font-extrabold mb-6 text-gray-900">
            AI in Finance: Transforming Financial Services
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Artificial Intelligence (AI) is revolutionizing the finance industry by enhancing decision-making, optimizing trading strategies, and improving customer experiences. AI-powered tools are enabling financial institutions to analyze vast amounts of data, detect fraud, and provide personalized financial advice.
          </p>
          <ul className="list-disc list-inside mb-6">
            <li className='text-gray-600'><b className='text-lg text-gray-700'>Algorithmic Trading:</b> AI-driven algorithms are optimizing trading strategies by analyzing market data and making real-time decisions.</li>
            <li className='text-gray-600'><b className='text-lg text-gray-700'>Fraud Detection:</b> AI-powered systems are identifying fraudulent activities by analyzing transaction patterns and detecting anomalies.</li>
            <li className='text-gray-600'><b className='text-lg text-gray-700'>Personalized Financial Advice:</b> AI algorithms are providing personalized financial recommendations based on individual customer profiles and preferences.</li>
            <li className='text-gray-600'><b className='text-gray-700'>Pro Tip:</b> Stay informed about the latest AI advancements in finance to leverage these technologies for better financial decision-making.</li>
          </ul>
          <p className="text-lg text-gray-700 mb-6">
            AI is transforming the finance industry by providing innovative solutions that enhance decision-making, optimize trading strategies, and improve customer experiences. As AI technologies continue to evolve, their impact on the finance sector will only grow, making it essential for financial institutions to stay updated and embrace these advancements.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <b>Conclusion:</b> AI is revolutionizing the finance industry by enhancing decision-making and optimizing trading strategies. By leveraging AI-powered tools, financial institutions can provide better services and achieve better outcomes.
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

export default Blog3;
