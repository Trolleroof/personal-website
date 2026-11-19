import { cookies } from 'next/headers';

const KEY = 'nikhilprabhu-tech-visitors';
const BASE = 'https://countapi.mileshilliard.com/api/v1';

export const dynamic = 'force-dynamic';

async function readCount(): Promise<number> {
  const res = await fetch(`${BASE}/get/${KEY}`, { cache: 'no-store' });
  if (res.status === 404) return 0;
  if (!res.ok) throw new Error('counter read failed');
  const data = (await res.json()) as { value?: string | number };
  const value = Number(data.value);
  if (!Number.isFinite(value)) throw new Error('counter value missing');
  return value;
}

async function hitCount(): Promise<number> {
  const res = await fetch(`${BASE}/hit/${KEY}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('counter hit failed');
  const data = (await res.json()) as { value?: string | number };
  const value = Number(data.value);
  if (!Number.isFinite(value)) throw new Error('counter value missing');
  return value;
}

export async function GET() {
  const jar = await cookies();
  const seen = jar.get('visited')?.value === '1';

  try {
    const value = seen ? await readCount() : await hitCount();
    if (!seen) {
      jar.set('visited', '1', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 400,
        path: '/',
      });
    }
    return Response.json({ value });
  } catch {
    return Response.json({ value: null }, { status: 503 });
  }
}
