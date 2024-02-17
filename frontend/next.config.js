/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  images: {
    domains: ["ipfs.infura.io", "source.unsplash.com", "ipfs.io"],
  },
};
module.exports = nextConfig;
