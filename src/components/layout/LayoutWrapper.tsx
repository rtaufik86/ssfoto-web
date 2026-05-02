'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isOperationalPage = pathname?.startsWith('/admin') || pathname?.startsWith('/toko');

    if (isOperationalPage) {
        // Internal/Admin pages have their own layout, no public header/footer
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </>
    );
}
