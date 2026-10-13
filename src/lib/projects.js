import data from '../data/projects.json'

const byTitle = (a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })

// Alphabetical: plenty of older projects have no year, so a date sort would be wrong for them.
export const projects = [...data].sort(byTitle)

// Screenshot paths in the JSON are relative to /public, so prefix with the Vite base.
export const asset = (path) =>
  /^(https?:)?\/\//.test(path) ? path : import.meta.env.BASE_URL + path.replace(/^\//, '')

export const getProject = (slug) => projects.find((p) => p.slug === slug)

// "yearEnd" is optional, for work that spanned years: "2008–2020".
export const yearLabel = (p) =>
  p.year ? `${p.yearApprox ? 'c. ' : ''}${p.year}${p.yearEnd ? `–${p.yearEnd}` : ''}` : null

// Every project lives in exactly one tab:
//   "category": "prototype"  -> prototypes
//   "role": "managed"        -> managed (led, oversaw, or advised; the team or others wrote the code)
//   anything else            -> developed (I built it)
export const isPrototype = (p) => p.category === 'prototype'
export const viewOf = (p) => (isPrototype(p) ? 'prototypes' : p.role === 'managed' ? 'managed' : 'developed')

// Where a project's "back" and tag links should land.
export const viewQuery = (p) => (viewOf(p) === 'developed' ? '' : `view=${viewOf(p)}`)

// "featured": 1, 2, 3... in the JSON puts a project in the Featured row, in that order.
export const featuredProjects = projects.filter((p) => p.featured).sort((a, b) => a.featured - b.featured)

// Every tag in a list of projects with its project count, most used first.
export function tagCounts(list) {
  const counts = new Map()
  list.forEach((p) => (p.tags ?? []).forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)))
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
}

// Text query matches title/summary/description/tags/keywords; selected tags are AND-ed.
export function filterProjects(list, query, selectedTags) {
  const q = query.trim().toLowerCase()
  return list.filter((p) => {
    if (!selectedTags.every((t) => p.tags?.includes(t))) return false
    if (!q) return true
    const hay = [p.title, p.summary, p.description, ...(p.tags ?? []), ...(p.keywords ?? [])].join(' ').toLowerCase()
    return q.split(/\s+/).every((word) => hay.includes(word))
  })
}
