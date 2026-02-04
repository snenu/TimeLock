'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: 'linear-gradient(to bottom, #f0f9ff, #fff)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111', marginBottom: 8 }}>Something went wrong</h1>
          <p style={{ color: '#4b5563', marginBottom: 24 }}>A critical error occurred. Please try again.</p>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: '10px 20px',
              background: '#0ea5e9',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
