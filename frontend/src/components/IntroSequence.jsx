import { useMemo } from 'react'

const TAGLINE = '[TECH & AI — LED BY EXPERTS]'

// Smooth easing for zoom and fade
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

export default function IntroSequence({ scrollProgress = 0, onSkip }) {
  const eased = useMemo(() => easeOutCubic(Math.min(1, scrollProgress)), [scrollProgress])
  const overlayOpacity = 1 - eased
  const sphereScale = 1 + eased * 2.2
  const isComplete = scrollProgress >= 1

  return (
    <div
      className="intro-sequence"
      role="presentation"
      aria-hidden="true"
      style={{
        opacity: overlayOpacity,
        pointerEvents: isComplete ? 'none' : 'auto',
      }}
    >
      <div className="intro-sequence__bg" />

      <p className="intro-sequence__company">iKites Consulting</p>
      <p className="intro-sequence__tagline">{TAGLINE}</p>

      <div className="intro-sequence__sphere-wrap" style={{ transform: `translate(-50%, -50%) scale(${sphereScale})` }}>
        <svg
          className="intro-sequence__sphere intro-sequence__viz"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="introCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--color-dark-blue)" stopOpacity="0.1" />
            </linearGradient>
            <filter id="introCoreGlow">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {/* Circuit grid – horizontal and vertical traces */}
          <g className="intro-viz__grid" stroke="var(--color-dark-blue)" strokeWidth="0.4" opacity="0.35">
            {[80, 120, 160, 200, 240, 280, 320].map((x) => (
              <line key={`v-${x}`} x1={x} y1={60} x2={x} y2={340} />
            ))}
            {[80, 140, 200, 260, 320].map((y) => (
              <line key={`h-${y}`} x1={80} y1={y} x2={320} y2={y} />
            ))}
          </g>
          {/* Outer frame – hexagon (tech core frame) */}
          <path
            className="intro-viz__frame"
            d="M 200 100 L 280 150 L 280 250 L 200 300 L 120 250 L 120 150 Z"
            fill="none"
            stroke="var(--color-dark-blue-light)"
            strokeWidth="0.6"
            opacity="0.6"
          />
          {/* Inner core – smaller hexagon */}
          <path
            className="intro-viz__core"
            d="M 200 160 L 250 185 L 250 215 L 200 240 L 150 215 L 150 185 Z"
            fill="url(#introCoreGrad)"
            stroke="var(--color-accent)"
            strokeWidth="0.8"
            opacity="0.9"
            filter="url(#introCoreGlow)"
          />
          {/* Circuit traces from core to frame */}
          {[
            [200, 160, 200, 100],
            [250, 185, 280, 150],
            [250, 215, 280, 250],
            [200, 240, 200, 300],
            [150, 215, 120, 250],
            [150, 185, 120, 150],
          ].map(([x1, y1, x2, y2], i) => (
            <g key={`trace-${i}`}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-dark-blue-light)" strokeWidth="0.4" opacity="0.5" />
              <circle r="2.5" fill="var(--color-accent)" opacity="0.9">
                <animateMotion dur={`${4 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} path={`M ${x1} ${y1} L ${x2} ${y2}`} />
              </circle>
            </g>
          ))}
          {/* Data pulses along horizontal circuit lines */}
          <circle r="2" fill="var(--color-accent)">
            <animateMotion dur="5s" repeatCount="indefinite" path="M 80 200 L 320 200" />
          </circle>
          <circle r="1.8" fill="var(--color-accent)" opacity="0.85">
            <animateMotion dur="6s" repeatCount="indefinite" begin="1.5s" path="M 320 260 L 80 260" />
          </circle>
          <circle r="2" fill="var(--color-accent)" opacity="0.8">
            <animateMotion dur="5.5s" repeatCount="indefinite" begin="0.8s" path="M 200 80 L 200 320" />
          </circle>
          {/* Nodes at intersections */}
          {[[200, 200], [200, 140], [200, 260], [120, 200], [280, 200], [160, 200], [240, 200]].map(([x, y], i) => (
            <circle key={`node-${i}`} cx={x} cy={y} r="2.5" fill="var(--color-accent)" opacity="0.7" />
          ))}
        </svg>
      </div>

      <div className="intro-sequence__status">
        <span className="intro-sequence__status-item">SIGNAL INTEGRITY: ACTIVE</span>
        <span className="intro-sequence__status-item intro-sequence__status-item--icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
          QUALITY ASSESSMENT: ACTIVE
        </span>
        <span className="intro-sequence__status-item">ALL SYSTEMS: ACTIVE</span>
      </div>

      <button type="button" className="intro-sequence__skip" onClick={() => typeof onSkip === 'function' && onSkip()} aria-label="Skip to homepage">
        Skip
      </button>

      <div className="intro-sequence__scroll-hint" aria-hidden="true">
        <span>Scroll to enter</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
      </div>
    </div>
  )
}
