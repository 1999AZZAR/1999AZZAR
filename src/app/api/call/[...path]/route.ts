import { NextResponse } from 'next/server';

const ALLOWED = /^(availability|bookings(\/[a-z0-9]{6,32})?(\/cancel|\/ics)?)$/;
const MAX_BODY_BYTES = 8_192;

interface Params {
  params: Promise<{ path: string[] }>;
}

const DEFAULT_UPSTREAM = 'https://mema-booking.azzar.workers.dev';

function upstreamBase(): string | null {
  const value = (process.env.CALL_API_URL || DEFAULT_UPSTREAM).trim();
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export async function GET(request: Request, { params }: Params) {
  return proxy(request, params, 'GET');
}

export async function POST(request: Request, { params }: Params) {
  return proxy(request, params, 'POST');
}

async function proxy(request: Request, params: Params['params'], method: 'GET' | 'POST') {
  const base = upstreamBase();
  if (!base) {
    return NextResponse.json({ error: 'Booking is not configured' }, { status: 503 });
  }

  const { path } = await params;
  const route = (path ?? []).join('/');
  if (!ALLOWED.test(route)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const search = new URL(request.url).search;
  let body: string | undefined;
  if (method === 'POST') {
    body = await request.text();
    if (Buffer.byteLength(body) > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }
  }

  try {
    const upstream = await fetch(`${base}/${route}${search}`, {
      method,
      headers: method === 'POST' ? { 'content-type': 'application/json' } : undefined,
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });

    return new Response(await upstream.text(), {
      status: upstream.status,
      headers: {
        'content-type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
        'cache-control': 'no-store',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Booking service unavailable' }, { status: 502 });
  }
}
