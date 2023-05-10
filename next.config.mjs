// import "./env.mjs";
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  generateBuildId: () => { return "hi" }
};

export default nextConfig;
