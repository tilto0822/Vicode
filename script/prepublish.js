const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const src = path.join(__dirname, '..', 'src');
const dest = path.join(__dirname, '..', 'build');

const rm = process.platform === 'win32' ? 'rmdir /s /q' : 'rm -rf';
cp.execSync(`${rm} ${dest}`);

const copyTypings = (src, dest) => {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest);
    const arr = fs.readdirSync(src);
    for (let child of arr) {
      copyTypings(path.join(src, child), path.join(dest, child));
    }
  } else if (src.endsWith('.d.ts')) {
    fs.copyFileSync(src, dest);
  }
};

copyTypings(src, dest);

process.chdir(path.join(__dirname, '..'));

cp.execSync('tsc --project tsconfig.json');
