# Family Calendar named: Bueno's Dias. 

A colorful, shared calendar web app. Anyone with the link can view the calendar and its public activity history; creating, editing or deleting events requires a shared password distributed by the owner.

## Features

- **Four views** — Month, Week, Day and Agenda
- **Recurring events** — daily, weekly and monthly repetition
- **Shared editing** — view access is open; write access requires a shared password
- **Public activity history** — every action is logged with author, action and timestamp
- **Dark mode and color themes** — three palettes, all persisted per device
- **Mobile-first** — bottom tab bar, floating action button, touch-optimized layouts
- **Zero-install** — a web app that runs in any modern browser

## Tech Stack

| Layer | Technology |
|---|---|
| Front-end | HTML, CSS, vanilla JavaScript |
| Back-end | Node.js + TypeScript |
| Database | PostgreSQL |
| Hosting | Cloudflare Pages (static) + Supabase (database), or any VPS |

## Project Structure

```
cale/
 public/          # Front-end: everything sent to the browser
 index.html   # Single-page calendar app
 server/          # Back-end: runs only on the server
 index.ts     # HTTP server and API entry point
package.json     # Project manifest and dependencies
.gitignore       # Files Git must ignore (node_modules, .env)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) LTS (v20+)

### Installation

```bash
git clone https://github.com/&lt;your-username&gt;/cale.git
cd cale
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```
DATABASE_URL=postgresql://user:password@host:5432/cale
SHARED_PASSWORD=your-shared-edit-password
```

The `.env` file is git-ignored and must never be committed.

### Running Locally

```bash
npx tsx server/index.ts
```

Then open `http://localhost:3000` in your browser.

## Roadmap

- [x] Interactive calendar UI (month, week, day, agenda)
- [x] Recurring events
- [x] Dark mode and color themes
- [ ] Shared-password editing
- [ ] Public activity history
- [ ] Local data import (from the previous localStorage version)
- [ ] Custom domain deployment

## License

MIT
