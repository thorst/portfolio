# Portfolio

Vite + React + Tailwind portfolio, published with GitHub Pages at https://thorst.github.io/portfolio/

## Run locally

```
npm install      # first time only
npm run dev
```

Then open http://localhost:5173/portfolio/ (the `/portfolio/` part is required).

Other commands:

- `npm run build` – production build into `dist/`
- `npm run preview` – serve the built site locally

## Adding a project

1. Add an entry to `src/data/projects.json`. Only `slug`, `title`, `summary` and `tags` are required.
2. Put screenshots in `public/projects/<slug>/` and reference them as `projects/<slug>/1.png`.
3. Optional: `year` (with `"yearApprox": true` to show "c. 2012"), `description`, `links`, and `demo`.

Demo types:

- `{ "type": "link", "url": "https://..." }` – link to an external site
- `{ "type": "iframe", "url": "https://..." }` – embed a page
- `{ "type": "embed", "component": "name" }` – a React component registered in `src/demos/index.js`

Site name, tagline and header links are in `src/data/site.json`.

Example entry:

```json
{
  "slug": "sample-project",
  "title": "Sample Project",
  "summary": "A short blurb shown on the card. Keep it to a sentence or two; it gets truncated.",
  "description": "Full description shown on the detail page.\n\nBlank lines make new paragraphs. Describe what it did, your role, and what was interesting about it.",
  "year": 2014,
  "yearApprox": true,
  "tags": ["React", "Node.js", "SQL Server"],
  "screenshots": [
    { "src": "projects/sample/1.svg", "caption": "Dashboard view" },
    { "src": "projects/sample/2.svg", "caption": "Settings page" }
  ],
  "demo": { "type": "embed", "component": "counter" },
  "links": [
    { "label": "Source", "url": "https://github.com/thorst/portfolio" }
  ]
}
```

## Deploying

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes automatically.
