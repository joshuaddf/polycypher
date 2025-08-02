import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "via.placeholder.com",
  //       pathname: "/30",
  //     },
  //     {
  //       protocol: "https",
  //       hostname: "h3.googleusercontent.com",
  //     }
  //   ],
  // }

   images: {
    remotePatterns: [new URL('https://lh3.googleusercontent.com/**')],
  },
};

export default nextConfig;
