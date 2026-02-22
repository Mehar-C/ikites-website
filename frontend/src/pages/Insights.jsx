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
        <p className="insights-hero-label">Insights</p>
        <h1 className="insights-hero-title">Perspectives that drive impact</h1>
        <p className="insights-hero-subtitle">
          Research, case studies, and practical guidance on AI, digital transformation, and public safety technology.
        </p>
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
    </div>
  )
}
