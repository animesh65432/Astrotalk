/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASEURL: process.env.DATABASEURL,
    JSONWEBTOKEN: process.env.JSONWEBTOKEN,
    BACKENDURL: process.env.BACKENDURL,
    GOOGLECLIENTID: process.env.GOOGLECLIENTID,
    GOOGLECLIENTSECRECT: process.env.GOOGLECLIENTSECRECT,
    REPLICATE_API_TOKEN: process.env.REPLICATE_API_TOKEN,
  },
  images: {
    domains: ["storage.googleapis.com"],
  },
};

export default nextConfig;
