export default function AnimatedDivider() {
  return (
    <div className="animated-divider" aria-hidden="true">
      <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="dividerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="var(--color-accent)" stopOpacity="0.4" />
            <stop offset="50%" stopColor="var(--color-dark-blue)" stopOpacity="0.6" />
            <stop offset="80%" stopColor="var(--color-accent)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          className="divider-line"
          d="M0 60 Q300 20 600 60 T1200 60"
          stroke="url(#dividerGrad)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  )
}
