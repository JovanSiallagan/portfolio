import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Membaca PORT dari environment variable
const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  // Ambil request path (tanpa query string)
  const cleanUrl = req.url ? req.url.split('?')[0] : '/';
  let filePath = path.join(DIST_DIR, cleanUrl === '/' ? 'index.html' : cleanUrl);

  // Periksa apakah file fisik tersedia
  fs.stat(filePath, (err, stats) => {
    // Jika file tidak ada (SPA client-side route), fallback ke dist/index.html
    if (err || !stats.isFile()) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      } else {
        // Cache static assets (JS/CSS/Images), disable cache for HTML
        const cacheControl = ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable';
        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': cacheControl,
        });
        res.end(content);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Portfolio server running on port ${PORT}`);
});
