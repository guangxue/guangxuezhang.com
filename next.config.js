// const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

// module.exports = withContentlayer(nextConfig);
const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
