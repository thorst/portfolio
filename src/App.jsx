import { useEffect, useLayoutEffect, useRef } from 'react'
import { Link, Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import ContactLinks from './components/ContactLinks.jsx'
import Home from './pages/Home.jsx'
import Project from './pages/Project.jsx'
import site from './data/site.json'

// Forward navigation starts at the top; back/forward restores where you were. Jumping to the top on
// a swipe back would fight the phone's leftover scroll momentum and make the list run away.
// Only a path change counts: changing a filter on the home page must not scroll at all.
function ScrollManager() {
  const location = useLocation()
  const navType = useNavigationType()
  const saved = useRef(new Map()) // history entry key -> scrollY
  const current = useRef({ key: location.key, pathname: location.pathname })

  // The browser would otherwise restore on its own, before our page has rendered.
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    const onScroll = () => saved.current.set(current.current.key, window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Layout effect: runs after the new page is in the DOM but before paint, and before any scroll
  // event caused by the page getting shorter, so that event is not mistaken for the old page's position.
  useLayoutEffect(() => {
    const prev = current.current
    current.current = { key: location.key, pathname: location.pathname }
    if (prev.key === location.key) return

    if (prev.pathname === location.pathname) {
      saved.current.set(location.key, window.scrollY) // same page, e.g. filter change: keep position
    } else if (navType === 'POP') {
      window.scrollTo({ top: saved.current.get(location.key) ?? 0, behavior: 'instant' })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location.key, location.pathname, navType])

  return null
}

export default function App() {
  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-8">
      <ScrollManager />
      <header className="mb-8 flex items-center justify-between text-sm">
        <Link to="/" className="font-semibold">{site.name}</Link>
        <ContactLinks />
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
