import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Verifica se é uma rota administrativa
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      // Redireciona para login se não estiver autenticado
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Verifica se o usuário tem role de admin
    const { data: { user } } = await supabase.auth.getUser();
    const { data: profile } = await supabase
      .from('usuarios')
      .select('role')
      .eq('id', user?.id)
      .single();

    if (profile?.role !== 'admin') {
      // Redireciona para home se não for admin
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
}; 