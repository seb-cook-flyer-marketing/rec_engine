/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "cdn.media.amplience.net"
            }
        ]
    }
}

module.exports = nextConfig
