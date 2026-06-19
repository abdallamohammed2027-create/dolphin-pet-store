import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en" dir="ltr">
      <body style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '4rem 1rem' }}>
        <h1 style={{ fontSize: '3rem', color: '#0F5132' }}>404</h1>
        <p>Page not found.</p>
        <Link href="/ar" style={{ color: '#F5A623', fontWeight: 'bold' }}>
          Go to homepage
        </Link>
      </body>
    </html>
  );
}
