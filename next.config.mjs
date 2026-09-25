/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['mongodb-memory-server'],
  turbopack: { root: import.meta.dirname },
};
export default nextConfig;
