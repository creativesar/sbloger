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

const Blog2 = () => {
  const { comments, setComments } = useComments();
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');

  const handleAddComment = () => {
    if (username.trim() && comment.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        body: comment,
        postId: 2,
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
            src="/images/blog02.jpg"
            alt="AI in Everyday Life"
            width={900}
            height={400}
            className="rounded-lg mb-6 mx-auto"
          />
        </div>
        <div className="md:w-1/2 md:pl-10">
          <h1 className="text-5xl font-extrabold mb-6 text-gray-900">
            AI in Everyday Life: Enhancing Convenience
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Artificial Intelligence (AI) is seamlessly integrating into our daily lives, making tasks more convenient and efficient. From smart home devices to virtual assistants, AI-powered technologies are transforming how we interact with the world around us. These innovations are not only enhancing convenience but also improving our quality of life.
          </p>
          <ul className="list-disc list-inside mb-6">
            <li className='text-gray-600'><b className='text-lg text-gray-700'>Smart Home Devices:</b> AI-powered gadgets like smart thermostats, security cameras, and voice-activated assistants are making our homes more efficient and secure.</li>
            <li className='text-gray-600'><b className='text-lg text-gray-700'>Virtual Assistants:</b> AI-driven virtual assistants like Siri, Alexa, and Google Assistant are helping us manage our schedules, control smart devices, and access information quickly.</li>
            <li className='text-gray-600'><b className='text-lg text-gray-700'>Personalized Recommendations:</b> AI algorithms are providing personalized recommendations for shopping, entertainment, and more, enhancing our overall experience.</li>
            <li className='text-gray-600'><b className='text-gray-700'>Pro Tip:</b> Explore and experiment with different AI-powered tools to discover how they can simplify your daily routines.</li>
          </ul>
          <p className="text-lg text-gray-700 mb-6">
            As AI continues to advance, its applications in everyday life will expand, offering even more ways to enhance convenience and improve our quality of life. Embracing these technologies can lead to a more connected and efficient lifestyle.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <b>Conclusion:</b> AI is transforming everyday life by making tasks more convenient and efficient. By exploring and adopting AI-powered tools, we can enjoy a more seamless and enhanced daily experience.
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

export default Blog2;
