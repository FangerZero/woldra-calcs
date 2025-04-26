/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // SPA only no Server Side rendering

  experimental: {
    serverComponentsExternalPackages: ['@react-pdf/renderer'],
  },
};

export default nextConfig;
