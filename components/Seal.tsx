import { sealPaths, SEAL_SIZE, SEAL_RADIUS } from '@/lib/sealPaths'

/**
 * 名前の横に押す落款「優輝」。public/favicon.svg と同じ形。
 */
export default function Seal({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${SEAL_SIZE} ${SEAL_SIZE}`}
      width={SEAL_SIZE}
      height={SEAL_SIZE}
      role="img"
      aria-label="優輝の落款"
    >
      <rect width={SEAL_SIZE} height={SEAL_SIZE} rx={SEAL_RADIUS} style={{ fill: 'var(--accent)' }} />
      <g style={{ fill: 'var(--paper)' }}>
        {sealPaths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  )
}
