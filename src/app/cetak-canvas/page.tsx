import type { Metadata } from 'next';
import CetakCanvasContent from './CetakCanvasContent';

export const metadata: Metadata = {
    title: 'Cetak Canvas Premium dengan Spanram | SS Foto',
    description: 'Jadikan momen berharga lebih abadi. Cetak foto dengan bahan canvas tebal premium, tekstur elegan, sudah dilengkapi spanram kayu kokoh siap pajang.',
    alternates: { canonical: 'https://www.ssfoto.co.id/cetak-canvas' },
};

export default function Page() {
    return <CetakCanvasContent />;
}
