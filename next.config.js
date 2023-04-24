// const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    baseUrl: "http://localhost:2322",
  },
};

// module.exports = withContentlayer(nextConfig);
const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
