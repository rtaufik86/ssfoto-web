import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.ssfoto.co.id'
    const now = new Date()
    const urls = [
        '',
        '/pas-foto',
        '/cetak-foto',
        '/lokasi',
        '/tentang-kami',
        '/kontak',
        '/pas-foto/rawamangun',
        '/cetak-foto/rawamangun',
    ]

    return urls.map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: now,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : path.split('/').length <= 2 ? 0.9 : 0.7,
    }))
}
