import React, { useEffect, useState } from 'react';
import Card from '../components/Card/Card';
import './Home.css';

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

interface HomeProps {
  user: { loggedIn: boolean; name: string; avatar: string };
}

const Home: React.FC<HomeProps> = ({ user }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:8080/posts/${id}`, { method: 'DELETE' });
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleSave = (id: string) => {
    console.log(`Post saved: ${id}`);
  };

  return (
    <div className="card-container">
      {posts.map((post) => (
        <Card
          key={post.id}
          post={post}
          onDelete={handleDelete}
          onSave={handleSave}
          user={user}
        />
      ))}
    </div>
  );
};

export default Home;