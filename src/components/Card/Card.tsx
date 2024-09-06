import React from 'react';
import './Card.css';

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

interface CardProps {
  post: Post;
  onDelete: (id: string) => void;
  onSave: (id: string) => void;
  user: { loggedIn: boolean; name: string; avatar: string };
}

const Card: React.FC<CardProps> = ({ post, onDelete, onSave, user }) => {
  return (
    <div className="card-container">
      <div className="card-header">
        <img src={post.creator.avatar} alt="Avatar" className="avatar" />
        <span>{post.creator.name}</span>
        <span className="card-date">
          {new Date(post.createdAt).toLocaleDateString('lt-LT', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>
      {post.image && <img src={post.image} alt={post.title} className="card-image" />}
      <div className="card-content">
        <h3 className="card-title">{post.title}</h3>
        <p className="card-description">{post.description}</p>
      </div>
      <div className="card-actions">
        {user.loggedIn && (
          <button className="button delete-button" onClick={() => onDelete(post.id)}>
            Delete
          </button>
        )}
        <button className="button save-button" onClick={() => onSave(post.id)}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Card;