import { lazy } from 'react'

// Register embeddable demos here. The key is what you put in projects.json:
//   "demo": { "type": "embed", "component": "counter" }
// Each demo is code-split, so it only loads when its project page is opened.
export const demos = {
  counter: lazy(() => import('./CounterDemo.jsx')),
}
