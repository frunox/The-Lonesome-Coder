import React from 'react';
import { Link } from 'react-router-dom';
import './HomeNav.css';

const HomeNav = (props) => {
  return (
    <header className="navbar-header">
      <div>
        <img
          className="navbar-logo"
          src="https://i.ibb.co/k9Skkvm/logo-256.jpg"
          alt="logo"
        ></img>
      </div>
      <div className="navbar-title">
        <a href="/">A Coder's Quest</a>
      </div>
      <input
        type="checkbox"
        id="navbar-toggle"
        className="navbar-toggle"
      ></input>
      <nav className="navbar-nav">
        <ul className="navbar-ul">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/all-posts">All Posts</Link>
          </li>
        </ul>
      </nav>
      <label htmlFor="navbar-toggle" className="navbar-toggle-label">
        <span></span>
      </label>
    </header>
  );
};

export default HomeNav;
