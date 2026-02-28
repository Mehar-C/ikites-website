import { useState } from 'react'
import { Link } from 'react-router-dom'
import FloatingOrbsBackground from '../components/FloatingOrbsBackground'

export default function Contact() {
  const [formData, setFormData] = useState({
    first: '', last: '', email: '', confirmEmail: '', company: '', address: '', message: ''
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Optional: send to backend or mailto
  }

  return (
    <div className="page page-contact-page">
      <div className="page-grid" aria-hidden="true" />
      <FloatingOrbsBackground />

      <section className="contact-hero">
        <h1 className="contact-hero-title">Let&apos;s Connect</h1>
        <p className="contact-hero-subtitle">
          Ready to transform your business? Get in touch with our team today.
        </p>
      </section>

      <div className="contact-content">
        <div className="contact-two-col">
          <div className="contact-form-wrap">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row form-row-split">
                <div className="form-group">
                  <label htmlFor="contact-first">Full Name *</label>
                  <div className="form-row-inline">
                    <input id="contact-first" name="first" type="text" placeholder="First" value={formData.first} onChange={handleChange} required />
                    <input name="last" type="text" placeholder="Last" value={formData.last} onChange={handleChange} required />
                  </div>
                </div>
              </div>
              <div className="form-row form-row-split">
                <div className="form-group">
                  <label htmlFor="contact-email">Email Address *</label>
                  <div className="form-row-inline">
                    <input id="contact-email" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input name="confirmEmail" type="email" placeholder="Confirm Email" value={formData.confirmEmail} onChange={handleChange} required />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="contact-company">Company Name *</label>
                <input id="contact-company" name="company" type="text" value={formData.company} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-address">Address *</label>
                <input id="contact-address" name="address" type="text" value={formData.address} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" name="message" rows={5} placeholder="Your message..." value={formData.message} onChange={handleChange} />
              </div>
              <button type="submit" className="contact-submit">Send Message</button>
            </form>
          </div>

          <div className="contact-side">
            <div className="get-in-touch">
              <h2 className="get-in-touch-title">Get in Touch</h2>
              <p className="get-in-touch-intro">
                We&apos;re here to help you transform your business with innovative technology solutions. Reach out to us through any of the following channels.
              </p>
              <div className="touch-block">
                <span className="touch-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" /><path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" /></svg>
                </span>
                <div>
                  <span className="touch-label">Email</span>
                  <a href="mailto:admin@ikitesconsulting.ca" className="touch-value">admin@ikitesconsulting.ca</a>
                </div>
              </div>
              <div className="touch-block">
                <span className="touch-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" /><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
                </span>
                <div>
                  <span className="touch-label">Location</span>
                  <span className="touch-value">145 1/2 Church Street, Toronto, ON M5B 1Y4, Canada</span>
                </div>
              </div>
            </div>

            <div className="why-choose-us">
              <h3 className="why-choose-us-title">Why Choose Us?</h3>
              <ul className="why-choose-us-list">
                <li>Response time: within 1–2 business days</li>
                <li>Free initial consultation and assessment</li>
                <li>Tailored solutions for your unique needs</li>
                <li>Proven track record of successful implementations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

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
