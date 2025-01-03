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

const Blog5 = () => {
  const { comments, setComments } = useComments();
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');

  const handleAddComment = () => {
    if (username.trim() && comment.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        body: comment,
        postId: 5,
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
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <Image
            src="/images/blog05.jpg"
            alt="AI in Marketing"
            width={900}
            height={400}
            className="rounded-lg mb-6 mx-auto"
          />
        </div>
        <div className="md:w-1/2 md:pl-10">
          <h1 className="text-5xl font-extrabold mb-6 text-gray-900">
            AI in Marketing: Driving Customer Engagement
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Artificial Intelligence (AI) is transforming the marketing landscape by enabling businesses to better understand customer behavior, personalize marketing campaigns, and optimize advertising strategies. AI-powered tools are helping marketers drive customer engagement and achieve better results.
          </p>
          <ul className="list-disc list-inside mb-6">
            <li className='text-gray-600'><b className='text-lg text-gray-700'>Customer Insights:</b> AI algorithms are analyzing customer data to provide valuable insights into customer preferences and behavior.</li>
            <li className='text-gray-600'><b className='text-lg text-gray-700'>Personalized Campaigns:</b> AI-powered marketing platforms are enabling businesses to create personalized marketing campaigns that resonate with their target audience.</li>
            <li className='text-gray-600'><b className='text-lg text-gray-700'>Ad Optimization:</b> AI-driven advertising tools are optimizing ad placements and targeting to maximize ROI.</li>
            <li className='text-gray-600'><b className='text-gray-700'>Pro Tip:</b> Leverage AI-powered marketing tools to enhance your marketing strategies and drive customer engagement.</li>
          </ul>
          <p className="text-lg text-gray-700 mb-6">
            AI is revolutionizing marketing by providing innovative solutions that enhance customer engagement and optimize marketing strategies. As AI technologies continue to evolve, their impact on the marketing industry will only grow, making it essential for marketers to stay updated and embrace these advancements.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <b>Conclusion:</b> AI is transforming marketing by enabling businesses to better understand customer behavior and personalize marketing campaigns. By leveraging AI-powered tools, marketers can drive customer engagement and achieve better results.
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

export default Blog5;
