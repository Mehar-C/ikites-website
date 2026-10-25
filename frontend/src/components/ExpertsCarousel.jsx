import { useEffect, useMemo, useState } from 'react'

const VISIBLE = 3

function ExpertCard({ expert, expanded, onExpand, onCollapse }) {
  return (
    <article
      className="expert-card expert-card--carousel motion-card motion-card--tilt"
      data-glow
      aria-expanded={expanded}
    >
      <div className="expert-photo-cell">
        <div className="expert-photo-wrap">
          {expert.image ? (
            <img
              src={expert.image}
              alt=""
              className="expert-photo"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextElementSibling?.classList.remove('expert-initials--fallback')
              }}
            />
          ) : null}
          <div
            className={`expert-initials ${expert.image ? 'expert-initials--fallback' : 'expert-initials--visible'}`}
            aria-hidden="true"
          >
            {expert.initials}
          </div>
        </div>
      </div>
      <div className="expert-info">
        <h3 className="expert-name">{expert.name.toUpperCase()}</h3>
        {expert.credentials ? (
          <p className="expert-credentials">{expert.credentials}</p>
        ) : null}
        {expanded ? (
          <>
            <p className="expert-bio">{expert.bio}</p>
            <button
              type="button"
              className="expert-read-less"
              onClick={onCollapse}
              aria-label={`Show less about ${expert.name}`}
            >
              Read Less ↓
            </button>
          </>
        ) : (
          <button
            type="button"
            className="expert-expand"
            onClick={onExpand}
            aria-label={`More about ${expert.name}`}
            aria-expanded="false"
          >
            +
          </button>
        )}
      </div>
    </article>
  )
}

export default function ExpertsCarousel({ experts }) {
  const [index, setIndex] = useState(0)
  const [expandedExpert, setExpandedExpert] = useState(null)
  const [visibleCount, setVisibleCount] = useState(VISIBLE)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w <= 560) setVisibleCount(1)
      else if (w <= 900) setVisibleCount(2)
      else setVisibleCount(VISIBLE)
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
    setExpandedExpert(null)
    setIndex((i) => Math.max(0, Math.min(maxIndex, i + dir)))
  }

  return (
    <div className="experts-carousel" aria-roledescription="carousel" aria-label="The Experts">
      <div className="experts-carousel__viewport">
        <div
          className="experts-carousel__track"
          style={{ '--experts-visible': visibleCount }}
        >
          {visible.map((expert) => (
            <div key={expert.initials} className="experts-carousel__slide">
              <ExpertCard
                expert={expert}
                expanded={expandedExpert === expert.initials}
                onExpand={() => setExpandedExpert(expert.initials)}
                onCollapse={() => setExpandedExpert(null)}
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
                setExpandedExpert(null)
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
