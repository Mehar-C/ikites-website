/**
 * Blog articles. Add or edit entries here; use `slug` in the URL (e.g. /insights/human-ai-partnership-public-safety).
 * Add `body` content when you have the article text.
 */
export const articles = [
  {
    slug: 'from-legacy-911-to-ng911',
    title: 'From Legacy 911 to NG911: Navigating the Future of Emergency Communications',
    meta: 'NG911, Public Sector, Insights',
    excerpt: 'For more than 50 years, 911 networks have served as the foundation of public safety communications. Here’s how NG911 is reshaping emergency communications for a digital world…',
    imageVariant: '1',
    image: '/article-photos/ng%20911%20photo.png',
    tags: ['NG911', 'Public Sector', 'Insights'],
    body: null,
  },
  {
    slug: 'ai-and-project-management',
    title: 'Your Next Project Manager Might Not Be Human',
    meta: 'AI & Digital Transformation, Project Management, Insights',
    excerpt: 'Artificial Intelligence is reshaping how projects are planned, executed, and delivered. Here’s how AI-powered tools are driving a new era of efficiency and innovation…',
    imageVariant: '2',
    image: '/article-photos/ai%20driven%20pm.png',
    tags: ['AI', 'Digital Transformation', 'Project Management', 'Insights'],
    body: null,
  },
  {
    slug: 'gnss-enhancements-smartnav',
    title: 'GNSS Enhancements for Better Position Accuracy: From PPP-RTK to SmartNav',
    meta: 'Technology, Public Safety, Insights',
    excerpt: 'Position accuracy affects everything from fleet routing to emergency-response dispatch. Here’s how PPP-RTK and SmartNav are raising the bar for precision…',
    imageVariant: '3',
    image: '/article-photos/gnss%20photo.png',
    tags: ['Technology', 'Public Safety', 'Insights'],
    body: null,
  },
]

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug) ?? null
}

export function getAllTags() {
  const set = new Set()
  articles.forEach((a) => (a.tags || []).forEach((t) => set.add(t)))
  return Array.from(set).sort()
}
