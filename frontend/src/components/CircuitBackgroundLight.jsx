import { useMemo } from 'react'

function buildCircuitPaths() {
  const cols = 14
  const rows = 10
  const spacingX = 100 / (cols + 1)
  const spacingY = 100 / (rows + 1)
  const nodes = []
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      const jitter = 1.5
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
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() > 0.75) addLine(r * (cols + 1) + c, (r + 1) * (cols + 1) + c + 1)
      if (Math.random() > 0.75) addLine(r * (cols + 1) + c + 1, (r + 1) * (cols + 1) + c)
    }
  }

  return paths
}

const PATHS = buildCircuitPaths()

export default function CircuitBackgroundLight() {
  const paths = useMemo(() => PATHS, [])

  return (
    <div className="circuit-bg-light" aria-hidden="true">
      <svg className="circuit-bg-light__svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="circuitLightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
            <stop offset="35%" stopColor="var(--color-accent)" stopOpacity="1" />
            <stop offset="65%" stopColor="var(--color-accent)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {paths.map((d, i) => (
          <path
            key={`track-${i}`}
            className="circuit-bg-light__track"
            d={d}
            fill="none"
            stroke="var(--color-gray-600)"
            strokeWidth="0.28"
            strokeOpacity="0.58"
          />
        ))}
        {paths.map((d, i) => (
          <path
            key={`pulse-${i}`}
            className="circuit-bg-light__pulse"
            d={d}
            pathLength={1}
            fill="none"
            stroke="url(#circuitLightGrad)"
            strokeWidth="0.5"
            strokeLinecap="round"
            style={{ animationDelay: `${(i % 28) * 0.28}s` }}
          />
        ))}
      </svg>
    </div>
  )
}
