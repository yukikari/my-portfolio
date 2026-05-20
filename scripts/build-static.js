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
  const staticProjDir = path.join(__dirname, '../../my-portfolio-static');

  console.log('Preparing static project directory...');
  if (!fs.existsSync(staticProjDir)) {
    fs.mkdirSync(staticProjDir, { recursive: true });
  }

  // 古いファイルをクリーンアップ（.gitは残す）
  console.log('Cleaning old static files...');
  const files = fs.readdirSync(staticProjDir);
  for (const file of files) {
    if (file !== '.git') {
      fs.rmSync(path.join(staticProjDir, file), { recursive: true, force: true });
    }
  }

  // out フォルダの中身を staticProjDir に移動
  console.log('Moving build output to static project...');
  const outFiles = fs.readdirSync(outDir);
  for (const file of outFiles) {
    fs.renameSync(path.join(outDir, file), path.join(staticProjDir, file));
  }

  // GitHub Pages用の.nojekyllを配置
  console.log('Creating .nojekyll file...');
  fs.writeFileSync(path.join(staticProjDir, '.nojekyll'), '');

  // 一時的なoutフォルダを削除
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }

  console.log('Static build completed! Output is in ../my-portfolio-static');
} catch (error) {
  console.error('Static build failed:', error);
  process.exit(1);
}

