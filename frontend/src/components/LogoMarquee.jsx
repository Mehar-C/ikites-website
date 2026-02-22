export default function LogoMarquee({ items = [], className = '' }) {
  const normalized = items.map((item) =>
    typeof item === 'string'
      ? { name: item, logo: null, url: null }
      : { name: item.name, logo: item.logo, url: item.url || null }
  )
  const list = [...normalized, ...normalized]
  return (
    <div className={`logo-marquee-wrap ${className}`} aria-hidden="true">
      <div className="logo-marquee-track">
        {list.map((item, i) => {
          const content = item.logo ? (
            <>
              <span className="logo-marquee-img-wrap">
                <img
                  src={item.logo}
                  alt=""
                  className="logo-marquee-img"
                  loading={i < 4 ? 'eager' : 'lazy'}
                  onLoad={(e) => {
                    e.target.classList.add('logo-marquee-img--loaded')
                    e.target.nextElementSibling?.classList.remove('logo-marquee-fallback--show')
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextElementSibling?.classList.add('logo-marquee-fallback--show')
                  }}
                />
                <span className="logo-marquee-fallback logo-marquee-fallback--show">{item.name}</span>
              </span>
            </>
          ) : (
            <span>{item.name}</span>
          )
          return (
            <div key={i} className={`logo-marquee-item ${item.logo ? 'logo-marquee-item--has-logo' : ''}`}>
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="logo-marquee-link">
                  {content}
                </a>
              ) : (
                content
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
