// =============================================
//  plants.js — SVG generatori biljaka
//  Svaka funkcija prima boju (c) i veličinu (s)
//  i vraća HTML string sa SVG biljkom
// =============================================

function daisySVG(c, s = 42) {
  let petals = '';
  for (let i = 0; i < 8; i++) {
    const angle = (i * 45 * Math.PI) / 180;
    const px = 21 + Math.cos(angle) * 8;
    const py = 22 + Math.sin(angle) * 8;
    petals += `<ellipse cx="${px}" cy="${py}" rx="4" ry="2.5"
      fill="${c.bloom}" opacity="0.9"
      transform="rotate(${i * 45}, ${px}, ${py})"/>`;
  }
  return `
    <svg width="${s}" height="${s * 1.4}" viewBox="0 0 42 60" fill="none">
      <path d="M21 58 Q19 48 21 38" stroke="${c.stem}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M21 48 Q16 44 14 40" stroke="${c.stem}" stroke-width="1.5" stroke-linecap="round"/>
      ${petals}
      <circle cx="21" cy="22" r="5" fill="${c.center}"/>
    </svg>`;
}

function tulipSVG(c, s = 42) {
  return `
    <svg width="${s}" height="${s * 1.4}" viewBox="0 0 42 60" fill="none">
      <path d="M21 58 Q20 48 21 36" stroke="${c.stem}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M21 50 Q26 44 28 38" stroke="${c.stem}" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M14 30 Q14 18 21 16 Q28 18 28 30 Q28 36 21 38 Q14 36 14 30Z" fill="${c.bloom}"/>
      <path d="M21 16 Q21 24 21 38" stroke="${c.center}" stroke-width="1" opacity="0.4"/>
    </svg>`;
}

function sunflowerSVG(c, s = 42) {
  let petals = '';
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30 * Math.PI) / 180;
    const px = 21 + Math.cos(angle) * 9;
    const py = 20 + Math.sin(angle) * 9;
    petals += `<ellipse cx="${px}" cy="${py}" rx="4.5" ry="2"
      fill="${c.bloom}" opacity="0.85"
      transform="rotate(${i * 30}, ${px}, ${py})"/>`;
  }
  return `
    <svg width="${s}" height="${s * 1.4}" viewBox="0 0 42 60" fill="none">
      <path d="M21 58 Q20 46 21 34" stroke="${c.stem}" stroke-width="2.5" stroke-linecap="round"/>
      ${petals}
      <circle cx="21" cy="20" r="7" fill="#3D2B1F"/>
      <circle cx="21" cy="20" r="4" fill="#2C1F15"/>
    </svg>`;
}

function wildflowerSVG(c, s = 38) {
  let lines = '';
  [0, 60, 120, 180, 240, 300].forEach(angle => {
    const rad = (angle * Math.PI) / 180;
    const x2 = 19 + Math.cos(rad) * 9;
    const y2 = 18 + Math.sin(rad) * 9;
    lines += `<line x1="19" y1="18" x2="${x2}" y2="${y2}"
      stroke="${c.bloom}" stroke-width="3" stroke-linecap="round"/>`;
  });
  return `
    <svg width="${s}" height="${s * 1.4}" viewBox="0 0 38 54" fill="none">
      <path d="M19 52 Q18 42 19 30" stroke="${c.stem}" stroke-width="2" stroke-linecap="round"/>
      ${lines}
      <circle cx="19" cy="18" r="4.5" fill="${c.center}"/>
    </svg>`;
}

function mushroomSVG(c, s = 36) {
  return `
    <svg width="${s}" height="${s * 1.2}" viewBox="0 0 36 44" fill="none">
      <rect x="15" y="26" width="6" height="14" rx="2" fill="#D4B896"/>
      <ellipse cx="18" cy="26" rx="14" ry="10" fill="${c.bloom}"/>
      <circle cx="10" cy="22" r="2" fill="rgba(255,255,255,0.5)"/>
      <circle cx="18" cy="20" r="2" fill="rgba(255,255,255,0.5)"/>
      <circle cx="26" cy="23" r="2" fill="rgba(255,255,255,0.5)"/>
    </svg>`;
}

// Mapa: ime tipa → funkcija
const SVG_FNS = {
  daisy:      daisySVG,
  tulip:      tulipSVG,
  sunflower:  sunflowerSVG,
  wildflower: wildflowerSVG,
  mushroom:   mushroomSVG,
};