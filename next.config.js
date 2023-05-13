// const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'beta.guangxuezhang.com',
        port: '',
        pathname: '/images/main/**',
      },
    ],
  },
};

// module.exports = withContentlayer(nextConfig);
const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
