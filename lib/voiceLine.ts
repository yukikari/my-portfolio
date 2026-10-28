// Hero の下に引く「声の線」。音声波形に見立てた一本の細線で、
// 決まった位相の正弦波を足し合わせて作るため、ビルドのたびに同じ形になる。
// 装飾なので音声データは使わない。

export const VOICE_LINE_WIDTH = 1200
export const VOICE_LINE_HEIGHT = 72

export function voiceLinePath(width = VOICE_LINE_WIDTH, height = VOICE_LINE_HEIGHT): string {
  const mid = height / 2
  const step = 2
  const points: string[] = []

  for (let x = 0; x <= width; x += step) {
    // 両端で振幅を絞り、線が静かに始まって静かに終わるようにする
    const edge = Math.sin((Math.PI * x) / width)
    const ends = Math.pow(edge, 0.5)
    // 音節のような強弱のまとまり（ゆっくりした包絡線）
    const syllable = 0.35 + 0.65 * Math.pow(Math.abs(Math.sin(x * 0.0105 + 0.4)), 1.6)
    const breath = 0.7 + 0.3 * Math.sin(x * 0.0031 + 2.0)
    const envelope = ends * syllable * breath
    // 基本周波数と倍音に見立てた成分
    const fundamental = Math.sin(x * 0.075 + 1.3)
    const second = Math.sin(x * 0.15 + 0.6) * 0.38
    const third = Math.sin(x * 0.225 + 2.2) * 0.16
    const y = mid + (fundamental + second + third) * envelope * (height * 0.3)
    points.push(`${x === 0 ? 'M' : 'L'}${x} ${y.toFixed(2)}`)
  }

  return points.join(' ')
}
