/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_SUBDOMINIO: process.env.SUBDOMINIO,
  },
};

export default nextConfig;