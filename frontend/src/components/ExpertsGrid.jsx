import { useEffect, useMemo, useRef, useState } from 'react'
import { getGsap, prefersReducedMotion } from '../lib/gsapSetup'

const DESKTOP_VISIBLE = 4

function FlipIcon({ className }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 7h7a4 4 0 0 1 4 4v1"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 5L7 7l2 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M17 17H10a4 4 0 0 1-4-4v-1"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15 19l2-2-2-2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BackIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ExpertFlipCard({ expert, flipped, onToggle }) {
  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onToggle()
    }
  }

  return (
    <div className={`expert-flip${flipped ? ' is-flipped' : ''}`}>
      <div
        className="expert-flip__card"
        role="button"
        tabIndex={0}
        aria-expanded={flipped}
        aria-label={flipped ? `Hide bio for ${expert.name}` : `Show bio for ${expert.name}`}
        onClick={onToggle}
        onKeyDown={onKeyDown}
      >
        <div className="expert-flip__inner">
          <div className="expert-flip__face expert-flip__face--front">
            <div className="expert-flip__photo">
              {expert.image ? (
                <img
                  src={expert.image}
                  alt=""
                  className="expert-flip__img"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling?.classList.add('is-visible')
                  }}
                />
              ) : null}
              <div
                className={`expert-flip__initials${expert.image ? '' : ' is-visible'}`}
                aria-hidden="true"
              >
                {expert.initials}
              </div>
            </div>
            <div className="expert-flip__meta">
              <h3 className="expert-name">{expert.name.toUpperCase()}</h3>
              {expert.credentials ? (
                <p className="expert-credentials">{expert.credentials}</p>
              ) : null}
              <span className="expert-flip__hint">
                View bio
                <FlipIcon />
              </span>
            </div>
          </div>

          <div className="expert-flip__face expert-flip__face--back">
            <div className="expert-flip__back-top">
              <div className="expert-flip__back-heading">
                <h3 className="expert-name">{expert.name.toUpperCase()}</h3>
                {expert.credentials ? (
                  <p className="expert-credentials">{expert.credentials}</p>
                ) : null}
              </div>
              <span className="expert-flip__back-btn" aria-hidden="true">
                <BackIcon />
              </span>
            </div>
            <div
              className="expert-flip__bio-wrap"
              data-lenis-prevent
              data-lenis-prevent-wheel
              tabIndex={0}
              role="region"
              aria-label={`Biography for ${expert.name}`}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <p className="expert-bio expert-flip__bio">{expert.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ExpertsGrid({ experts }) {
  const rootRef = useRef(null)
  const animatedRef = useRef(false)
  const [flippedId, setFlippedId] = useState(null)
  const [index, setIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(DESKTOP_VISIBLE)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w <= 560) setVisibleCount(1)
      else if (w <= 800) setVisibleCount(2)
      else if (w <= 1100) setVisibleCount(3)
      else setVisibleCount(DESKTOP_VISIBLE)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxIndex = Math.max(0, experts.length - visibleCount)

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex))
  }, [maxIndex])

  const pageCount = maxIndex + 1
  const canPrev = index > 0
  const canNext = index < maxIndex

  const visible = useMemo(
    () => experts.slice(index, index + visibleCount),
    [experts, index, visibleCount],
  )

  const go = (dir) => {
    setFlippedId(null)
    setIndex((i) => Math.max(0, Math.min(maxIndex, i + dir)))
  }

  useEffect(() => {
    const root = rootRef.current
    if (!root || animatedRef.current) return undefined

    const { gsap } = getGsap()
    const cards = root.querySelectorAll('.expert-flip')
    const reduceMotion = prefersReducedMotion()

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(cards, { opacity: 1, y: 0 })
        animatedRef.current = true
        return
      }

      gsap.set(cards, { opacity: 0, y: 28 })
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 78%',
          once: true,
        },
        onComplete: () => {
          animatedRef.current = true
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!flippedId) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setFlippedId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flippedId])

  return (
    <div
      ref={rootRef}
      className="experts-carousel"
      aria-roledescription="carousel"
      aria-label="The Experts"
    >
      <div className="experts-carousel__viewport">
        <div
          className="experts-carousel__track"
          style={{ '--experts-visible': visibleCount }}
        >
          {visible.map((expert) => (
            <div key={expert.initials} className="experts-carousel__slide">
              <ExpertFlipCard
                expert={expert}
                flipped={flippedId === expert.initials}
                onToggle={() =>
                  setFlippedId((id) => (id === expert.initials ? null : expert.initials))
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="experts-carousel__controls">
        <button
          type="button"
          className="experts-carousel__btn"
          onClick={() => go(-1)}
          disabled={!canPrev}
          aria-label="Previous experts"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="experts-carousel__dots" role="tablist" aria-label="Expert pages">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show experts ${i + 1} to ${Math.min(i + visibleCount, experts.length)}`}
              className={`experts-carousel__dot${i === index ? ' is-active' : ''}`}
              onClick={() => {
                setFlippedId(null)
                setIndex(i)
              }}
            />
          ))}
        </div>
        <button
          type="button"
          className="experts-carousel__btn"
          onClick={() => go(1)}
          disabled={!canNext}
          aria-label="Next experts"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
