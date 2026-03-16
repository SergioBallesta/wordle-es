/** Estado de una celda tras evaluar el intento. */
export type CellStatus = 'correct' | 'present' | 'absent';

/** Estado de una tecla en el teclado virtual. */
export type KeyStatus = CellStatus | 'default';

/** Resultado de evaluar una fila completa (5 celdas). */
export type Evaluation = CellStatus[];

/** Estadísticas persistentes del jugador. */
export interface Stats {
  played: number;
  won: number;
  streak: number;
  maxStreak: number;
  /** Distribución de victorias por intento (índice 0 = 1er intento). */
  dist: [number, number, number, number, number, number];
}

/** Estado serializable de la partida del día. */
export interface GameState {
  fecha: string;
  guesses: string[];
  evaluations: Evaluation[];
  gameOver: boolean;
  gameWon: boolean;
}
