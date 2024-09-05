/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASEURL: process.env.DATABASEURL,
  },
};

export default nextConfig;
