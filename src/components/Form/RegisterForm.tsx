import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    console.log('Validating form...');
    if (!username || !email || !password || !confirmPassword || !birthDate) {
      setError('Visi laukai yra privalomi.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Slaptažodžiai nesutampa.');
      return false;
    }
    if (password.length < 6) {
      setError('Slaptažodis turi būti bent 6 simbolių.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log('Form submitted');

    if (!validateForm()) {
      console.log('Validation failed');
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const defaultAvatar = 'https://via.placeholder.com/150';

      const response = await axios.get('http://localhost:8080/users');
      const userExists = response.data.some(
        (user: any) => user.email === email || user.username === username
      );

      if (userExists) {
        setError('Šis el. paštas arba vartotojo vardas jau užimtas.');
        console.log('User already exists');
        return;
      }

      const newUser = {
        username,
        email,
        password: hashedPassword,
        birthDate,
        avatar: avatar || defaultAvatar,
      };

      await axios.post('http://localhost:8080/users', newUser);
      alert('Registracija sėkminga!');
      navigate('/home');
    } catch (err) {
      setError('Įvyko klaida registruojantis. Bandykite dar kartą.');
      console.error('Error during registration:', err);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Registracija</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Vartotojo vardas"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="El. paštas"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Slaptažodis"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Pakartokite slaptažodį"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <input
        type="date"
        placeholder="Gimimo data"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Profilio nuotrauka URL (nebūtina)"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
      <button type="submit">Registruotis</button>
    </form>
  );
};

export default RegisterForm;