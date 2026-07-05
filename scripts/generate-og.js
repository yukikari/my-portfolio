/**
 * Generates static OGP/favicon assets from SVG templates:
 *   - public/og-image.png        1200x630
 *   - public/apple-touch-icon.png 180x180 (from public/favicon.svg)
 *   - public/favicon.ico          16x16 + 32x32 (from public/favicon.svg)
 *
 * Run with: node scripts/generate-og.js
 * Re-run whenever the design tokens or favicon motif change.
 */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const pngToIco = require('png-to-ico').default

const publicDir = path.join(__dirname, '..', 'public')

const OG_WIDTH = 1200
const OG_HEIGHT = 630

function ogImageSvg() {
  // Layered "oscilloscope" waveform lines behind the name/affiliation text,
  // in the same palette as the live Hero canvas (bg #0A0E14, accent #00E5C7).
  const waveLines = []
  const lineCount = 3
  for (let line = 0; line < lineCount; line++) {
    const amplitude = 26 + line * 16
    const baseY = 460 + line * 8
    const opacity = (0.5 - line * 0.13).toFixed(2)
    let d = `M -20 ${baseY}`
    for (let x = -20; x <= OG_WIDTH + 20; x += 20) {
      const y = baseY + Math.sin(x * 0.02 + line * 1.7) * amplitude + Math.sin(x * 0.05 + line) * amplitude * 0.3
      d += ` L ${x} ${y.toFixed(1)}`
    }
    waveLines.push(
      `<path d="${d}" fill="none" stroke="#00E5C7" stroke-width="2" opacity="${opacity}" />`
    )
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="#0A0E14" />
  ${waveLines.join('\n  ')}
  <text x="90" y="270" font-family="Arial, 'Noto Sans JP', sans-serif" font-size="88" font-weight="700" fill="#E6E8EB">安尾 優輝</text>
  <text x="92" y="322" font-family="Arial, sans-serif" font-size="30" font-weight="500" letter-spacing="6" fill="#8A94A6">YUKI YASUO</text>
  <text x="90" y="385" font-family="Arial, 'Noto Sans JP', sans-serif" font-size="26" fill="#8A94A6">筑波大学 エンパワーメント情報学プログラム 博士課程</text>
  <text x="90" y="422" font-family="Arial, 'Noto Sans JP', sans-serif" font-size="26" fill="#8A94A6">音響工学・システム開発・映像制作</text>
  <rect x="0" y="0" width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="none" stroke="rgba(230,232,235,0.08)" stroke-width="2" />
</svg>`
}

async function main() {
  // --- og-image.png ---
  const ogSvg = Buffer.from(ogImageSvg())
  await sharp(ogSvg).png().toFile(path.join(publicDir, 'og-image.png'))
  console.log('Generated public/og-image.png')

  // --- apple-touch-icon.png (from favicon.svg) ---
  const faviconSvgPath = path.join(publicDir, 'favicon.svg')
  const faviconSvg = fs.readFileSync(faviconSvgPath)

  await sharp(faviconSvg).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'))
  console.log('Generated public/apple-touch-icon.png')

  // --- favicon.ico (16x16 + 32x32) ---
  const png16 = await sharp(faviconSvg).resize(16, 16).png().toBuffer()
  const png32 = await sharp(faviconSvg).resize(32, 32).png().toBuffer()
  const icoBuffer = await pngToIco([png16, png32])
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer)
  console.log('Generated public/favicon.ico')
}

main().catch((err) => {
  console.error('Asset generation failed:', err)
  process.exit(1)
})
