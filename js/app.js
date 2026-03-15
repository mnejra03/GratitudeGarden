// =============================================
//  app.js — Glavna logika aplikacije
//  Čita/piše podatke iz Supabase baze
// =============================================

// Globalni state — lista svih unosa
let entries = [];

// ── Sačuvaj novi unos u Supabase ──
async function saveEntry() {
  const textEl = document.getElementById('entry-text');
  const text = textEl.value.trim();
  if (!text) return;

  const btn = document.getElementById('plant-btn');
  const savingEl = document.getElementById('saving-msg');
  const successEl = document.getElementById('success-msg');

  // Onemogući dugme dok se čuva
  btn.disabled = true;
  savingEl.style.display = 'block';

  const today = getToday();

  // Umetni novi unos (više unosa po danu je dozvoljeno)
  const { data, error } = await db
    .from('entries')
    .insert({
      date: today,
      text: text,
      plant_type: PLANT_TYPES[Math.floor(Math.random() * PLANT_TYPES.length)],
      color_idx: Math.floor(Math.random() * COLORS.length),
    })
    .select()
    .single();

  savingEl.style.display = 'none';

  if (error) {
    setStatus('error', '⚠️ Could not save. Check your internet connection.');
    btn.disabled = false;
    return;
  }

  // Dodaj novi unos u lokalni state
  entries = entries.filter(e => e.date !== today);
  entries.push(data);

  // Prikaži poruku uspjeha pa re-renderiraj
  successEl.style.display = 'block';
  setTimeout(() => renderAll(), 1200);
}

// ── Učitaj sve unose iz Supabase ──
async function loadEntries() {
  const { data, error } = await db
    .from('entries')
    .select('*')
    .order('date', { ascending: false });

  // Sakrij loading screen, prikaži app
  document.getElementById('loading-screen').style.display = 'none';
  document.getElementById('app').style.display = 'block';

  if (error) {
    setStatus('error', '⚠️ Could not connect to database. Have you run the SQL setup in Supabase?');
  } else {
    entries = data || [];
    setStatus('online', '✓ Connected to Supabase — your garden is saved in the cloud');

    // Sakrij status bar nakon 4 sekunde
    setTimeout(() => {
      document.getElementById('status-bar').style.display = 'none';
    }, 4000);
  }

  renderAll();
}

// ── Pokreni aplikaciju ──
loadEntries();