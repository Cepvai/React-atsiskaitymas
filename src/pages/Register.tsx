import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

const Register = ({ onLogin }: { onLogin: (name: string, avatar: string) => void }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    profilePicture: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Slaptažodžiai nesutampa!');
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      const newUser = { ...formData, password: hashedPassword };
      await axios.post('http://localhost:8080/users', newUser);
      alert('Registracija sėkminga!');
      onLogin(newUser.username, newUser.profilePicture || 'path/to/default-avatar.png');
      navigate('/');
    } catch (error) {
      alert('Registracija nepavyko!');
    }
  };

  return (
    <div className="register-container">
      <h2>Registracija</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input type="text" name="username" placeholder="Vartotojo vardas" onChange={handleChange} required />
        <input type="email" name="email" placeholder="El. paštas" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Slaptažodis" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Pakartokite slaptažodį" onChange={handleChange} required />
        <input type="date" name="birthdate" onChange={handleChange} required />
        <input type="url" name="profilePicture" placeholder="Profilio nuotrauka URL (nebūtina)" onChange={handleChange} />
        <button type="submit">Registruotis</button>
      </form>
    </div>
  );
};

export default Register;
