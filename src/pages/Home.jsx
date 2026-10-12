import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard.jsx'
import Tag from '../components/Tag.jsx'
import site from '../data/site.json'
import { featuredProjects, filterProjects, projects, tagCounts, viewOf } from '../lib/projects.js'

const TAGS_COLLAPSED = 14

const TABS = [
  { id: 'developed', label: 'Developed', intro: 'Things I built myself.', list: projects.filter((p) => viewOf(p) === 'developed') },
  { id: 'managed', label: 'Managed', intro: 'Programs and platforms I led, oversaw, or advised. My teams built them, and I owned the outcome.', list: projects.filter((p) => viewOf(p) === 'managed') },
  { id: 'prototypes', label: 'Prototypes', intro: 'Experiments and unfinished ideas. Each is a way of trying a technology, and the ones with a source link are public.', list: projects.filter((p) => viewOf(p) === 'prototypes') },
]

const Grid = ({ items }) => (
  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((p) => <ProjectCard key={p.slug} project={p} />)}
  </div>
)

export default function Home() {
  // Filter state lives in the URL so a filtered view can be linked/bookmarked.
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const selected = params.getAll('tag')
  const view = TABS.some((t) => t.id === params.get('view')) ? params.get('view') : 'developed'
  const tab = TABS.find((t) => t.id === view)

  // Each tab's count reflects the current search and tags, so a match in the other tab is visible.
  const matches = Object.fromEntries(TABS.map((t) => [t.id, filterProjects(t.list, q, selected)]))
  const results = matches[view]
  const filtering = Boolean(q) || selected.length > 0

  // Collapsed, only the most used tags show (plus any selected one, so an active filter never hides).
  const [showAllTags, setShowAllTags] = useState(false)
  const allTags = tagCounts(tab.list)
  const visibleTags = showAllTags
    ? allTags
    : allTags.filter(([t], i) => i < TAGS_COLLAPSED || selected.includes(t))

  const update = (nextQ, nextTags, nextView = view) => {
    const next = new URLSearchParams()
    if (nextView !== 'developed') next.set('view', nextView)
    if (nextQ) next.set('q', nextQ)
    nextTags.forEach((t) => next.append('tag', t))
    setParams(next, { replace: true })
  }
  const toggle = (t) => update(q, selected.includes(t) ? selected.filter((x) => x !== t) : [...selected, t])

  // Each tab can have its own Featured row; with a search or tag active it is one alphabetical list.
  const featuredHere = featuredProjects.filter((p) => viewOf(p) === view)
  const showFeatured = !filtering && featuredHere.length > 0
  const rest = showFeatured ? results.filter((p) => !p.featured) : results

  // When a search finds nothing in this tab but something in another, point there.
  const elsewhere = TABS.find((t) => t.id !== view && matches[t.id].length > 0)

  return (
    <>
      <section className="mb-8">
        <h1 className="text-3xl font-bold">{site.name}</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">{site.tagline}</p>
        {site.bio && <p className="mt-4 max-w-3xl text-slate-700 dark:text-slate-300">{site.bio}</p>}
      </section>

      <div role="tablist" aria-label="Project type" className="mb-4 inline-flex rounded-lg bg-slate-200 p-1 dark:bg-slate-800">
        {TABS.map((t) => (
          <button key={t.id} type="button" role="tab" aria-selected={t.id === view}
            onClick={() => update(q, selected, t.id)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              t.id === view
                ? 'bg-white shadow-sm dark:bg-slate-950'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'}`}>
            {t.label} <span className="opacity-60">{matches[t.id].length}</span>
          </button>
        ))}
      </div>

      <input type="search" value={q} onChange={(e) => update(e.target.value, selected)}
        placeholder="Search projects or technologies…" aria-label="Search projects"
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-900" />

      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        {visibleTags.map(([t, n]) => (
          <Tag key={t} label={t} count={n} active={selected.includes(t)} onClick={() => toggle(t)} />
        ))}
        {allTags.length > TAGS_COLLAPSED && (
          <button type="button" onClick={() => setShowAllTags(!showAllTags)} aria-expanded={showAllTags}
            className="px-2 text-xs text-indigo-600 hover:underline dark:text-indigo-400">
            {showAllTags ? 'Show fewer tags' : `Show all ${allTags.length} tags`}
          </button>
        )}
        {filtering && (
          <button type="button" onClick={() => update('', [])}
            className="px-2 text-xs text-indigo-600 hover:underline dark:text-indigo-400">Clear</button>
        )}
      </div>

      <p className="mt-4 text-sm text-slate-500">{tab.intro}</p>

      {showFeatured && (
        <section aria-labelledby="featured" className="mt-8">
          <h2 id="featured" className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Featured</h2>
          <Grid items={featuredHere} />
        </section>
      )}

      <section aria-live="polite" className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          {showFeatured ? `All ${tab.label.toLowerCase()}` : `${results.length} ${results.length === 1 ? 'result' : 'results'}`}
          {showFeatured && <span className="ml-2 font-normal normal-case tracking-normal">A to Z</span>}
        </h2>
        {rest.length ? <Grid items={rest} /> : (
          <div className="py-12 text-center text-slate-500">
            <p>No {tab.label.toLowerCase()} projects match.</p>
            {elsewhere && (
              <button type="button" onClick={() => update(q, selected, elsewhere.id)}
                className="mt-2 text-indigo-600 hover:underline dark:text-indigo-400">
                {matches[elsewhere.id].length} {matches[elsewhere.id].length === 1 ? 'match' : 'matches'} in {elsewhere.label}
              </button>
            )}
          </div>
        )}
      </section>
    </>
  )
}
