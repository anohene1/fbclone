/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "links.papareact.com",
      "platform.lookaside.fbsbx.com",
      "firebasestorage.googleapis.com",
      "scontent.facc1-1.fna.fbcdn.net",
      "pbs.twimg.com",
    ],
  },
};

module.exports = nextConfig;
