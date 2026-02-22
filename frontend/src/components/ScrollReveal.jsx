import { useRef, useState, useEffect } from 'react'

export default function ScrollReveal({ children, className = '', delay = 0, stagger = 0 }) {
  const ref = useRef(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true)
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${revealed ? 'is-revealed' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, '--stagger': stagger ? `${stagger}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}
