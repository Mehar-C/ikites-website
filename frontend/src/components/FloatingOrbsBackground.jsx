export default function FloatingOrbsBackground() {
  const orbs = [
    { className: 'ambient-orb ambient-orb--1', style: { '--orb-size': 'min(70vw, 520px)', '--orb-x': '10%', '--orb-y': '15%' } },
    { className: 'ambient-orb ambient-orb--2', style: { '--orb-size': 'min(55vw, 400px)', '--orb-x': '75%', '--orb-y': '35%' } },
    { className: 'ambient-orb ambient-orb--3', style: { '--orb-size': 'min(45vw, 340px)', '--orb-x': '50%', '--orb-y': '70%' } },
    { className: 'ambient-orb ambient-orb--4', style: { '--orb-size': 'min(35vw, 260px)', '--orb-x': '85%', '--orb-y': '80%' } },
  ]

  return (
    <div className="ambient-orbs" aria-hidden="true">
      {orbs.map((orb, i) => (
        <div key={i} className={orb.className} style={orb.style} />
      ))}
    </div>
  )
}
