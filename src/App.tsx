import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Add from './pages/Add';

const App = () => {
    const [user, setUser] = useState({ loggedIn: false, name: '', avatar: '' });
  
    const handleLogin = (name: string, avatar: string) => {
        setUser({ loggedIn: true, name, avatar });
      };
    
    const handleLogout = () => {
      setUser({ loggedIn: false, name: '', avatar: '' });
    };

  return (
    <Router>
     <Header user={user} onLogout={handleLogout} />
     <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
          {user.loggedIn && <Route path="/add" element={<Add />} />}
        </Routes>
      <Footer />
    </Router>
  );
};

export default App;