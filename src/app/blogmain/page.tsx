'use client';
import Link from 'next/link';
import Image from 'next/image';

const BlogPage = () => {
  const cards = [
    {
      id: 1,
      title: "AI in Healthcare",
      description: "Discover how AI is revolutionizing patient care and diagnostics.",
      image: "/images/blog01.jpg",
      link: "/blog/1", // Correct dynamic route
    },
    {
      id: 2,
      title: "AI in Education",
      description: "Learn how AI is enhancing learning experiences and educational outcomes.",
      image: "/images/blog02.jpg",
      link: "/blog/2", // Correct dynamic route
    },
    {
      id: 3,
      title: "AI in Finance",
      description: "Explore the impact of AI on financial services and investment strategies.",
      image: "/images/blog03.jpg",
      link: "/blog/3", // Correct dynamic route
    },
    {
      id: 4,
      title: "AI in Marketing",
      description: "Understand how AI is driving customer engagement and marketing success.",
      image: "/images/blog04.jpg",
      link: "/blog/4", // Correct dynamic route
    },
    {
      id: 5,
      title: "AI in Everyday Life",
      description: "See how AI is making daily tasks more convenient and efficient.",
      image: "/images/blog05.jpg",
      link: "/blog/5", // Correct dynamic route
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 h-full py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
          <div className="flex items-center gap-12">
            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl dark:text-white">All Blogs</h2>
            <p className="hidden max-w-screen-sm text-gray-500 dark:text-gray-300 md:block">
              Explore our complete collection of AI-related blogs covering various industries and applications.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
          {cards.map((card) => (
            <Link key={card.id} href={card.link} className={`group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg ${card.id % 2 === 0 ? 'md:col-span-2' : ''} md:h-80`}>
              <Image
                src={card.image}
                alt={card.title}
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                width={600}
                height={400}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
              <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">{card.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
