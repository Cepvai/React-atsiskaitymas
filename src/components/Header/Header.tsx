import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img
          src="https://image.similarpng.com/very-thumbnail/2022/01/Fish-logo-template-on-transparent-background-PNG.png"
          alt="Logo"
          style={{ height: '40px' }}
        />
      </div>
      <nav className="navigation">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><a href="/add">Add</a></li>
          <li><a href="/login">Login</a></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;