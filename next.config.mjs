/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    SUBDOMINIO: process.env.SUBDOMINIO,
  },
};

export default nextConfig;