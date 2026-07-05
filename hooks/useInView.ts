import { useEffect, useRef, useState, type RefObject } from 'react'

/**
 * Tracks whether the given element has entered the viewport, using
 * IntersectionObserver. Used as the fallback (and, for elements that
 * animate via JS-driven staggering rather than pure CSS, the primary
 * mechanism) for scroll entrance animations.
 *
 * Once the element has entered the viewport the observer disconnects,
 * so the returned value only ever flips from `false` to `true`.
 */
export function useInView<T extends Element>(
  ref: RefObject<T>,
  options?: IntersectionObserverInit
): boolean {
  const [inView, setInView] = useState(false)
  const hasEntered = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Respect reduced-motion: treat content as already visible.
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasEntered.current) {
            hasEntered.current = true
            setInView(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px', ...options }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, options])

  return inView
}
