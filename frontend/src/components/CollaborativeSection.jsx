import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { getGsap, prefersReducedMotion } from '../lib/gsapSetup'

const PARTNERS = [
  { name: 'PROCORE', logo: '/logos/procore.svg', url: 'https://www.procore.com/en-ca' },
  { name: 'EverTech XR', logo: '/logos/Evertech%20XR.png', url: 'https://evertechxr.com/' },
  { name: 'BUILDOTS', logo: '/logos/buildots.png', url: 'https://buildots.com/' },
  { name: 'Perspect Analytics', logo: '/logos/perspect%20analytics.png', url: 'https://perspectanalytics.com/' },
  { name: 'Plan Academy', logo: '/logos/plan.png', url: 'https://www.planacademy.com/' },
  { name: 'ContractorOS', logo: '/logos/contractoros-logo.png', url: 'https://contractoros.build/' },
]

/** Easy-to-edit visual size balance (1 = default). */
export const COLLAB_LOGO_SCALE = {
  PROCORE: 1.05,
  'EverTech XR': 1.05,
  BUILDOTS: 0.95,
  'Perspect Analytics': 1.02,
  'Plan Academy': 1,
  ContractorOS: 0.92,
}

const TITLE = 'The Collaborative'

function buildCurve(hx, hy, x, y) {
  const dy = Math.max(y - hy, 8)
  const cp1x = hx
  const cp1y = hy + dy * 0.4
  const cp2x = x
  const cp2y = y - dy * 0.35
  return { d: `M ${hx} ${hy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`, x, y }
}

