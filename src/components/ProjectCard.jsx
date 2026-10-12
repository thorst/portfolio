import { Link } from 'react-router-dom'
import Tag from './Tag.jsx'
import { yearLabel } from '../lib/projects.js'

export default function ProjectCard({ project: p }) {
  const year = yearLabel(p)
  return (
    <Link to={`/project/${p.slug}`} state={{ fromList: true }}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{p.title}</h2>
          {year && <span className="shrink-0 text-xs text-slate-500">{year}</span>}
        </div>
        <p className="line-clamp-3 text-sm text-slate-600 dark:text-slate-400">{p.summary}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {p.tags?.map((t) => <Tag key={t} label={t} />)}
        </div>
      </div>
    </Link>
  )
}
