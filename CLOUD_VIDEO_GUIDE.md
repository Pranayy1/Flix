# 🎬 Cloud Video Hosting Guide for FlixVault

## ⚠️ **Why Google Drive & OneDrive Don't Work Directly**

Google Drive and OneDrive use authentication and CORS restrictions that prevent direct streaming with HTML5 video elements. However, FlixVault now supports **iframe embedding** for these services!

## ✅ **Working Solutions (Recommended)**

### **1. Free Direct Streaming Options**

#### **Cloudflare R2 (Best Option)**
- **Cost**: $0.015/GB storage + free bandwidth
- **Setup**: Create Cloudflare account → R2 → Upload videos → Get public URL
- **Direct Link**: `https://your-bucket.r2.cloudflarestorage.com/video.mp4`
- **Pros**: Fast, reliable, direct HTML5 streaming

#### **GitHub Releases (Public Videos)**
- **Cost**: Free
- **Setup**: Create release → Upload video → Copy download URL
- **Direct Link**: `https://github.com/user/repo/releases/download/v1.0/video.mp4`
- **Pros**: Free, reliable, great for public content

#### **Vercel Blob**
- **Cost**: 5GB free, then $0.15/GB
- **Setup**: Vercel account → Blob storage → Upload
- **Direct Link**: Direct streaming URLs provided
- **Pros**: Great for web apps, fast CDN

### **2. Working Iframe Solutions**

#### **Google Drive (Embedded)**
- **How**: Share video → Anyone with link → Copy link
- **FlixVault**: Automatically converts to iframe embed
- **Format**: `https://drive.google.com/file/d/FILE_ID/view`
- **Result**: Embedded Google Drive player

#### **OneDrive (Embedded)**  
- **How**: Share → Anyone with link → Copy link
- **FlixVault**: Automatically converts to iframe embed
- **Format**: `https://1drv.ms/v/s!...`
- **Result**: Embedded OneDrive player

## 🛠️ **How to Use Each Service**

### **Cloudflare R2 (Recommended)**
```bash
1. Go to Cloudflare.com → Sign up
2. Dashboard → R2 Object Storage
3. Create bucket (e.g., "my-videos")
4. Upload video files
5. Make bucket public or get signed URLs
6. Copy direct URLs to FlixVault
```

### **GitHub Releases**
```bash
1. Go to your GitHub repo
2. Releases → Create new release
3. Upload video files as assets
4. Publish release
5. Right-click video → Copy link address
6. Paste URL in FlixVault
```

### **Google Drive (Iframe)**
```bash
1. Upload video to Google Drive
2. Right-click → Share → Anyone with link
3. Copy the sharing URL
4. Paste directly in FlixVault
5. FlixVault will embed it automatically
```

## 🎯 **Quick Setup Guide**

### **For Direct Streaming (Best Quality)**
1. Use Cloudflare R2, GitHub Releases, or Vercel Blob
2. Upload your video files
3. Get direct .mp4/.webm URLs
4. Add to FlixVault → Full HTML5 controls + fullscreen

### **For Drive/OneDrive (Embedded)**
1. Upload to Google Drive or OneDrive
2. Share with "Anyone with link"
3. Copy sharing URL
4. Add to FlixVault → Iframe embedded player

## 📊 **Comparison Table**

| Service | Cost | Speed | Quality | Fullscreen | Direct Stream |
|---------|------|-------|---------|------------|---------------|
| Cloudflare R2 | $0.015/GB | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ | ✅ |
| GitHub Releases | Free | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ | ✅ |
| Vercel Blob | $0.15/GB | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ | ✅ |
| Google Drive | Free | ⭐⭐⭐ | ⭐⭐⭐ | ✅ | 🚫 (Iframe) |
| OneDrive | Free | ⭐⭐⭐ | ⭐⭐⭐ | ✅ | 🚫 (Iframe) |

## � **Pro Tips**

1. **For Best Performance**: Use Cloudflare R2 or GitHub Releases
2. **For Free Option**: GitHub Releases for public videos
3. **For Private Videos**: Cloudflare R2 with signed URLs
4. **Video Format**: MP4 with H.264 codec works best
5. **File Size**: Keep under 500MB for smooth streaming

## � **Troubleshooting**

### **Video Won't Play**
- Check if URL is direct (.mp4, .webm, .mov)
- Verify CORS settings if using custom storage
- Try iframe mode for Drive/OneDrive

### **Slow Loading**
- Use CDN-based storage (Cloudflare R2)
- Compress videos before upload
- Use appropriate video resolution

### **Access Denied**
- Ensure sharing settings are "Anyone with link"
- Check if video file is public
- Verify URL format is correct

## 📝 **Example URLs**

```
✅ Direct Streaming URLs (Work with HTML5):
https://your-bucket.r2.cloudflarestorage.com/movie.mp4
https://github.com/user/repo/releases/download/v1.0/video.mp4
https://blob.vercel-storage.com/video-abc123.mp4

✅ Iframe Embedding URLs (Work with iframe):
https://drive.google.com/file/d/1ABC...XYZ/view
https://1drv.ms/v/s!ABC...XYZ
https://www.youtube.com/watch?v=ABC123

❌ These DON'T work directly:
https://drive.google.com/file/d/123/view (needs iframe)
https://1drv.ms/v/s!123 (needs iframe)
Private sharing links without public access
```

Need help? The FlixVault app will automatically detect your URL type and handle the embedding for you! 🎬

Happy streaming! 🎬✨