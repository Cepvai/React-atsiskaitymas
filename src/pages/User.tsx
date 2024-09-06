import React, { useEffect, useState } from 'react';
import Card from '../components/Card/Card';
import './User.css';

interface Creator {
  name: string;
  avatar: string;
}

interface Post {
  id: string;
  title: string;
  description: string;
  image?: string;
  creator: Creator;
  createdAt: string;
}

interface UserProps {
  user: { loggedIn: boolean; name: string; avatar: string };
}

const User: React.FC<UserProps> = ({ user }) => {
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/saved-posts')
      .then((response) => response.json())
      .then((data) => setSavedPosts(data));
  }, []);

  return (
    <div className="user-page">
      {savedPosts.map((post) => (
        <Card
          key={post.id}
          post={post}
          onDelete={() => {}}
          onSave={() => {}}
          user={user}
        />
      ))}
    </div>
  );
};

export default User;