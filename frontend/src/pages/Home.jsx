import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import FloatingShapes from '../components/FloatingShapes'
import NoiseOverlay from '../components/NoiseOverlay'
import IntroSequence from '../components/IntroSequence'
import FloatingOrbsBackground from '../components/FloatingOrbsBackground'
import WhatWeDoStack from '../components/WhatWeDoStack'
import ExpertsGrid from '../components/ExpertsGrid'
import CollaborativeSection from '../components/CollaborativeSection'
import { articles } from '../data/articles'

const INTRO_SCROLL_RATIO = 0.85

const EXPERTS = [
  { initials: 'MK', name: 'Mostafa Khorshidi', credentials: '', role: 'Project Controls · iKites', image: '/experts/Mostafa%20Khorshidi.jpg', bio: 'Mo Khorshidi is a project management and project controls professional with over 14 years of experience in planning, scheduling, forecasting and project controls across the energy, nuclear, engineering and financial services sectors. With expertise in Primavera P6, Microsoft Project and Power BI, he focuses on practical applications of technology to improve project scheduling, forecasting and decision-making.' },
  { initials: 'CS', name: 'Corey Shelson', credentials: 'MBA', role: 'Co-Founder · Appello', image: '/experts/Corey%20Shelson.jpg', bio: 'Corey Shelson is the co-founder of Appello, a construction management software platform serving construction and trade professionals across Canada and the U.S., where he leads applied AI initiatives. He works closely with ICI trade contractors, translating real-world challenges into practical digital solutions and AI workflows. His diverse background includes service as a Canadian Armed Forces combat engineer officer and engineering management in the nuclear sector. Corey holds an engineering degree from the Royal Military College of Canada and an MBA from Ivey Business School. He is also a frequent speaker on AI in construction at industry conferences and association events.' },
  { initials: 'JT', name: 'Josh Turner', credentials: 'PMP', role: 'Co-Founder · ContractorOS', image: '/experts/Josh%20Turner.png', bio: 'Josh Turner is the co-founder of ContractorOS, where he helps contractors apply AI to everyday construction work. He brings more than 10 years of construction experience across New Zealand and Canada, from site engineering through to project management. Through ContractorOS, he teaches practical AI workflows and works with construction teams to apply them to their own projects.' },
  { initials: 'HC', name: 'Harjit Chatha', credentials: 'C.Eng, MBA, FIMarEST', role: 'Strategic Leader · Public Safety Technology & Emerging Tech', image: '/experts/Harjit%20Chatha.jpg', bio: 'Strategic leader and Naval veteran with deep expertise in project management, modernizing critical infrastructure, and applying AI, data analytics, and cloud technologies. Brings proven experience in vendor negotiations and regulatory compliance to public safety and emerging technology initiatives.' },
  { initials: 'JJ', name: 'Justin Johnson', credentials: 'PMP, LEED AP, CM-LEAN', role: 'Account Executive · Buildots', image: '/experts/Justin%20Johnson%20-%20Headshot.jpeg', bio: 'Justin helps construction companies leverage technology for smarter project delivery. He brings rich experience managing complex projects and a strong understanding of industry challenges. Justin holds a Bachelor of Applied Science in Civil Engineering from the University of Waterloo.' },
  { initials: 'ML', name: 'Michael Lepage', credentials: 'Founder: Plan Academy', role: 'Digital Transformation & Project Delivery · iKites', image: '/experts/michael-lepage-headshot.jpg', bio: 'Michael has been teaching project controls for almost two decades. He founded Plan Academy in 2013 and has written and recorded hundreds of tutorials on planning and scheduling, Primavera P6 Professional, and project controls. A member of AACE, Michael is a trainer, a YouTuber, an author, and an advocate for better project controls.' },
  { initials: 'BA', name: 'Ben Ashburn', credentials: 'Senior Trainer & Program Manager, Procore Industry Advancement', role: 'Collaborator · iKites', image: '/experts/ben-new.png', bio: 'Ben has over 20 years experience in trades, estimating, and construction management. Ben uses his experience in industry and education to contribute to the goal of Procore\'s Industry Advancement Team.' },
  { initials: 'SS', name: 'Stan Shantz', credentials: 'Co-Founder & Vice President', role: 'Predictive Technology Expert · Perspect Analytics Inc.', image: '/experts/Stan%20Shantz.jpg', bio: 'Co-Founder and Vice President at Perspect Analytics Inc. and EverTech XR. Expert in predictive technologies and data-driven asset management, with experience across MRO, AM, FM, and IM. Drives mixed reality and analytics solutions for smarter asset and operations management.' },
  { initials: 'TS', name: 'Tom Stephenson', credentials: 'MBA, CM-LEAN, PMP', role: 'Professor & Construction Expert · George Brown College', image: '/experts/Tom%20Stephenson.jpg', bio: 'Professor and construction expert at George Brown College. Experienced lecturer, consultant, and author with contributions to BILD, OHBA, CHBA, and the Mechanical Contractors\' Association of Toronto. Recognized for teaching and industry engagement in construction management and lean practices.' },
  { initials: 'VC', name: 'Vikram Chauhan', credentials: 'P.Eng, PGMP, PMP, PMI-RMP', role: 'Senior Project Manager · Powell Inc', image: '/experts/Vikram%20Chauhan.jpg', bio: 'Naval veteran and Senior Project Manager with an Electrical Engineering degree and MBA from the University of Alberta. Over 15 years of project management experience in manufacturing and defence, including monitoring and execution of infrastructure projects exceeding US $400M. Expertise in technical management, supply chain and logistics, project finances, and repair, maintenance, and refurbishment of electrical equipment.' },
]

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [heroEntered, setHeroEntered] = useState(false)
  const heroVizRef = useRef(null)
  const heroCtaRef = useRef(null)
  const parallaxRef = useRef({ x: 0, y: 0, rx: 0, ry: 0 })

  useEffect(() => {
    const introHeight = () => window.innerHeight * INTRO_SCROLL_RATIO
    const onScroll = () => {
      const p = Math.min(1, window.scrollY / introHeight())
      setScrollProgress(p)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setHeroEntered(true)
      return
    }
    if (scrollProgress >= 0.55) setHeroEntered(true)
  }, [scrollProgress])

  useEffect(() => {
    const el = heroVizRef.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (reduceMotion || isCoarse || window.innerWidth <= 900) return

    let raf = 0
    const max = 12
    const maxTilt = 7

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      const cx = Math.max(-1, Math.min(1, nx))
      const cy = Math.max(-1, Math.min(1, ny))
      parallaxRef.current = {
        x: cx * max,
        y: cy * max,
        ry: cx * maxTilt,
        rx: -cy * maxTilt,
      }
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0
          const { x, y, rx, ry } = parallaxRef.current
          el.style.setProperty('--parallax-x', `${x.toFixed(2)}px`)
          el.style.setProperty('--parallax-y', `${y.toFixed(2)}px`)
          el.style.setProperty('--tilt-x', `${rx.toFixed(2)}deg`)
          el.style.setProperty('--tilt-y', `${ry.toFixed(2)}deg`)
        })
      }
    }

    const onLeave = () => {
      el.style.setProperty('--parallax-x', '0px')
      el.style.setProperty('--parallax-y', '0px')
      el.style.setProperty('--tilt-x', '0deg')
      el.style.setProperty('--tilt-y', '0deg')
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    const btn = heroCtaRef.current
    if (!btn) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (reduceMotion || isCoarse) return undefined

    let raf = 0
    const strength = 0.28

    const onMove = (e) => {
      const rect = btn.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0
          btn.style.setProperty('--mag-x', `${(dx * strength).toFixed(2)}px`)
          btn.style.setProperty('--mag-y', `${(dy * strength).toFixed(2)}px`)
        })
      }
    }

    const onLeave = () => {
      btn.style.setProperty('--mag-x', '0px')
      btn.style.setProperty('--mag-y', '0px')
    }

    btn.addEventListener('pointermove', onMove)
    btn.addEventListener('pointerleave', onLeave)
    return () => {
      btn.removeEventListener('pointermove', onMove)
      btn.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const handleSkipIntro = () => {
    const target = window.innerHeight * INTRO_SCROLL_RATIO
    window.scrollTo({ top: target, behavior: 'smooth' })
    setHeroEntered(true)
  }

  return (
    <div className="landing">
      <IntroSequence scrollProgress={scrollProgress} onSkip={handleSkipIntro} />
      <div className="intro-scroll-spacer" style={{ height: `${INTRO_SCROLL_RATIO * 100}vh` }} aria-hidden="true" />
      <div className="landing-content landing-content--visible">
      <FloatingOrbsBackground />
      <div className="landing-grid" aria-hidden="true" />

      <main className={`landing-main section-surface--dark handoff-to-light${heroEntered ? ' landing-main--entered' : ''}`}>
        <div className="hero-blueprint-grid" aria-hidden="true" />
        <FloatingShapes />
        <NoiseOverlay />
        <div className="hero-inner">
          <div className="hero-content">
            <p className="hero-mission-id hero-enter hero-enter--1">iKites Consulting // ADVISORY & CONSULTING</p>
            <h1 className="hero-headline">
              <span className="hero-headline__line hero-enter hero-enter--2a">Public safety tech, AI, and Digital transformation — </span>
              <span className="hero-headline__line hero-headline-accent hero-enter hero-enter--2b">led by experts.</span>
            </h1>
            <p className="hero-subheadline hero-enter hero-enter--3">
              We bring together domain specialists to deliver measurable impact for governments, nonprofits, and industry through smart project management and emerging technology.
            </p>
            <a
              href="#what-we-do"
              ref={heroCtaRef}
              className="hero-cta hero-cta--magnetic hero-enter hero-enter--4"
            >
              Explore capabilities
              <span className="cta-shine" aria-hidden="true" />
              <span className="hero-cta__fill" aria-hidden="true" />
            </a>
          </div>
          <div className="hero-viz-wrap hero-enter hero-enter--viz" ref={heroVizRef}>
            <div className="hero-viz-glow" aria-hidden="true" />
            <div className="hero-viz-inner">
              <div className="hero-viz-float">
                <img src="/chat.png" alt="" className="hero-viz-img" aria-hidden="true" />
                <span className="hero-viz-signal" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
        <a href="#what-we-do" className="hero-scroll-hint" aria-label="Scroll to content">
          <span>Explore</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </main>

      <WhatWeDoStack />

      <ScrollReveal variant="left">
      <section className="who-we-serve">
        <h2 className="section-heading motion-title">We partner with organizations committed to meaningful transformation</h2>
        <div className="who-we-serve-grid">
          <article className="serve-card stagger-item motion-card" data-glow>
            <div className="serve-card-image-wrap">
              <img src="/article-photos/public-sector-emergency-services.png" alt="" className="serve-card-image" />
            </div>
            <div className="serve-card-title-block">
              <div className="serve-card-title-row">
                <span className="serve-card-dot" aria-hidden="true" />
                <h3 className="serve-card-title">Public Sector & Emergency Services</h3>
              </div>
              <p className="serve-card-subtitle">Governments, PSAPs, utilities, and municipalities.</p>
            </div>
          </article>
          <article className="serve-card stagger-item motion-card" data-glow>
            <div className="serve-card-image-wrap">
              <img src="/article-photos/associations-nonprofits.png" alt="" className="serve-card-image" />
            </div>
            <div className="serve-card-title-block">
              <div className="serve-card-title-row">
                <span className="serve-card-dot" aria-hidden="true" />
                <h3 className="serve-card-title">Associations & Non For Profits</h3>
              </div>
              <p className="serve-card-subtitle">Workforce, construction, and healthcare partners.</p>
            </div>
          </article>
          <article className="serve-card stagger-item motion-card" data-glow>
            <div className="serve-card-image-wrap">
              <img src="/article-photos/enterprises-smes.png" alt="" className="serve-card-image" />
            </div>
            <div className="serve-card-title-block">
              <div className="serve-card-title-row">
                <span className="serve-card-dot" aria-hidden="true" />
                <h3 className="serve-card-title">Enterprises & SMEs</h3>
              </div>
              <p className="serve-card-subtitle">Seeking expert-led AI and digital transformation.</p>
            </div>
          </article>
        </div>
      </section>
      </ScrollReveal>

      <CollaborativeSection />

      <ScrollReveal>
      <section className="the-experts handoff-to-dark" id="the-experts">
        <h2 className="experts-title motion-title">The Experts</h2>
        <p className="experts-subtitle motion-title">Human intelligence driving AI-enabled transformation</p>
        <div className="experts-card stagger-item">
          <p>
            Our network includes <strong>Technologists</strong> | <strong>AI Strategists</strong> | <strong>Automation Specialists</strong> | <strong>Digital Transformation Leads</strong> and <strong>Educators</strong> who bring fresh thinking and applied experience to the initiatives they support. Together, they connect human insight with intelligent systems, turning ideas into impact through digital integration, emerging technologies, and adaptive learning.
          </p>
        </div>
        <ExpertsGrid experts={EXPERTS} />
      </section>
      </ScrollReveal>

      <ScrollReveal delay={100}>
      <section className="our-approach-ribbon section-surface--dark handoff-to-light">
        <div className="approach-ribbon-inner">
          <div className="approach-ribbon-visual">
            <div className="approach-ribbon-card approach-ribbon-card--orb" aria-hidden="true">
              <svg className="approach-ribbon-illustration approach-ribbon-illustration--orb" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="orbCore" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="#0ea5e9" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#0f2744" stopOpacity="0.4" />
                  </radialGradient>
                  <filter id="orbGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <g className="orb-grid" stroke="rgba(14, 165, 233, 0.08)" strokeWidth="0.5">
                  {[40, 80, 120, 160, 200, 240, 280].map((x) => (<line key={`v${x}`} x1={x} y1={20} x2={x} y2={180} />))}
                  {[40, 80, 120, 160, 200].map((y) => (<line key={`h${y}`} x1={20} y1={y} x2={300} y2={y} />))}
                </g>
                <g className="orb-wireframe">
                  <ellipse cx={160} cy={100} rx={72} ry={24} stroke="#0ea5e9" strokeWidth="1.2" fill="none" opacity="0.85" />
                  <ellipse cx={160} cy={78} rx={58} ry={18} stroke="#0ea5e9" strokeWidth="1" fill="none" opacity="0.7" />
                  <ellipse cx={160} cy={122} rx={58} ry={18} stroke="#0ea5e9" strokeWidth="1" fill="none" opacity="0.7" />
                  <ellipse cx={160} cy={58} rx={32} ry={10} stroke="#0ea5e9" strokeWidth="0.8" fill="none" opacity="0.5" />
                  <ellipse cx={160} cy={142} rx={32} ry={10} stroke="#0ea5e9" strokeWidth="0.8" fill="none" opacity="0.5" />
                  <path d="M 160 34 Q 88 100 160 166" stroke="#0ea5e9" strokeWidth="1" fill="none" opacity="0.65" />
                  <path d="M 160 34 Q 232 100 160 166" stroke="#0ea5e9" strokeWidth="1" fill="none" opacity="0.65" />
                  <path d="M 128 58 Q 100 100 128 142" stroke="#0ea5e9" strokeWidth="0.9" fill="none" opacity="0.5" />
                  <path d="M 192 58 Q 220 100 192 142" stroke="#0ea5e9" strokeWidth="0.9" fill="none" opacity="0.5" />
                </g>
                <ellipse className="orb-orbit-dash" cx={160} cy={100} rx={72} ry={24} stroke="#7dd3fc" strokeWidth="3" fill="none" strokeDasharray="12 999" strokeLinecap="round" />
                <circle className="orb-core" cx={160} cy={100} r={22} fill="url(#orbCore)" filter="url(#orbGlow)" />
                <circle className="orb-core-ring" cx={160} cy={100} r={22} stroke="#7dd3fc" strokeWidth="1" fill="none" opacity="0.6" />
                {[
                  [160, 34], [128, 58], [192, 58], [88, 100], [160, 100], [232, 100], [128, 142], [192, 142], [160, 166],
                ].map(([x, y], i) => (
                  <circle key={i} className="orb-node" cx={x} cy={y} r={2.5} fill="#7dd3fc" opacity="0.95" filter="url(#orbGlow)" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
                <text x={160} y={28} textAnchor="middle" fill="rgba(226, 232, 240, 0.95)" fontSize="10" fontWeight="700" className="orb-label">Assess</text>
                <text x={58} y={102} textAnchor="middle" fill="rgba(226, 232, 240, 0.95)" fontSize="10" fontWeight="700" className="orb-label">Assemble</text>
                <text x={262} y={102} textAnchor="middle" fill="rgba(226, 232, 240, 0.95)" fontSize="10" fontWeight="700" className="orb-label">Deliver</text>
              </svg>
            </div>
          </div>
          <div className="approach-ribbon-content">
            <h2 className="approach-ribbon-title">The iKites approach</h2>
            <ul className="approach-ribbon-list">
              <li><span className="approach-ribbon-check" aria-hidden="true" />Assess — We conduct readiness and gap analyses.</li>
              <li><span className="approach-ribbon-check" aria-hidden="true" />Assemble — We bring together the right domain and industry experts.</li>
              <li><span className="approach-ribbon-check" aria-hidden="true" />Deliver — We co-design, implement, and embed change that lasts.</li>
            </ul>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section className="blog-posts-section handoff-to-dark" aria-labelledby="blog-posts-heading">
        <div className="blog-posts-header">
          <h2 id="blog-posts-heading" className="blog-posts-title motion-title">Recent Blog Posts</h2>
          <Link to="/insights" className="blog-posts-link">See all blog posts &rarr;</Link>
        </div>
        <div className="blog-posts-grid">
          {articles.slice(0, 3).map((post) => (
            <Link key={post.slug} to={`/insights/${post.slug}`} className="blog-post-card stagger-item motion-card" data-glow>
              <div className={`blog-post-image blog-post-image--${post.imageVariant}`} aria-hidden="true">
                {post.image && <img src={post.image} alt="" className="blog-post-image-img" />}
              </div>
              <p className="blog-post-meta">{post.meta}</p>
              <h3 className="blog-post-title">{post.title}</h3>
              <p className="blog-post-excerpt">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal variant="scale">
      <section className="cta-section section-surface--dark">
        <h2 className="cta-heading motion-title">Interested in joining our network of collaborators?</h2>
        <p className="cta-text stagger-item">The Collaborative continues to expand — connecting technology innovators, educators, and industry leaders to create smarter, more adaptive systems.</p>
        <Link to="/contact" className="cta-button stagger-item">Connect With Us</Link>
      </section>
      </ScrollReveal>

      <footer className="site-footer section-surface--dark">
        <div className="site-footer-inner">
          <div className="site-footer-brand">
            <img src="/ikites_logo_Master.png" alt="iKites Consulting" className="site-footer-logo-img" />
          </div>
          <div className="site-footer-cols">
            <div className="site-footer-cols__links">
              <div className="site-footer-col">
                <h4 className="site-footer-col-title">Company</h4>
                <ul className="site-footer-col-list">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About</Link></li>
                </ul>
              </div>
              <div className="site-footer-col">
                <h4 className="site-footer-col-title">Connect</h4>
                <ul className="site-footer-col-list">
                  <li><Link to="/insights">Insights</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
            </div>
            <p className="site-footer-address site-footer-address--under-cols">
              Location: 145 1/2 Church Street, Toronto, ON M5B 1Y4, Canada
            </p>
          </div>
        </div>
        <div className="site-footer-bar">
          <p className="site-footer-copy">© 2026 iKites Inc. All rights reserved.</p>
        </div>
      </footer>
      </div>
    </div>
  )
}
