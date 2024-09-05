import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} React Atsiskaitymas. All rights reserved.</p>
      <ul className="footer-links">
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/terms">Terms and Uses</a></li>
        <li><a href="/cookies">Cookies</a></li>
      </ul>
      <div className="social-icons">
        <a href="#"><i className="bi bi-facebook"></i></a>
        <a href="#"><i className="bi bi-twitter"></i></a>
        <a href="#"><i className="bi bi-instagram"></i></a>
      </div>
    </footer>
  );
};

export default Footer;
