/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASEURL: process.env.DATABASEURL,
    JSONWEBTOKEN: process.env.JSONWEBTOKEN,
    BACKENDURL: process.env.BACKENDURL,
  },
};

export default nextConfig;
