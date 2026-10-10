import data from '../data/projects.json'

export const projects = data

// Screenshot paths in the JSON are relative to /public, so prefix with the Vite base.
export const asset = (path) =>
  /^(https?:)?\/\//.test(path) ? path : import.meta.env.BASE_URL + path.replace(/^\//, '')

export const getProject = (slug) => projects.find((p) => p.slug === slug)

export const yearLabel = (p) => (p.year ? `${p.yearApprox ? 'c. ' : ''}${p.year}` : null)

// Every tag with its project count, most used first.
export const allTags = (() => {
  const counts = new Map()
  projects.forEach((p) => (p.tags ?? []).forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)))
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
})()

// Text query matches title/summary/description/tags; selected tags are AND-ed.
export function filterProjects(query, selectedTags) {
  const q = query.trim().toLowerCase()
  return projects.filter((p) => {
    if (!selectedTags.every((t) => p.tags?.includes(t))) return false
    if (!q) return true
    const hay = [p.title, p.summary, p.description, ...(p.tags ?? [])].join(' ').toLowerCase()
    return q.split(/\s+/).every((word) => hay.includes(word))
  })
}
