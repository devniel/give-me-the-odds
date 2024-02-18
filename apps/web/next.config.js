/** @type {import('next').NextConfig} */
const path = require("path");
const API_URL = process.env.API_URL || "http://127.0.0.1:3001";

module.exports = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_URL}/:path*` // Proxy to Backend
      }
    ]
  },
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
};
