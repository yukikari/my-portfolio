/**
 * OGP 画像と favicon 類を生成する。
 *   - public/og-image.png         1200x630（紙色の地に名前・二文・所属・声の線・落款）
 *   - public/apple-touch-icon.png 180x180（public/favicon.svg = 落款 から）
 *   - public/favicon.ico          16x16 + 32x32（同上）
 *
 * 実行: node scripts/generate-assets.js
 * 文言（data/profile.ts）や配色（app/globals.scss）を変えたら再実行する。
 * SVG 内の文字は実行環境のフォントで描画されるため、明朝が入っている環境で実行すること。
 */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const pngToIco = require('png-to-ico').default

const publicDir = path.join(__dirname, '..', 'public')

const PAPER = '#F6F3EC'
const INK = '#1D1B18'
const INK_SOFT = '#5B574F'
const ACCENT = '#B5392B'
const SERIF = "'Noto Serif JP', 'Noto Serif CJK JP', 'Hiragino Mincho ProN', 'Yu Mincho', serif"
const SANS = "'Noto Sans JP', 'Noto Sans CJK JP', 'Hiragino Sans', 'Yu Gothic', sans-serif"

const OG_WIDTH = 1200
const OG_HEIGHT = 630

// data/profile.ts と lib/voiceLine.ts は TypeScript なので、ここでは同じ値・同じ式を持つ。
// 名前・二文・所属を変えたときは両方を直す。
const NAME = '安尾 優輝'
const NAME_ROMANIZED = 'Yuki Yasuo'
const TAGLINE = ['声帯を使えなくなった人のための代用発声を研究しています。', '地域の記録映像や紙面もつくっています。']
const AFFILIATION = '筑波大学大学院 エンパワーメント情報学プログラム 一貫制博士課程／音響工学'

function voiceLinePath(width, height, offsetX, offsetY) {
  const mid = height / 2
  const step = 2
  const points = []
  for (let x = 0; x <= width; x += step) {
    const edge = Math.sin((Math.PI * x) / width)
    const ends = Math.pow(edge, 0.5)
    const syllable = 0.35 + 0.65 * Math.pow(Math.abs(Math.sin(x * 0.0105 + 0.4)), 1.6)
    const breath = 0.7 + 0.3 * Math.sin(x * 0.0031 + 2.0)
    const envelope = ends * syllable * breath
    const fundamental = Math.sin(x * 0.075 + 1.3)
    const second = Math.sin(x * 0.15 + 0.6) * 0.38
    const third = Math.sin(x * 0.225 + 2.2) * 0.16
    const y = mid + (fundamental + second + third) * envelope * (height * 0.3)
    points.push(`${x === 0 ? 'M' : 'L'}${(x + offsetX).toFixed(1)} ${(y + offsetY).toFixed(2)}`)
  }
  return points.join(' ')
}

function ogImageSvg(faviconSvg) {
  // 落款は favicon.svg の中身をそのまま入れ子にする（64x64 の座標系）
  const seal = faviconSvg
    .replace(/^<\?xml[^>]*>\s*/, '')
    .replace(/<svg\b[^>]*>/, (tag) =>
      tag.replace(/\s(width|height)="[^"]*"/g, '').replace('<svg ', '<svg x="1056" y="104" width="72" height="72" ')
    )
  const line = voiceLinePath(1040, 72, 80, 300)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="${PAPER}" />
  <text x="80" y="212" font-family="${SERIF}" font-size="112" font-weight="600" letter-spacing="6" fill="${INK}">${NAME}</text>
  <text x="84" y="262" font-family="${SANS}" font-size="22" letter-spacing="2" fill="${INK_SOFT}">${NAME_ROMANIZED}</text>
  ${seal}
  <path d="${line}" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.85" />
  <text x="80" y="450" font-family="${SERIF}" font-size="34" font-weight="500" fill="${INK}">${TAGLINE[0]}</text>
  <text x="80" y="506" font-family="${SERIF}" font-size="34" font-weight="500" fill="${INK}">${TAGLINE[1]}</text>
  <text x="80" y="570" font-family="${SANS}" font-size="20" fill="${INK_SOFT}">${AFFILIATION}</text>
</svg>`
}

async function main() {
  const faviconSvg = fs.readFileSync(path.join(publicDir, 'favicon.svg'), 'utf8')

  // --- og-image.png ---
  await sharp(Buffer.from(ogImageSvg(faviconSvg))).png().toFile(path.join(publicDir, 'og-image.png'))
  console.log('Generated public/og-image.png')

  // --- apple-touch-icon.png (from favicon.svg) ---
  await sharp(Buffer.from(faviconSvg)).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'))
  console.log('Generated public/apple-touch-icon.png')

  // --- favicon.ico (16x16 + 32x32) ---
  const png16 = await sharp(Buffer.from(faviconSvg)).resize(16, 16).png().toBuffer()
  const png32 = await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toBuffer()
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), await pngToIco([png16, png32]))
  console.log('Generated public/favicon.ico')
}

main().catch((err) => {
  console.error('Asset generation failed:', err)
  process.exit(1)
})

// ACCENT は favicon.svg 側で使っている（ここでは参照のみ）
void ACCENT
