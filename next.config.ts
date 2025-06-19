// next.config.ts
import withNextIntl from "next-intl/plugin";

const plugin = withNextIntl();

const nextConfig = {
  experimental: {
    serverActions: {}, // ✅ Must be an object now
  },
};

export default plugin(nextConfig);
