'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, padding: '4rem 1.5rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5 }}>
          Critical_Failure
        </p>
        <h1 style={{ fontSize: '3rem', margin: '1rem 0' }}>FAULT.</h1>
        <p style={{ opacity: 0.7, marginBottom: '2rem' }}>
          The application shell failed to load. Reloading usually recovers the session.
        </p>
        <button
          onClick={() => reset()}
          style={{ padding: '0.75rem 1.5rem', fontSize: '0.85rem', cursor: 'pointer' }}
        >
          Reload
        </button>
      </body>
    </html>
  );
}
