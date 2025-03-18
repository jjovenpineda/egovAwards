/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  distDir: "build",
  reactStrictMode: false,
};

export default nextConfig;
