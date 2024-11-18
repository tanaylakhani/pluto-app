/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack5: true,
  experimental: {
    serverComponentsExternalPackages: ["pg"],
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: "*",
        // pathname:"*"
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        dns: false,
        tls: false,
        net: false,
      };
    }

    return config;
  },
};

export default nextConfig;
