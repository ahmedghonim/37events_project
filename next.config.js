/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/react',
    images: {
      // domains: ['your-image-domain.com'], // Add your image domain here
      unoptimized: true
      },
    eslint: {
        ignoreDuringBuilds: true,
    },
    
    trailingSlash: true, // If you need trailing slashes for static HTML exports
   
    // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
    // trailingSlash: true,
   
    // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
     skipTrailingSlashRedirect: true,
   
    // Optional: Change the output directory `out` -> `dist`
     distDir: 'dist',
  }
   
  module.exports = nextConfig