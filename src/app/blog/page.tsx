'use client';
import { useState, useEffect } from 'react';

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
