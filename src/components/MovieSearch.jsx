



import React, { useState } from 'react';
import './ModernMovieApp.css';

const OMDB_API_KEY = '8007f10a'; // Replace with your OMDb API key
const OMDB_URL = 'https://www.omdbapi.com/';

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setError('');
    setMovies([]);
    setSelectedMovie(null);
    setMovieDetails(null);
    try {
      const res = await fetch(`${OMDB_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.Response === 'True' && data.Search) setMovies(data.Search);
      else setError(data.Error || 'No movies found.');
    } catch (err) {
      setError('Failed to fetch movies.');
    }
    setLoading(false);
  };

  const fetchMovieDetails = async (imdbID) => {
    setDetailsLoading(true);
    try {
      const res = await fetch(`${OMDB_URL}?apikey=${OMDB_API_KEY}&i=${imdbID}&plot=full`);
      const data = await res.json();
      if (data.Response === 'True') {
        setMovieDetails(data);
        setSelectedMovie(imdbID);
      }
    } catch (err) {
      console.error('Failed to fetch movie details:', err);
    }
    setDetailsLoading(false);
  };

  const closeDetails = () => {
    setSelectedMovie(null);
    setMovieDetails(null);
  };

  return (
    <div className="movie-search-container">
      <div className="search-section">
        <div className="search-header">
          <h2 className="search-title">Discover Amazing Movies</h2>
          <p className="search-subtitle">Search through thousands of movies and find your next favorite</p>
        </div>
        <form className="search-form" onSubmit={searchMovies}>
          <div className="search-input-wrapper">
            <input
              className="search-input"
              type="text"
              placeholder="Search for a movie..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <div className="search-icon">🔍</div>
          </div>
          <button className="search-btn" type="submit">
            <span className="btn-text">Search</span>
            <span className="btn-icon">→</span>
          </button>
        </form>
      </div>

      <div className="results-section">
        {loading && (
          <div className="loading">
            <div className="loading-spinner"></div>
            <span>Searching for movies...</span>
          </div>
        )}
        {error && <div className="error-msg">{error}</div>}
        
        {movies.length > 0 && (
          <div className="results-header">
            <h3>Found {movies.length} result{movies.length !== 1 ? 's' : ''} for "{query}"</h3>
          </div>
        )}
        
        <div className="movie-grid-container">
          <div className="movie-grid">
            {movies.map((movie, index) => (
              <div 
                className="movie-card glassy-panel" 
                key={movie.imdbID}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => fetchMovieDetails(movie.imdbID)}
              >
                <div className="movie-poster-container">
                  {movie.Poster && movie.Poster !== 'N/A' ? (
                    <img className="movie-poster" src={movie.Poster} alt={movie.Title} />
                  ) : (
                    <div className="movie-poster placeholder">
                      <span className="placeholder-icon">🎬</span>
                      <span className="placeholder-text">No Image</span>
                    </div>
                  )}
                  <div className="movie-overlay">
                    <span className="overlay-text">View Details</span>
                  </div>
                </div>
                <div className="movie-info">
                  <div className="movie-title">{movie.Title}</div>
                  <div className="movie-meta">
                    <span className="movie-year">{movie.Year}</span>
                    <span className="movie-type">{movie.Type ? movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1) : ''}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <div className="movie-modal-overlay" onClick={closeDetails}>
          <div className="movie-modal" onClick={(e) => e.stopPropagation()}>
            {detailsLoading ? (
              <div className="modal-loading">
                <div className="loading-spinner"></div>
                <span>Loading movie details...</span>
              </div>
            ) : movieDetails ? (
              <>
                <button className="modal-close" onClick={closeDetails}>×</button>
                <div className="modal-content">
                  <div className="modal-poster">
                    {movieDetails.Poster && movieDetails.Poster !== 'N/A' ? (
                      <img src={movieDetails.Poster} alt={movieDetails.Title} />
                    ) : (
                      <div className="modal-poster-placeholder">
                        <span className="placeholder-icon">🎬</span>
                      </div>
                    )}
                  </div>
                  <div className="modal-info">
                    <h2 className="modal-title">{movieDetails.Title}</h2>
                    <div className="modal-meta">
                      <span className="meta-item">
                        <strong>Year:</strong> {movieDetails.Year}
                      </span>
                      <span className="meta-item">
                        <strong>Runtime:</strong> {movieDetails.Runtime}
                      </span>
                      <span className="meta-item">
                        <strong>Genre:</strong> {movieDetails.Genre}
                      </span>
                      <span className="meta-item">
                        <strong>Director:</strong> {movieDetails.Director}
                      </span>
                    </div>
                    
                    {movieDetails.Plot && movieDetails.Plot !== 'N/A' && (
                      <div className="modal-plot">
                        <h3>Plot</h3>
                        <p>{movieDetails.Plot}</p>
                      </div>
                    )}
                    
                    {movieDetails.Actors && movieDetails.Actors !== 'N/A' && (
                      <div className="modal-actors">
                        <h3>Cast</h3>
                        <p>{movieDetails.Actors}</p>
                      </div>
                    )}
                    
                    <div className="modal-ratings">
                      {movieDetails.imdbRating && movieDetails.imdbRating !== 'N/A' && (
                        <div className="rating-item">
                          <span className="rating-source">IMDb</span>
                          <span className="rating-value">{movieDetails.imdbRating}/10</span>
                        </div>
                      )}
                      {movieDetails.Ratings && movieDetails.Ratings.map((rating, index) => (
                        <div key={index} className="rating-item">
                          <span className="rating-source">{rating.Source}</span>
                          <span className="rating-value">{rating.Value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieSearch;
