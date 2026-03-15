// =============================================
//  config.js — Supabase konekcija i konstante
// =============================================

const SUPABASE_URL = 'https://bhmhxhyuepibvwdbbkrk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJobWh4aHl1ZXBpYnZ3ZGJia3JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1Njk0OTcsImV4cCI6MjA4OTE0NTQ5N30.QDezsF2BDLhlgbZxSzF1m2qFrItKfQIh6ziwaL1Pga4';

// Kreiramo Supabase klijent koji koristimo u app.js
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Boje za biljke
const COLORS = [
  { stem: '#4A8C4A', bloom: '#E8627A', center: '#F5C842' },
  { stem: '#3D7A3D', bloom: '#F5C842', center: '#C8922A' },
  { stem: '#5A9A5A', bloom: '#9B8EC4', center: '#7A6AB0' },
  { stem: '#4A8C4A', bloom: '#E87A3D', center: '#F5C842' },
  { stem: '#3D7A3D', bloom: '#7BADC4', center: '#5A9AB8' },
  { stem: '#5A9A5A', bloom: '#E8C87A', center: '#C8922A' },
  { stem: '#4A8C4A', bloom: '#C47A9A', center: '#E8A0C4' },
];

// Tipovi biljaka
const PLANT_TYPES = ['daisy', 'tulip', 'sunflower', 'wildflower', 'mushroom'];
