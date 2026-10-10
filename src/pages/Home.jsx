import { useSearchParams } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard.jsx'
import Tag from '../components/Tag.jsx'
import site from '../data/site.json'
import { allTags, filterProjects } from '../lib/projects.js'

export default function Home() {
  // Filter state lives in the URL so a filtered view can be linked/bookmarked.
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const selected = params.getAll('tag')
  const results = filterProjects(q, selected)

  const update = (nextQ, nextTags) => {
    const next = new URLSearchParams()
    if (nextQ) next.set('q', nextQ)
    nextTags.forEach((t) => next.append('tag', t))
    setParams(next, { replace: true })
  }
  const toggle = (t) => update(q, selected.includes(t) ? selected.filter((x) => x !== t) : [...selected, t])

  return (
    <>
      <section className="mb-8">
        <h1 className="text-3xl font-bold">{site.name}</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">{site.tagline}</p>
      </section>

      <input type="search" value={q} onChange={(e) => update(e.target.value, selected)}
        placeholder="Search projects or technologies…" aria-label="Search projects"
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-900" />

      <div className="mt-4 flex flex-wrap gap-1.5">
        {allTags.map(([t, n]) => (
          <Tag key={t} label={t} count={n} active={selected.includes(t)} onClick={() => toggle(t)} />
        ))}
        {(q || selected.length > 0) && (
          <button type="button" onClick={() => update('', [])}
            className="px-2 text-xs text-indigo-600 hover:underline dark:text-indigo-400">Clear</button>
        )}
      </div>

      <p className="mt-6 mb-3 text-sm text-slate-500" aria-live="polite">
        {results.length} {results.length === 1 ? 'project' : 'projects'}
      </p>
      {results.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      ) : (
        <p className="py-12 text-center text-slate-500">No projects match.</p>
      )}
    </>
  )
}
