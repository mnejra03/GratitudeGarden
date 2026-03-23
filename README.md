# 🌱 Gratitude Garden

A daily gratitude journal where every entry grows a plant in your personal visual garden. Each user has their own private garden — sign up, log in, and start planting.

**Live demo:** [https://mnejra03.github.io/GratitudeGarden/]

---

## What it does

- Create an account and log in securely
- Write one or more gratitude entries per day
- Each entry plants a unique flower or mushroom in your garden
- Hover over a plant to read the entry
- Tracks your daily streak (counts days, not individual entries)
- Every user sees only their own garden — data is fully private
- All data saved to the cloud — accessible from any device

---

## Screenshots

| Login | Garden |
|-------|--------|
| Sign in or create an account | Your personal visual garden grows with every entry |

---

## Built with

- **HTML, CSS, JavaScript** — no frameworks, all vanilla
- **Supabase** — cloud database (PostgreSQL) + authentication
- **Netlify** — hosting and automatic deployment from GitHub

---

## Project structure

```
gratitude-garden/
├── index.html          # Main app
├── login.html          # Login and registration page
├── css/
│   ├── style.css       # Main styles
│   └── login.css       # Login page styles
└── js/
    ├── config.js       # Supabase connection and constants
    ├── plants.js       # SVG plant generators
    ├── render.js       # UI rendering functions
    └── app.js          # Main logic, auth and database calls
```

---

## Run locally

1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/gratitude-garden.git
cd gratitude-garden
```

2. Set up a [Supabase](https://supabase.com) project and run this SQL:

```sql
create table entries (
  id uuid default gen_random_uuid() primary key,
  date text not null,
  text text not null,
  plant_type text,
  color_idx integer,
  user_id uuid references auth.users(id),
  created_at timestamp default now()
);

alter table entries enable row level security;

create policy "Users see own entries" on entries
  for all using (auth.uid() = user_id);
```

3. Add your Supabase URL and anon key to `js/config.js`

4. Open `index.html` in your browser

---

## What I learned

- Structuring a project across multiple files with clear separation of concerns
- User authentication with Supabase Auth (sign up, sign in, sign out)
- Row Level Security — ensuring each user only sees their own data
- Connecting a frontend app to a cloud database
- Deploying and hosting a site with Netlify + GitHub CI/CD
- DOM manipulation and dynamic rendering with vanilla JavaScript
- Generating SVG graphics programmatically with JavaScript
