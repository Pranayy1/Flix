





import React, { useState, useRef, useEffect } from 'react';
import './ModernMovieApp.css';

// Initial local movies collection
const INITIAL_LOCAL_MOVIES = [
  // Local files - Using import.meta.env.BASE_URL for GitHub Pages compatibility
  { id: 'local-1', title: 'Blinding Lights', url: `${import.meta.env.BASE_URL}Blinding Lights.mp4`, type: 'local' },
  { id: 'local-2', title: 'Hardy Sandhu', url: `${import.meta.env.BASE_URL}Hardy Sandhu.mp4`, type: 'local' },
  { id: 'local-3', title: 'Kangana Tera Ni', url: `${import.meta.env.BASE_URL}Kangana Tera Ni.mp4`, type: 'local' },
  { id: 'local-4', title: 'Symphony', url: `${import.meta.env.BASE_URL}Symphony.mp4`, type: 'local' },
  
  // Google Drive cloud videos - Add your cloud videos here
  // Template: { id: 'cloud-X', title: 'Movie Title', url: 'https://drive.google.com/file/d/FILE_ID/preview', type: 'googledrive' },
  
  // Example Google Drive videos (replace with your actual file IDs):
  { id: 'cloud-1', title: 'Shikimori Edit', url: 'https://drive.google.com/file/d/18B_JmpNZQqAUMyaBSHFXyqLRAIaJ5po1/preview', type: 'googledrive' },
  { id: 'cloud-2', title: 'Kantara Chapter 1', url: 'https://drive.google.com/file/d/1EaAcp3b-AAwm6CzkwSnaswF7S9JalQSh/preview', type: 'googledrive' },
  // { id: 'cloud-2', title: 'My Movie 2', url: 'https://drive.google.com/file/d/2XYZabcdefgABCDEFGHIJKLMNOPQRSTUVW/preview', type: 'googledrive' },
  
  // Dropbox cloud videos - Add your Dropbox videos here
  // Template: { id: 'cloud-X', title: 'Movie Title', url: 'https://dropbox.com/s/FILE_ID/movie.mp4?raw=1', type: 'dropbox' },
  
  // Direct video URLs - Add direct video links here
  // Template: { id: 'cloud-X', title: 'Movie Title', url: 'https://example.com/video.mp4', type: 'direct' },
];

