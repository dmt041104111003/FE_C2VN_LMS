import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED_SEARCH_ENGINES = [
  'Googlebot',
  'Bingbot',
  'Slurp',           
  'DuckDuckBot',
  'Yandex',
  'facebookexternalhit', 
  'Twitterbot',
  'LinkedInBot',
  'WhatsApp',
];

const BLOCKED_USER_AGENTS = [
  'GPTBot',
  'ChatGPT-User',
  'CCBot',
  'anthropic-ai',
  'Claude-Web',
  'ClaudeBot',
  'Bytespider',
  'Google-Extended',
  'Diffbot',
  'Omgilibot',
  'PetalBot',
  'AhrefsBot',
  'SemrushBot',
  'DataForSeoBot',
  'magpie-crawler',
  'cohere-ai',
  'PerplexityBot',
  'YouBot',
];

const BLOCKED_PATHS = [
  '/_next/static/chunks/app',
  '/_next/static/chunks/pages',
  '/api/source',
];

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const pathname = request.nextUrl.pathname;
  const ua = userAgent.toLowerCase();

  const isSearchEngine = ALLOWED_SEARCH_ENGINES.some(bot => 
    ua.includes(bot.toLowerCase())
  );

  if (isSearchEngine) {
    return NextResponse.next();
  }

  const isBlockedBot = BLOCKED_USER_AGENTS.some(bot => 
    ua.includes(bot.toLowerCase())
  );

  if (isBlockedBot) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  const isBlockedPath = BLOCKED_PATHS.some(path => pathname.startsWith(path));
  
  if (isBlockedPath) {
    const referer = request.headers.get('referer');
    const host = request.headers.get('host');
    
    if (!referer || !host || !referer.includes(host)) {
      return new NextResponse('Access Denied', { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/image|favicon.ico|loading.png|background.png).*)',
  ],
};

