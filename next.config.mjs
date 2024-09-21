/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@mui/x-charts"],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.havam.az" }],
        destination: "https://havam.az/:path*",
        permanent: true, // This creates a 301 redirect
      },
    ];
  },
};

export default nextConfig;