function LocalMovies() {
  const [movies, setMovies] = useState(INITIAL_LOCAL_MOVIES);
  const [currentPlayingVideo, setCurrentPlayingVideo] = useState(null);
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const videoRefs = useRef({});

  // Convert cloud URLs to streaming URLs
  const processVideoUrl = (url) => {
    // Google Drive - convert to iframe preview
    if (url.includes('drive.google.com/file/d/')) {
      const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      if (fileId) {
        return {
          streamUrl: `https://drive.google.com/file/d/${fileId}/preview`,
          type: 'googledrive'
        };
      }
    }
    
    // Google Drive - if it's already a sharing link, extract file ID
    if (url.includes('drive.google.com') && url.includes('/view')) {
      const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      if (fileId) {
        return {
          streamUrl: `https://drive.google.com/file/d/${fileId}/preview`,
          type: 'googledrive'
        };
      }
    }
    
    // Dropbox
    if (url.includes('dropbox.com')) {
      return {
        streamUrl: url.replace('?dl=0', '?raw=1'),
        type: 'dropbox'
      };
    }
    
    // Direct video files
    return {
      streamUrl: url,
      type: url.startsWith('/') ? 'local' : 'direct'
    };
  };

  // Add new cloud video
  const addCloudVideo = () => {
    if (newVideoUrl && newVideoTitle) {
      const { streamUrl, type } = processVideoUrl(newVideoUrl);
      
      const newMovie = {
        id: `cloud-${Date.now()}`,
        title: newVideoTitle,
        url: streamUrl,
        type: type,
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} video`
      };
      
      setMovies([newMovie, ...movies]);
      setNewVideoUrl('');
      setNewVideoTitle('');
      setShowAddForm(false);
    }
  };

  // Fullscreen API wrapper
  const enterFullscreen = (element) => {
    if (element.requestFullscreen) {
      return element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      return element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      return element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      return element.mozRequestFullScreen();
    }
    return Promise.reject(new Error('Fullscreen not supported'));
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      return document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      return document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      return document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      return document.mozCancelFullScreen();
    }
    return Promise.resolve();
  };

  // Stop all other videos
  const stopAllVideos = (currentId) => {
    movies.forEach(movie => {
      if (movie.id !== currentId) {
        const element = videoRefs.current[movie.id];
        if (element && element.pause && typeof element.pause === 'function') {
          element.pause();
        }
      }
    });
  };

  // Create fullscreen overlay for iframe videos
  const createFullscreenOverlay = (iframe, movieId) => {
    // Remove existing overlay
    const existingOverlay = document.getElementById('fullscreen-overlay');
    if (existingOverlay) {
      existingOverlay.remove();
    }

    // Create fullscreen overlay div
    const overlay = document.createElement('div');
    overlay.id = 'fullscreen-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: black;
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    // Clone the iframe
    const clonedIframe = iframe.cloneNode(true);
    clonedIframe.style.cssText = `
      width: 100vw;
      height: 100vh;
      border: none;
      background: black;
    `;

    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(0,0,0,0.7);
      color: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      font-size: 20px;
      cursor: pointer;
      z-index: 1000000;
    `;

    closeBtn.onclick = () => {
      overlay.remove();
      setCurrentPlayingVideo(null);
    };

    // Add ESC key handler
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        overlay.remove();
        setCurrentPlayingVideo(null);
        document.removeEventListener('keydown', handleEscKey);
      }
    };
    document.addEventListener('keydown', handleEscKey);

    overlay.appendChild(clonedIframe);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    return overlay;
  };

  // Main video click handler
  const handleVideoClick = async (movieId, movie) => {
    // Stop all other videos
    stopAllVideos(movieId);
    setCurrentPlayingVideo(movieId);

    const element = videoRefs.current[movieId];
    if (!element) return;

    if (movie.type === 'googledrive') {
      // For Google Drive - create custom fullscreen overlay
      try {
        // First try native fullscreen
        await enterFullscreen(element);
      } catch (error) {
        // If native fullscreen fails, use custom overlay
        createFullscreenOverlay(element, movieId);
      }
    } else {
      // For regular videos
      try {
        await element.play();
        // Small delay then fullscreen
        setTimeout(async () => {
          try {
            await enterFullscreen(element);
          } catch (error) {
            console.log('Fullscreen failed for regular video:', error);
          }
        }, 200);
      } catch (error) {
        console.log('Video play failed:', error);
      }
    }
  };

  // Handle video pause
  const handleVideoPause = (movieId) => {
    if (currentPlayingVideo === movieId) {
      setCurrentPlayingVideo(null);
    }
  };

  // Handle video ended
  const handleVideoEnded = (movieId) => {
    if (currentPlayingVideo === movieId) {
      setCurrentPlayingVideo(null);
    }
  };

  // Set video ref
  const setVideoRef = (movieId, element) => {
    if (element && !videoRefs.current[movieId]) {
      videoRefs.current[movieId] = element;
      
      const pauseHandler = () => handleVideoPause(movieId);
      const endedHandler = () => handleVideoEnded(movieId);
      
      element.addEventListener('pause', pauseHandler);
      element.addEventListener('ended', endedHandler);
      
      element._eventHandlers = { pauseHandler, endedHandler };
    }
  };

  // Set iframe ref
  const setIframeRef = (movieId, element) => {
    if (element) {
      videoRefs.current[movieId] = element;
    }
  };

  // Cleanup effects
  useEffect(() => {
    // Cleanup event listeners
    return () => {
      Object.values(videoRefs.current).forEach(element => {
        if (element && element._eventHandlers) {
          const { pauseHandler, endedHandler } = element._eventHandlers;
          if (pauseHandler) element.removeEventListener('pause', pauseHandler);
          if (endedHandler) element.removeEventListener('ended', endedHandler);
        }
      });
      
      // Remove any existing fullscreen overlay
      const overlay = document.getElementById('fullscreen-overlay');
      if (overlay) {
        overlay.remove();
      }
    };
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!(document.fullscreenElement || 
                             document.webkitFullscreenElement || 
                             document.mozFullScreenElement || 
                             document.msFullscreenElement);
      
      if (!isFullscreen && currentPlayingVideo) {
        const movie = movies.find(m => m.id === currentPlayingVideo);
        if (movie && movie.type !== 'googledrive') {
          const element = videoRefs.current[currentPlayingVideo];
          if (element && element.pause) {
            element.pause();
          }
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [currentPlayingVideo, movies]);

  return (
    <div className="movie-search-container">
      <div className="search-section">
        <div className="search-header">
          <h2 className="search-title">My Video Collection</h2>
          <p className="search-subtitle">Enjoy your personal library of movies and videos with automatic fullscreen playback</p>
        </div>
      </div>

      <div className="results-section">
        <div className="local-movies-info">
          <h2>🎬 FlixVault Collection</h2>
          <p>Stream videos from cloud storage or local files. Click any video to start watching in fullscreen mode. Only one video can play at a time for the best viewing experience.</p>
        </div>

        {/* Add Cloud Video Form */}
        <div className="add-video-section">
          <button 
            className="add-video-btn"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? '❌ Cancel' : '➕ Add Cloud Video'}
          </button>
          
          {showAddForm && (
            <div className="add-video-form">
              <h3>Add Video from Cloud Storage</h3>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Enter video title..."
                  value={newVideoTitle}
                  onChange={(e) => setNewVideoTitle(e.target.value)}
                  className="video-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="url"
                  placeholder="Enter direct video URL (Google Drive, Dropbox, etc.)"
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  className="video-input"
                />
              </div>
              <button 
                className="submit-video-btn"
                onClick={addCloudVideo}
                disabled={!newVideoUrl || !newVideoTitle}
              >
                Add Video to Collection
              </button>
              <div className="cloud-help">
                <h4>📋 How to get video URLs:</h4>
                <ul>
                  <li><strong>Google Drive:</strong> Share → Anyone with link → Copy link (will auto-display as iframe player)</li>
                  <li><strong>Dropbox:</strong> Share → Copy link → Replace 'dl=0' with 'raw=1' for direct streaming</li>
                  <li><strong>Direct URLs:</strong> Any direct .mp4, .webm, .mov file URL</li>
                </ul>
                <p><strong>💡 Note:</strong> Google Drive videos will automatically display as embedded players with full Google Drive functionality!</p>
              </div>
            </div>
          )}
        </div>

        <div className="movie-grid-container">
          <div className="movie-grid">
            {movies.length === 0 && <div className="no-movies">No videos found. Add some cloud videos or local files!</div>}
            {movies.map(movie => (
              <div className="movie-card glassy-panel" key={movie.id}>
                <div className="movie-info">
                  <div className="movie-title">{movie.title}</div>
                  <div className="movie-meta">
                    <span className="movie-type">
                      {movie.type === 'googledrive' ? '☁️ Google Drive' :
                       movie.type === 'dropbox' ? '📦 Dropbox' :
                       movie.type === 'direct' ? '🌐 Direct Link' :
                       '📁 Local File'}
                    </span>
                    <span className={`play-status ${currentPlayingVideo === movie.id ? 'playing' : ''}`}>
                      {currentPlayingVideo === movie.id ? '▶️ Playing' : '⏯️ Click to Play'}
                    </span>
                  </div>
                </div>
                <div 
                  className={`video-container ${currentPlayingVideo === movie.id ? 'playing' : ''}`}
                  onClick={() => handleVideoClick(movie.id, movie)}
                >
                  {movie.type === 'googledrive' ? (
                    // Google Drive videos as iframes with fullscreen functionality
                    <>
                      <iframe
                        ref={(el) => setIframeRef(movie.id, el)}
                        className="video-player iframe-player"
                        src={movie.url}
                        frameBorder="0"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        title={movie.title}
                      />
                      <div className="video-overlay">
                        <span className="overlay-text">🎬 Click for Fullscreen</span>
                      </div>
                    </>
                  ) : (
                    // Regular video element for other types
                    <>
                      <video 
                        ref={(el) => setVideoRef(movie.id, el)}
                        className="video-player" 
                        controls
                        src={movie.url}
                        preload="metadata"
                        onPlay={() => {
                          setCurrentPlayingVideo(movie.id);
                          stopAllVideos(movie.id);
                        }}
                      />
                      <div className="video-overlay">
                        <span className="overlay-text">🎬 Click for Fullscreen</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocalMovies;
