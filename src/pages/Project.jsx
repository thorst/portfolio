import { Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import Gallery from '../components/Gallery.jsx'
import Tag from '../components/Tag.jsx'
import { demos } from '../demos/index.js'
import { getProject, yearLabel } from '../lib/projects.js'

function Demo({ demo }) {
  if (demo.type === 'link')
    return (
      <a href={demo.url} target="_blank" rel="noreferrer"
        className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
        {demo.label ?? 'Open live demo'} ↗
      </a>
    )
  if (demo.type === 'iframe')
    return <iframe src={demo.url} title="Demo" className="h-[32rem] w-full rounded-lg border border-slate-200 bg-white dark:border-slate-800" />
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
  if (!p)
    return (
      <p>Project not found. <Link to="/" className="text-indigo-600 underline">Back to all projects</Link></p>
    )
  const year = yearLabel(p)
  return (
    <article>
      <Link to="/" className="text-sm text-indigo-600 hover:underline dark:text-indigo-400">← All projects</Link>
      <h1 className="mt-3 text-3xl font-bold">{p.title}</h1>
      {year && <p className="mt-1 text-sm text-slate-500">{year}</p>}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {p.tags?.map((t) => (
          <Link key={t} to={`/?tag=${encodeURIComponent(t)}`}><Tag label={t} /></Link>
        ))}
      </div>

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
    </article>
  )
}
