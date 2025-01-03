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

export { Blog2 };

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

export { Blog3 };

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

export { Blog4 };

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

export { Blog5 };




