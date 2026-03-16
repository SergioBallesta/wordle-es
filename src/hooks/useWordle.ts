import { useState, useCallback, useEffect, useRef } from 'react';
import type { Evaluation, Stats, KeyStatus } from '../types';
import {
  getPalabraDelDia,
  getFechaKey,
  normalizarLetra,
  evaluarIntento,
  esPalabraValida,
  loadStats,
  saveStats,
  loadGame,
  saveGame,
  generarCompartir,
} from './game-logic';

export interface WordleState {
  solucion: string;
  guesses: string[];
  evaluations: Evaluation[];
  currentGuess: string;
  currentRow: number;
  gameOver: boolean;
  gameWon: boolean;
  revealingRow: number;
  shakeRow: boolean;
  toast: { msg: string; show: boolean };
  showStats: boolean;
  stats: Stats;
  letterStates: Record<string, KeyStatus>;
  handleKey: (key: string) => void;
  setShowStats: (v: boolean) => void;
  compartir: () => void;
}

const WIN_MESSAGES = [
  '¡Genial!',
  '¡Increíble!',
  '¡Magnífico!',
  '¡Bien hecho!',
  '¡Por poco!',
  '¡Uf, al límite!',
];

export function useWordle(): WordleState {
  const solucion = useRef(getPalabraDelDia()).current;
  const savedGame = useRef(loadGame()).current;

  const [guesses, setGuesses] = useState<string[]>(savedGame?.guesses ?? []);
  const [evaluations, setEvaluations] = useState<Evaluation[]>(savedGame?.evaluations ?? []);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(savedGame?.gameOver ?? false);
  const [gameWon, setGameWon] = useState(savedGame?.gameWon ?? false);
  const [revealingRow, setRevealingRow] = useState(-1);
  const [shakeRow, setShakeRow] = useState(false);
  const [toast, setToast] = useState({ msg: '', show: false });
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState<Stats>(loadStats);

  const currentRow = guesses.length;

  // ── Derivar estado del teclado ────────────
  const letterStates: Record<string, KeyStatus> = {};
  guesses.forEach((g, gi) => {
    g.split('').forEach((l, li) => {
      const st = evaluations[gi]?.[li];
      if (!st) return;
      const prev = letterStates[l];
      if (st === 'correct') letterStates[l] = 'correct';
      else if (st === 'present' && prev !== 'correct') letterStates[l] = 'present';
      else if (st === 'absent' && !prev) letterStates[l] = 'absent';
    });
  });

  // ── Helpers ───────────────────────────────
  function showToastMsg(msg: string, dur = 1500) {
    setToast({ msg, show: true });
    setTimeout(() => setToast({ msg: '', show: false }), dur);
  }

  function triggerShake() {
    setShakeRow(true);
    setTimeout(() => setShakeRow(false), 400);
  }

  // ── Compartir ─────────────────────────────
  const compartir = useCallback(() => {
    const text = generarCompartir(evaluations, gameWon);
    navigator.clipboard.writeText(text).then(
      () => showToastMsg('¡Copiado al portapapeles!', 2000),
      () => showToastMsg('No se pudo copiar', 2000),
    );
  }, [evaluations, gameWon]);

  // ── Manejo de teclas ──────────────────────
  const handleKey = useCallback((key: string) => {
    if (gameOver) {
      if (key === 'ENTER') setShowStats(true);
      return;
    }

    // Borrar
    if (key === '⌫' || key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }

    // Enviar intento
    if (key === 'ENTER') {
      if (currentGuess.length < 5) {
        showToastMsg('Faltan letras');
        triggerShake();
        return;
      }

      const normalized = currentGuess.toUpperCase();
      if (!esPalabraValida(normalized)) {
        showToastMsg('Palabra no válida');
        triggerShake();
        return;
      }

      const eval_ = evaluarIntento(normalized, solucion);
      const newGuesses = [...guesses, normalized];
      const newEvals = [...evaluations, eval_];
      const won = normalized === solucion;
      const lost = !won && newGuesses.length >= 6;
      const over = won || lost;

      setRevealingRow(currentRow);
      setTimeout(() => setRevealingRow(-1), 1500);

      setGuesses(newGuesses);
      setEvaluations(newEvals);
      setCurrentGuess('');

      if (over) {
        setGameOver(true);
        setGameWon(won);

        const newStats: Stats = { ...stats, dist: [...stats.dist] as Stats['dist'] };
        newStats.played++;
        if (won) {
          newStats.won++;
          newStats.streak++;
          newStats.maxStreak = Math.max(newStats.maxStreak, newStats.streak);
          newStats.dist[newGuesses.length - 1]++;
        } else {
          newStats.streak = 0;
        }
        setStats(newStats);
        saveStats(newStats);

        setTimeout(() => {
          if (won) showToastMsg(WIN_MESSAGES[Math.min(newGuesses.length - 1, 5)], 2000);
          setTimeout(() => setShowStats(true), won ? 2200 : 1800);
        }, 1200);
      }

      saveGame({
        fecha: getFechaKey(),
        guesses: newGuesses,
        evaluations: newEvals,
        gameOver: over,
        gameWon: won,
      });
      return;
    }

    // Letra normal
    if (currentGuess.length >= 5) return;
    const normalized = normalizarLetra(key.toUpperCase());
    if (/^[A-ZÑ]$/.test(normalized)) {
      setCurrentGuess(prev => prev + normalized);
    }
  }, [currentGuess, gameOver, guesses, evaluations, currentRow, solucion, stats]);

  // ── Teclado físico ────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'Enter') handleKey('ENTER');
      else if (e.key === 'Backspace') handleKey('⌫');
      else if (/^[a-zA-ZñÑ]$/.test(e.key)) handleKey(e.key);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleKey]);

  // ── Restaurar modal si el juego ya terminó ─
  useEffect(() => {
    if (savedGame?.gameOver) {
      setTimeout(() => setShowStats(true), 600);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    solucion,
    guesses,
    evaluations,
    currentGuess,
    currentRow,
    gameOver,
    gameWon,
    revealingRow,
    shakeRow,
    toast,
    showStats,
    stats,
    letterStates,
    handleKey,
    setShowStats,
    compartir,
  };
}
