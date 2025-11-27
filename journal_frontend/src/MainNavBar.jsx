import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AddArticle from './AddArticle';
import ViewArticles from './ViewArticles';

export default function MainNavBar() {
  const headerStyle = {
    backgroundColor: '#0d6efd',
    color: 'white',
    padding: '15px',
    textAlign: 'center',
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '10px',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  const mainStyle = {
    padding: '20px',
    maxWidth: '1000px',
    margin: 'auto',
  };

  return (
    <div>
      <header style={headerStyle}>
        <h1>Research Journal Management System</h1>
        <nav style={navStyle}>
          <Link style={linkStyle} to="/">Home</Link>
          <Link style={linkStyle} to="/add-article">Add Article</Link>
          <Link style={linkStyle} to="/view-articles">View Articles</Link>
        </nav>
      </header>

      <main style={mainStyle}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-article" element={<AddArticle />} />
          <Route path="/view-articles" element={<ViewArticles />} />
        </Routes>
      </main>
    </div>
  );
}
