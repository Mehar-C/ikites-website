import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const HIDE_AFTER = 80
const DELTA = 6
const INTRO_SCROLL_RATIO = 0.85

export default function Navbar() {
  const location = useLocation()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [overHero, setOverHero] = useState(false)
  const [onIntro, setOnIntro] = useState(location.pathname === '/')
  const lastY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    lastY.current = window.scrollY || 0

    const update = () => {
      ticking.current = false
      const y = window.scrollY || 0
      const delta = y - lastY.current
      const isHome = location.pathname === '/'
      const introEnd = window.innerHeight * INTRO_SCROLL_RATIO
      // Fully hide nav on the intro screen; reveal once past it into the hero
      const introActive = isHome && y < introEnd * 0.92
      // Stay "over hero" while dark field is behind the bar
      const heroEnd = introEnd + window.innerHeight * 0.85

      setOnIntro(introActive)
      setScrolled(y > introEnd + 24)
      setOverHero(isHome && !introActive && y < heroEnd)

      if (introActive) {
        setHidden(false)
      } else if (y < introEnd + HIDE_AFTER) {
        setHidden(false)
      } else if (delta > DELTA) {
        setHidden(true)
      } else if (delta < -DELTA) {
        setHidden(false)
      }

      lastY.current = y
    }

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  const handleLogoClick = (e) => {
    if (window.location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const bannerClass = [
    'site-banner',
    onIntro ? 'site-banner--intro-hidden' : '',
    !onIntro && overHero && !scrolled ? 'site-banner--over-hero' : '',
    !onIntro && (scrolled || !overHero) ? 'site-banner--glass' : '',
    !onIntro && scrolled ? 'site-banner--scrolled' : '',
    !onIntro && hidden ? 'site-banner--hidden' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={bannerClass} role="banner" aria-hidden={onIntro ? 'true' : undefined}>
      <header className="site-header">
        <div className="site-logo-wrap">
          <NavLink to="/" className="site-logo" end onClick={handleLogoClick} aria-label="iKites Consulting – return to home">
            <span className="site-logo-crop">
              <img src="/ikites_logo_Master.png" alt="" className="site-logo-img" />
            </span>
          </NavLink>
        </div>
        <nav className="nav" aria-label="Main">
          <ul className="nav-links">
            <li><NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>Home</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink></li>
            <li><NavLink to="/insights" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Insights</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink></li>
          </ul>
        </nav>
      </header>
    </div>
  )
}
