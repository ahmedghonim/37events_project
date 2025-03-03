/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["your-image-domain.com"], // Add any image domains if applicable
    formats: ["image/webp"], // Make sure WebP format is enabled
  },
  // output: "export", // Enables static export
  distDir: "dist", // Specifies the output directory
  // trailingSlash: true, // Ensures URLs are compatible with static hosting
};

export default nextConfig;
