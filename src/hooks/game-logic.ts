import { SOLUCIONES, PALABRAS_VALIDAS } from '../data/words';
import type { Evaluation, Stats, GameState } from '../types';

// ═══════════════════════════════════════════════════════
//  Palabra del día (determinista por fecha)
// ═══════════════════════════════════════════════════════

export function getFechaKey(): string {
  const h = new Date();
  return `${h.getFullYear()}-${String(h.getMonth() + 1).padStart(2, '0')}-${String(h.getDate()).padStart(2, '0')}`;
}

export function getPalabraDelDia(): string {
  const hoy = new Date();
  const seed = hoy.getFullYear() * 10000 + (hoy.getMonth() + 1) * 100 + hoy.getDate();
  return SOLUCIONES[seed % SOLUCIONES.length];
}

// ═══════════════════════════════════════════════════════
//  Evaluación de intentos
// ═══════════════════════════════════════════════════════

export function normalizarLetra(c: string): string {
  if (c === 'Ñ' || c === 'ñ') return 'Ñ';
  return c.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
}

export function evaluarIntento(intento: string, solucion: string): Evaluation {
  const result: Evaluation = Array(5).fill('absent') as Evaluation;
  const solArr = solucion.split('');
  const intArr = intento.split('');
  const used = Array(5).fill(false);

  // Pass 1 — correctos (verde)
  for (let i = 0; i < 5; i++) {
    if (intArr[i] === solArr[i]) {
      result[i] = 'correct';
      used[i] = true;
    }
  }

  // Pass 2 — presentes (amarillo)
  for (let i = 0; i < 5; i++) {
    if (result[i] === 'correct') continue;
    for (let j = 0; j < 5; j++) {
      if (!used[j] && intArr[i] === solArr[j]) {
        result[i] = 'present';
        used[j] = true;
        break;
      }
    }
  }

  return result;
}

export function esPalabraValida(palabra: string): boolean {
  return PALABRAS_VALIDAS.has(palabra.toUpperCase());
}

// ═══════════════════════════════════════════════════════
//  Persistencia (localStorage)
// ═══════════════════════════════════════════════════════

const STATS_KEY = 'wordle_es_stats';
const GAME_KEY = 'wordle_es_game';

const DEFAULT_STATS: Stats = {
  played: 0,
  won: 0,
  streak: 0,
  maxStreak: 0,
  dist: [0, 0, 0, 0, 0, 0],
};

export function loadStats(): Stats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (raw) return JSON.parse(raw) as Stats;
  } catch { /* noop */ }
  return { ...DEFAULT_STATS, dist: [...DEFAULT_STATS.dist] as Stats['dist'] };
}

export function saveStats(s: Stats): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(s));
  } catch { /* noop */ }
}

export function loadGame(): GameState | null {
  try {
    const raw = localStorage.getItem(GAME_KEY);
    if (raw) {
      const g = JSON.parse(raw) as GameState;
      if (g.fecha === getFechaKey()) return g;
    }
  } catch { /* noop */ }
  return null;
}

export function saveGame(state: GameState): void {
  try {
    localStorage.setItem(GAME_KEY, JSON.stringify(state));
  } catch { /* noop */ }
}

// ═══════════════════════════════════════════════════════
//  Compartir resultado (emoji grid)
// ═══════════════════════════════════════════════════════

export function generarCompartir(evaluations: Evaluation[], won: boolean): string {
  const emoji: Record<string, string> = {
    correct: '🟩',
    present: '🟨',
    absent: '⬛',
  };

  const grid = evaluations
    .map(row => row.map(s => emoji[s]).join(''))
    .join('\n');

  const intentos = won ? `${evaluations.length}/6` : 'X/6';
  return `Wordle (ES) ${getFechaKey()} ${intentos}\n\n${grid}`;
}
