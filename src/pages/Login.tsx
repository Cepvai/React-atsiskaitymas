import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import './Login.css';

interface LoginProps {
  onLogin: (name: string, avatar: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8080/users');
      const users = response.data;
      const user = users.find((user: { email: string }) => user.email === email);

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          onLogin(user.username, user.profilePicture || 'path/to/default-avatar.png');
          navigate('/');
        } else {
          setError('Neteisingas slaptažodis.');
        }
      } else {
        setError('Vartotojas nerastas.');
      }
    } catch (err) {
      setError('Nepavyko prisijungti. Bandykite dar kartą.');
    }
  };

  return (
    <div className="login-container">
      <h2>Prisijungimas</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          El. paštas:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Įveskite el. paštą"
          />
        </label>
        <label>
          Slaptažodis:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Įveskite slaptažodį"
          />
        </label>
        <button type="submit" className="login-button">
          Prisijungti
        </button>
      </form>
    </div>
  );
};

export default Login;