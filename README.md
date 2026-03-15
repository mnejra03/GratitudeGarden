# 🌱 Gratitude Garden

A daily gratitude journal where every entry grows a plant in your personal visual garden.

**Live demo:** [https://69b6b31c7cf209ce8f3e2be9--fanciful-beignet-35ccdc.netlify.app/](https://69b6b31c7cf209ce8f3e2be9--fanciful-beignet-35ccdc.netlify.app/)

---

## What it does

- Write one or more gratitude entries per day
- Each entry plants a unique flower or mushroom in your garden
- Hover over a plant to read the entry
- Tracks your daily streak
- All data saved to the cloud — accessible from any device

---

## Built with

- **HTML, CSS, JavaScript** — no frameworks
- **Supabase** — cloud database (PostgreSQL)
- **Netlify** — hosting and automatic deployment

---

## Project structure

```
gratitude-garden/
├── index.html        # App structure
├── css/
│   └── style.css     # All styles
└── js/
    ├── config.js     # Supabase connection and constants
    ├── plants.js     # SVG plant generators
    ├── render.js     # UI rendering functions
    └── app.js        # Main logic and database calls
```

---

## Run locally

1. Clone the repository
2. Set up a [Supabase](https://supabase.com) project and run this SQL:

```sql
create table entries (
  id uuid default gen_random_uuid() primary key,
  date text not null,
  text text not null,
  plant_type text,
  color_idx integer,
  created_at timestamp default now()
);

alter table entries enable row level security;

create policy "Allow all" on entries
  for all using (true);
```

3. Add your Supabase URL and anon key to `js/config.js`
4. Open `index.html` in your browser

---

## What I learned

- Structuring a project across multiple files
- Connecting a frontend app to a cloud database with Supabase
- Deploying and hosting a site with Netlify
- DOM manipulation and dynamic rendering with vanilla JavaScript
- Generating SVG graphics with JavaScript
