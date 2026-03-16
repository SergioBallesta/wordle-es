import type { KeyStatus } from '../types';

const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

const KEY_COLORS: Record<KeyStatus, { bg: string; color: string }> = {
  correct: { bg: 'var(--color-correct)', color: '#fff' },
  present: { bg: 'var(--color-present)', color: '#fff' },
  absent:  { bg: 'var(--color-absent)',  color: 'var(--text-muted)' },
  default: { bg: 'var(--bg-key)',        color: 'var(--text-primary)' },
};

interface KeyboardProps {
  onKey: (key: string) => void;
  letterStates: Record<string, KeyStatus>;
}

export default function Keyboard({ onKey, letterStates }: KeyboardProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      alignItems: 'center',
      width: '100%',
      maxWidth: '520px',
    }}>
      {ROWS.map((row, ri) => (
        <div
          key={ri}
          style={{
            display: 'flex',
            gap: '4px',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {row.map((key) => {
            const isWide = key === 'ENTER' || key === '⌫';
            const st: KeyStatus = letterStates[key] || 'default';
            const c = KEY_COLORS[st];

            return (
              <button
                key={key}
                onClick={() => onKey(key)}
                style={{
                  flex: isWide ? '1.5' : '1',
                  maxWidth: isWide ? '72px' : '42px',
                  height: 'clamp(42px, 10vw, 56px)',
                  backgroundColor: c.bg,
                  color: c.color,
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: isWide ? 'clamp(0.6rem, 2.5vw, 0.75rem)' : 'clamp(0.85rem, 3vw, 1.05rem)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  letterSpacing: isWide ? '0.05em' : '0',
                  textTransform: 'uppercase',
                  WebkitTapHighlightColor: 'transparent',
                  transition: 'transform 0.1s ease, background-color 0.3s ease',
                }}
                onPointerDown={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.92)';
                }}
                onPointerUp={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                }}
                onPointerLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                }}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
