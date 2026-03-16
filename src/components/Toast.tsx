interface ToastProps {
  message: string;
  show: boolean;
}

export default function Toast({ message, show }: ToastProps) {
  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--text-primary)',
        color: 'var(--bg-primary)',
        padding: '10px 24px',
        borderRadius: '10px',
        fontWeight: 700,
        fontFamily: 'var(--font-body)',
        fontSize: '0.85rem',
        zIndex: 200,
        animation: 'toastIn 0.2s ease',
        boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
        whiteSpace: 'nowrap',
      }}
    >
      {message}
    </div>
  );
}
