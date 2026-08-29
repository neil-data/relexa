const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
  {
    name: 'hero-port.jpg',
    url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2000&auto=format&fit=crop'
  },
  {
    name: 'healthcare.jpg',
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1600&auto=format&fit=crop'
  },
  {
    name: 'pharmaceutical-lab.jpg',
    url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1600&auto=format&fit=crop'
  },
  {
    name: 'dental-care.jpg',
    url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1600&auto=format&fit=crop'
  },
  {
    name: 'frozen-food.jpg',
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1600&auto=format&fit=crop'
  },
  {
    name: 'french-fries.jpg',
    url: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=1600&auto=format&fit=crop'
  },
  {
    name: 'pet-nutrition.jpg',
    url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=1600&auto=format&fit=crop'
  },
  {
    name: 'dog-food.jpg',
    url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1600&auto=format&fit=crop'
  },
  {
    name: 'cat-food.jpg',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1600&auto=format&fit=crop'
  },
  {
    name: 'steel.jpg',
    url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1600&auto=format&fit=crop'
  },
  {
    name: 'steel-coil.jpg',
    url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1600&auto=format&fit=crop'
  },
  {
    name: 'steel-fabrication.jpg',
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop'
  },
  {
    name: 'global-logistics.jpg',
    url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1600&auto=format&fit=crop'
  },
  {
    name: 'warehouse.jpg',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop'
  },
  {
    name: 'cargo-ship.jpg',
    url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1600&auto=format&fit=crop'
  }
];

const destDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function downloadImage(img) {
  return new Promise((resolve) => {
    const filePath = path.join(destDir, img.name);
    const file = fs.createWriteStream(filePath);

    https.get(img.url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            console.log(`Downloaded: ${img.name}`);
            resolve(true);
          });
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, (redirectResponse) => {
          redirectResponse.pipe(file);
          file.on('finish', () => {
            file.close(() => {
              console.log(`Downloaded (redirect): ${img.name}`);
              resolve(true);
            });
          });
        }).on('error', (err) => {
          console.error(`Error downloading redirect for ${img.name}:`, err.message);
          resolve(false);
        });
      } else {
        console.error(`Failed ${img.name}: HTTP ${response.statusCode}`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.error(`Error downloading ${img.name}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  console.log('Downloading real editorial stock photography...');
  for (const img of images) {
    await downloadImage(img);
  }
  console.log('Finished downloading photography assets.');
}

run();
