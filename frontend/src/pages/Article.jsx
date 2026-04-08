import { useParams, Link } from 'react-router-dom'
import FloatingOrbsBackground from '../components/FloatingOrbsBackground'
import { getArticleBySlug } from '../data/articles'
import FromLegacy911ToNg911 from '../components/articleContent/FromLegacy911ToNg911'
import AIAndProjectManagement from '../components/articleContent/AIAndProjectManagement'
import GNSSEnhancementsSmartNav from '../components/articleContent/GNSSEnhancementsSmartNav'
import ToolsReadyAreYourPeople from '../components/articleContent/ToolsReadyAreYourPeople'

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
          {article.slug === 'tools-ready-are-your-people' ? (
            <ToolsReadyAreYourPeople />
          ) : article.slug === 'from-legacy-911-to-ng911' ? (
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
