import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.ssfoto.co.id'
    const now = new Date()
    const urls = [
        '',
        '/pas-foto',
        '/cetak-foto',
        '/cetak-canvas',
        '/studio-foto',
        '/lokasi',
        '/tentang-kami',
        '/kontak',
        '/pas-foto/rawamangun',
        '/cetak-foto/rawamangun',
        '/cetak-foto-4r',
        '/cetak-foto-5r',
        '/cetak-foto-10r',
        '/pas-foto-2x3',
        '/pas-foto-3x4',
        '/pas-foto-4x6',
        '/ukuran-pas-foto',
    ]

    return urls.map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: now,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : path.split('/').length <= 2 ? 0.9 : 0.7,
    }))
}
