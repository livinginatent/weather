/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@mui/x-charts"],
  images: {
    domains: ["cdn.sanity.io"],
  },
};

export default nextConfig;
