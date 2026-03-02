import { NavLink } from 'react-router-dom'

export default function Navbar() {

  const handleLogoClick = (e) => {
    // If already on home, scroll to top; otherwise navigate will take us there
    if (window.location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="site-banner" role="banner">
      <header className="site-header">
        <div className="site-logo-wrap">
          <NavLink to="/" className="site-logo" end onClick={handleLogoClick} aria-label="iKites Consulting – return to home">
            <span className="site-logo-crop">
              <img src="/final.png" alt="" className="site-logo-img" />
            </span>
          </NavLink>
        </div>
        <nav className="nav">
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
