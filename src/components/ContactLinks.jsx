import site from '../data/site.json'
import { asset } from '../lib/projects.js'

// GitHub, LinkedIn, email, and (once a PDF is added to /public and named in site.json) the resume.
export default function ContactLinks({ className = '' }) {
  const links = [
    ...site.links,
    ...(site.email ? [{ label: 'Email', url: `mailto:${site.email}`, internal: true }] : []),
    ...(site.resume ? [{ label: 'Resume', url: asset(site.resume) }] : []),
  ]
  return (
    <nav aria-label="Contact" className={`flex flex-wrap gap-x-4 gap-y-1 ${className}`}>
      {links.map((l) => (
        <a key={l.label} href={l.url} {...(l.internal ? {} : { target: '_blank', rel: 'noreferrer' })}
          className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
          {l.label}
        </a>
      ))}
    </nav>
  )
}
