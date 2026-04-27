# Nello Ocean Beach — Website

Il beach club premium della costa del Cilento. 
Dove il mare incontra l'anima.

## Tech Stack
- **Vite** — Build tool
- **Vanilla JS + CSS** — No framework overhead
- **Supabase** — Database & Auth

## Setup

```bash
npm install
npm run dev
```

## Supabase Setup

1. Create a project on [supabase.com](https://supabase.com)
2. Run `db/schema.sql` in the SQL Editor
3. Create `.env` with your credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Structure
- `index.html` — Main page (single-page app)
- `src/style.css` — Design system + all section styles
- `src/main.js` — Interactivity (theme toggle, sunset countdown, booking, etc.)
- `src/supabase.js` — Database client & helpers
- `db/schema.sql` — Full Supabase database schema with seed data
