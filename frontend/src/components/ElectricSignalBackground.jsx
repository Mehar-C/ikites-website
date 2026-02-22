import { useMemo } from 'react'

// Generate a network of circuit-style lines (nodes in a grid, lines between nearby nodes)
function buildSignalPaths() {
  const cols = 12
  const rows = 8
  const spacingX = 100 / (cols + 1)
  const spacingY = 100 / (rows + 1)
  const nodes = []
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      const jitter = 2
      const x = c * spacingX + (Math.random() - 0.5) * jitter
      const y = r * spacingY + (Math.random() - 0.5) * jitter
      nodes.push({ x, y, i: r * (cols + 1) + c })
    }
  }

  const paths = []
  const addLine = (i1, i2) => {
    const a = nodes[i1]
    const b = nodes[i2]
    if (a && b) paths.push(`M ${a.x} ${a.y} L ${b.x} ${b.y}`)
  }

  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c < cols; c++) {
      addLine(r * (cols + 1) + c, r * (cols + 1) + c + 1)
    }
  }
  for (let c = 0; c <= cols; c++) {
    for (let r = 0; r < rows; r++) {
      addLine(r * (cols + 1) + c, (r + 1) * (cols + 1) + c)
    }
  }
  // Add some diagonals for a more circuit-board feel
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() > 0.7) addLine(r * (cols + 1) + c, (r + 1) * (cols + 1) + c + 1)
      if (Math.random() > 0.7) addLine(r * (cols + 1) + c + 1, (r + 1) * (cols + 1) + c)
    }
  }

  return paths
}

const PATHS = buildSignalPaths()

export default function ElectricSignalBackground() {
  const paths = useMemo(() => PATHS, [])

  return (
    <div className="electric-signal-bg" aria-hidden="true">
      <svg className="electric-signal-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="signalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
            <stop offset="40%" stopColor="var(--color-accent)" stopOpacity="0.9" />
            <stop offset="60%" stopColor="var(--color-accent)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Static faint grid lines */}
        {paths.map((d, i) => (
          <path
            key={`line-${i}`}
            className="signal-track"
            d={d}
            fill="none"
            stroke="var(--color-dark-blue)"
            strokeWidth="0.15"
            strokeOpacity="0.2"
          />
        ))}
        {/* Animated signal pulses */}
        {paths.map((d, i) => (
          <path
            key={`pulse-${i}`}
            className="signal-pulse"
            d={d}
            pathLength={1}
            fill="none"
            stroke="url(#signalGrad)"
            strokeWidth="0.35"
            strokeLinecap="round"
            style={{ animationDelay: `${(i % 24) * 0.35}s` }}
          />
        ))}
      </svg>
    </div>
  )
}
