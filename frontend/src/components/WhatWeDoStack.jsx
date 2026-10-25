import { useEffect, useRef, useState } from 'react'
import { CAPABILITIES } from '../data/capabilities'
import { getGsap, prefersReducedMotion } from '../lib/gsapSetup'

/* Below sticky nav only — heading scrolls away before the stack piles up */
const STICKY_TOPS = [120, 140, 160, 180]

function StackCard({ capability, index, active }) {
  const num = String(index + 1).padStart(2, '0')
  return (
    <article
      className={`what-we-do-stack-card${active ? ' is-active' : ''}`}
      data-glow
    >
      <span className="what-we-do-stack-card__num" aria-hidden="true">{num}</span>
      <div className="what-we-do-stack-card__main">
        <div className="what-we-do-stack-card-icon" aria-hidden="true">
          {capability.icon}
        </div>
        <h3 className="what-we-do-stack-card__title">{capability.title}</h3>
        <p className="what-we-do-stack-card__desc">{capability.desc}</p>
      </div>
      <ul className="what-we-do-stack-card__list">
        {capability.items.map((item, i) => (
          <li key={item} className="what-we-do-stack-card__item" style={{ '--item-i': i }}>
            {item}
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function WhatWeDoStack() {
  const rootRef = useRef(null)
  const [active, setActive] = useState(0)
  const [covered, setCovered] = useState(() => CAPABILITIES.map(() => 0))
  const [stackMode, setStackMode] = useState(() => {
    if (typeof window === 'undefined') return false
    return !prefersReducedMotion() && !window.matchMedia('(max-width: 900px)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    const sync = () => {
      setStackMode(!prefersReducedMotion() && !mq.matches)
    }
    sync()
    mq.addEventListener?.('change', sync)
    return () => mq.removeEventListener?.('change', sync)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const cards = Array.from(root.querySelectorAll('.what-we-do-stack__card'))
    if (!cards.length) return undefined

    if (!stackMode) {
      setCovered(CAPABILITIES.map(() => 0))
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('is-revealed')
          })
        },
        { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
      )
      cards.forEach((el) => io.observe(el))
      return () => io.disconnect()
    }

    const { gsap, ScrollTrigger } = getGsap()
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const inner = card.querySelector('.what-we-do-stack-card')
        if (!inner) return

        ScrollTrigger.create({
          trigger: card,
          start: `top ${STICKY_TOPS[i] + 8}px`,
          end: i < cards.length - 1
            ? () => `top ${STICKY_TOPS[i + 1]}px`
            : 'bottom center',
          endTrigger: i < cards.length - 1 ? cards[i + 1] : card,
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        })

        if (i < cards.length - 1) {
          // Dim via scale + brightness only — never opacity (keeps cards solid/opaque)
          gsap.fromTo(
            inner,
            { scale: 1, filter: 'brightness(1)' },
            {
              scale: 0.94,
              filter: 'brightness(0.9)',
              ease: 'none',
              transformOrigin: 'center top',
              scrollTrigger: {
                trigger: cards[i + 1],
                start: 'top bottom',
                end: `top ${STICKY_TOPS[i + 1]}px`,
                scrub: true,
                onUpdate: (self) => {
                  setCovered((prev) => {
                    if (Math.abs(prev[i] - self.progress) < 0.02) return prev
                    const next = prev.slice()
                    next[i] = self.progress
                    return next
                  })
                },
              },
            },
          )
        }
      })
    }, root)

    return () => ctx.revert()
  }, [stackMode])

  return (
    <section
      className={`what-we-do what-we-do--stack${stackMode ? ' what-we-do--stack-live' : ' what-we-do--stack-static'}`}
      id="what-we-do"
      ref={rootRef}
    >
      <h2 className="what-we-do-title">What We Do</h2>

      <div className="what-we-do-stack-layout">
        {stackMode ? (
          <aside className="what-we-do-stack-rail" aria-hidden="true">
            <div className="what-we-do-stack-rail__inner">
              {CAPABILITIES.map((cap, i) => {
                const progress = covered[i] || 0
                const show = progress > 0.08
                return (
                  <div
                    key={cap.id}
                    className={`what-we-do-stack-rail__item${show ? ' is-visible' : ''}${progress > 0.55 ? ' is-solid' : ''}`}
                    style={{
                      '--rail-progress': progress,
                      opacity: Math.min(1, Math.max(0, (progress - 0.08) / 0.45)),
                      transform: `translate3d(${(1 - Math.min(1, progress)) * 28}px, 0, 0)`,
                    }}
                  >
                    <span className="what-we-do-stack-rail__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="what-we-do-stack-rail__title">{cap.title}</span>
                  </div>
                )
              })}
            </div>
          </aside>
        ) : null}

        <div className="what-we-do-stack">
          {CAPABILITIES.map((cap, i) => (
            <div
              key={cap.id}
              className="what-we-do-stack__card"
              style={{ '--stack-top': `${STICKY_TOPS[i]}px`, '--stack-z': i + 1 }}
            >
              <StackCard capability={cap} index={i} active={stackMode ? active === i : true} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
