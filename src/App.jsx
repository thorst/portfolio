import { useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Project from './pages/Project.jsx'
import site from './data/site.json'

// Router navigation keeps the previous scroll position, so jump to the top on every page change.
// Only the path is watched: changing a filter on the home page must not scroll away.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-8">
      <ScrollToTop />
      <header className="mb-8 flex items-center justify-between text-sm">
        <Link to="/" className="font-semibold">{site.name}</Link>
        <nav className="flex gap-4">
          {site.links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer"
              className="text-slate-600 hover:text-indigo-600 dark:text-slate-400">{l.label}</a>
          ))}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:slug" element={<Project />} />
          <Route path="*" element={<Project />} />
        </Routes>
      </main>
    </div>
  )
}
