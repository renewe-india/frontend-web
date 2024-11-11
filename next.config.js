/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains:
            process.env.NODE_ENV === 'production'
                ? ['your-production-domain.com']
                : ['localhost'],
    },
}

module.exports = nextConfig
