import { useState, useEffect } from 'react';
import type { Stats } from '../types';

interface StatsModalProps {
  stats: Stats;
  show: boolean;
  onClose: () => void;
  gameWon: boolean;
  gameOver: boolean;
  solucion: string;
  intentos: number;
  onShare: () => void;
}

export default function StatsModal({
  stats, show, onClose, gameWon, gameOver, solucion, intentos, onShare,
}: StatsModalProps) {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    if (!show) return;
    const tick = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const diff = +tomorrow - +now;
      const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      setCountdown(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [show]);

  if (!show) return null;

  const pct = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;
  const maxDist = Math.max(...stats.dist, 1);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        animation: 'fadeIn 0.25s ease',
        padding: '16px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          borderRadius: '16px',
          padding: 'clamp(20px, 5vw, 32px)',
          width: '100%',
          maxWidth: '380px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          animation: 'slideUp 0.3s ease',
          border: '1px solid var(--border-card)',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '12px', right: '14px',
            background: 'none', border: 'none', color: 'var(--text-muted)',
            fontSize: '1.4rem', cursor: 'pointer', lineHeight: 1,
          }}
        >
          ×
        </button>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.4rem',
          textAlign: 'center',
          marginBottom: '20px',
          color: 'var(--text-primary)',
        }}>
          Estadísticas
        </h2>

        {/* Stat boxes */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '24px' }}>
          {([
            { val: stats.played, label: 'Jugadas' },
            { val: pct,          label: '% Ganadas' },
            { val: stats.streak, label: 'Racha' },
            { val: stats.maxStreak, label: 'Máx racha' },
          ] as const).map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1.6rem', fontWeight: 800,
                color: 'var(--text-primary)', fontFamily: 'var(--font-body)',
              }}>
                {s.val}
              </div>
              <div style={{
                fontSize: '0.6rem', color: 'var(--text-muted)',
                fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Distribution */}
        <h3 style={{
          fontFamily: 'var(--font-body)', fontWeight: 700,
          fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em',
          color: 'var(--text-muted)', marginBottom: '10px',
        }}>
          Distribución
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '24px' }}>
          {stats.dist.map((d, i) => {
            const w = Math.max(8, (d / maxDist) * 100);
            const highlight = gameWon && intentos === i + 1;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  width: '14px', fontSize: '0.8rem',
                  color: 'var(--text-muted)', fontWeight: 700,
                  fontFamily: 'var(--font-body)',
                }}>
                  {i + 1}
                </span>
                <div style={{
                  height: '22px',
                  width: `${w}%`,
                  minWidth: '24px',
                  background: highlight ? 'var(--color-correct)' : 'var(--color-absent)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: '6px',
                  transition: 'width 0.6s ease',
                }}>
                  <span style={{
                    fontSize: '0.75rem', fontWeight: 700, color: '#fff',
                    fontFamily: 'var(--font-body)',
                  }}>
                    {d}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Game result + countdown */}
        {gameOver && (
          <div style={{
            textAlign: 'center',
            borderTop: '1px solid var(--border-card)',
            paddingTop: '16px',
          }}>
            {!gameWon && (
              <p style={{
                color: '#e06c60', fontSize: '0.9rem',
                fontWeight: 600, marginBottom: '8px',
                fontFamily: 'var(--font-body)',
              }}>
                La palabra era: <strong style={{ color: 'var(--text-primary)' }}>{solucion}</strong>
              </p>
            )}

            <p style={{
              color: 'var(--text-muted)', fontSize: '0.7rem',
              fontWeight: 600, letterSpacing: '0.08em', marginBottom: '4px',
            }}>
              SIGUIENTE PALABRA EN
            </p>
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '1.8rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '0.1em',
              marginBottom: '16px',
            }}>
              {countdown}
            </p>

            <button
              onClick={onShare}
              style={{
                background: 'var(--color-correct)',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 32px',
                fontSize: '0.85rem',
                fontWeight: 700,
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                transition: 'transform 0.15s ease, opacity 0.15s ease',
              }}
              onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.opacity = '0.85'; }}
              onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.opacity = '1'; }}
            >
              Compartir 📋
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
