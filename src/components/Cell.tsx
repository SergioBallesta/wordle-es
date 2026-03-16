import type { CellStatus } from '../types';

interface CellProps {
  letter: string;
  status: CellStatus | null;
  delay: number;
  isActive: boolean;
  isRevealing: boolean;
  isBouncing: boolean;
  bounceDelay: number;
}

const STATUS_STYLES: Record<string, { bg: string; border: string; color: string }> = {
  correct: { bg: 'var(--color-correct)', border: 'var(--color-correct)', color: '#fff' },
  present: { bg: 'var(--color-present)', border: 'var(--color-present)', color: '#fff' },
  absent:  { bg: 'var(--color-absent)',  border: 'var(--color-absent)',  color: 'var(--text-secondary)' },
  empty:   { bg: 'transparent',          border: 'var(--border-default)', color: 'var(--text-primary)' },
  filled:  { bg: 'transparent',          border: 'var(--border-active)', color: 'var(--text-primary)' },
};

export default function Cell({ letter, status, delay, isActive, isRevealing, isBouncing, bounceDelay }: CellProps) {
  let state = 'empty';
  if (status) state = status;
  else if (letter) state = 'filled';

  const s = STATUS_STYLES[state];

  const animation = isRevealing
    ? `flipIn 0.5s ease ${delay}s both`
    : isBouncing
    ? `bounceCell 0.5s ease ${bounceDelay}s`
    : letter && !status
    ? 'popIn 0.1s ease'
    : 'none';

  return (
    <div
      style={{
        width: 'clamp(48px, 14vw, 62px)',
        height: 'clamp(48px, 14vw, 62px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'clamp(1.4rem, 5vw, 1.9rem)',
        fontWeight: 800,
        fontFamily: 'var(--font-body)',
        letterSpacing: '0.02em',
        borderRadius: '10px',
        userSelect: 'none',
        backgroundColor: s.bg,
        border: `2.5px solid ${s.border}`,
        color: s.color,
        animation,
        transform: isActive && letter ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.1s ease',
      }}
    >
      {letter || ''}
    </div>
  );
}
