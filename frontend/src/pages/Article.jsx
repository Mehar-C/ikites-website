import { useParams, Link } from 'react-router-dom'
import FloatingOrbsBackground from '../components/FloatingOrbsBackground'
import { getArticleBySlug } from '../data/articles'
import FromLegacy911ToNg911 from '../components/articleContent/FromLegacy911ToNg911'
import AIAndProjectManagement from '../components/articleContent/AIAndProjectManagement'
import GNSSEnhancementsSmartNav from '../components/articleContent/GNSSEnhancementsSmartNav'

export default function Article() {
  const { slug } = useParams()
  const article = slug ? getArticleBySlug(slug) : null

  if (!article) {
    return (
      <div className="page">
        <div className="page-grid" aria-hidden="true" />
        <FloatingOrbsBackground />
        <main className="page-main">
          <h1 className="page-title">Article not found</h1>
          <p className="page-lead">This article doesn’t exist or has been removed.</p>
          <div className="page-content">
            <Link to="/insights" className="article-back-link">← Back to Insights</Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="page page-article">
      <div className="page-grid" aria-hidden="true" />
      <FloatingOrbsBackground />
      <main className="page-main">
        <Link to="/insights" className="article-back-link">← Back to Insights</Link>
        <p className="article-meta">{article.meta}</p>
        <h1 className="article-title">{article.title}</h1>
        <div className={`article-hero-image article-hero-image--${article.imageVariant}`} aria-hidden="true">
          {article.image && <img src={article.image} alt="" className="article-hero-image-img" />}
        </div>
        <div className="article-body">
          {article.slug === 'from-legacy-911-to-ng911' ? (
            <FromLegacy911ToNg911 />
          ) : article.slug === 'ai-and-project-management' ? (
            <AIAndProjectManagement />
          ) : article.slug === 'gnss-enhancements-smartnav' ? (
            <GNSSEnhancementsSmartNav />
          ) : article.body != null ? (
            typeof article.body === 'string' ? (
              article.body.split(/\n\n+/).map((para, i) => <p key={i}>{para}</p>)
            ) : (
              article.body
            )
          ) : (
            <p className="article-placeholder">Add your article content in <code>src/data/articles.js</code> for this post (set the <code>body</code> field).</p>
          )}
        </div>
      </main>
    </div>
  )
}
