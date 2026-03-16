import { useWordle } from './hooks/useWordle';
import Grid from './components/Grid';
import Keyboard from './components/Keyboard';
import StatsModal from './components/StatsModal';
import Toast from './components/Toast';

export default function App() {
  const {
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
  } = useWordle();

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, #1a1c25 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative bg glows */}
      <div style={{
        position: 'absolute', top: '-120px', right: '-80px',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(90,154,96,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-60px', left: '-60px',
        width: '250px', height: '250px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,166,68,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ─── Header ─── */}
      <header style={{
        width: '100%',
        maxWidth: '520px',
        padding: '16px 20px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-subtle)',
        flexShrink: 0,
      }}>
        <div style={{ width: '36px' }} />
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.3rem, 5vw, 1.7rem)',
            fontWeight: 800,
            letterSpacing: '0.04em',
            background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.1,
          }}>
            WORDLE
          </h1>
          <span style={{
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.25em',
            color: 'var(--color-correct)',
            textTransform: 'uppercase',
          }}>
            en español
          </span>
        </div>
        <button
          onClick={() => setShowStats(true)}
          aria-label="Estadísticas"
          style={{
            width: '36px', height: '36px',
            background: 'var(--bg-elevated)', border: 'none', borderRadius: '8px',
            color: 'var(--text-muted)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--border-card)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-elevated)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
          }}
        >
          📊
        </button>
      </header>

      {/* ─── Grid ─── */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '12px 0',
        minHeight: 0,
      }}>
        <Grid
          guesses={guesses}
          evaluations={evaluations}
          currentGuess={currentGuess}
          currentRow={currentRow}
          revealingRow={revealingRow}
          shakeRow={shakeRow}
          gameWon={gameWon}
        />
      </div>

      {/* ─── Keyboard ─── */}
      <div style={{
        width: '100%',
        maxWidth: '520px',
        padding: '8px 6px 16px',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
        flexShrink: 0,
      }}>
        <Keyboard onKey={handleKey} letterStates={letterStates} />
      </div>

      {/* ─── Overlays ─── */}
      <Toast message={toast.msg} show={toast.show} />
      <StatsModal
        stats={stats}
        show={showStats}
        onClose={() => setShowStats(false)}
        gameWon={gameWon}
        gameOver={gameOver}
        solucion={solucion}
        intentos={guesses.length}
        onShare={compartir}
      />
    </div>
  );
}
