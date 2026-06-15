import { useState } from 'react';
import Container from './components/Container';
import MovieSearch from './components/MovieSearch';
import LocalMovies from './components/LocalMovies';
import './App.css';

function App() {
  const [tab, setTab] = useState('search');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flix-app">
      <nav className="flix-navbar">
        <div className="flix-navbar-inner">
          <div className="flix-logo-group" onClick={() => setTab('search')}>
            <span className="flix-logo-icon">🎬</span>
            <span className="flix-brand">FlixVault</span>
            <span className="flix-tagline">Premium Movie Discovery</span>
          </div>
          <div className="flix-nav-center">
            <button
              className={`flix-nav-btn${tab === 'search' ? ' active' : ''}`}
              onClick={() => { setTab('search'); setMobileMenuOpen(false); }}
            >
              <span className="flix-nav-icon">🔍</span>
              <span className="flix-nav-label">Discover</span>
            </button>
            <button
              className={`flix-nav-btn${tab === 'local' ? ' active' : ''}`}
              onClick={() => { setTab('local'); setMobileMenuOpen(false); }}
            >
              <span className="flix-nav-icon">📚</span>
              <span className="flix-nav-label">My Collection</span>
            </button>
          </div>
          <div className="flix-nav-right">
            <a className="flix-back-link" href="https://pranayy1.github.io/Studyplay/">
              <span className="flix-back-arrow">←</span>
              <span>StudyPlay</span>
            </a>
            <button
              className="flix-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="flix-mobile-menu">
            <button
              className={`flix-mobile-nav-btn${tab === 'search' ? ' active' : ''}`}
              onClick={() => { setTab('search'); setMobileMenuOpen(false); }}
            >
              <span className="flix-nav-icon">🔍</span>
              <span>Discover</span>
            </button>
            <button
              className={`flix-mobile-nav-btn${tab === 'local' ? ' active' : ''}`}
              onClick={() => { setTab('local'); setMobileMenuOpen(false); }}
            >
              <span className="flix-nav-icon">📚</span>
              <span>My Collection</span>
            </button>
            <a className="flix-mobile-back-link" href="https://pranayy1.github.io/Studyplay/">
              <span>←</span>
              <span>StudyPlay</span>
            </a>
          </div>
        )}
      </nav>
      <main className="flix-main">
        <Container>
          {tab === 'search' ? <MovieSearch /> : <LocalMovies />}
        </Container>
      </main>
      <footer className="flix-footer">
        <div className="flix-footer-inner">
          <div className="flix-footer-brand">
            <span className="flix-logo-icon" style={{fontSize:'1.5rem'}}>🎬</span>
            <span className="flix-footer-name">FlixVault</span>
          </div>
          <p className="flix-footer-text">© {new Date().getFullYear()} FlixVault — All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
