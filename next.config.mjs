import "./env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: () => { return "hi" }
};

export default nextConfig;
