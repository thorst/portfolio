import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import { asset } from '../lib/projects.js'

export default function Gallery({ screenshots }) {
  const [index, setIndex] = useState(-1)
  const slides = screenshots.map((s) => ({ src: asset(s.src), description: s.caption }))
  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {screenshots.map((s, i) => (
          <button key={s.src} type="button" onClick={() => setIndex(i)} className="cursor-zoom-in text-left">
            <img src={asset(s.src)} alt={s.caption ?? `Screenshot ${i + 1}`} loading="lazy"
              className="aspect-video w-full rounded-lg border border-slate-200 object-cover object-top transition hover:opacity-80 dark:border-slate-800" />
          </button>
        ))}
      </div>
      <Lightbox open={index >= 0} index={index} close={() => setIndex(-1)} slides={slides}
        plugins={[Captions, Zoom]} captions={{ descriptionTextAlign: 'center' }} />
    </>
  )
}
