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

  // Dodaj u lokalni state odmah
  entries.push(data);

  // Odmah ažuriraj vrt i listu — bez čekanja na refresh
  renderGarden();
  renderPastEntries();
  renderStreak();

  // Očisti textarea i prikaži poruku uspjeha
  textEl.value = '';
  btn.disabled = true;
  successEl.style.display = 'block';
  setTimeout(() => { successEl.style.display = 'none'; }, 2000);

  // Ažuriraj brojač unosa danas
  const todayCount = entries.filter(e => e.date === today).length;
  const countEl = document.querySelector('.today-count');
  if (countEl) {
    countEl.textContent = `🌸 ${todayCount} seed${todayCount !== 1 ? 's' : ''} planted today`;
  } else {
    const h2 = document.querySelector('#journal-content h2');
    if (h2) {
      const p = document.createElement('p');
      p.className = 'today-count';
      p.textContent = `🌸 ${todayCount} seed${todayCount !== 1 ? 's' : ''} planted today`;
      h2.before(p);
    }
  }
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