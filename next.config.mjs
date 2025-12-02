/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@mui/x-charts"],
  images: {
    domains: ["cdn.sanity.io"],
  },
  async headers() {
    return [
      {
        // 1. Match the path of your API route
        // This pattern matches all routes under /api/
        source: "/api/:path*",
        headers: [
          // 2. Allow all origins during local development
          // In production, you would replace '*' with your actual frontend domain
          { key: "Access-Control-Allow-Origin", value: "*" },

          // 3. Essential for complex requests and preflight OPTIONS requests
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          { key: "Access-Control-Allow-Credentials", value: "true" },
        ],
      },
    ];
  },
};

export default nextConfig;
