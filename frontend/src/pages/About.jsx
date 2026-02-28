import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import FloatingOrbsBackground from '../components/FloatingOrbsBackground'

export default function About() {
  return (
    <div className="page page-about">
      <div className="page-grid" aria-hidden="true" />
      <FloatingOrbsBackground />

      <section className="about-hero">
        <div className="about-hero-bg" aria-hidden="true">
          <svg className="about-hero-graphic" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="aboutOrb1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(14, 165, 233, 0.2)" />
                <stop offset="100%" stopColor="rgba(14, 165, 233, 0)" />
              </radialGradient>
              <radialGradient id="aboutOrb2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(125, 211, 252, 0.12)" />
                <stop offset="100%" stopColor="rgba(125, 211, 252, 0)" />
              </radialGradient>
              <linearGradient id="aboutLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="rgba(14, 165, 233, 0.15)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <ellipse cx="200" cy="120" rx="180" ry="100" fill="url(#aboutOrb1)" />
            <ellipse cx="600" cy="280" rx="220" ry="120" fill="url(#aboutOrb2)" />
            <line x1="0" y1="200" x2="800" y2="200" stroke="url(#aboutLine)" strokeWidth="1" opacity="0.6" />
            <circle cx="400" cy="200" r="2" fill="rgba(14, 165, 233, 0.4)" />
          </svg>
        </div>
        {/* Same wave style as Insights: left + right waves */}
        <div className="about-hero-fluid" aria-hidden="true">
          <svg className="about-hero-fluid-svg about-hero-fluid-svg--right" viewBox="0 0 1200 800" preserveAspectRatio="xMaxYMin slice" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="aboutFluidGrad1" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
                <stop offset="40%" stopColor="rgba(125,211,252,0.2)" />
                <stop offset="100%" stopColor="rgba(14,165,233,0.08)" />
              </linearGradient>
              <linearGradient id="aboutFluidGrad2" x1="100%" y1="0%" x2="20%" y2="80%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
                <stop offset="50%" stopColor="rgba(14,165,233,0.15)" />
                <stop offset="100%" stopColor="rgba(14,165,233,0.04)" />
              </linearGradient>
              <filter id="aboutFluidBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="24" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path
              className="about-hero-fluid-blob about-hero-fluid-blob--1"
              d="M 1200 -50 Q 1100 150 1000 280 T 700 450 T 400 550 T 50 520 Q -100 500 -50 800 L 1200 800 Z"
              fill="url(#aboutFluidGrad1)"
              filter="url(#aboutFluidBlur)"
            />
            <path
              className="about-hero-fluid-blob about-hero-fluid-blob--2"
              d="M 1200 100 Q 950 200 800 350 T 500 550 Q 200 650 0 600 L 0 800 L 1200 800 Z"
              fill="url(#aboutFluidGrad2)"
              filter="url(#aboutFluidBlur)"
            />
          </svg>
          <svg className="about-hero-fluid-svg about-hero-fluid-svg--left" viewBox="0 0 1200 800" preserveAspectRatio="xMinYMin slice" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="aboutFluidGradLeft1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
                <stop offset="60%" stopColor="rgba(125,211,252,0.18)" />
                <stop offset="100%" stopColor="rgba(14,165,233,0.06)" />
              </linearGradient>
              <linearGradient id="aboutFluidGradLeft2" x1="0%" y1="0%" x2="80%" y2="80%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
                <stop offset="50%" stopColor="rgba(14,165,233,0.12)" />
                <stop offset="100%" stopColor="rgba(14,165,233,0.03)" />
              </linearGradient>
              <filter id="aboutFluidBlurLeft" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="24" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path
              className="about-hero-fluid-blob about-hero-fluid-blob--left1"
              d="M 0 -50 Q 100 150 200 280 T 500 450 T 950 550 T 1150 520 Q 1300 500 1250 800 L 0 800 Z"
              fill="url(#aboutFluidGradLeft1)"
              filter="url(#aboutFluidBlurLeft)"
            />
            <path
              className="about-hero-fluid-blob about-hero-fluid-blob--left2"
              d="M 0 100 Q 250 200 400 350 T 700 550 Q 1000 650 1200 600 L 1200 800 L 0 800 Z"
              fill="url(#aboutFluidGradLeft2)"
              filter="url(#aboutFluidBlurLeft)"
            />
          </svg>
        </div>
        <div className="about-hero-inner">
          <h1 className="about-hero-title">About Us</h1>
          <p className="about-hero-subtitle">
            We are a specialised advisory and consulting firm. Our strength lies in curating the right expertise and translating innovation into measurable impact.
          </p>
        </div>
      </section>

      <ScrollReveal>
      <section className="about-core-values">
        <div className="about-core-values-bg" aria-hidden="true" />
        <div className="about-core-values-marquee" aria-hidden="true">
          <div className="about-core-values-marquee-track">
            <span>Collaborative Partnership</span>
            <span className="about-core-values-marquee-dot" aria-hidden="true">·</span>
            <span>Vendor-Neutral Solutions</span>
            <span className="about-core-values-marquee-dot" aria-hidden="true">·</span>
            <span>Measurable Outcomes</span>
            <span className="about-core-values-marquee-dot" aria-hidden="true">·</span>
            <span>Our Guarantee</span>
            <span className="about-core-values-marquee-dot" aria-hidden="true">·</span>
            <span>Collaborative Partnership</span>
            <span className="about-core-values-marquee-dot" aria-hidden="true">·</span>
            <span>Vendor-Neutral Solutions</span>
            <span className="about-core-values-marquee-dot" aria-hidden="true">·</span>
            <span>Measurable Outcomes</span>
            <span className="about-core-values-marquee-dot" aria-hidden="true">·</span>
            <span>Our Guarantee</span>
          </div>
        </div>
        <div className="about-core-values-accent" aria-hidden="true" />
        <h2 className="core-values-title">Our Core Values</h2>
        <p className="core-values-subtitle">The principles that guide everything we do</p>
        <div className="values-grid">
          <article className="value-card value-card--1">
            <div className="value-card-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" />
                <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="24" cy="24" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <h3 className="value-card-title">Collaborative Partnership</h3>
            <p className="value-card-desc">
              We work as an extension of your team, ensuring knowledge transfer and building internal capabilities for long-term success.
            </p>
          </article>
          <article className="value-card value-card--2">
            <div className="value-card-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12v4l4 2 2 4h4v2h-4l-2 4-4 2v4h-2v-4l-4-2-2-4h-4v-2h4l2-4 4-2v-4h2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                <circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <h3 className="value-card-title">Vendor-Neutral Solutions</h3>
            <p className="value-card-desc">
              Our recommendations are based solely on your needs, not vendor partnerships or commissions. Your success is our priority.
            </p>
          </article>
          <article className="value-card value-card--3">
            <div className="value-card-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 8l4 8 8 2-6 6 2 8-8-4-8 4 2-8-6-6 8-2 4-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <h3 className="value-card-title">Measurable Outcomes</h3>
            <p className="value-card-desc">
              Every engagement includes clear success metrics and regular progress reviews to ensure ROI and continuous improvement.
            </p>
          </article>
          <article className="value-card value-card--4 highlight">
            <div className="value-card-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="20" r="5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="30" cy="20" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 32c0-4 2.5-8 6-10 2 2 4 2 6 2s4 0 6-2c3.5 2 6 6 6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <h3 className="value-card-title">Our Guarantee</h3>
            <p className="value-card-desc">
              If a use-case doesn&apos;t pass the &apos;pilot value test,&apos; we help you adjust or drop it—before committing wider spend.
            </p>
          </article>
        </div>
      </section>
      </ScrollReveal>

      <main className="page-main about-main">
        <div className="about-main-wrap">
          <div className="about-main-graphic" aria-hidden="true">
            <span className="about-main-dot" /><span className="about-main-dot" /><span className="about-main-dot" />
          </div>
        <div className="page-content">
          <p>
            iKites Consulting brings together domain specialists to help governments, nonprofits, and industries navigate complex technology and operational challenges. Our work spans AI, digital transformation, and smart project management—delivering solutions that drive better outcomes.
          </p>
          <p>
            We combine deep expertise in public safety and emerging tech with a practical approach to implementation, so our clients can move from strategy to execution with confidence.
          </p>
        </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="site-footer-brand">
            <img src="/footerlogo.png" alt="iKites Consulting" className="site-footer-logo-img" />
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
          <p className="site-footer-copy">© 2026 iKites Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
