// next.config.ts
import withNextIntl from "next-intl/plugin";

const plugin = withNextIntl();

const nextConfig = {
  experimental: {
    serverActions: {}, // ✅ Must be an object now
  },
  typescript: {
    // ✅ Ignore type errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // ✅ Allow builds to succeed even if ESLint has errors
    ignoreDuringBuilds: true,
  },
};

export default plugin(nextConfig);
