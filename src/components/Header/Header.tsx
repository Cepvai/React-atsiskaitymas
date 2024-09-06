import './Header.css';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  user: { loggedIn: boolean; name: string; avatar: string };
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          <img
            src="https://image.similarpng.com/very-thumbnail/2022/01/Fish-logo-template-on-transparent-background-PNG.png"
            alt="Logo"
          />
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          {user.loggedIn && <Link to="/add">Add</Link>}
        </nav>
      </div>
      <div className="header-right">
        {user.loggedIn ? (
          <div className="user-info">
            <img
              src={user.avatar || 'path/to/default-avatar.png'}
              alt="User"
              className="user-avatar"
            />
            <span>{user.name}</span>
            <button onClick={onLogout} className="logout-button">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <button onClick={() => navigate('/login')} className="auth-button">
              Login
            </button>
            <button onClick={() => navigate('/register')} className="auth-button">
              Register
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;