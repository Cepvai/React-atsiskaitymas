import './Header.css';

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
          <li><a href="/">Home</a></li>
          <li><a href="/add">Add</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;