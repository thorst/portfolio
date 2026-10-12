# TODO

Notes for making the portfolio stronger for employers. Roughly in priority order.

## Check
- [ ] Review which projects are under Managed vs Developed (`"role": "managed"` in `projects.json`). Moved by me, so please confirm: AWS Migration, .NET Core Port with Claude, Oracle Admin (left under Developed)
- [ ] `public/Todd_Horst_Resume.pdf` is public and contains the phone number; replace it when the resume changes (copy from `D:/Projects/resume/base`)

## Content
- [ ] Add one true outcome or metric to entries that lack one (Oracle ERP Integrations, Oracle Admin, Catch and Release, Open Enrollment, Surgery Tracker, IIS Manager)
- [ ] Add approximate years to the ~20 entries that have none (`"year"` with `"yearApprox": true`)
- [ ] Screenshots and mockups for the internal projects: build a small mock project for each, using Claude, then add images (`screenshots` in the JSON, images in `public/projects/<slug>/`)
- [ ] Prototypes tab: for each prototype, write the small public repo, then add its Source link and a real description (the six experiments Kafka, SQS, RabbitMQ, MongoDB, GraphQL, Rails have none yet)
- [ ] Surgery Tracker: add the Epic FHIR endpoints used once a prototype exists
- [ ] Review the Featured choices (`"featured": 1..7` in `projects.json`)

## Features
- [ ] Develop the Managed section further: the team size, outcomes, and what I personally contributed for each entry
- [ ] Optionally split Managed into Led / Oversaw / Advised (the `role` field currently only has "managed")

## Polish (later)
- [ ] Custom domain (then change `base` in `vite.config.js` to `/` and update the URLs in `index.html`)
- [ ] Mobile and accessibility pass (Lighthouse, keyboard use, screen reader check)
- [ ] Pin the best six repos on the GitHub profile and add a profile README
- [ ] Decide whether to name WellSpan in the healthcare entries (the bio and resume already do)

## Done
- [x] Resume PDF, tagline, and bio added; share-preview description uses the short bio
- [x] Developed / Managed / Prototypes tabs, each with its own Featured row
- [x] Link previews (Open Graph and Twitter tags), site description, favicon
- [x] Contact links: email, GitHub, LinkedIn
- [x] Featured row, with the rest in alphabetical order
- [x] Prototypes tab
- [x] Tags reduced from 204 to 55 canonical tags; the originals stay searchable and are shown as "Also: ..." on each project page
