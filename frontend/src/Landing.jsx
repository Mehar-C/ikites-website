import { useEffect, useState } from 'react'

function useCurrentTime() {
  const [time, setTime] = useState(() => new Date().toLocaleString('en-US', {
    month: '2-digit', day: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  }))
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleString('en-US', {
        month: '2-digit', day: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
      }))
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Landing() {
  const currentTime = useCurrentTime()

  return (
    <div className="landing">
      <div className="landing-grid" aria-hidden="true" />

      <header className="landing-header">
        <div className="landing-header-left">
          <span className="landing-title">iKites</span>
          <span className="landing-subtitle">AI • NEURAL CORE</span>
          <span className="landing-meta">CYCLE • 2485</span>
          <span className="landing-meta">TIME • {currentTime}</span>
        </div>
        <div className="landing-header-right">
          <a href="#get-started" className="landing-link">GET STARTED</a>
          <span className="landing-sep">/</span>
          <a href="#contact" className="landing-link">CONTACT</a>
        </div>
      </header>

      <main className="landing-main">
        <svg
          className="landing-viz"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="coreGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-dark-blue-light)" />
              <stop offset="50%" stopColor="var(--color-navy-mid)" />
              <stop offset="100%" stopColor="var(--color-dark-blue)" />
            </linearGradient>
            <filter id="coreBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <pattern id="gridSmall" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-dark-blue)" strokeWidth="0.3" opacity="0.6" />
            </pattern>
          </defs>

          {/* Background grid */}
          <rect width="400" height="400" fill="url(#gridSmall)" />

          {/* Wireframe sphere rings */}
          <ellipse cx="200" cy="200" rx="120" ry="40" className="landing-wireframe" />
          <ellipse cx="200" cy="200" rx="40" ry="120" className="landing-wireframe" />
          <ellipse cx="200" cy="200" rx="100" ry="100" transform="rotate(45 200 200)" className="landing-wireframe" />
          <ellipse cx="200" cy="200" rx="100" ry="100" transform="rotate(-45 200 200)" className="landing-wireframe" />

          {/* Central AI core */}
          <circle cx="200" cy="200" r="42" fill="var(--color-navy-mid)" stroke="var(--color-dark-blue-light)" strokeWidth="1.5" opacity="0.9" />
          <circle cx="200" cy="200" r="32" fill="url(#coreGlow)" filter="url(#coreBlur)" />
          <circle cx="200" cy="200" r="28" fill="none" stroke="var(--color-gray-400)" strokeWidth="0.8" opacity="0.7" />

          {/* Data stream paths – curved orbits */}
          <path id="path1" d="M 80 200 A 120 80 0 0 1 320 200 A 120 80 0 0 1 80 200" fill="none" className="landing-path" />
          <path id="path2" d="M 200 80 A 80 120 0 0 1 200 320 A 80 120 0 0 1 200 80" fill="none" className="landing-path" />
          <path id="path3" d="M 120 120 A 100 100 0 0 1 280 280 A 100 100 0 0 1 120 120" fill="none" className="landing-path" />
          <path id="path4" d="M 280 120 A 100 100 0 0 1 120 280 A 100 100 0 0 1 280 120" fill="none" className="landing-path" />
          <path id="path5" d="M 200 60 Q 320 200 200 340 Q 80 200 200 60" fill="none" className="landing-path" />

          {/* Moving dots along paths */}
          <g className="landing-dots">
            <circle r="3.5" fill="var(--color-accent)">
              <animateMotion dur="6s" repeatCount="indefinite">
                <mpath href="#path1" />
              </animateMotion>
            </circle>
            <circle r="3" fill="var(--color-accent)">
              <animateMotion dur="8s" repeatCount="indefinite">
                <mpath href="#path2" />
              </animateMotion>
            </circle>
            <circle r="2.5" fill="var(--color-accent)">
              <animateMotion dur="7s" repeatCount="indefinite">
                <mpath href="#path3" />
              </animateMotion>
            </circle>
            <circle r="2.5" fill="var(--color-accent)">
              <animateMotion dur="9s" repeatCount="indefinite">
                <mpath href="#path4" />
              </animateMotion>
            </circle>
            <circle r="3" fill="var(--color-accent)">
              <animateMotion dur="5s" repeatCount="indefinite">
                <mpath href="#path5" />
              </animateMotion>
            </circle>
            {/* Second set for fuller movement */}
            <circle r="2" fill="var(--color-accent)" opacity="0.8">
              <animateMotion dur="7s" repeatCount="indefinite" begin="1s">
                <mpath href="#path1" />
              </animateMotion>
            </circle>
            <circle r="2" fill="var(--color-accent)" opacity="0.8">
              <animateMotion dur="6s" repeatCount="indefinite" begin="2s">
                <mpath href="#path3" />
              </animateMotion>
            </circle>
          </g>

          {/* Labels */}
          <text x="95" y="195" className="landing-label">N-NET</text>
          <text x="285" y="205" className="landing-label">D-STREAM</text>
          <text x="205" y="75" className="landing-label">API</text>
          <text x="125" y="125" className="landing-label">ML</text>
        </svg>
      </main>

      <footer className="landing-footer">
        <span className="landing-readout">NEURAL • ACTIVE</span>
        <span className="landing-readout">DATA STREAM • LIVE</span>
        <span className="landing-readout">CORE • 0x7F</span>
      </footer>
    </div>
  )
}
