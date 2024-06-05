import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const currentUser = localStorage.getItem('accessToken');
    const currentRole = localStorage.getItem("role");
    if (currentRole!="Khach" && currentUser && !request.nextUrl.pathname.startsWith('/(authentication)')) {
      return Response.redirect(new URL('/(authentication)', request.url));
    }
  
    if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
      return Response.redirect(new URL('/login', request.url));
    }  
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}