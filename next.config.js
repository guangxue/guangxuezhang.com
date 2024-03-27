/**
 * @type {import('next').NextConfig}
 */

const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');

// @ts-check
 
module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}a
   */
  const nextConfig = {
    /* config options here */
    webpack: (config, {isServer}) => {
      if(isServer) {
        config.plugins = [...config.plugins, new PrismaPlugin()]
      }
      return config;
    },
    images: {
      remotePatterns: [{
        protocol: 'https',
        hostname: 'assets.guangxuezhang.com',
        port: '',
        pathname: '/images/main/**',
      }]
    }
  }
  return nextConfig
}