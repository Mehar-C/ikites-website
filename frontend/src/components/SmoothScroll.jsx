import { useEffect } from 'react'
import Lenis from 'lenis'
import { getGsap } from '../lib/gsapSetup'

/**
 * Sitewide Lenis smooth scroll, synced with GSAP ScrollTrigger.
 * Disabled when prefers-reduced-motion is set.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const { gsap, ScrollTrigger } = getGsap()
    // Approximate cubic-bezier(0.22, 1, 0.36, 1) for Lenis
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => 1 - Math.pow(1 - t, 3.2),
      smoothWheel: true,
      touchMultiplier: 1.2,
    })

    document.documentElement.classList.add('lenis-active')

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    const onResize = () => {
      lenis.resize()
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      gsap.ticker.remove(ticker)
      document.documentElement.classList.remove('lenis-active')
      lenis.destroy()
    }
  }, [])

  return children
}
