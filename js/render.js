// =============================================
//  render.js — Sve funkcije za crtanje UI-a
//  Ove funkcije čitaju `entries` iz app.js
//  i ažuriraju DOM
// =============================================

// Pomoćne funkcije za datume
function getToday() {
  return new Date().toISOString().split('T')[0];
}

function formatDate(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// Izračunaj streak (uzastopni dani, ne unosi)
function calcStreak(entries) {
  if (!entries.length) return 0;

  // Izvuci jedinstvene dane (jedan dan = jedan streak, bez obzira na broj unosa)
  const uniqueDays = [...new Set(entries.map(e => e.date))].sort().reverse();

  let streak = 0;
  let current = new Date(getToday());

  for (const day of uniqueDays) {
    const dayDate = new Date(day + 'T12:00:00');
    const diffDays = Math.round((current - dayDate) / 86400000);

    if (diffDays === 0 || diffDays === 1) {
      streak++;
      current = dayDate;
    } else {
      break;
    }
  }

  return streak;
}

// ── Prikaz streak badge-a ──
function renderStreak() {
  const streak = calcStreak(entries);
  const container = document.getElementById('streak-container');

  container.innerHTML = streak > 0
    ? `<span class="streak-badge">🌱 ${streak} day streak</span>`
    : '';
}

// ── Prikaz forme za pisanje ──
function renderJournal() {
  const today = getToday();
  document.getElementById('today-label').textContent = formatDate(today);

  const todayEntry = entries.find(e => e.date === today);
  const content = document.getElementById('journal-content');

  // Koliko unosa danas
  const todayEntries = entries.filter(e => e.date === today);
  const todayCount = todayEntries.length;
  const countMsg = todayCount > 0
    ? `<p class="today-count">🌸 ${todayCount} seed${todayCount !== 1 ? 's' : ''} planted today</p>`
    : '';

  // Forma je uvijek vidljiva — može se dodati više cvjetova
  content.innerHTML = `
    ${countMsg}
    <h2>What are you grateful for today?</h2>
    <textarea id="entry-text" placeholder="Today I'm grateful for…" rows="4"></textarea>
    <button class="plant-btn" id="plant-btn" disabled>🌱 Plant a seed</button>
    <div id="saving-msg" class="saving-msg" style="display:none">Saving to your garden…</div>
    <div id="success-msg" class="success-msg" style="display:none">✨ A new plant appeared in your garden!</div>`;

  // Aktiviraj dugme samo kad ima teksta
  document.getElementById('entry-text').addEventListener('input', function () {
    document.getElementById('plant-btn').disabled = !this.value.trim();
  });

  // Klik na dugme
  document.getElementById('plant-btn').addEventListener('click', saveEntry);
}

// ── Prikaz vrta ──
function renderGarden() {
  const floor = document.getElementById('garden-floor');
  const counter = document.getElementById('garden-counter');

  if (!entries.length) {
    floor.innerHTML = '<p class="empty-msg">Your garden awaits its first seed…</p>';
    counter.textContent = '';
    return;
  }

  counter.textContent = `${entries.length} plant${entries.length !== 1 ? 's' : ''} grown`;

  // Sortiraj od najstarijeg ka najnovijem
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));

  floor.innerHTML = sorted.map((entry, index) => {
    const plantFn = SVG_FNS[entry.plant_type] || daisySVG;
    const color = COLORS[(entry.color_idx || 0) % COLORS.length];
    const size = entry.date === getToday() ? 46 : 38;
    const preview = entry.text.length > 60 ? entry.text.slice(0, 60) + '…' : entry.text;

    return `
      <div class="plant-wrapper" style="animation-delay: ${Math.min(index * 50, 800)}ms">
        <div class="plant-tooltip">
          ${preview}
          <span class="tip-date">${formatDate(entry.date)}</span>
        </div>
        ${plantFn(color, size)}
      </div>`;
  }).join('');
}

// ── Prikaz liste prošlih unosa ──
function renderPastEntries() {
  const section = document.getElementById('entries-section');
  const list = document.getElementById('entries-list');

  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));

  // Prikaži sekciju samo ako ima više od jednog unosa
  if (sorted.length <= 1) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';
  list.innerHTML = sorted.map(entry => {
    const plantFn = SVG_FNS[entry.plant_type] || daisySVG;
    const color = COLORS[(entry.color_idx || 0) % COLORS.length];

    return `
      <div class="entry-item">
        <div>${plantFn(color, 32)}</div>
        <div>
          <div class="entry-item-date">${formatDate(entry.date)}</div>
          <div class="entry-item-text">"${entry.text}"</div>
        </div>
      </div>`;
  }).join('');
}

// ── Prikaži status bar poruku ──
function setStatus(type, message) {
  const bar = document.getElementById('status-bar');
  bar.className = 'status-bar ' + type;
  bar.textContent = message;
}

// ── Renderiraj sve odjednom ──
function renderAll() {
  renderStreak();
  renderJournal();
  renderGarden();
  renderPastEntries();
}