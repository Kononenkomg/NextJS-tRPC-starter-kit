/** @type {import('next').NextConfig} */

// we can change url for prod env here
const baseUrl = ''
const isProd = false
const assertPrefix = isProd ? baseUrl : ''

const nextConfig = {
  reactStrictMode: true,
  basePath: baseUrl,
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: `${assertPrefix}/_next/:path*`,
          destination: '/_next/:path*',
        },
      ],
      fallback: [
        {
          source: `${baseUrl}/api/:path*`,
          destination: '/api/:path*',
        },
      ],
    }
  },
}

module.exports = nextConfig
