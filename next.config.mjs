// import "./env.mjs";
/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: () => {
    return "hi";
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
