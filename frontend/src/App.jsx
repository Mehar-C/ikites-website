import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import ElectricSignalBackground from './components/ElectricSignalBackground'
import SmoothScroll from './components/SmoothScroll'
import CardGlow from './components/CardGlow'
import Home from './pages/Home'
import About from './pages/About'
import Insights from './pages/Insights'
import Contact from './pages/Contact'
import Article from './pages/Article'

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <CardGlow />
        <ElectricSignalBackground />
        <div className="app-content">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<Article />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </SmoothScroll>
    </BrowserRouter>
  )
}

export default App
