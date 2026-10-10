export default function Tag({ label, active, onClick, count }) {
  const base = 'rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors'
  const look = active
    ? 'bg-indigo-600 text-white'
    : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
  if (!onClick) return <span className={`${base} ${look}`}>{label}</span>
  return (
    <button type="button" onClick={onClick} aria-pressed={active}
      className={`${base} ${look} cursor-pointer ${active ? '' : 'hover:bg-slate-300 dark:hover:bg-slate-700'}`}>
      {label}{count != null && <span className="ml-1 opacity-60">{count}</span>}
    </button>
  )
}
