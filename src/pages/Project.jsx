import { lazy, Suspense } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Gallery from '../components/Gallery.jsx'
import Tag from '../components/Tag.jsx'
import { demos } from '../demos/index.js'
import { getProject, viewOf, viewQuery, yearLabel } from '../lib/projects.js'

// The markdown renderer is only needed on pages with a public repo, so load it on demand.
const Readme = lazy(() => import('../components/Readme.jsx'))

// "owner/repo" from the project's "Source" link, when it points at a public GitHub repo.
// Set "readme": false on a project to leave its README off the page.
const repoOf = (p) => {
  if (p.readme === false) return null
  const src = p.links?.find((l) => l.label === 'Source')
  return src?.url.match(/^https:\/\/github\.com\/([^/]+\/[^/#?]+?)(?:\.git)?\/?$/i)?.[1] ?? null
}

function Demo({ demo }) {
  if (demo.type === 'link')
    return (
      <a href={demo.url} target="_blank" rel="noreferrer"
        className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
        {demo.label ?? 'Open live demo'} ↗
      </a>
    )
  if (demo.type === 'iframe') {
    // Some sites forbid being framed (X-Frame-Options / frame-ancestors) and the iframe just stays blank,
    // so always offer a plain link as well.
    if (!demo.url) return <p className="text-sm text-red-600">Demo is missing a "url".</p>
    return (
      <div>
        <iframe src={demo.url} title="Demo" loading="lazy" style={demo.height ? { height: demo.height } : undefined}
          className="h-[32rem] w-full rounded-lg border border-slate-200 bg-white dark:border-slate-800" />
        <a href={demo.url} target="_blank" rel="noreferrer"
          className="mt-2 inline-block text-sm text-indigo-600 hover:underline dark:text-indigo-400">
          {demo.label ?? 'Open in a new tab'} ↗
        </a>
      </div>
    )
  }
  const Component = demos[demo.component]
  if (!Component) return <p className="text-sm text-red-600">Unknown demo “{demo.component}”.</p>
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <Suspense fallback={<p className="text-sm text-slate-500">Loading demo…</p>}>
        <Component />
      </Suspense>
    </div>
  )
}

const Section = ({ title, children }) => (
  <section className="mt-8">
    <h2 className="mb-3 text-lg font-semibold">{title}</h2>
    {children}
  </section>
)

export default function Project() {
  const p = getProject(useParams().slug)
  const location = useLocation()
  const navigate = useNavigate()

  // Arrived from the list in this session: act like the browser's Back button, so the list comes back
  // exactly as it was (scroll position, tab, search, tags) and they can carry on browsing.
  const backToList = (e) => {
    if (location.state?.fromList && window.history.length > 1) {
      e.preventDefault()
      navigate(-1)
    }
  }
  if (!p)
    return (
      <p>Project not found. <Link to="/" className="text-indigo-600 underline">Back to all projects</Link></p>
    )
  const year = yearLabel(p)
  const repo = repoOf(p)
  return (
    <article>
      <Link to={`/?${viewQuery(p)}`} onClick={backToList} className="text-sm text-indigo-600 hover:underline dark:text-indigo-400">← All {viewOf(p)}</Link>
      <h1 className="mt-3 text-3xl font-bold">{p.title}</h1>
      {year && <p className="mt-1 text-sm text-slate-500">{year}</p>}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {p.tags?.map((t) => (
          <Link key={t} to={`/?${viewQuery(p)}${viewQuery(p) ? '&' : ''}tag=${encodeURIComponent(t)}`}><Tag label={t} /></Link>
        ))}
      </div>

      {p.keywords?.length > 0 && (
        <p className="mt-3 text-sm text-slate-500">Also: {p.keywords.join(', ')}</p>
      )}

      <div className="mt-6 space-y-4 text-slate-700 dark:text-slate-300">
        {(p.description ?? p.summary).split(/\n\s*\n/).map((para, i) => <p key={i}>{para}</p>)}
      </div>

      {p.links?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {p.links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer"
              className="text-indigo-600 hover:underline dark:text-indigo-400">{l.label} ↗</a>
          ))}
        </div>
      )}

      {p.demo && <Section title="Demo"><Demo demo={p.demo} /></Section>}
      {p.screenshots?.length > 0 && <Section title="Screenshots"><Gallery screenshots={p.screenshots} /></Section>}
      {repo && (
        <Section title="README">
          <Suspense fallback={<p className="text-sm text-slate-500">Loading README…</p>}>
            <Readme repo={repo} />
          </Suspense>
        </Section>
      )}
    </article>
  )
}
