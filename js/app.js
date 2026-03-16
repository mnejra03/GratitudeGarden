// =============================================
//  app.js — Glavna logika aplikacije
//  Čita/piše podatke iz Supabase baze
//  Uključuje autentikaciju
// =============================================

let entries = [];
let currentUser = null;

// ── Provjeri je li korisnik ulogovan ──
async function checkAuth() {
  const { data } = await db.auth.getSession();

  if (!data.session) {
    // Nije ulogovan — pošalji na login
    window.location.href = 'login.html';
    return false;
  }

  currentUser = data.session.user;
  return true;
}

// ── Prikaz emaila i logout dugmeta ──
function renderUserInfo() {
  const el = document.getElementById('user-info');
  el.innerHTML = `
    <div class="user-info">
      <span>${currentUser.email}</span>
      <button class="logout-btn" onclick="handleLogout()">Sign out</button>
    </div>`;
}

// ── Odjava ──
async function handleLogout() {
  await db.auth.signOut();
  window.location.href = 'login.html';
}

// ── Sačuvaj novi unos u Supabase ──
async function saveEntry() {
  const textEl = document.getElementById('entry-text');
  const text = textEl.value.trim();
  if (!text) return;

  const btn = document.getElementById('plant-btn');
  const savingEl = document.getElementById('saving-msg');
  const successEl = document.getElementById('success-msg');

  btn.disabled = true;
  savingEl.style.display = 'block';

  const today = getToday();

  const { data, error } = await db
    .from('entries')
    .insert({
      date: today,
      text: text,
      plant_type: PLANT_TYPES[Math.floor(Math.random() * PLANT_TYPES.length)],
      color_idx: Math.floor(Math.random() * COLORS.length),
      user_id: currentUser.id,
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

  // Odmah ažuriraj vrt i listu — bez čekanja
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

// ── Učitaj unose trenutnog korisnika ──
async function loadEntries() {
  const { data, error } = await db
    .from('entries')
    .select('*')
    .eq('user_id', currentUser.id)
    .order('date', { ascending: false });

  document.getElementById('loading-screen').style.display = 'none';
  document.getElementById('app').style.display = 'block';

  if (error) {
    setStatus('error', '⚠️ Could not load entries.');
  } else {
    entries = data || [];
    setStatus('online', '✓ Connected — your garden is saved in the cloud');
    setTimeout(() => {
      document.getElementById('status-bar').style.display = 'none';
    }, 4000);
  }

  renderAll();
}

// ── Pokreni aplikaciju ──
async function init() {
  const loggedIn = await checkAuth();
  if (!loggedIn) return;
  renderUserInfo();
  await loadEntries();
}

init();