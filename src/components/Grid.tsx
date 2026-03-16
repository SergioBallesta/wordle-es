import Row from './Row';
import type { Evaluation } from '../types';

interface GridProps {
  guesses: string[];
  evaluations: Evaluation[];
  currentGuess: string;
  currentRow: number;
  revealingRow: number;
  shakeRow: boolean;
  gameWon: boolean;
}

export default function Grid({
  guesses,
  evaluations,
  currentGuess,
  currentRow,
  revealingRow,
  shakeRow,
  gameWon,
}: GridProps) {
  const rows = [];

  for (let i = 0; i < 6; i++) {
    if (i < guesses.length) {
      const isLastAndWon = gameWon && i === guesses.length - 1 && revealingRow === -1;
      rows.push(
        <Row
          key={i}
          guess={guesses[i]}
          evaluation={evaluations[i]}
          isActive={false}
          isRevealing={revealingRow === i}
          isBouncing={isLastAndWon}
          shake={false}
        />,
      );
    } else if (i === currentRow) {
      rows.push(
        <Row
          key={i}
          guess={currentGuess}
          evaluation={null}
          isActive={true}
          isRevealing={false}
          isBouncing={false}
          shake={shakeRow}
        />,
      );
    } else {
      rows.push(
        <Row
          key={i}
          guess=""
          evaluation={null}
          isActive={false}
          isRevealing={false}
          isBouncing={false}
          shake={false}
        />,
      );
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'clamp(4px, 1vw, 7px)',
      alignItems: 'center',
    }}>
      {rows}
    </div>
  );
}
