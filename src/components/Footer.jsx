import React from 'react';
import '../styling/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img
            src="/Logo.svg"
            alt="Logo"
            className="nav-logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="footer-copy">&copy; 2025 All rights reserved.</div>
        <div className="footer-links">
          <a href="/" className="footer-link">
            Home
          </a>
          <a href="/shop" className="footer-link">
            Shop
          </a>
          <a href="/about" className="footer-link">
            About Us
          </a>
          <a href="/contact" className="footer-link">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
