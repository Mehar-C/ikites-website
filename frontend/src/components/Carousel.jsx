import { useRef, useState, useEffect } from 'react'

export default function Carousel({ children, className = '', showArrows = true, showDots = true, itemsPerView = 1 }) {
  const scrollRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [total, setTotal] = useState(0)

  const go = (dir) => {
    if (!scrollRef.current) return
    const el = scrollRef.current
    const cardWidth = el.querySelector('[data-carousel-item]')?.offsetWidth ?? el.offsetWidth / itemsPerView
    const gap = 24
    const scrollAmount = (cardWidth + gap) * (dir === 'next' ? 1 : -1)
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const items = el.querySelectorAll('[data-carousel-item]')
    setTotal(items.length)

    const onScroll = () => {
      const scrollLeft = el.scrollLeft
      const itemWidth = el.querySelector('[data-carousel-item]')?.offsetWidth ?? 1
      const gap = 24
      const newIndex = Math.round(scrollLeft / (itemWidth + gap))
      setIndex(Math.min(newIndex, items.length - 1))
    }
    el.addEventListener('scroll', onScroll)
    onScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [children])

  return (
    <div className={`carousel-wrap ${className}`}>
      {showArrows && (
        <>
          <button type="button" className="carousel-arrow carousel-arrow-prev" onClick={() => go('prev')} aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" className="carousel-arrow carousel-arrow-next" onClick={() => go('next')} aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </>
      )}
      <div className="carousel-track" ref={scrollRef}>
        {children}
      </div>
      {showDots && total > 1 && (
        <div className="carousel-dots">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={`carousel-dot ${i === index ? 'active' : ''}`}
              onClick={() => {
                if (!scrollRef.current) return
                const el = scrollRef.current
                const item = el.querySelector('[data-carousel-item]')
                const gap = 24
                el.scrollTo({ left: i * ((item?.offsetWidth ?? 0) + gap), behavior: 'smooth' })
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
