# 🎬 FlixVault - Video Streaming Troubleshooting Guide

## 🔧 Common Issues and Solutions

### 1. Google Drive Videos Not Playing
**Problem:** Google Drive videos show thumbnail but won't play in the app.
**Solution:** 
- Google Drive videos will now open in a new tab when clicked
- This is due to CORS (security) restrictions from Google
- The video will play properly in the new tab with Google's video player

### 2. Getting Proper Google Drive Links
**Steps:**
1. Upload your video to Google Drive
2. Right-click → Share → Change access to "Anyone with the link"
3. Copy the share link (it looks like: `https://drive.google.com/file/d/ABC123/view?usp=sharing`)
4. Use this link directly in FlixVault

### 3. Best Video Hosting Options for Direct Streaming

#### ✅ **Works Great (Direct Streaming):**
- **Cloudflare R2** - $0.015/GB, perfect for video streaming
- **AWS S3** - Industry standard, reliable
- **Dropbox** - Use `?raw=1` instead of `?dl=0` in share links
- **Direct server URLs** - Any `.mp4`, `.webm`, `.mov` file served from a web server

#### ⚠️ **Limited (Opens in New Tab):**
- **Google Drive** - Works but opens in new tab due to security
- **OneDrive** - Works but opens in new tab due to security

#### ❌ **Doesn't Work:**
- YouTube links (use YouTube embed instead)
- Social media video links (Facebook, Instagram, etc.)
- Password-protected or private links

### 4. How to Set Up Cloudflare R2 (Recommended)

Cloudflare R2 is the best option for video streaming:

1. **Sign up for Cloudflare** (free tier available)
2. **Create an R2 bucket:**
   - Go to R2 Object Storage
   - Create a new bucket (e.g., "my-videos")
   - Make it public for video access

3. **Upload your videos:**
   - Upload `.mp4` files to your bucket
   - Get the public URL (e.g., `https://pub-abc123.r2.dev/my-video.mp4`)

4. **Use in FlixVault:**
   - Add the direct R2 URL to your video collection
   - Videos will stream directly without issues

### 5. Local Video Setup

For local videos in your `public/` folder:
1. Place video files in `/public/` directory
2. Add them to the `MOVIE_COLLECTION` array in `LocalMovies.jsx`
3. Use the filename as the URL (e.g., `/my-video.mp4`)

### 6. Video Format Recommendations

**Best Formats:**
- **MP4 (H.264)** - Universal compatibility
- **WebM** - Good compression, modern browsers
- **MOV** - Works well, larger file sizes

**Avoid:**
- AVI (limited browser support)
- MKV (limited browser support)
- Very large files (>2GB may have issues)

### 7. Debugging Video Issues

If a video isn't working:

1. **Check the URL:** Paste it directly in a new browser tab
2. **Check the format:** Make sure it's MP4, WebM, or MOV
3. **Check the file size:** Very large files may take time to load
4. **Check CORS:** Some servers block cross-origin requests

### 8. Performance Tips

- **Use appropriate video quality:** 720p or 1080p is usually sufficient
- **Compress videos:** Use tools like HandBrake to reduce file sizes
- **Use proper hosting:** Avoid free file hosting services with bandwidth limits

## 🆘 Still Having Issues?

1. **Check browser console:** Press F12 → Console for error messages
2. **Try different browsers:** Chrome, Firefox, Safari, Edge
3. **Check network connection:** Ensure stable internet for cloud videos
4. **Verify video file:** Make sure the video file isn't corrupted

## 📞 Contact & Support

If you're still experiencing issues, check:
- Browser compatibility (Chrome, Firefox, Safari, Edge all supported)
- Video file format and size
- Network connectivity
- CORS policy of your video hosting service

---

**Happy Streaming! 🎬✨**