import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PRIVATE_ROUTE_PREFIXES = ['/admin', '/internal', '/toko', '/order', '/dl', '/dl-pf'];

function withNoIndex(response: NextResponse) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return response;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isPrivateRoute = PRIVATE_ROUTE_PREFIXES.some(
        (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    );

    // Cek apakah mengakses halaman admin
    if (pathname.startsWith('/admin')) {
        // Kecuali halaman login, boleh akses
        if (pathname === '/admin/login') {
            return withNoIndex(NextResponse.next());
        }

        // Cek cookie admin
        const adminToken = request.cookies.get('admin_token')?.value;

        if (!adminToken || adminToken !== process.env.ADMIN_SECRET) {
            const loginUrl = new URL('/admin/login', request.url);
            return withNoIndex(NextResponse.redirect(loginUrl));
        }
    }

    if (pathname.startsWith('/toko')) {
        const isTokoEnabled = process.env.NODE_ENV !== 'production' || process.env.ALLOW_TOKO_APP === 'true';

        if (!isTokoEnabled) {
            const notFoundUrl = new URL('/404', request.url);
            return withNoIndex(NextResponse.redirect(notFoundUrl));
        }
    }

    const response = NextResponse.next();
    return isPrivateRoute ? withNoIndex(response) : response;
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/internal/:path*',
        '/toko/:path*',
        '/order/:path*',
        '/dl/:path*',
        '/dl-pf/:path*',
    ],
};
