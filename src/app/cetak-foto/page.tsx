import type { Metadata } from 'next';
import CetakFotoContent from './CetakFotoContent';

export const metadata: Metadata = {
    title: 'Cetak Foto Digital Kualitas Lab Profesional | SS Foto',
    description: 'Layanan cetak foto digital berbagai ukuran dengan kertas Fujifilm/Kodak asli. Hasil tajam, anti pudar, dan tahan puluhan tahun. Proses kilat.',
    alternates: { canonical: 'https://www.ssfoto.co.id/cetak-foto' }
};

export default function Page() {
    return <CetakFotoContent />;
}
