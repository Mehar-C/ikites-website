import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import FloatingOrbsBackground from '../components/FloatingOrbsBackground'
import { articles, getAllTags } from '../data/articles'

export default function Insights() {
  const [selectedTag, setSelectedTag] = useState(null)
  const tags = useMemo(() => getAllTags(), [])
  const featured = articles[0]
  const gridArticles = useMemo(() => {
    if (!selectedTag) return articles
    const matching = articles.filter((a) => a.tags && a.tags.includes(selectedTag))
    return matching.filter((a) => a.slug !== featured.slug)
  }, [selectedTag, featured.slug])

  return (
    <div className="page page-insights">
      <div className="page-grid" aria-hidden="true" />
      <FloatingOrbsBackground />

      <section className="insights-hero">
        <div className="insights-hero-fluid" aria-hidden="true">
          {/* Right side: wave from top-right */}
          <svg className="insights-hero-fluid-svg insights-hero-fluid-svg--right" viewBox="0 0 1200 800" preserveAspectRatio="xMaxYMin slice" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="insightsFluidGrad1" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
                <stop offset="40%" stopColor="rgba(125,211,252,0.2)" />
                <stop offset="100%" stopColor="rgba(14,165,233,0.08)" />
              </linearGradient>
              <linearGradient id="insightsFluidGrad2" x1="100%" y1="0%" x2="20%" y2="80%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
                <stop offset="50%" stopColor="rgba(14,165,233,0.15)" />
                <stop offset="100%" stopColor="rgba(14,165,233,0.04)" />
              </linearGradient>
              <filter id="insightsFluidBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="24" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path
              className="insights-hero-fluid-blob insights-hero-fluid-blob--1"
              d="M 1200 -50 Q 1100 150 1000 280 T 700 450 T 400 550 T 50 520 Q -100 500 -50 800 L 1200 800 Z"
              fill="url(#insightsFluidGrad1)"
              filter="url(#insightsFluidBlur)"
            />
            <path
              className="insights-hero-fluid-blob insights-hero-fluid-blob--2"
              d="M 1200 100 Q 950 200 800 350 T 500 550 Q 200 650 0 600 L 0 800 L 1200 800 Z"
              fill="url(#insightsFluidGrad2)"
              filter="url(#insightsFluidBlur)"
            />
          </svg>
          {/* Left side: wave from top-left */}
          <svg className="insights-hero-fluid-svg insights-hero-fluid-svg--left" viewBox="0 0 1200 800" preserveAspectRatio="xMinYMin slice" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="insightsFluidGradLeft1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
                <stop offset="60%" stopColor="rgba(125,211,252,0.18)" />
                <stop offset="100%" stopColor="rgba(14,165,233,0.06)" />
              </linearGradient>
              <linearGradient id="insightsFluidGradLeft2" x1="0%" y1="0%" x2="80%" y2="80%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
                <stop offset="50%" stopColor="rgba(14,165,233,0.12)" />
                <stop offset="100%" stopColor="rgba(14,165,233,0.03)" />
              </linearGradient>
              <filter id="insightsFluidBlurLeft" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="24" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path
              className="insights-hero-fluid-blob insights-hero-fluid-blob--left1"
              d="M 0 -50 Q 100 150 200 280 T 500 450 T 950 550 T 1150 520 Q 1300 500 1250 800 L 0 800 Z"
              fill="url(#insightsFluidGradLeft1)"
              filter="url(#insightsFluidBlurLeft)"
            />
            <path
              className="insights-hero-fluid-blob insights-hero-fluid-blob--left2"
              d="M 0 100 Q 250 200 400 350 T 700 550 Q 1000 650 1200 600 L 1200 800 L 0 800 Z"
              fill="url(#insightsFluidGradLeft2)"
              filter="url(#insightsFluidBlurLeft)"
            />
          </svg>
        </div>
        <div className="insights-hero-inner">
          <p className="insights-hero-label">Insights</p>
          <h1 className="insights-hero-title">Perspectives that drive impact</h1>
          <p className="insights-hero-subtitle">
            Research, case studies, and practical guidance on AI, digital transformation, and public safety technology.
          </p>
        </div>
      </section>

      <div className="insights-content">
        <Link to={`/insights/${featured.slug}`} className="insights-featured">
          <div className={`insights-featured-image blog-post-image blog-post-image--${featured.imageVariant}`} aria-hidden="true">
            {featured.image && <img src={featured.image} alt="" className="blog-post-image-img" />}
          </div>
          <div className="insights-featured-body">
            <p className="blog-post-meta">{featured.meta}</p>
            <h2 className="insights-featured-title">{featured.title}</h2>
            <p className="insights-featured-excerpt">{featured.excerpt}</p>
            <span className="insights-featured-link">Read article →</span>
          </div>
        </Link>

        <section className="insights-latest" aria-label="More articles">
          <h2 className="insights-latest-heading">Latest Blog Posts</h2>
          <p className="insights-sort-label">Sort by tag</p>
          <div className="insights-tag-list" role="tablist" aria-label="Filter by tag">
            <button
              type="button"
              className={`insights-tag ${selectedTag === null ? 'insights-tag--active' : ''}`}
              onClick={() => setSelectedTag(null)}
              role="tab"
              aria-selected={selectedTag === null}
            >
              All Posts
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`insights-tag ${selectedTag === tag ? 'insights-tag--active' : ''}`}
                onClick={() => setSelectedTag(tag)}
                role="tab"
                aria-selected={selectedTag === tag}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="blog-posts-grid blog-posts-grid--insights">
            {gridArticles.map((post) => (
              <Link key={post.slug} to={`/insights/${post.slug}`} className="blog-post-card">
                <div className={`blog-post-image blog-post-image--${post.imageVariant}`} aria-hidden="true">
                  {post.image && <img src={post.image} alt="" className="blog-post-image-img" />}
                </div>
                <p className="blog-post-meta">{post.meta}</p>
                <h3 className="blog-post-title">{post.title}</h3>
                <p className="blog-post-excerpt">{post.excerpt}</p>
              </Link>
            ))}
          </div>
          {gridArticles.length === 0 && (
            <p className="insights-no-results">No other articles match this tag.</p>
          )}
        </section>
      </div>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="site-footer-brand">
            <img src="/final.png" alt="iKites Consulting" className="site-footer-logo-img" />
          </div>
          <div className="site-footer-col">
            <h4 className="site-footer-col-title">Company</h4>
            <ul className="site-footer-col-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>
          <div className="site-footer-col">
            <h4 className="site-footer-col-title">Connect</h4>
            <ul className="site-footer-col-list">
              <li><Link to="/insights">Insights</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <p className="site-footer-address site-footer-address--under-cols">
            Location: 145 1/2 Church Street, Toronto, ON M5B 1Y4, Canada
          </p>
        </div>
        <div className="site-footer-bar">
          <p className="site-footer-copy">© 2026 iKites Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
