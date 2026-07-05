'use client'

import { useEffect, useRef } from 'react'
import styles from './WaveCanvas.module.scss'

const MAX_DPR = 2
const RESIZE_DEBOUNCE_MS = 150
const LINE_COUNT = 3
const ACCENT_COLOR = '0, 229, 199' // matches --color-accent (#00E5C7) as an rgb triplet

/**
 * Procedurally draws an oscilloscope-style layered waveform onto a full-bleed
 * canvas behind the Hero content. Purely decorative: `aria-hidden` and
 * `pointer-events: none` keep it out of the accessibility tree and the
 * interaction layer. No audio/file data is involved — the waveform is
 * synthesized from a handful of summed sine waves plus slow-moving noise.
 */
export default function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = 1
    let rafId: number | null = null
    let startTime = performance.now()
    let running = false
    let isVisible = true
    let isIntersecting = true

    function resize() {
      const parent = canvas!.parentElement
      const rect = parent ? parent.getBoundingClientRect() : canvas!.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      width = rect.width
      height = rect.height
      canvas!.width = Math.max(1, Math.round(width * dpr))
      canvas!.height = Math.max(1, Math.round(height * dpr))
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function drawFrame(t: number) {
      ctx!.clearRect(0, 0, width, height)

      const midY = height / 2
      for (let line = 0; line < LINE_COUNT; line++) {
        // Synthesize acoustic-like waves with base frequency, 2nd, and 3rd harmonics.
        // Amplitude: slightly reduced to keep it clean (0.04 to ~0.09)
        const amplitude = height * (0.04 + line * 0.025)
        // Speed: slowed down to about half of the previous rate for a graceful effect
        const speed = 0.00005 + line * 0.000025
        // Frequency: slightly higher to render more wave cycles across the screen
        const freq = 0.008 + line * 0.003
        const phase = t * speed + line * 12.9

        ctx!.beginPath()
        const step = 4
        for (let x = 0; x <= width; x += step) {
          // Fine high-frequency oscilloscope noise
          const noise = Math.sin(x * 0.035 + phase * 2.4) * amplitude * 0.08
          // Summed harmonic wave: f1 (60%), f2 (25%), f3 (15%) + noise
          const y =
            midY +
            Math.sin(x * freq + phase) * amplitude * 0.6 +
            Math.sin(x * freq * 2.0 + phase * 1.5) * amplitude * 0.25 +
            Math.sin(x * freq * 3.0 + phase * 2.2) * amplitude * 0.15 +
            noise
          if (x === 0) {
            ctx!.moveTo(x, y)
          } else {
            ctx!.lineTo(x, y)
          }
        }
        // Opacity: slightly lowered to blend elegantly into the dark background
        const opacity = 0.35 - line * 0.08
        ctx!.strokeStyle = `rgba(${ACCENT_COLOR}, ${opacity})`
        ctx!.lineWidth = 1.25 // Thinner line for high-precision oscilloscope look
        ctx!.stroke()
      }
    }

    function loop(t: number) {
      if (!running) return
      drawFrame(t - startTime)
      rafId = requestAnimationFrame(loop)
    }

    function start() {
      if (running || prefersReducedMotion) return
      if (!isVisible || !isIntersecting) return
      running = true
      startTime = performance.now()
      rafId = requestAnimationFrame(loop)
    }

    function stop() {
      running = false
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    }

    resize()

    if (prefersReducedMotion) {
      // Draw a single static frame and never animate.
      drawFrame(0)
    } else {
      start()
    }

    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        resize()
        if (prefersReducedMotion) drawFrame(0)
      }, RESIZE_DEBOUNCE_MS)
    }
    window.addEventListener('resize', onResize)

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible'
      if (isVisible) {
        start()
      } else {
        stop()
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    let observer: IntersectionObserver | null = null
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (!entry) return
          isIntersecting = entry.isIntersecting
          if (isIntersecting) {
            start()
          } else {
            stop()
          }
        },
        { threshold: 0 }
      )
      observer.observe(canvas)
    }

    return () => {
      stop()
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      if (resizeTimer) clearTimeout(resizeTimer)
      observer?.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
