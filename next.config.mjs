/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // SPA only no Server Side rendering

    serverExternalPackages: ['@react-pdf/renderer'],
};

export default nextConfig;
