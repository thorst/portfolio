import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Project from './pages/Project.jsx'
import site from './data/site.json'

export default function App() {
  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-8">
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
