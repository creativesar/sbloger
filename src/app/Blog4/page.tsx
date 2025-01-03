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

const Blog4 = () => {
  const { comments, setComments } = useComments();
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');

  const handleAddComment = () => {
    if (username.trim() && comment.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        body: comment,
        postId: 4,
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
            src="/images/blog04.jpg"
            alt="AI in Education"
            width={900}
            height={400}
            className="rounded-lg mb-6 mx-auto"
          />
        </div>
        <div className="md:w-1/2 md:pl-10">
          <h1 className="text-5xl font-extrabold mb-6 text-gray-900">
            AI in Education: Enhancing Learning Experiences
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Artificial Intelligence (AI) is transforming the education sector by providing personalized learning experiences, automating administrative tasks, and enhancing educational content. AI-powered tools are enabling educators to better understand student needs and tailor their teaching methods accordingly.
          </p>
          <ul className="list-disc list-inside mb-6">
            <li className='text-gray-600'><b className='text-lg text-gray-700'>Personalized Learning:</b> AI algorithms are analyzing student data to provide personalized learning paths and recommendations.</li>
            <li className='text-gray-600'><b className='text-lg text-gray-700'>Automated Grading:</b> AI-powered grading systems are reducing the workload for educators by automating the grading process and providing instant feedback to students.</li>
            <li className='text-gray-600'><b className='text-lg text-gray-700'>Interactive Content:</b> AI-driven educational platforms are offering interactive and engaging content to enhance the learning experience.</li>
            <li className='text-gray-600'><b className='text-gray-700'>Pro Tip:</b> Explore AI-powered educational tools to enhance your learning experience and stay ahead in your studies.</li>
          </ul>
          <p className="text-lg text-gray-700 mb-6">
            AI is revolutionizing education by providing innovative solutions that enhance learning experiences and improve educational outcomes. As AI technologies continue to evolve, their impact on the education sector will only grow, making it essential for educators and students to embrace these advancements.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <b>Conclusion:</b> AI is transforming education by providing personalized learning experiences and automating administrative tasks. By exploring and adopting AI-powered tools, educators and students can enhance their learning experiences and achieve better outcomes.
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

export default Blog4;
