import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',
                '/admin/',
                '/internal/',
                '/toko/',
                '/bis/',
                '/order/',
                '/dl/',
                '/dl-pf/',
                '/upload/session/',
                '/upload/private/',
                '/test/',
                '/debug/',
            ],
        },
        sitemap: 'https://www.ssfoto.co.id/sitemap.xml',
    }
}
