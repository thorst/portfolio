import { useState } from 'react'

export default function CounterDemo() {
  const [n, setN] = useState(0)
  return (
    <div className="flex items-center gap-4">
      <button onClick={() => setN(n - 1)} className="rounded bg-slate-200 px-3 py-1 dark:bg-slate-700">−</button>
      <span className="w-12 text-center text-xl tabular-nums">{n}</span>
      <button onClick={() => setN(n + 1)} className="rounded bg-slate-200 px-3 py-1 dark:bg-slate-700">+</button>
    </div>
  )
}
