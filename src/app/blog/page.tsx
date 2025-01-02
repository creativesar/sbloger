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
  }
}

const fetchComments = async (): Promise<Comment[]> => {
  const response = await fetch('https://dummyjson.com/comments');
  const data = await response.json();
  return data.comments;
};

const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    fetchComments().then(setComments).catch(console.error);
  }, []);
  return { comments, setComments };
};

const handleAddComment = (comments: Comment[], setComments: (comments: Comment[]) => void) => {
  const inputElements = document.getElementsByTagName('input');
  const textAreaElements = document.getElementsByTagName('textarea');
  if (inputElements.length > 0 && textAreaElements.length > 0) {
    const username = inputElements[0].value.trim();
    const userComment = textAreaElements[0].value.trim();
    
    if (username && userComment) {
      const newComment = {
        id: comments.length + 1,
        body: userComment,
        postId: 1,
        user: {
          id: comments.length + 1,
          username: username,
        },
      };
      setComments([newComment, ...comments]);
      inputElements[0].value = ''; // Clear input
      textAreaElements[0].value = ''; // Clear textarea
    } else {
      alert('Please enter both a name and a comment.');
    }
  }
};

const Blog1 = () => {
  const { comments, setComments } = useComments();
  return (
    <div className="container mx-auto py-10 px-4">
      <Image 
        src="/images/blog01.jpg" 
        alt="AI Innovations" 
        width={900} 
        height={400} 
        className="rounded-lg mb-6 mx-auto"
      />
      <h1 className="text-5xl font-extrabold mb-6 text-gray-900">AI Innovations Transforming Industries</h1>
      <p className="text-lg text-gray-700 mb-6">Artificial Intelligence (AI) is revolutionizing various industries by automating processes, enhancing decision-making, and driving innovation. From healthcare to finance, AI-powered solutions are enabling organizations to achieve unprecedented efficiency and accuracy. By leveraging machine learning algorithms and big data analytics, businesses can gain valuable insights and stay ahead of the competition.</p>
      <ul className="list-disc list-inside mb-6">
        <li className='text-gray-600'><b className='text-lg text-gray-700'>Healthcare:</b> AI is improving patient outcomes through predictive analytics, personalized treatment plans, and advanced diagnostic tools.</li>
        <li className='text-gray-600'><b className='text-lg text-gray-700'>Finance:</b> AI-driven algorithms are optimizing trading strategies, detecting fraud, and providing personalized financial advice.</li>
        <li className='text-gray-600'><b className='text-lg text-gray-700'>Manufacturing:</b> AI-powered robots and predictive maintenance systems are enhancing production efficiency and reducing downtime.</li>
        <li className='text-gray-600'><b className='text-gray-700'>Pro Tip:</b> Stay updated with the latest AI trends and technologies to harness their full potential in your industry.</li>
      </ul>
      <p className="text-lg text-gray-700 mb-6">Embracing AI innovations can lead to significant improvements in productivity, cost savings, and customer satisfaction. As AI continues to evolve, its impact on various sectors will only grow, making it essential for businesses to adapt and innovate.</p>
      <p className="text-lg text-gray-700 mb-6"><b>Conclusion:</b> AI is a powerful tool that can transform industries and drive growth. By staying informed and embracing AI technologies, organizations can unlock new opportunities and achieve long-term success.</p>
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Comments</h2>
        <div className="w-full flex-col justify-start items-start lg:gap-9 gap-6 flex">
          <div className="w-full relative flex justify-between gap-2">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white shadow focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed mb-2"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white shadow focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed mb-2"
            />
            <textarea
              placeholder="Write your comment here..."
              className="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white shadow focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed mb-2"
              rows={2}
            ></textarea>
            <button
              onClick={() => handleAddComment(comments, setComments)}
              className="bg-blue-500 text-white py-3 px-6 rounded-lg mt-2"
            >
              Submit Comment
            </button>
          </div>
          {comments.length > 0 ? (
            comments.slice(0, 4).map((comment, index) => (
              <div key={index} className="w-full p-6 bg-white rounded-2xl border border-gray-200 flex-col justify-start items-start gap-8 flex">
                <div className="w-full flex-col justify-center items-start gap-3.5 flex">
                  <div className="w-full justify-between items-center inline-flex">
                    <div className="justify-start items-center gap-2.5 flex">
                      <div className="w-10 h-10 bg-gray-300 rounded-full justify-start items-start gap-2.5 flex">
                        <Image className="rounded-full object-cover" src="https://i.pravatar.cc/150?img=3" alt="User image" width={40} height={40} />
                      </div>
                      <div className="flex-col justify-start items-start gap-1 inline-flex">
                        <h5 className="text-gray-900 text-sm font-semibold leading-snug">{comment.user.username}</h5>
                        <h6 className="text-gray-500 text-xs font-normal leading-5">1 hr ago</h6>
                      </div>
                    </div>
                    <div className="w-6 h-6 relative">
                      <div className="w-full h-fit flex">
                        <div className="relative w-full">
                          <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                          <button id="dropdown-button" data-target="dropdown-1" className="w-full justify-center dropdown-toggle flex-shrink-0 z-10 flex items-center text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M12.0161 16.9893V17.0393M12.0161 11.9756V12.0256M12.0161 6.96191V7.01191" stroke="black" stroke-width="2.5" stroke-linecap="round" />
                            </svg>
                          </button>
                          <div id="dropdown-1" className="absolute top-10 right-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 open hidden">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                              <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                              </li>
                              <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Save</a>
                              </li>
                              <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-800 text-sm font-normal leading-snug">{comment.body}</p>
                </div>
                <div className="w-full justify-between items-center inline-flex">
                  <div className="justify-start items-center gap-4 flex">
                    <div className="justify-start items-center gap-1.5 flex">
                      <a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M7.04962 9.99504L7 10M12 10L11.9504 10.005M17 10L16.9504 10.005M10.5 3H13.5C16.7875 3 18.4312 3 19.5376 3.90796C19.7401 4.07418 19.9258 4.25989 20.092 4.46243C21 5.56878 21 7.21252 21 10.5V12.4777C21 13.8941 21 14.6023 20.8226 15.1779C20.4329 16.4427 19.4427 17.4329 18.1779 17.8226C17.6023 18 16.8941 18 15.4777 18C15.0811 18 14.8828 18 14.6985 18.0349C14.2966 18.1109 13.9277 18.3083 13.6415 18.6005C13.5103 18.7345 13.4003 18.8995 13.1803 19.2295L13.1116 19.3326C12.779 19.8316 12.6126 20.081 12.409 20.198C12.1334 20.3564 11.7988 20.3743 11.5079 20.2462C11.2929 20.1515 11.101 19.9212 10.7171 19.4605L10.2896 18.9475C10.1037 18.7244 10.0108 18.6129 9.90791 18.5195C9.61025 18.2492 9.23801 18.0748 8.83977 18.0192C8.70218 18 8.55699 18 8.26662 18C7.08889 18 6.50002 18 6.01542 17.8769C4.59398 17.5159 3.48406 16.406 3.12307 14.9846C3 14.5 3 13.9111 3 12.7334V10.5C3 7.21252 3 5.56878 3.90796 4.46243C4.07418 4.25989 4.25989 4.07418 4.46243 3.90796C5.56878 3 7.21252 3 10.5 3Z" stroke="black" stroke-width="1.6" stroke-linecap="round" />
                        </svg>
                      </a>
                      <h5 className="text-gray-900 text-sm font-normal leading-snug">Replies</h5>
                    </div>
                    <div className="justify-start items-center gap-1.5 flex">
                      <a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M16 14C16 15.6569 14 17 12 17C10 17 8 15.6569 8 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM10 9C10 9.55228 9.55228 10 9 10C8.44772 10 8 9.55228 8 9C8 8.44772 8.44772 8 9 8C9.55228 8 10 8.44772 10 9ZM16 9C16 9.55228 15.5523 10 15 10C14.4477 10 14 9.55228 14 9C14 8.44772 14.4477 8 15 8C15.5523 8 16 8.44772 16 9Z" stroke="#111827" stroke-width="1.6" stroke-linecap="round" />
                        </svg>
                      </a>
                      <h5 className="text-gray-900 text-sm font-normal leading-snug">Reactions</h5>
                    </div>
                  </div>
                  <div className="justify-end items-center gap-1 flex">
                    <h5 className="text-gray-500 text-sm font-normal leading-snug">30</h5>
                    <div className="justify-start items-start flex -space-x-2 overflow-hidden">
                      <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                        <Image className="w-3 h-3" src="https://pagedone.io/asset/uploads/1716545141.png" alt="Thumbs Up emoji" width={12} height={12} />
                      </div>
                      <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                        <Image className="w-3 h-3" src="https://pagedone.io/asset/uploads/1716545183.png" alt="Smiling eyes emoji" width={12} height={12} />
                      </div>
                      <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                        <Image className="w-3 h-3" src="https://pagedone.io/asset/uploads/1716545217.png" alt="hugging face emoji" width={12} height={12} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Export Blog1 as the default export to make it a valid Next.js page
export default Blog1;

export const Blog2 = () => {
  const { comments, setComments } = useComments();
  return (
    <div className="container mx-auto py-10 px-4">
      <Image 
        src="/images/blog02.jpg" 
        alt="AI in Everyday Life" 
        width={900} 
        height={400} 
        className="rounded-lg mb-6 mx-auto"
      />
      <h1 className="text-5xl font-extrabold mb-6 text-gray-900">AI in Everyday Life: Enhancing Convenience</h1>
      <p className="text-lg text-gray-700 mb-6">Artificial Intelligence (AI) is seamlessly integrating into our daily lives, making tasks more convenient and efficient. From smart home devices to virtual assistants, AI-powered technologies are transforming how we interact with the world around us. These innovations are not only enhancing convenience but also improving our quality of life.</p>
      <ul className="list-disc list-inside mb-6">
        <li className='text-gray-600'><b className='text-lg text-gray-700'>Smart Home Devices:</b> AI-powered gadgets like smart thermostats, security cameras, and voice-activated assistants are making our homes more efficient and secure.</li>
        <li className='text-gray-600'><b className='text-lg text-gray-700'>Virtual Assistants:</b> AI-driven virtual assistants like Siri, Alexa, and Google Assistant are helping us manage our schedules, control smart devices, and access information quickly.</li>
        <li className='text-gray-600'><b className='text-lg text-gray-700'>Personalized Recommendations:</b> AI algorithms are providing personalized recommendations for shopping, entertainment, and more, enhancing our overall experience.</li>
        <li className='text-gray-600'><b className='text-gray-700'>Pro Tip:</b> Explore and experiment with different AI-powered tools to discover how they can simplify your daily routines.</li>
      </ul>
      <p className="text-lg text-gray-700 mb-6">As AI continues to advance, its applications in everyday life will expand, offering even more ways to enhance convenience and improve our quality of life. Embracing these technologies can lead to a more connected and efficient lifestyle.</p>
      <p className="text-lg text-gray-700 mb-6"><b>Conclusion:</b> AI is transforming everyday life by making tasks more convenient and efficient. By exploring and adopting AI-powered tools, we can enjoy a more seamless and enhanced daily experience.</p>
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Comments</h2>
        {comments.length > 0 ? (
          comments.slice(0, 4).map((comment, index) => (
            <div key={index} className="w-full p-6 bg-white rounded-2xl border border-gray-200 flex-col justify-start items-start gap-8 flex">
              <div className="w-full flex-col justify-center items-start gap-3.5 flex">
                <div className="w-full justify-between items-center inline-flex">
                  <div className="justify-start items-center gap-2.5 flex">
                    <div className="w-10 h-10 bg-gray-300 rounded-full justify-start items-start gap-2.5 flex">
                      <Image className="rounded-full object-cover" src="https://i.pravatar.cc/150?img=3" alt="User image" width={40} height={40} />
                    </div>
                    <div className="flex-col justify-start items-start gap-1 inline-flex">
                      <h5 className="text-gray-900 text-sm font-semibold leading-snug">{comment.user.username}</h5>
                      <h6 className="text-gray-500 text-xs font-normal leading-5">1 hr ago</h6>
                    </div>
                  </div>
                  <div className="w-6 h-6 relative">
                    <div className="w-full h-fit flex">
                      <div className="relative w-full">
                        <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                        <button id="dropdown-button" data-target="dropdown-1" className="w-full justify-center dropdown-toggle flex-shrink-0 z-10 flex items-center text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0" type="button">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12.0161 16.9893V17.0393M12.0161 11.9756V12.0256M12.0161 6.96191V7.01191" stroke="black" stroke-width="2.5" stroke-linecap="round" />
                          </svg>
                        </button>
                        <div id="dropdown-1" className="absolute top-10 right-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 open hidden">
                          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                            <li>
                              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                            </li>
                            <li>
                              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Save</a>
                            </li>
                            <li>
                              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-800 text-sm font-normal leading-snug">{comment.body}</p>
              </div>
              <div className="w-full justify-between items-center inline-flex">
                <div className="justify-start items-center gap-4 flex">
                  <div className="justify-start items-center gap-1.5 flex">
                    <a href="">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M7.04962 9.99504L7 10M12 10L11.9504 10.005M17 10L16.9504 10.005M10.5 3H13.5C16.7875 3 18.4312 3 19.5376 3.90796C19.7401 4.07418 19.9258 4.25989 20.092 4.46243C21 5.56878 21 7.21252 21 10.5V12.4777C21 13.8941 21 14.6023 20.8226 15.1779C20.4329 16.4427 19.4427 17.4329 18.1779 17.8226C17.6023 18 16.8941 18 15.4777 18C15.0811 18 14.8828 18 14.6985 18.0349C14.2966 18.1109 13.9277 18.3083 13.6415 18.6005C13.5103 18.7345 13.4003 18.8995 13.1803 19.2295L13.1116 19.3326C12.779 19.8316 12.6126 20.081 12.409 20.198C12.1334 20.3564 11.7988 20.3743 11.5079 20.2462C11.2929 20.1515 11.101 19.9212 10.7171 19.4605L10.2896 18.9475C10.1037 18.7244 10.0108 18.6129 9.90791 18.5195C9.61025 18.2492 9.23801 18.0748 8.83977 18.0192C8.70218 18 8.55699 18 8.26662 18C7.08889 18 6.50002 18 6.01542 17.8769C4.59398 17.5159 3.48406 16.406 3.12307 14.9846C3 14.5 3 13.9111 3 12.7334V10.5C3 7.21252 3 5.56878 3.90796 4.46243C4.07418 4.25989 4.25989 4.07418 4.46243 3.90796C5.56878 3 7.21252 3 10.5 3Z" stroke="black" stroke-width="1.6" stroke-linecap="round" />
                      </svg>
                    </a>
                    <h5 className="text-gray-900 text-sm font-normal leading-snug">Replies</h5>
                  </div>
                  <div className="justify-start items-center gap-1.5 flex">
                    <a href="">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M16 14C16 15.6569 14 17 12 17C10 17 8 15.6569 8 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM10 9C10 9.55228 9.55228 10 9 10C8.44772 10 8 9.55228 8 9C8 8.44772 8.44772 8 9 8C9.55228 8 10 8.44772 10 9ZM16 9C16 9.55228 15.5523 10 15 10C14.4477 10 14 9.55228 14 9C14 8.44772 14.4477 8 15 8C15.5523 8 16 8.44772 16 9Z" stroke="#111827" stroke-width="1.6" stroke-linecap="round" />
                      </svg>
                    </a>
                    <h5 className="text-gray-900 text-sm font-normal leading-snug">Reactions</h5>
                  </div>
                </div>
                <div className="justify-end items-center gap-1 flex">
                  <h5 className="text-gray-500 text-sm font-normal leading-snug">30</h5>
                  <div className="justify-start items-start flex -space-x-2 overflow-hidden">
                    <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                      <Image className="w-3 h-3" src="https://pagedone.io/asset/uploads/1716545141.png" alt="Thumbs Up emoji" width={12} height={12} />
                    </div>
                    <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                      <Image className="w-3 h-3" src="https://pagedone.io/asset/uploads/1716545183.png" alt="Smiling eyes emoji" width={12} height={12} />
                    </div>
                    <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                      <Image className="w-3 h-3" src="https://pagedone.io/asset/uploads/1716545217.png" alt="hugging face emoji" width={12} height={12} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No comments yet.</p>
        )}
        <div className="mt-4">
          <h3 className="text-lg font-bold">Add a Comment</h3>
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 p-2 rounded-md w-full mb-2"
          />
          <textarea
            placeholder="Write your comment here..."
            className="border border-gray-300 p-2 rounded-md w-full"
            rows={2}
          ></textarea>
          <button
            onClick={() => handleAddComment(comments, setComments)}
            className="bg-blue-500 text-white p-2 rounded-md mt-2"
          >
            Submit Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export const Blog3 = () => {
  const { comments, setComments } = useComments();
  return (
    <div className="container mx-auto py-10 px-4">
      <Image 
        src="/images/blog03.jpg" 
        alt="AI in Healthcare" 
        width={900} 
        height={400} 
        className="rounded-lg mb-6 mx-auto"
      />
      <h1 className="text-5xl font-extrabold mb-6 text-gray-900">AI in Healthcare: Revolutionizing Patient Care</h1>
      <p className="text-lg text-gray-700 mb-6">Artificial Intelligence (AI) is transforming the healthcare industry by improving patient care, enhancing diagnostics, and streamlining administrative processes. AI-powered tools are enabling healthcare professionals to provide more accurate and personalized treatments, ultimately leading to better patient outcomes.</p>
      <ul className="list-disc list-inside mb-6">
        <li className='text-gray-600'><b className='text-lg text-gray-700'>Predictive Analytics:</b> AI algorithms are analyzing patient data to predict potential health issues and recommend preventive measures.</li>
        <li className='text-gray-600'><b className='text-lg text-gray-700'>Advanced Diagnostics:</b> AI-powered diagnostic tools are assisting doctors in identifying diseases and conditions with greater accuracy and speed.</li>
        <li className='text-gray-600'><b className='text-lg text-gray-700'>Telemedicine:</b> AI-driven telemedicine platforms are enabling remote consultations, making healthcare more accessible to patients in remote areas.</li>
        <li className='text-gray-600'><b className='text-gray-700'>Pro Tip:</b> Stay informed about the latest AI advancements in healthcare to leverage these technologies for better patient care.</li>
      </ul>
      <p className="text-lg text-gray-700 mb-6">AI is revolutionizing healthcare by providing innovative solutions that enhance patient care and improve operational efficiency. As AI technologies continue to evolve, their impact on the healthcare industry will only grow, making it essential for healthcare professionals to stay updated and embrace these advancements.</p>
      <p className="text-lg text-gray-700 mb-6"><b>Conclusion:</b> AI is transforming healthcare by improving patient care and enhancing diagnostics. By staying informed and adopting AI-powered tools, healthcare professionals can provide better and more personalized treatments.</p>
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Comments</h2>
        {comments.length > 0 ? (
          comments.slice(0, 4).map((comment, index) => (
            <div key={index} className="w-full p-6 bg-white rounded-2xl border border-gray-200 flex-col justify-start items-start gap-8 flex">
              <div className="w-full flex-col justify-center items-start gap-3.5 flex">
                <div className="w-full justify-between items-center inline-flex">
                  <div className="justify-start items-center gap-2.5 flex">
                    <div className="w-10 h-10 bg-gray-300 rounded-full justify-start items-start gap-2.5 flex">
                      <Image className="rounded-full object-cover" src="https://i.pravatar.cc/150?img=3" alt="User image" width={40} height={40} />
                    </div>
                    <div className="flex-col justify-start items-start gap-1 inline-flex">
                      <h5 className="text-gray-900 text-sm font-semibold leading-snug">{comment.user.username}</h5>
                      <h6 className="text-gray-500 text-xs font-normal leading-5">1 hr ago</h6>
                    </div>
                  </div>
                  <div className="w-6 h-6 relative">
                    <div className="w-full h-fit flex">
                      <div className="relative w-full">
                        <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                        <button id="dropdown-button" data-target="dropdown-1" className="w-full justify-center dropdown-toggle flex-shrink-0 z-10 flex items-center text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0" type="button">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12.0161 16.9893V17.0393M12.0161 11.9756V12.0256M12.0161 6.96191V7.01191" stroke="black" stroke-width="2.5" stroke-linecap="round" />
                          </svg>
                        </button>
                        <div id="dropdown-1" className="absolute top-10 right-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 open hidden">
                          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                            <li>
                              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                            </li>
                            <li>
                              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Save</a>
                            </li>
                            <li>
                              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-800 text-sm font-normal leading-snug">{comment.body}</p>
              </div>
              <div className="w-full justify-between items-center inline-flex">
                <div className="justify-start items-center gap-4 flex">
                  <div className="justify-start items-center gap-1.5 flex">
                    <a href="">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M7.04962 9.99504L7 10M12 10L11.9504 10.005M17 10L16.9504 10.005M10.5 3H13.5C16.7875 3 18.4312 3 19.5376 3.90796C19.7401 4.07418 19.9258 4.25989 20.092 4.46243C21 5.56878 21 7.21252 21 10.5V12.4777C21 13.8941 21 14.6023 20.8226 15.1779C20.4329 16.4427 19.4427 17.4329 18.1779 17.8226C17.6023 18 16.8941 18 15.4777 18C15.0811 18 14.8828 18 14.6985 18.0349C14.2966 18.1109 13.9277 18.3083 13.6415 18.6005C13.5103 18.7345 13.4003 18.8995 13.1803 19.2295L13.1116 19.3326C12.779 19.8316 12.6126 20.081 12.409 20.198C12.1334 20.3564 11.7988 20.3743 11.5079 20.2462C11.2929 20.1515 11.101 19.9212 10.7171 19.4605L10.2896 18.9475C10.1037 18.7244 10.0108 18.6129 9.90791 18.5195C9.61025 18.2492 9.23801 18.0748 8.83977 18.0192C8.70218 18 8.55699 18 8.26662 18C7.08889 18 6.50002 18 6.01542 17.8769C4.59398 17.5159 3.48406 16.406 3.12307 14.9846C3 14.5 3 13.9111 3 12.7334V10.5C3 7.21252 3 5.56878 3.90796 4.46243C4.07418 4.25989 4.25989 4.07418 4.46243 3.90796C5.56878 3 7.21252 3 10.5 3Z" stroke="black" stroke-width="1.6" stroke-linecap="round" />
                      </svg>
                    </a>
                    <h5 className="text-gray-900 text-sm font-normal leading-snug">Replies</h5>
                  </div>
                  <div className="justify-start items-center gap-1.5 flex">
                    <a href="">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M16 14C16 15.6569 14 17 12 17C10 17 8 15.6569 8 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM10 9C10 9.55228 9.55228 10 9 10C8.44772 10 8 9.55228 8 9C8 8.44772 8.44772 8 9 8C9.55228 8 10 8.44772 10 9ZM16 9C16 9.55228 15.5523 10 15 10C14.4477 10 14 9.55228 14 9C14 8.44772 14.4477 8 15 8C15.5523 8 16 8.44772 16 9Z" stroke="#111827" stroke-width="1.6" stroke-linecap="round" />
                      </svg>
                    </a>
                    <h5 className="text-gray-900 text-sm font-normal leading-snug">Reactions</h5>
                  </div>
                </div>
                <div className="justify-end items-center gap-1 flex">
                  <h5 className="text-gray-500 text-sm font-normal leading-snug">30</h5>
                  <div className="justify-start items-start flex -space-x-2 overflow-hidden">
                    <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                      <Image className="w-3 h-3" src="https://pagedone.io/asset/uploads/1716545141.png" alt="Thumbs Up emoji" width={12} height={12} />
                    </div>
                    <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                      <Image className="w-3 h-3" src="https://pagedone.io/asset/uploads/1716545183.png" alt="Smiling eyes emoji" width={12} height={12} />
                    </div>
                    <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                      <Image className="w-3 h-3" src="https://pagedone.io/asset/uploads/1716545217.png" alt="hugging face emoji" width={12} height={12} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No comments yet.</p>
        )}
        <div className="mt-4">
          <h3 className="text-lg font-bold">Add a Comment</h3>
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 p-2 rounded-md w-full mb-2"
          />
          <textarea
            placeholder="Write your comment here..."
            className="border border-gray-300 p-2 rounded-md w-full"
            rows={2}
          ></textarea>
          <button
            onClick={() => handleAddComment(comments, setComments)}
            className="bg-blue-500 text-white p-2 rounded-md mt-2"
          >
            Submit Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export const Blog4 = () => {
  const { comments, setComments } = useComments();
  return (
    <div className="container mx-auto py-10 px-4">
      <Image 
        src="/images/blog04.jpg" 
        alt="AI in Education" 
        width={900} 
        height={400} 
        className="rounded-lg mb-6 mx-auto"
      />
      <h1 className="text-5xl font-extrabold mb-6 text-gray-900">AI in Education: Enhancing Learning Experiences</h1>
      <p className="text-lg text-gray-700 mb-6">Artificial Intelligence (AI) is transforming the education sector by providing personalized learning experiences, automating administrative tasks, and enhancing educational content. AI-powered tools are enabling educators to better understand student needs and tailor their teaching methods accordingly.</p>
      <ul className="list-disc list-inside mb-6">
        <li className='text-gray-600'><b className='text-lg text-gray-700'>Personalized Learning:</b> AI algorithms are analyzing student data to provide personalized learning paths and recommendations.</li>
        <li className='text-gray-600'><b className='text-lg text-gray-700'>Automated Grading:</b> AI-powered grading systems are reducing the workload for educators by automating the grading process and providing instant feedback to students.</li>
        <li className='text-gray-600'><b className='text-lg text-gray-700'>Interactive Content:</b> AI-driven educational platforms are offering interactive and engaging content to enhance the learning experience.</li>
        <li className='text-gray-600'><b className='text-gray-700'>Pro Tip:</b> Explore AI-powered educational tools to enhance your learning experience and stay ahead in your studies.</li>
      </ul>
      <p className="text-lg text-gray-700 mb-6">AI is revolutionizing education by providing innovative solutions that enhance learning experiences and improve educational outcomes. As AI technologies continue to evolve, their impact on the education sector will only grow, making it essential for educators and students to embrace these advancements.</p>
      <p className="text-lg text-gray-700 mb-6"><b>Conclusion:</b> AI is transforming education by providing personalized learning experiences and automating administrative tasks. By exploring and adopting AI-powered tools, educators and students can enhance their learning experiences and achieve better outcomes.</p>
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Comments</h2>
        {comments.length > 0 ? (
          comments.slice(0, 4).map((comment, index) => (
            <div key={index} className="w-full p-6 bg-white rounded-2xl border border-gray-200 flex-col justify-start items-start gap-8 flex">
              <div className="w-full flex-col justify-center items-start gap-3.5 flex">
                <div className="w-full justify-between items-center inline-flex">
                  <div className="justify-start items-center gap-2.5 flex">
                    <div className="w-10 h-10 bg-gray-300 rounded-full justify-start items-start gap-2.5 flex">
                      <Image className="rounded-full object-cover" src="https://i.pravatar.cc/150?img=3" alt="User image" width={40} height={40} />
                    </div>
                    <div className="flex-col justify-start items-start gap-1 inline-flex">
                      <h5 className="text-gray-900 text-sm font-semibold leading-snug">{comment.user.username}</h5>
                      <h6 className="text-gray-500 text-xs font-normal leading-5">1 hr ago</h6>
                    </div>
                  </div>
                  <div className="w-6 h-6 relative">
                    <div className="w-full h-fit flex">
                      <div className="relative w-full">
                        <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                        <button id="dropdown-button" data-target="dropdown-1" className="w-full justify-center dropdown-toggle flex-shrink-0 z-10 flex items-center text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0" type="button">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12.0161 16.9893V17.0393M12.0161 11.9756V12.0256M12.0161 6.96191V7.01191" stroke="black" stroke-width="2.5" stroke-linecap="round" />
                          </svg>
                        </button>
                        <div id="dropdown-1" className="absolute top-10 right-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 open hidden">
                          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                            <li>
                              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                            </li>
                            <li>
                              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Save</a>
                            </li>
                            <li>
                              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-800 text-sm font-normal leading-snug">{comment.body}</p>
              </div>
              <div className="w-full justify-between items-center inline-flex">
                <div className="justify-start items-center gap-4 flex">
                  <div className="justify-start items-center gap-1.5 flex">
                    <a href="">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M7.04962 9.99504L7 10M12 10L11.9504 10.005M17 10L16.9504 10.005M10.5 3H13.5C16.7875 3 18.4312 3 19.5376 3.90796C19.7401 4.07418 19.9258 4.25989 20.092 4.46243C21 5.56878 21 7.21252 21 10.5V12.4777C21 13.8941 21 14.6023 20.8226 15.1779C20.4329 16.4427 19.4427 17.4329 18.1779 17.8226C17.6023 18 16.8941 18 15.4777 18C15.0811 18 14.8828 18 14.6985 18.0349C14.2966 18.1109 13.9277 18.3083 13.6415 18.6005C13.5103 18.7345 13.4003 18.8995 13.1803 19.2295L13.1116 19.3326C12.779 19.8316 12.6126 20.081 12.409 20.198C12.1334 20.3564 11.7988 20.3743 11.5079 20.2462C11.2929 20.1515 11.101 19.9212 10.7171 19.4605L10.2896 18.9475C10.1037 18.7244 10.0108 18.6129 9.90791 18.5195C9.61025 18.2492 9.23801 18.0748 8.83977 18.0192C8.70218 18 8.55699 18 8.26662 18C7.08889 18 6.50002 18 6.01542 17.8769C4.59398 17.5159 3.48406 16.406 3.12307 14.9846C3 14.5 3 13.9111 3 12.7334V10.5C3 7.21252 3 5.56878 3.90796 4.46243C4.07418 4.25989 4.25989 4.07418 4.46243 3.90796C5.56878 3 7.21252 3 10.5 3Z" stroke="black" stroke-width="1.6" stroke-linecap="round" />
                      </svg>
                    </a>
                    <h5 className="text-gray-900 text-sm font-normal leading-snug">Replies</h5>
                  </div>
                  <div className="justify-start items-center gap-1.5 flex">
                    <a href="">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M16 14C16 15.6569 14 17 12 17C10 17 8 15.6569 8 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM10 9C10 9.55228 9.55228 10 9 10C8.44772 10 8 9.55228 8 9C8 8.44772 8.44772 8 9 8C9.55228 8 10 8.44772 10 9ZM16 9C16 9.55228 15.5523 10 15 10C14.4477 10 14 9.55228 14 9C14 8.44772 14.4477 8 15 8C15.5523 8 16 8.44772 16 9Z" stroke="#111827" stroke-width="1.6" stroke-linecap="round" />
                      </svg>
                    </a>
                    <h5 className="text-gray-900 text-sm font-normal leading-snug">Reactions</h5>
                  </div>
                </div>
                <div className="justify-end items-center gap-1 flex">
                  <h5 className="text-gray-500 text-sm font-normal leading-snug">30</h5>
                  <div className="justify-start items-start flex -space-x-2 overflow-hidden">
                    <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                      <Image className="w-3 h-3" src="https://pagedone.io/asset/uploads/1716545141.png" alt="Thumbs Up emoji" width={12} height={12} />
                    </div>
                    <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                      <Image className="w-3 h-3" src="https://pagedone.io/asset/uploads/1716545183.png" alt="Smiling eyes emoji" width={12} height={12} />
                    </div>
                    <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                      <Image className="w-3 h-3" src="https://pagedone.io/asset/uploads/1716545217.png" alt="hugging face emoji" width={12} height={12} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No comments yet.</p>
        )}
        <div className="mt-4">
          <h3 className="text-lg font-bold">Add a Comment</h3>
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 p-2 rounded-md w-full mb-2"
          />
          <textarea
            placeholder="Write your comment here..."
            className="border border-gray-300 p-2 rounded-md w-full"
            rows={2}
          ></textarea>
          <button
            onClick={() => handleAddComment(comments, setComments)}
            className="bg-blue-500 text-white p-2 rounded-md mt-2"
          >
            Submit Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export const Blog5 = () => {
  const { comments, setComments } = useComments();
  return (
    <div className="container mx-auto py-10 px-4">
      <Image 
        src="/images/blog05.jpg" 
        alt="AI in Marketing" 
        width={900} 
        height={400} 
        className="rounded-lg mb-6 mx-auto"
      />
      <h1 className="text-5xl font-extrabold mb-6 text-gray-900">AI in Marketing: Driving Customer Engagement</h1>
      <p className="text-lg text-gray-700 mb-6">Artificial Intelligence (AI) is transforming the marketing landscape by enabling businesses to better understand customer behavior, personalize marketing campaigns, and optimize advertising strategies. AI-powered tools are helping marketers drive customer engagement and achieve better results.</p>
      <ul className="list-disc list-inside mb-6">
        <li className='text-gray-600'><b className='text-lg text-gray-700'>Customer Insights:</b> AI algorithms are analyzing customer data to provide valuable insights into customer preferences and behavior.</li>
        <li className='text-gray-600'><b className='text-lg text-gray-700'>Personalized Campaigns:</b> AI-powered marketing platforms are enabling businesses to create personalized marketing campaigns that resonate with their target audience.</li>
        <li className='text-gray-600'><b className='text-lg text-gray-700'>Ad Optimization:</b> AI-driven advertising tools are optimizing ad placements and targeting to maximize ROI.</li>
        <li className='text-gray-600'><b className='text-gray-700'>Pro Tip:</b> Leverage AI-powered marketing tools to enhance your marketing strategies and drive customer engagement.</li>
      </ul>
      <p className="text-lg text-gray-700 mb-6">AI is revolutionizing marketing by providing innovative solutions that enhance customer engagement and optimize marketing strategies. As AI technologies continue to evolve, their impact on the marketing industry will only grow, making it essential for marketers to stay updated and embrace these advancements.</p>
      <p className="text-lg text-gray-700 mb-6"><b>Conclusion:</b> AI is transforming marketing by enabling businesses to better understand customer behavior and personalize marketing campaigns. By leveraging AI-powered tools, marketers can drive customer engagement and achieve better results.</p>
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Comments</h2>
        {comments.length > 0 ? (
          comments.slice(0, 4).map((comment, index) => (
            <div key={index} className="w-full p-6 bg-white rounded-2xl border border-gray-200 flex-col justify-start items-start gap-8 flex">
              <div className="w-full flex-col justify-center items-start gap-3.5 flex">
                <div className="w-full justify-between items-center inline-flex">
                  <div className="justify-start items-center gap-2.5 flex">
                    <div className="w-10 h-10 bg-gray-300 rounded-full justify-start items-start gap-2.5 flex">
                      <Image className="rounded-full object-cover" src="https://i.pravatar.cc/150?img=3" alt="User image" width={40} height={40} />
                    </div>
                    <div className="flex-col justify-start items-start gap-1 inline-flex">
                      <h5 className="text-gray-900 text-sm font-semibold leading-snug">{comment.user.username}</h5>
                      <h6 className="text-gray-500 text-xs font-normal leading-5">1 hr ago</h6>
                    </div>
                  </div>
                  <div className="w-6 h-6 relative">
                    <div className="w-full h-fit flex">
                      <div className="relative w-full">
                        <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                        <button id="dropdown-button" data-target="dropdown-1" className="w-full justify-center dropdown-toggle flex-shrink-0 z-10 flex items-center text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0" type="button">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12.0161 16.9893V17.0393M12.0161 11.9756V12.0256M12.0161 6.96191V7.01191" stroke="black" stroke-width="2.5" stroke-linecap="round" />
                          </svg>
                        </button>
                        <div id="dropdown-1" className="absolute top-10 right-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 open hidden">
                          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                            <li>
                              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                            </li>
                            <li>
                              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Save</a>
                            </li>
                            <li>
                              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-800 text-sm font-normal leading-snug">{comment.body}</p>
              </div>
              <div className="w-full justify-between items-center inline-flex">
                <div className="justify-start items-center gap-4 flex">
                  <div className="justify-start items-center gap-1.5 flex">
                    <a href="">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M7.04962 9.99504L7 10M12 10L11.9504 10.005M17 10L16.9504 10.005M10.5 3H13.5C16.7875 3 18.4312 3 19.5376 3.90796C19.7401 4.07418 19.9258 4.25989 20.092 4.46243C21 5.56878 21 7.21252 21 10.5V12.4777C21 13.8941 21 14.6023 20.8226 15.1779C20.4329 16.4427 19.4427 17.4329 18.1779 17.8226C17.6023 18 16.8941 18 15.4777 18C15.0811 18 14.8828 18 14.6985 18.0349C14.2966 18.1109 13.9277 18.3083 13.6415 18.6005C13.5103 18.7345 13.4003 18.8995 13.1803 19.2295L13.1116 19.3326C12.779 19.8316 12.6126 20.081 12.409 20.198C12.1334 20.3564 11.7988 20.3743 11.5079 20.2462C11.2929 20.1515 11.101 19.9212 10.7171 19.4605L10.2896 18.9475C10.1037 18.7244 10.0108 18.6129 9.90791 18.5195C9.61025 18.2492 9.23801 18.0748 8.83977 18.0192C8.70218 18 8.55699 18 8.26662 18C7.08889 18 6.50002 18 6.01542 17.8769C4.59398 17.5159 3.48406 16.406 3.12307 14.9846C3 14.5 3 13.9111 3 12.7334V10.5C3 7.21252 3 5.56878 3.90796 4.46243C4.07418 4.25989 4.25989 4.07418 4.46243 3.90796C5.56878 3 7.21252 3 10.5 3Z" stroke="black" stroke-width="1.6" stroke-linecap="round" />
                      </svg>
                    </a>
                    <h5 className="text-gray-900 text-sm font-normal leading-snug">Replies</h5>
                  </div>
                  <div className="justify-start items-center gap-1.5 flex">
                    <a href="">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M16 14C16 15.6569 14 17 12 17C10 17 8 15.6569 8 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM10 9C10 9.55228 9.55228 10 9 10C8.44772 10 8 9.55228 8 9C8 8.44772 8.44772 8 9 8C9.55228 8 10 8.44772 10 9ZM16 9C16 9.55228 15.5523 10 15 10C14.4477 10 14 9.55228 14 9C14 8.44772 14.4477 8 15 8C15.5523 8 16 8.44772 16 9Z" stroke="#111827" stroke-width="1.6" stroke-linecap="round" />
                      </svg>
                    </a>
                    <h5 className="text-gray-900 text-sm font-normal leading-snug">Reactions</h5>
                  </div>
                </div>
                <div className="justify-end items-center gap-1 flex">
                  <h5 className="text-gray-500 text-sm font-normal leading-snug">30</h5>
                  <div className="justify-start items-start flex -space-x-2 overflow-hidden">
                    <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                      <Image className="w-3 h-3" src="https://pagedone.io/asset/uploads/1716545141.png" alt="Thumbs Up emoji" width={12} height={12} />
                    </div>
                    <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                      <Image className="w-3 h-3" src="https://pagedone.io/asset/uploads/1716545183.png" alt="Smiling eyes emoji" width={12} height={12} />
                    </div>
                    <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                      <Image className="w-3 h-3" src="https://pagedone.io/asset/uploads/1716545217.png" alt="hugging face emoji" width={12} height={12} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No comments yet.</p>
        )}
        <div className="mt-4">
          <h3 className="text-lg font-bold">Add a Comment</h3>
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 p-2 rounded-md w-full mb-2"
          />
          <textarea
            placeholder="Write your comment here..."
            className="border border-gray-300 p-2 rounded-md w-full"
            rows={2}
          ></textarea>
          <button
            onClick={() => handleAddComment(comments, setComments)}
            className="bg-blue-500 text-white p-2 rounded-md mt-2"
          >
            Submit Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export const Blog6 = () => {
  const { comments, setComments } = useComments();
  return (
    <div className="container mx-auto py-10 px-4">
      <Image
        src="https://images.squarespace-cdn.com/content/v1/603a73e7e541b709395810f2/7ce535a7-8047-4ec4-99ce-5d3c2eb41d57/Adrien+lunges.JPEG"
        alt="Fitness Tips"
        width={900}
        height={200}
        className="rounded-lg mb-6 mx-auto"
      />
      <h1 className="text-5xl font-extrabold mb-6 text-gray-900">Fitness Tips for a Healthier Life</h1>
      <p className="text-lg text-gray-700 mb-6">
        Staying fit and active is one of the most rewarding investments you can make for your body and mind. A healthy lifestyle not only improves your physical well-being but also boosts your mental clarity and confidence. Whether you are starting your fitness journey or looking to level up, consistency and mindfulness are key to success.
      </p>
      <ul className="list-disc list-inside mb-6">
        <li className="text-gray-600">
          <b className="text-lg text-gray-700">Set Realistic Goals:</b> Begin with achievable fitness goals to stay motivated and track your progress. Starting small and gradually increasing intensity helps you avoid burnout and injuries.
        </li>
        <li className="text-gray-600">
          <b className="text-lg text-gray-700">Mix Up Your Workouts:</b> Incorporate a variety of exercises, including strength training, cardio, and flexibility routines, to keep your body challenged and engaged. A diverse workout plan prevents monotony and targets different muscle groups effectively.
        </li>
        <li className="text-gray-600">
          <b className="text-lg text-gray-700">Stay Hydrated and Eat Right:</b> Drink plenty of water throughout the day, especially during workouts, to maintain energy and endurance. Pair this with a balanced diet rich in nutrients to fuel your fitness journey.
        </li>
        <li className="text-gray-600">
          <b className="text-gray-700">Pro Tip:</b> Prioritize rest and recovery. Quality sleep and rest days are essential for muscle repair, growth, and overall performance improvement.
        </li>
      </ul>
      <p className="text-lg text-gray-700 mb-6">
        Remember, fitness is not a destination but a lifelong journey. Celebrate your progress, no matter how small, and stay committed to your goals. With patience and perseverance, you’ll discover the joy of a healthier and more active lifestyle.
      </p>
      <p className="text-lg text-gray-700 mb-6">
        <b>Conclusion:</b> Embrace fitness as a way of life. Consistency, determination, and a positive mindset will empower you to achieve your goals and live your best, healthiest life.
      </p>
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6">Comments</h2>
        {comments.length > 0 ? (
          comments.slice(0, 4).map((comment, index) => (
            <div key={index} className="w-full p-6 bg-white rounded-2xl border border-gray-200 flex-col justify-start items-start gap-8 flex">
              <div className="w-full flex-col justify-center items-start gap-3.5 flex">
                <div className="w-full justify-between items-center inline-flex">
                  <div className="justify-start items-center gap-2.5 flex">
                    <div className="w-10 h-10 bg-gray-300 rounded-full justify-start items-start gap-2.5 flex">
                      <Image className="rounded-full object-cover" src="https://i.pravatar.cc/150?img=3" alt="User image" width={40} height={40} />
                    </div>
                    <div className="flex-col justify-start items-start gap-1 inline-flex">
                      <h5 className="text-gray-900 text-sm font-semibold leading-snug">{comment.user.username}</h5>
                      <h6 className="text-gray-500 text-xs font-normal leading-5">1 hr ago</h6>
                    </div>
                  </div>
                  <div className="w-6 h-6 relative">
                    <div className="w-full h-fit flex">
                      <div className="relative w-full">
                        <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                        <button id="dropdown-button" data-target="dropdown-1" className="w-full justify-center dropdown-toggle flex-shrink-0 z-10 flex items-center text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0" type="button">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12.0161 16.9893V17.0393M12.0161 11.9756V12.0256M12.0161 6.96191V7.01191" stroke="black" stroke-width="2.5" stroke-linecap="round" />
                          </svg>
                        </button>
                        <div id="dropdown-1" className="absolute top-10 right-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 open hidden">
                          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                            <li>
                              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                            </li>
                            <li>
                              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Save</a>
                            </li>
                            <li>
                              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-800 text-sm font-normal leading-snug">{comment.body}</p>
              </div>
              <div className="w-full justify-between items-center inline-flex">
                <div className="justify-start items-center gap-4 flex">
                  <div className="justify-start items-center gap-1.5 flex">
                    <a href="">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M7.04962 9.99504L7 10M12 10L11.9504 10.005M17 10L16.9504 10.005M10.5 3H13.5C16.7875 3 18.4312 3 19.5376 3.90796C19.7401 4.07418 19.9258 4.25989 20.092 4.46243C21 5.56878 21 7.21252 21 10.5V12.4777C21 13.8941 21 14.6023 20.8226 15.1779C20.4329 16.4427 19.4427 17.4329 18.1779 17.8226C17.6023 18 16.8941 18 15.4777 18C15.0811 18 14.8828 18 14.6985 18.0349C14.2966 18.1109 13.9277 18.3083 13.6415 18.6005C13.5103 18.7345 13.4003 18.8995 13.1803 19.2295L13.1116 19.3326C12.779 19.8316 12.6126 20.081 12.409 20.198C12.1334 20.3564 11.7988 20.3743 11.5079 20.2462C11.2929 20.1515 11.101 19.9212 10.7171 19.4605L10.2896 18.9475C10.1037 18.7244 10.0108 18.6129 9.90791 18.5195C9.61025 18.2492 9.23801 18.0748 8.83977 18.0192C8.70218 18 8.55699 18 8.26662 18C7.08889 18 6.50002 18 6.01542 17.8769C4.59398 17.5159 3.48406 16.406 3.12307 14.9846C3 14.5 3 13.9111 3 12.7334V10.5C3 7.21252 3 5.56878 3.90796 4.46243C4.07418 4.25989 4.25989 4.07418 4.46243 3.90796C5.56878 3 7.21252 3 10.5 3Z" stroke="black" stroke-width="1.6" stroke-linecap="round" />
                      </svg>
                    </a>
                    <h5 className="text-gray-900 text-sm font-normal leading-snug">Replies</h5>
                  </div>
                  <div className="justify-start items-center gap-1.5 flex">
                    <a href="">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M16 14C16 15.6569 14 17 12 17C10 17 8 15.6569 8 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM10 9C10 9.55228 9.55228 10 9 10C8.44772 10 8 9.55228 8 9C8 8.44772 8.44772 8 9 8C9.55228 8 10 8.44772 10 9ZM16 9C16 9.55228 15.5523 10 15 10C14.4477 10 14 9.55228 14 9C14 8.44772 14.4477 8 15 8C15.5523 8 16 8.44772 16 9Z" stroke="#111827" stroke-width="1.6" stroke-linecap="round" />
                      </svg>
                    </a>
                    <h5 className="text-gray-900 text-sm font-normal leading-snug">Reactions</h5>
                  </div>
                </div>
                <div className="justify-end items-center gap-1 flex">
                  <h5 className="text-gray-500 text-sm font-normal leading-snug">30</h5>
                  <div className="justify-start items-start flex -space-x-2 overflow-hidden">
                    <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                      <Image className="w-3 h-3" src="https://pagedone.io/asset/uploads/1716545141.png" alt="Thumbs Up emoji" width={12} height={12} />
                    </div>
                    <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                      <Image className="w-3 h-3" src="https://pagedone.io/asset/uploads/1716545183.png" alt="Smiling eyes emoji" width={12} height={12} />
                    </div>
                    <div className="p-1.5 inline-block ring-1 ring-white bg-gray-100 rounded-full border border-white justify-center items-center flex">
                      <Image className="w-3 h-3" src="https://pagedone.io/asset/uploads/1716545217.png" alt="hugging face emoji" width={12} height={12} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No comments yet.</p>
        )}
        <div className="mt-4">
          <h3 className="text-lg font-bold">Add a Comment</h3>
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 p-2 rounded-md w-full mb-2"
          />
          <textarea
            placeholder="Write your comment here..."
            className="border border-gray-300 p-2 rounded-md w-full"
            rows={2}
          ></textarea>
          <button
            onClick={() => handleAddComment(comments, setComments)}
            className="bg-blue-500 text-white p-2 rounded-md mt-2"
          >
            Submit Comment
          </button>
        </div>
      </div>
    </div>
  );
};
