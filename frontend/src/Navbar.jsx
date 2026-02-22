import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="nav">
      <NavLink to="/" className="nav-logo" end>
        <img src="/final%20logo.png" alt="iKites Consulting" className="nav-logo-img" />
      </NavLink>
      <ul className="nav-links">
        <li><NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>Home</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink></li>
        <li><NavLink to="/insights" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Insights</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink></li>
      </ul>
    </nav>
  )
}
