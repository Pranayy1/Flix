# 🎬 FlixVault

A React-based movie discovery and video streaming web application built with Vite. Search for movies using the OMDb API and maintain your personal video collection with cloud and local video support.

## 🌐 Live Demo

**Visit:** https://pranayy1.github.io/Flix/

**Repository:** https://github.com/Pranayy1/Flix

## ✨ Features

- **Movie Search:** Discover movies using the OMDb API
- **Movie Details:** View comprehensive information including ratings, cast, plot, and more
- **Video Collection:** Maintain a personal collection of videos
- **Cloud Video Support:** Stream videos from Google Drive, Dropbox, and direct URLs
- **Fullscreen Playback:** Enjoy immersive fullscreen video experience
- **Responsive Design:** Works seamlessly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OMDb API key (get it from [omdbapi.com](https://www.omdbapi.com/apikey.aspx))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Pranayy1/Flix.git
cd Flix
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
VITE_OMDB_API_KEY=your_omdb_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📦 Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📤 Deployment to GitHub Pages

1. Ensure your `package.json` has the correct `homepage` field:
```json
"homepage": "https://yourusername.github.io/Flix"
```

2. Deploy:
```bash
npm run deploy
```

This will build the app and push to the `gh-pages` branch.

## 🎥 Adding Videos to Your Collection

### Method 1: Using the "Add Cloud Video" Button (Easiest)
1. Click "➕ Add Cloud Video" on your live site
2. Enter video title
3. Paste Google Drive or direct video link
4. Click "Add Video to Collection"
5. Video appears instantly (note: won't persist after refresh)

### Method 2: Adding Permanently via Code
1. Upload video to your preferred hosting service
2. Get the shareable link
3. Edit `src/components/LocalMovies.jsx`
4. Add to the `INITIAL_LOCAL_MOVIES` array:
```javascript
{
  id: 'cloud-1',
  title: 'Your Video Title',
  url: 'https://drive.google.com/file/d/YOUR_FILE_ID/preview',
  type: 'googledrive'
}
```

## 🌩️ Video Hosting Recommendations

### Best Options for Direct Streaming:
- **Cloudflare R2** - $0.015/GB, excellent for video streaming
- **GitHub Releases** - Free for public videos
- **Vercel Blob** - 5GB free, great for web apps
- **AWS S3** - Industry standard, reliable

### Cloud Storage with Iframe Embedding:
- **Google Drive** - Free, works with iframe embedding
- **Dropbox** - Use `?raw=1` in share links
- **OneDrive** - Works with iframe embedding

### Video Format Tips:
- **Best Formats:** MP4 (H.264), WebM, MOV
- **Avoid:** AVI, MKV (limited browser support)
- **Optimal Size:** Keep under 500MB for smooth streaming

## 🔧 Troubleshooting

### Videos Not Playing?
1. **Check the URL:** Paste it directly in a new browser tab
2. **Check the format:** Ensure it's MP4, WebM, or MOV
3. **Check CORS:** Some servers block cross-origin requests
4. **Try iframe mode:** For Google Drive/OneDrive links

### Google Drive Videos:
- Share → "Anyone with the link"
- Use the format: `https://drive.google.com/file/d/FILE_ID/preview`
- Videos will open in embedded player

### Performance Issues:
- Use appropriate video quality (720p or 1080p is sufficient)
- Compress videos using tools like HandBrake
- Use CDN-based storage for better performance

## 📁 Project Structure

```
Flix/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images and media
│   ├── components/     # React components
│   │   ├── Container.jsx
│   │   ├── LocalMovies.jsx
│   │   └── MovieSearch.jsx
│   ├── App.jsx         # Main app component
│   ├── App.css         # App styles
│   ├── index.css       # Global styles
│   └── main.jsx        # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🛠️ Built With

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **OMDb API** - Movie database API
- **CSS3** - Styling with modern features

## ⚙️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages

## 🔒 Security Notes

- API keys are exposed in frontend code (acceptable for OMDb free tier)
- For production applications, consider using a backend proxy
- Never commit `.env` files containing sensitive data

## 📝 License

This project is open source. Feel free to use it for learning or as a template for your own projects.

## 🆘 Support

If you encounter issues:
1. Check browser console (F12 → Console) for error messages
2. Verify your video URLs are accessible
3. Ensure you have a valid OMDb API key
4. Check that all dependencies are installed correctly

---

**Happy Streaming! 🎬✨**
