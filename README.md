# Spend-na PWA

**Your money mirror. Every rupee has a story.**

A Progressive Web App (PWA) for tracking and managing your expenses with beautiful, intuitive interface.

## Features

- 📱 **Progressive Web App** - Works offline with service worker
- 💰 **Expense Tracking** - Track your spending habits
- 📊 **Visual Analytics** - See your spending patterns at a glance
- 🎨 **Beautiful UI** - Modern, responsive design
- ⚡ **Fast & Offline First** - Works seamlessly online and offline
- 📥 **Installable** - Add to your home screen like a native app

## Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla)
- Service Workers for offline functionality
- PWA Manifest for app installation

## Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/sandeephakki/spend-na.git
cd spend-na
```

2. Start a local web server:
```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

### Installing as a PWA

1. Open the app in your browser
2. Look for an "Install" or "Add to Home Screen" prompt
3. Click to install the app on your device
4. The app will now appear on your home screen like a native app

## GitHub Pages Deployment

This app is automatically deployed to GitHub Pages at:
**https://sandeephakki.github.io/spend-na/**

### How to Deploy

1. The `main` branch is automatically deployed to GitHub Pages
2. Any push to the `main` branch triggers a new deployment
3. Changes will be live at the GitHub Pages URL within a few minutes

### GitHub Pages Setup (Already Configured)

- **Source Branch**: `main`
- **Deployment URL**: https://sandeephakki.github.io/spend-na/
- **Custom Domain**: Not configured (optional)

## Project Structure

```
spend-na/
├── index.html          # Main application
├── manifest.json       # PWA manifest for app installation
├── sw.js              # Service worker for offline functionality
├── files/             # Assets and icons
│   ├── bird_512.png   # App icon (512x512)
│   ├── AppIcon_1024.png # App icon (1024x1024)
│   └── ...
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## Service Worker

The `sw.js` file handles:
- **Caching** - Caches resources for offline access
- **Offline Mode** - Serves cached content when offline
- **Cache Updates** - Updates cache when new versions are available

## Manifest

The `manifest.json` file enables:
- App installation on home screen
- Custom app name and icons
- Splash screen appearance
- Theme color configuration

## Browser Support

- ✅ Chrome/Chromium (v40+)
- ✅ Firefox (v44+)
- ✅ Safari (v11.1+)
- ✅ Edge (v79+)
- ✅ Samsung Internet (v4+)

## Performance

- **Lighthouse Score**: Optimized for performance
- **Offline Support**: Full offline functionality
- **Fast Loading**: Optimized caching strategy
- **Mobile Ready**: Fully responsive design

## How to Update the App

1. Make changes to the code
2. Commit changes to git:
```bash
git add .
git commit -m "Your commit message"
```

3. Push to GitHub:
```bash
git push origin main
```

The changes will be automatically deployed to GitHub Pages within a few minutes.

## Troubleshooting

### Service Worker not updating?
- Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Unregister the old service worker in DevTools
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Cache outdated?
- The service worker caches resources for offline use
- Check the cache name in `sw.js` and update if needed
- Clear site data in browser settings

### HTTPS Required
- PWAs require HTTPS (except localhost for development)
- GitHub Pages automatically uses HTTPS

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues, feature requests, or suggestions, please use the GitHub Issues page.

---

Made with ❤️ by Sandeep
