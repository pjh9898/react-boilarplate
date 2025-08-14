const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    const path = require("path");

    // @ 경로를 src로 매핑
    config.resolve.alias["@"] = path.resolve(__dirname, "src");

    return config;
  },
};

module.exports = withNextIntl(nextConfig);
