const fs = require('fs');
const https = require('https');
const path = require('path');

const missingImages = [
  {
    name: 'french-fries.jpg',
    url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1600&auto=format&fit=crop'
  },
  {
    name: 'steel.jpg',
    url: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?q=80&w=1600&auto=format&fit=crop'
  }
];

const destDir = path.join(__dirname, '..', 'public', 'images');

function downloadImage(img) {
  return new Promise((resolve) => {
    const filePath = path.join(destDir, img.name);
    const file = fs.createWriteStream(filePath);

    function fetchUrl(targetUrl) {
      https.get(targetUrl, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file);
          file.on('finish', () => {
            file.close(() => {
              console.log(`Successfully downloaded: ${img.name}`);
              resolve(true);
            });
          });
        } else if (response.statusCode === 301 || response.statusCode === 302) {
          fetchUrl(response.headers.location);
        } else {
          console.error(`Failed ${img.name}: HTTP ${response.statusCode}`);
          resolve(false);
        }
      }).on('error', (err) => {
        console.error(`Error downloading ${img.name}:`, err.message);
        resolve(false);
      });
    }

    fetchUrl(img.url);
  });
}

async function run() {
  for (const img of missingImages) {
    await downloadImage(img);
  }
}

run();
