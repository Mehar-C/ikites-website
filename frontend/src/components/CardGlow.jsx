import { useEffect } from 'react'

const SELECTOR = '[data-glow]'

/**
 * Cursor-following border glow for cards marked with data-glow.
 * Skips coarse pointers and reduced-motion.
 */
export default function CardGlow() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduceMotion || coarse) return undefined

    const onMove = (e) => {
      const el = e.target.closest?.(SELECTOR)
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      el.style.setProperty('--glow-x', `${x.toFixed(2)}%`)
      el.style.setProperty('--glow-y', `${y.toFixed(2)}%`)
    }

    const onEnter = (e) => {
      const el = e.target.closest?.(SELECTOR)
      if (el) el.style.setProperty('--glow-opacity', '1')
    }

    const onLeave = (e) => {
      const el = e.target.closest?.(SELECTOR)
      if (el) el.style.setProperty('--glow-opacity', '0')
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onEnter, { passive: true })
    document.addEventListener('pointerout', onLeave, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onEnter)
      document.removeEventListener('pointerout', onLeave)
    }
  }, [])

  return null
}
