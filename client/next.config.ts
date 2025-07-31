import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "randomuser.me"], // ✅ Add Cloudinary domain
  },
};

export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // ✅ Example config options
//   reactStrictMode: true,
//   swcMinify: true,
//   images: {
//     domains: ['lh3.googleusercontent.com', 'cdn.example.com'], // replace with actual domains
//   },
// };

// export default nextConfig;
