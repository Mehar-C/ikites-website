import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import FloatingShapes from '../components/FloatingShapes'
import NoiseOverlay from '../components/NoiseOverlay'
import IntroSequence from '../components/IntroSequence'
import FloatingOrbsBackground from '../components/FloatingOrbsBackground'
import { articles } from '../data/articles'

const INTRO_SCROLL_RATIO = 0.85

const EXPERTS = [
  { initials: 'HC', name: 'Harjit Chatha', credentials: 'C.Eng, MBA, FIMarEST', role: 'Strategic Leader · Public Safety Technology & Emerging Tech', image: '/experts/Harjit%20Chatha.jpg', bio: 'Strategic leader and Naval veteran with deep expertise in project management, modernizing critical infrastructure, and applying AI, data analytics, and cloud technologies. Brings proven experience in vendor negotiations and regulatory compliance to public safety and emerging technology initiatives.' },
  { initials: 'JJ', name: 'Justin Johnson', credentials: 'PMP, LEED AP, CM-LEAN', role: 'Account Executive · Buildots', image: '/experts/Justin%20Johnson%20-%20Headshot.jpeg', bio: 'Justin helps construction companies leverage technology for smarter project delivery. He brings rich experience managing complex projects and a strong understanding of industry challenges. Justin holds a Bachelor of Applied Science in Civil Engineering from the University of Waterloo.' },
  { initials: 'ML', name: 'Michael Lepage', credentials: 'Founder: Plan Academy', role: 'Digital Transformation & Project Delivery · iKites', image: '/experts/michael-lepage-headshot.jpg', bio: 'Michael has been teaching project controls for almost two decades. He founded Plan Academy in 2013 and has written and recorded hundreds of tutorials on planning and scheduling, Primavera P6 Professional, and project controls. A member of AACE, Michael is a trainer, a YouTuber, an author, and an advocate for better project controls.' },
  { initials: 'SS', name: 'Stan Shantz', credentials: 'Co-Founder & Vice President', role: 'Predictive Technology Expert · Perspect Analytics Inc.', image: '/experts/Stan%20Shantz.jpg', bio: 'Co-Founder and Vice President at Perspect Analytics Inc. and EverTech XR. Expert in predictive technologies and data-driven asset management, with experience across MRO, AM, FM, and IM. Drives mixed reality and analytics solutions for smarter asset and operations management.' },
  { initials: 'TS', name: 'Tom Stephenson', credentials: 'MBA, CM-LEAN, PMP', role: 'Professor & Construction Expert · George Brown College', image: '/experts/Tom%20Stephenson.jpg', bio: 'Professor and construction expert at George Brown College. Experienced lecturer, consultant, and author with contributions to BILD, OHBA, CHBA, and the Mechanical Contractors\' Association of Toronto. Recognized for teaching and industry engagement in construction management and lean practices.' },
  { initials: 'VC', name: 'Vikram Chauhan', credentials: 'P.Eng, PGMP, PMP, PMI-RMP', role: 'Senior Project Manager · Powell Inc', image: '/experts/Vikram%20Chauhan.jpg', bio: 'Naval veteran and Senior Project Manager with an Electrical Engineering degree and MBA from the University of Alberta. Over 15 years of project management experience in manufacturing and defence, including monitoring and execution of infrastructure projects exceeding US $400M. Expertise in technical management, supply chain and logistics, project finances, and repair, maintenance, and refurbishment of electrical equipment.' },
]

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [expandedExpert, setExpandedExpert] = useState(null)

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

  const handleSkipIntro = () => {
    const target = window.innerHeight * INTRO_SCROLL_RATIO
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    <div className="landing">
      <IntroSequence scrollProgress={scrollProgress} onSkip={handleSkipIntro} />
      <div className="intro-scroll-spacer" style={{ height: `${INTRO_SCROLL_RATIO * 100}vh` }} aria-hidden="true" />
      <div className="landing-content landing-content--visible">
      <FloatingOrbsBackground />
      <div className="landing-grid" aria-hidden="true" />

      <main className="landing-main">
        <FloatingShapes />
        <NoiseOverlay />
        <div className="hero-inner">
          <div className="hero-content">
            <p className="hero-mission-id">iKites Consulting // ADVISORY & CONSULTING</p>
            <h1 className="hero-headline">
              Public safety tech, AI, and digital transformation — <span className="hero-headline-accent">led by experts.</span>
            </h1>
            <p className="hero-subheadline">
              We bring together domain specialists to deliver measurable impact for governments, nonprofits, and industry through smart project management and emerging technology.
            </p>
            <a href="#what-we-do" className="hero-cta">Explore capabilities<span className="cta-shine" aria-hidden="true" /></a>
          </div>
          <div className="hero-viz-wrap">
            <div className="hero-viz-inner">
              <img src="/chat.png" alt="" className="hero-viz-img" aria-hidden="true" />
              <span className="hero-viz-signal" aria-hidden="true" />
            </div>
          </div>
        </div>
        <a href="#what-we-do" className="hero-scroll-hint" aria-label="Scroll to content">
          <span>Explore</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </main>

      <ScrollReveal>
        <section className="what-we-do" id="what-we-do">
          <h2 className="what-we-do-title">What We Do</h2>
          <div className="what-we-do-grid">
          <article className="what-we-do-card">
            <div className="what-we-do-card-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                <circle cx="14" cy="18" r="4" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="34" cy="18" r="4" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="24" cy="32" r="4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M18 20l4 4M30 20l-4 4M20 34l4-6 4 6" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />
              </svg>
            </div>
            <h3 className="what-we-do-card-title">AI & Digital Transformation</h3>
            <p className="what-we-do-card-desc">
              Helping organizations leverage artificial intelligence to drive efficiency, automate processes, and enable smarter decision-making.
            </p>
            <ul className="what-we-do-list">
              <li>Current-state assessment and gap analysis</li>
              <li>AI workflow design and copilot development</li>
              <li>Secure data governance and change enablement</li>
            </ul>
          </article>

          <article className="what-we-do-card">
            <div className="what-we-do-card-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 22v-2a8 8 0 0116 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16 22h4v10a4 4 0 008 0V22h4a2 2 0 012 2v6a2 2 0 01-2 2H16a2 2 0 01-2-2v-6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="what-we-do-card-title">NG911 Turnkey Support for PSAPs</h3>
            <p className="what-we-do-card-desc">
              Delivering complete Next Generation 911 solutions for Public Safety Answering Points to ensure seamless, reliable emergency response.
            </p>
            <ul className="what-we-do-list">
              <li>End-to-end NG911 system implementation</li>
              <li>Emergency call routing and performance optimization</li>
              <li>Multi-media incident handling and data integration</li>
              <li>Compliance management and certification support</li>
            </ul>
          </article>

          <article className="what-we-do-card">
            <div className="what-we-do-card-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="10" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="28" y="10" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="6" y="28" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="28" y="28" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <path d="M20 15h8M20 33h8" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
              </svg>
            </div>
            <h3 className="what-we-do-card-title">Real-Time Operations Centre (RTOC)</h3>
            <p className="what-we-do-card-desc">
              Providing comprehensive monitoring and management solutions for real-time operational visibility and asset optimization.
            </p>
            <ul className="what-we-do-list">
              <li>Real-time dashboard and visualization development</li>
              <li>IoT-based asset tracking and data integration</li>
              <li>Predictive maintenance and scheduling models</li>
              <li>Performance monitoring and automated alerting systems</li>
            </ul>
          </article>

          <article className="what-we-do-card">
            <div className="what-we-do-card-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12l-14 7v8l14 7 14-7v-8L24 12z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M10 27l14 7 14-7M24 19v15" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
                <path d="M20 12l4-4 4 4-4 4-4-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="what-we-do-card-title">Workforce Upskilling</h3>
            <p className="what-we-do-card-desc">
              Empowering organizations and teams to confidently adopt emerging technologies and integrate them into daily operations — across public service, healthcare, education, infrastructure, and enterprise sectors.
            </p>
            <ul className="what-we-do-list">
              <li>AI literacy and applied use-case labs</li>
              <li>Data-driven decision-making and digital collaboration tools</li>
              <li>Leadership and change enablement for technology adoption</li>
              <li>Customized learning pathways aligned to roles and industry needs</li>
            </ul>
          </article>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
      <section className="who-we-serve">
        <h2 className="section-heading">We partner with organizations committed to meaningful transformation</h2>
        <div className="who-we-serve-grid">
          <article className="serve-card">
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
          <article className="serve-card">
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
          <article className="serve-card">
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

      <ScrollReveal>
      <section className="the-collaborative">
        <p className="collab-intro">We shape smarter systems through expert collaboration</p>
        <h2 className="collab-title">The Collaborative</h2>
        <p className="collab-subtitle">Where human collaboration meets intelligent technology</p>
        <p className="collab-body">
          The Collaborative brings together forward-thinking organizations and innovators shaping the future of work, digital transformation, and applied AI. Through shared expertise and intelligent tools, our collaborators help design solutions that bridge <strong>strategy, data, and technology</strong> — to solve complex challenges across industries.
        </p>
        <p className="collab-partners-label">Organizations and innovators driving digital and AI transformation with us</p>
        <div className="collab-partners">
          {[
            { name: 'PROCORE', logo: '/logos/procore.svg', url: 'https://www.procore.com/en-ca' },
            { name: 'EverTech XR', logo: '/logos/Evertech%20XR.png', url: 'https://evertechxr.com/' },
            { name: 'BUILDOTS', logo: '/logos/buildots.png', url: 'https://buildots.com/', smallLogo: true },
            { name: 'Perspect Analytics', logo: '/logos/perspect%20analytics.png', url: 'https://perspectanalytics.com/' },
          ].map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="collab-partner-item"
            >
              <span className={`collab-partner-logo-wrap${partner.smallLogo ? ' collab-partner-logo-wrap--small' : ''}`}>
                <img
                  src={partner.logo}
                  alt=""
                  className="collab-partner-img"
                  onLoad={(e) => {
                    e.target.classList.add('collab-partner-img--loaded')
                    e.target.nextElementSibling?.classList.remove('collab-partner-fallback--show')
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
        <div className="collab-quote-card">
          <p>The Collaborative comes to life through <strong>Experts</strong> who bridge human expertise and AI-driven intelligence.</p>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section className="the-experts">
        <h2 className="experts-title">The Experts</h2>
        <p className="experts-subtitle">Human intelligence driving AI-enabled transformation</p>
        <div className="experts-card">
          <p>
            Our network includes <strong>Technologists</strong> | <strong>AI Strategists</strong> | <strong>Automation Specialists</strong> | <strong>Digital Transformation Leads</strong> and <strong>Educators</strong> who bring fresh thinking and applied experience to every initiative. Together, they connect human insight with intelligent systems, turning ideas into impact through digital integration, emerging technologies, and adaptive learning.
          </p>
        </div>
        <div className="experts-grid">
          {EXPERTS.map((expert) => (
            <article key={expert.initials} className="expert-card" aria-expanded={expandedExpert === expert.initials}>
              <div className="expert-photo-cell">
              <div className="expert-photo-wrap">
                {expert.image ? (
                  <img src={expert.image} alt="" className="expert-photo" onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling?.classList.remove('expert-initials--fallback'); }} />
                ) : null}
                <div className={`expert-initials ${expert.image ? 'expert-initials--fallback' : 'expert-initials--visible'}`} aria-hidden="true">{expert.initials}</div>
              </div>
              </div>
              <div className="expert-info">
                <h3 className="expert-name">{expert.name.toUpperCase()}</h3>
                <p className="expert-credentials">{expert.credentials}</p>
                {expandedExpert === expert.initials ? (
                  <>
                    <p className="expert-bio">{expert.bio}</p>
                    <button type="button" className="expert-read-less" onClick={() => setExpandedExpert(null)} aria-label={`Show less about ${expert.name}`}>Read Less ↓</button>
                  </>
                ) : (
                  <button type="button" className="expert-expand" onClick={() => setExpandedExpert(expert.initials)} aria-label={`More about ${expert.name}`} aria-expanded="false">+</button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal delay={100}>
      <section className="our-approach-ribbon">
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
                {/* Moving dash – travels along the main orbit */}
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
      <section className="blog-posts-section" aria-labelledby="blog-posts-heading">
        <div className="blog-posts-header">
          <h2 id="blog-posts-heading" className="blog-posts-title">Recent Blog Posts</h2>
          <Link to="/insights" className="blog-posts-link">See all blog posts &rarr;</Link>
        </div>
        <div className="blog-posts-grid">
          {articles.map((post) => (
            <Link key={post.slug} to={`/insights/${post.slug}`} className="blog-post-card">
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

      <ScrollReveal>
      <section className="cta-section">
        <h2 className="cta-heading">Interested in joining our network of collaborators?</h2>
        <p className="cta-text">The Collaborative continues to expand — connecting technology innovators, educators, and industry leaders to create smarter, more adaptive systems.</p>
        <Link to="/contact" className="cta-button">Connect With Us</Link>
      </section>
      </ScrollReveal>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="site-footer-brand">
            <img src="/final%20logo.png" alt="iKites Consulting" className="site-footer-logo-img" />
            <span className="site-footer-tagline">Consulting</span>
            <p className="site-footer-address">Location: 145 1/2 Church Street, Toronto, ON M5B 1Y4, Canada</p>
          </div>
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
        <div className="site-footer-bar">
          <p className="site-footer-copy">© 2026 iKites Consulting Inc. All rights reserved.</p>
        </div>
      </footer>
      </div>
    </div>
  )
}
