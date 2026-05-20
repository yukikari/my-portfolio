const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  console.log('Building static site with STATIC_EXPORT=true...');
  execSync('npx next build', {
    env: { ...process.env, STATIC_EXPORT: 'true' },
    stdio: 'inherit'
  });

  const outDir = path.join(__dirname, '../out');
  const docsDir = path.join(__dirname, '../docs');

  console.log('Cleaning old docs folder...');
  if (fs.existsSync(docsDir)) {
    fs.rmSync(docsDir, { recursive: true, force: true });
  }

  console.log('Moving out to docs...');
  fs.renameSync(outDir, docsDir);

  // GitHub Pagesでアンダースコア(_)から始まるNext.jsアセットをロードできるようにする
  console.log('Creating .nojekyll file in docs...');
  fs.writeFileSync(path.join(docsDir, '.nojekyll'), '');

  console.log('Static build completed! Output is in /docs');
} catch (error) {
  console.error('Static build failed:', error);
  process.exit(1);
}
