'use client';
import { usePathname } from 'next/navigation';
// Import the missing Blog components
import { Blog1 } from '../page';
import { Blog2 } from '../page';
import { Blog3 } from '../page';
import { Blog4 } from '../page';
import { Blog5 } from '../page';

export default function BlogPage() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();

  const renderBlog = () => {
    switch (id) {
      case '1':
        return <Blog1 />;
      case '2':
        return <Blog2 />;
      case '3':
        return <Blog3 />;
      case '4':
        return <Blog4 />;
      case '5':
        return <Blog5 />;
      default:
        return <p>Blog not found</p>;
    }
  };

  return (
    <div className="min-h-screen py-10 px-4">
      {renderBlog()}
    </div>
  );
}
