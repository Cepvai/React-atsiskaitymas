import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Add.css';

interface AddProps {
  user: { loggedIn: boolean; name: string; avatar: string };
}

const Add: React.FC<AddProps> = ({ user }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:8080/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          creator: { name: user.name, avatar: user.avatar },
          createdAt: new Date().toISOString(),
        }),
      });
      alert('Kortelė sukurta sėkmingai!');
      navigate('/');
    } catch (error) {
      alert('Įvyko klaida kuriant kortelę.');
    }
  };

  return (
    <div className="add-page">
      <h2>Sukurti naują kortelę</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Pavadinimas"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Aprašymas"
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="image"
          placeholder="Nuotraukos URL (nebūtina)"
          onChange={handleChange}
        />
        <button type="submit">Sukurti</button>
      </form>
    </div>
  );
};

export default Add;