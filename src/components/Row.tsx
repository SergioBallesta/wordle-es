import Cell from './Cell';
import type { Evaluation } from '../types';

interface RowProps {
  guess: string;
  evaluation: Evaluation | null;
  isActive: boolean;
  isRevealing: boolean;
  isBouncing: boolean;
  shake: boolean;
}

export default function Row({ guess, evaluation, isActive, isRevealing, isBouncing, shake }: RowProps) {
  const letters = (guess || '').padEnd(5, ' ').split('');

  return (
    <div
      style={{
        display: 'flex',
        gap: 'clamp(4px, 1vw, 7px)',
        animation: shake ? 'shakeRow 0.4s ease' : 'none',
      }}
    >
      {letters.map((l, i) => (
        <Cell
          key={i}
          letter={l.trim() ? l : ''}
          status={evaluation ? evaluation[i] : null}
          delay={i * 0.2}
          isActive={isActive}
          isRevealing={isRevealing}
          isBouncing={isBouncing}
          bounceDelay={i * 0.1}
        />
      ))}
    </div>
  );
}
