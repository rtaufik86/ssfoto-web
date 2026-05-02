/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/layanan/pas-foto',
        destination: '/pas-foto',
        statusCode: 301,
      },
      {
        source: '/layanan/cetak-canvas',
        destination: '/cetak-canvas',
        statusCode: 301,
      },
      {
        source: '/cetak-kanvas',
        destination: '/cetak-canvas',
        statusCode: 301,
      },
      {
        source: '/cetak-kanvas/rawamangun',
        destination: '/cetak-canvas',
        statusCode: 301,
      },
      {
        source: '/upload/canvas',
        destination: '/upload/kanvas',
        statusCode: 301,
      },
      {
        source: '/pas-foto-rawamangun',
        destination: '/pas-foto/rawamangun',
        statusCode: 301,
      },
      {
        source: '/cetak-foto-rawamangun',
        destination: '/cetak-foto/rawamangun',
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