export default function CollaborativeSection() {
  const rootRef = useRef(null)
  const networkRef = useRef(null)
  const partnersRef = useRef(null)
  const animatedRef = useRef(false)
  const [links, setLinks] = useState([])
  const [hub, setHub] = useState({ x: 0, y: 28 })
  const [hovered, setHovered] = useState(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const reduceMotion = useMemo(() => prefersReducedMotion(), [])
  const titleChars = useMemo(() => TITLE.split(''), [])

  const recalc = () => {
    const network = networkRef.current
    const partners = partnersRef.current
    if (!network || !partners) return
    const nRect = network.getBoundingClientRect()
    const cards = Array.from(partners.querySelectorAll('.collab-partner-item'))
    if (!cards.length) return

    const hx = nRect.width / 2
    const hy = 28
    setHub({ x: hx, y: hy })
    setLinks(
      cards.map((card) => {
        const r = card.getBoundingClientRect()
        const x = r.left - nRect.left + r.width / 2
        const y = r.top - nRect.top
        return buildCurve(hx, hy, x, y)
      }),
    )
    setSize({ w: nRect.width, h: nRect.height })
  }

  useLayoutEffect(() => {
    recalc()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => recalc()) : null
    if (networkRef.current && ro) ro.observe(networkRef.current)
    if (partnersRef.current && ro) ro.observe(partnersRef.current)
    window.addEventListener('resize', recalc)
    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', recalc)
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root || animatedRef.current) return undefined

    const { gsap, ScrollTrigger } = getGsap()
    const intro = root.querySelector('.collab-intro')
    const chars = root.querySelectorAll('.collab-title__char')
    const subtitle = root.querySelector('.collab-subtitle')
    const cards = root.querySelectorAll('.collab-partner-item')
    const mqMobile = window.matchMedia('(max-width: 900px)')

    const ctx = gsap.context(() => {
      const run = () => {
        const lines = root.querySelectorAll('.collab-network__line')
        const showNetwork = !mqMobile.matches

        if (reduceMotion) {
          gsap.set([intro, chars, subtitle, cards], { opacity: 1, y: 0, scale: 1 })
          if (showNetwork) gsap.set(lines, { strokeDashoffset: 0 })
          animatedRef.current = true
          return
        }

        gsap.set(intro, { opacity: 0, y: 8 })
        gsap.set(chars, { opacity: 0, y: 10 })
        gsap.set(subtitle, { opacity: 0, y: 12 })
        gsap.set(cards, { opacity: 0, scale: 0.92 })

        if (showNetwork && lines.length) {
          lines.forEach((line) => {
            const len = line.getTotalLength?.() || 240
            gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })
          })
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top 72%',
            once: true,
          },
        })

        tl.to(intro, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0)
        tl.to(chars, { opacity: 1, y: 0, duration: 0.45, stagger: 0.028, ease: 'power2.out' }, 0.18)
        tl.to(subtitle, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.12')

        if (showNetwork && lines.length) {
          tl.to(
            lines,
            { strokeDashoffset: 0, duration: 0.9, stagger: 0.08, ease: 'power2.out' },
            '-=0.2',
          )
        }

        tl.to(
          cards,
          { opacity: 1, scale: 1, duration: 0.55, stagger: 0.07, ease: 'power2.out' },
          showNetwork ? '-=0.5' : '-=0.05',
        )

        animatedRef.current = true
      }

      // Wait a frame so SVG paths exist after first layout
      requestAnimationFrame(() => {
        requestAnimationFrame(run)
      })
    }, root)

    return () => ctx.revert()
  }, [reduceMotion, links.length])

  return (
    <section className="the-collaborative" id="the-collaborative" ref={rootRef}>
      <p className="collab-intro">We shape smarter systems through expert collaboration</p>
      <h2 className="collab-title" aria-label={TITLE}>
        {titleChars.map((ch, i) => (
          <span key={`${ch}-${i}`} className="collab-title__char" aria-hidden="true">
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </h2>
      <p className="collab-subtitle">Where human collaboration meets intelligent technology</p>
      <p className="collab-body">
        We believe meaningful innovation is strengthened by collaboration. We bring together insights and expertise from technology innovators, industry specialists, and professional organizations to support digital transformation, applied AI, and industry-focused learning. Our collaborations have included expert-led discussions, technology demonstrations, practical case studies, and knowledge-sharing initiatives that connect emerging technologies with real-world industry challenges. We value the expertise and contributions of organizations that have been part of our journey.
      </p>

      <p className="collab-partners-label">Organizations that have contributed expertise and insights to our initiatives.</p>

      <div className="collab-network" ref={networkRef}>
        <svg
          className="collab-network__svg"
          width={size.w || '100%'}
          height={size.h || '100%'}
          viewBox={`0 0 ${Math.max(size.w, 1)} ${Math.max(size.h, 1)}`}
          aria-hidden="true"
        >
          <defs>
            <filter id="collabHubGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {links.map((link, i) => (
            <g key={PARTNERS[i].name} className={`collab-network__link${hovered === i ? ' is-hot' : ''}`}>
              <path
                className="collab-network__line"
                d={link.d}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth={hovered === i ? 2.25 : 1.35}
                strokeLinecap="round"
              />
              {!reduceMotion ? (
                <circle className="collab-network__pulse" r="2.4" fill="var(--color-accent)">
                  <animateMotion
                    dur={`${3.8 + i * 0.4}s`}
                    begin={`${0.2 + i * 0.32}s`}
                    repeatCount="indefinite"
                    path={link.d}
                  />
                </circle>
              ) : null}
              <circle
                className={`collab-network__terminus${hovered === i ? ' is-hot' : ''}`}
                cx={link.x}
                cy={link.y}
                r="3.4"
                fill="var(--color-accent)"
              />
            </g>
          ))}

          <circle
            className="collab-network__hub-halo"
            cx={hub.x}
            cy={hub.y}
            r="14"
            fill="var(--color-accent)"
            opacity="0.18"
            filter="url(#collabHubGlow)"
          />
          <circle className="collab-network__hub" cx={hub.x} cy={hub.y} r="5" fill="var(--color-accent)" />
        </svg>

        <div className="collab-partners" ref={partnersRef}>
          {PARTNERS.map((partner, i) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="collab-partner-item"
              data-glow
              data-partner={partner.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              style={{ '--logo-scale': COLLAB_LOGO_SCALE[partner.name] ?? 1 }}
            >
              <span className="collab-partner-logo-wrap">
                <img
                  src={partner.logo}
                  alt=""
                  className="collab-partner-img"
                  onLoad={(e) => {
                    e.target.classList.add('collab-partner-img--loaded')
                    e.target.nextElementSibling?.classList.remove('collab-partner-fallback--show')
                    recalc()
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextElementSibling?.classList.add('collab-partner-fallback--show')
                  }}
                />
                <span className="collab-partner-fallback collab-partner-fallback--show">{partner.name}</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="collab-quote-card" data-glow>
        <p>
          The Collaborative comes to life through{' '}
          <a href="#the-experts" className="collab-experts-link">
            <strong>Experts</strong>
            <span className="collab-experts-link__arrow" aria-hidden="true">→</span>
          </a>{' '}
          who bridge human expertise and AI-driven intelligence.
        </p>
      </div>
    </section>
  )
}
