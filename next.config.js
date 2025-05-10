/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable CORS for all routes
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },

  // Disable browser caching in development
  ...(process.env.NODE_ENV === 'development' && {
    headers: async () => [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ],
  }),

  // If we're in production, use the standard headers configuration
  ...(process.env.NODE_ENV === 'production' && {
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: '*',
            },
            {
              key: 'Cache-Control',
              value: 'public, max-age=86400, stale-while-revalidate=31536000',
            },
          ],
        },
        // Balanced caching for static assets - stale-while-revalidate approach
        {
          source: '/_next/image/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=86400, stale-while-revalidate=604800',
            },
          ],
        },
        {
          source: '/images/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=86400, stale-while-revalidate=604800',
            },
          ],
        },
      ];
    },
  }),

  images: {
    domains: ['placehold.co', 'placekitten.com', 'utfs.io', 'x8a33q4crv.ufs.sh', 'res.cloudinary.com', 'images.pexels.com', 'ik.imagekit.io', 'images.unsplash.com', 'randomuser.me', 'images.unsplash.com', 'i.pravatar.cc'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24, // 1 day in seconds
    deviceSizes: [640, 750, 1080, 1920], // Reduced sizes for faster builds
    imageSizes: [16, 32, 64, 96, 128, 256], // Optimized sizes
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.ufs.sh',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // External packages for server components
  serverExternalPackages: ['firebase-admin'],
  // Improve hydration mismatch debugging
  experimental: {
    strictNextHead: true,
  },
  // Optimize compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Enable React strict mode for better development experience and fewer bugs
  reactStrictMode: true,
  // Configure performance related features
  poweredByHeader: false, // Remove X-Powered-By header
};

module.exports = nextConfig;
