import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Shows a public GitHub repo's README on the project page. Fetched in the browser from raw.githubusercontent.com
// (CORS-enabled), so it stays current without a rebuild. If there is no README, it renders nothing.
const link = 'text-indigo-600 hover:underline dark:text-indigo-400'
const code = 'rounded bg-slate-200 px-1 py-0.5 text-[0.85em] dark:bg-slate-800'

export default function Readme({ repo }) {
  const [text, setText] = useState(null)
  useEffect(() => {
    let live = true
    fetch(`https://raw.githubusercontent.com/${repo}/HEAD/README.md`)
      .then((r) => (r.ok ? r.text() : null))
      .then((t) => live && setText(t))
      .catch(() => {})
    return () => { live = false }
  }, [repo])

  if (!text?.trim()) return null

  // Relative links and images in a README point into the repo, so resolve them there.
  const rel = (url, kind) =>
    /^([a-z]+:|\/\/|#|mailto:)/i.test(url ?? '') ? url : `https://github.com/${repo}/${kind}/HEAD/${(url ?? '').replace(/^\.?\//, '')}`

  // The README's own title repeats the page title, and its headings would clash with the page's, so start at h3.
  const body = text.replace(/^\s*#\s.*\n/, '')
  const h = (Tag, cls) => ({ children }) => <Tag className={cls}>{children}</Tag>

  return (
    <div className="space-y-3 text-slate-700 dark:text-slate-300">
      <Markdown remarkPlugins={[remarkGfm]} components={{
        h1: h('h3', 'mt-6 text-base font-semibold'),
        h2: h('h3', 'mt-6 text-base font-semibold'),
        h3: h('h4', 'mt-4 font-semibold'),
        h4: h('h4', 'mt-4 font-semibold'),
        a: ({ href, children }) => <a href={rel(href, 'blob')} target="_blank" rel="noreferrer" className={link}>{children}</a>,
        img: ({ src, alt }) => <img src={rel(src, 'raw')} alt={alt} loading="lazy" className="max-w-full rounded" />,
        ul: ({ children }) => <ul className="list-disc space-y-1 pl-6">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal space-y-1 pl-6">{children}</ol>,
        pre: ({ children }) => <pre className="overflow-x-auto rounded-lg bg-slate-100 p-3 text-sm dark:bg-slate-900 [&_code]:bg-transparent [&_code]:p-0">{children}</pre>,
        code: ({ className, children }) => <code className={className ?? code}>{children}</code>,
        table: ({ children }) => <div className="overflow-x-auto"><table className="w-full text-left text-sm">{children}</table></div>,
        th: ({ children }) => <th className="border-b border-slate-300 px-2 py-1 font-semibold dark:border-slate-700">{children}</th>,
        td: ({ children }) => <td className="border-b border-slate-200 px-2 py-1 dark:border-slate-800">{children}</td>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-slate-300 pl-4 text-slate-500 dark:border-slate-700">{children}</blockquote>,
      }}>{body}</Markdown>
    </div>
  )
}
