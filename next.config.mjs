/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASEURL: process.env.DATABASEURL,
    JSONWEBTOKEN: process.env.JSONWEBTOKEN,
    BACKENDURL: process.env.BACKENDURL,
    GOOGLECLIENTID: process.env.GOOGLECLIENTID,
    GOOGLECLIENTSECRECT: process.env.GOOGLECLIENTSECRECT,
    REPLICATE_API_TOKEN: process.env.REPLICATE_API_TOKEN,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    IMAGES_MODEL: process.env.IMAGES_MODEL,
    IMAGES_MODEL_SECRECT: process.env.IMAGES_MODEL_SECRECT,
  },
};

export default nextConfig;
