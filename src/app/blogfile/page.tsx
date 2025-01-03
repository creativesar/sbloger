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

const BlogTemplate: React.FC<{ postId: number; imageSrc: string; title: string; content: string; tips: string[]; conclusion: string; }> = ({ postId, imageSrc, title, content, tips, conclusion }) => {
  const { comments, setComments } = useComments();
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');

  const handleAddComment = () => {
    if (username.trim() && comment.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        body: comment,
        postId,
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
            src={imageSrc}
            alt={title}
            width={900}
            height={400}
            className="rounded-lg mb-6 mx-auto"
          />
        </div>
        <div className="md:w-1/2 md:pl-10">
          <h1 className="text-5xl font-extrabold mb-6 text-gray-900">
            {title}
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            {content}
          </p>
          <ul className="list-disc list-inside mb-6">
            {tips.map((tip, index) => (
              <li key={index} className='text-gray-600'>
                <b className='text-lg text-gray-700'>{tip.split(':')[0]}:</b> {tip.split(':')[1]}
              </li>
            ))}
          </ul>
          <p className="text-lg text-gray-700 mb-6">
            {conclusion}
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

const Blog1: React.FC = () => (
  <BlogTemplate
    postId={1}
    imageSrc="/images/blog01.jpg"
    title="AI in Healthcare: Revolutionizing Patient Care"
    content="Artificial Intelligence (AI) is transforming the healthcare industry by improving patient care, enhancing diagnostics, and streamlining administrative processes. AI-powered tools are enabling healthcare professionals to provide more accurate and personalized treatments, ultimately leading to better patient outcomes."
    tips={[
      'Predictive Analytics: AI algorithms are analyzing patient data to predict potential health issues and recommend preventive measures.',
      'Advanced Diagnostics: AI-powered diagnostic tools are assisting doctors in identifying diseases and conditions with greater accuracy and speed.',
      'Telemedicine: AI-driven telemedicine platforms are enabling remote consultations, making healthcare more accessible to patients in remote areas.',
      'Pro Tip: Stay informed about the latest AI advancements in healthcare to leverage these technologies for better patient care.'
    ]}
    conclusion="AI is revolutionizing healthcare by providing innovative solutions that enhance patient care and improve operational efficiency. As AI technologies continue to evolve, their impact on the healthcare industry will only grow, making it essential for healthcare professionals to stay updated and embrace these advancements."
  />
);

export const Blog2: React.FC = () => (
  <BlogTemplate
    postId={2}
    imageSrc="/images/blog02.jpg"
    title="AI in Everyday Life: Enhancing Convenience"
    content="Artificial Intelligence (AI) is seamlessly integrating into our daily lives, making tasks more convenient and efficient. From smart home devices to virtual assistants, AI-powered technologies are transforming how we interact with the world around us. These innovations are not only enhancing convenience but also improving our quality of life."
    tips={[
      'Smart Home Devices: AI-powered gadgets like smart thermostats, security cameras, and voice-activated assistants are making our homes more efficient and secure.',
      'Virtual Assistants: AI-driven virtual assistants like Siri, Alexa, and Google Assistant are helping us manage our schedules, control smart devices, and access information quickly.',
      'Personalized Recommendations: AI algorithms are providing personalized recommendations for shopping, entertainment, and more, enhancing our overall experience.',
      'Pro Tip: Explore and experiment with different AI-powered tools to discover how they can simplify your daily routines.'
    ]}
    conclusion="As AI continues to advance, its applications in everyday life will expand, offering even more ways to enhance convenience and improve our quality of life. Embracing these technologies can lead to a more connected and efficient lifestyle."
  />
);

export const Blog3: React.FC = () => (
  <BlogTemplate
    postId={3}
    imageSrc="/images/blog03.jpg"
    title="AI in Finance: Transforming Financial Services"
    content="Artificial Intelligence (AI) is revolutionizing the finance industry by enhancing decision-making, optimizing trading strategies, and improving customer experiences. AI-powered tools are enabling financial institutions to analyze vast amounts of data, detect fraud, and provide personalized financial advice."
    tips={[
      'Algorithmic Trading: AI-driven algorithms are optimizing trading strategies by analyzing market data and making real-time decisions.',
      'Fraud Detection: AI-powered systems are identifying fraudulent activities by analyzing transaction patterns and detecting anomalies.',
      'Personalized Financial Advice: AI algorithms are providing personalized financial recommendations based on individual customer profiles and preferences.',
      'Pro Tip: Stay informed about the latest AI advancements in finance to leverage these technologies for better financial decision-making.'
    ]}
    conclusion="AI is transforming the finance industry by providing innovative solutions that enhance decision-making, optimize trading strategies, and improve customer experiences. As AI technologies continue to evolve, their impact on the finance sector will only grow, making it essential for financial institutions to stay updated and embrace these advancements."
  />
);

export const Blog4: React.FC = () => (
  <BlogTemplate
    postId={4}
    imageSrc="/images/blog04.jpg"
    title="AI in Education: Enhancing Learning Experiences"
    content="Artificial Intelligence (AI) is transforming the education sector by providing personalized learning experiences, automating administrative tasks, and enhancing educational content. AI-powered tools are enabling educators to better understand student needs and tailor their teaching methods accordingly."
    tips={[
      'Personalized Learning: AI algorithms are analyzing student data to provide personalized learning paths and recommendations.',
      'Automated Grading: AI-powered grading systems are reducing the workload for educators by automating the grading process and providing instant feedback to students.',
      'Interactive Content: AI-driven educational platforms are offering interactive and engaging content to enhance the learning experience.',
      'Pro Tip: Explore AI-powered educational tools to enhance your learning experience and stay ahead in your studies.'
    ]}
    conclusion="AI is revolutionizing education by providing innovative solutions that enhance learning experiences and improve educational outcomes. As AI technologies continue to evolve, their impact on the education sector will only grow, making it essential for educators and students to embrace these advancements."
  />
);

export const Blog5: React.FC = () => (
  <BlogTemplate
    postId={5}
    imageSrc="/images/blog05.jpg"
    title="AI in Marketing: Driving Customer Engagement"
    content="Artificial Intelligence (AI) is transforming the marketing landscape by enabling businesses to better understand customer behavior, personalize marketing campaigns, and optimize advertising strategies. AI-powered tools are helping marketers drive customer engagement and achieve better results."
    tips={[
      'Customer Insights: AI algorithms are analyzing customer data to provide valuable insights into customer preferences and behavior.',
      'Personalized Campaigns: AI-powered marketing platforms are enabling businesses to create personalized marketing campaigns that resonate with their target audience.',
      'Ad Optimization: AI-driven advertising tools are optimizing ad placements and targeting to maximize ROI.',
      'Pro Tip: Leverage AI-powered marketing tools to enhance your marketing strategies and drive customer engagement.'
    ]}
    conclusion="AI is revolutionizing marketing by providing innovative solutions that enhance customer engagement and optimize marketing strategies. As AI technologies continue to evolve, their impact on the marketing industry will only grow, making it essential for marketers to stay updated and embrace these advancements."
  />
);

export default Blog1;




