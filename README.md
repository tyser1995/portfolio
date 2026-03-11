# Portfolio — Resty S. Galido

Personal portfolio website built with Next.js 14, showcasing projects, skills, and professional experience.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Emotion
- **UI:** MUI (Material UI), Framer Motion
- **Icons:** React Icons, Font Awesome, Heroicons
- **Font:** Plus Jakarta Sans
- **Analytics:** Google Analytics (gtag)

## Pages

| Route | Description |
|---|---|
| `/` | Home — animated hero, network background, typewriter roles, and nav cards |
| `/about` | About — bio, profile photo, and movie inspirations section |
| `/skills` | Skills — scroll-animated progress bars by category + interactive development timeline |
| `/projects` | Projects — live GitHub repos via GitHub API with 3D tilt card hover |
| `/resume` | Resume — inline PDF viewer with download |

## Features

- **Network background** — 400-node animated canvas with spatial-grid optimization, data packets, and mouse interaction across all pages
- **Rocket cursor** — custom SVG rocket that rotates with movement direction, flame trail, and particle explosion on click
- **Page loader** — splash screen gate that blocks content until the page is fully loaded
- **Navigation loader** — animated modal with sonar rings shown when switching pages
- **Mobile navigation** — hamburger button opens a slide-in right drawer; desktop shows a 4-column grid
- **Contact widget** — floating bottom-right widget that expands on hover with links to LinkedIn, GitHub, Viber, WhatsApp, and Email

## Skills Data

Skill entries are stored in `public/data/skills.json`, organized by category and sorted by `startYear` descending. Each entry has:

| Field | Type | Description |
|---|---|---|
| `label` | string | Display name |
| `startYear` | number | Year the skill was first used |
| `endYear` | number (optional) | Year last used — omit if currently active |
| `description` | string | Short description of usage |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

Deployed on [Vercel](https://vercel.com). Push to `main` to trigger a production deploy.
