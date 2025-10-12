
import React, { useState } from 'react';
import Container from './components/Container';
import MovieSearch from './components/MovieSearch';
import LocalMovies from './components/LocalMovies';
import './App.css';

function App() {
  const [tab, setTab] = useState('search');

  return (
    <div className="app-bg">
      <header className="main-header">
        <div className="logo-title">
          <span className="logo-icon">�</span>
          <span className="brand">FlixVault</span>
          <span className="brand-tagline">Premium Movie Discovery</span>
        </div>
        <nav className="nav-bar">
          <div className="nav-container">
            <button className={`nav-btn${tab === 'search' ? ' active' : ''}`} onClick={() => setTab('search')}>
              <span className="nav-icon">🔍</span>
              <span className="nav-text">Discover</span>
            </button>
            <button className={`nav-btn${tab === 'local' ? ' active' : ''}`} onClick={() => setTab('local')}>
              <span className="nav-icon">📚</span>
              <span className="nav-text">My Collection</span>
            </button>
          </div>
        </nav>
      </header>
      <main className="main-content">
        <Container>
          {tab === 'search' ? <MovieSearch /> : <LocalMovies />}
        </Container>
      </main>
      <footer className="footer">&copy; {new Date().getFullYear()} FlixVault. All rights reserved.</footer>
    </div>
  );
}

export default App;
