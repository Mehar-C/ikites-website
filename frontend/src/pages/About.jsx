import ScrollReveal from '../components/ScrollReveal'
import FloatingOrbsBackground from '../components/FloatingOrbsBackground'

export default function About() {
  return (
    <div className="page page-about">
      <div className="page-grid" aria-hidden="true" />
      <FloatingOrbsBackground />

      <section className="about-hero">
        <h1 className="about-hero-title">About Us</h1>
        <p className="about-hero-subtitle">
          We are a specialised advisory and consulting firm. Our strength lies in curating the right expertise and translating innovation into measurable impact.
        </p>
      </section>

      <ScrollReveal>
      <section className="about-core-values">
        <h2 className="core-values-title">Our Core Values</h2>
        <p className="core-values-subtitle">The principles that guide everything we do</p>
        <div className="values-grid">
          <article className="value-card">
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
          <article className="value-card">
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
          <article className="value-card">
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
          <article className="value-card highlight">
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
        <div className="page-content">
          <p>
            iKites Consulting brings together domain specialists to help governments, nonprofits, and industries navigate complex technology and operational challenges. Our work spans AI, digital transformation, and smart project management—delivering solutions that drive better outcomes.
          </p>
          <p>
            We combine deep expertise in public safety and emerging tech with a practical approach to implementation, so our clients can move from strategy to execution with confidence.
          </p>
        </div>
      </main>
    </div>
  )
}
