
const withReactSvg = require("next-react-svg");
const path = require("path");

module.exports = withReactSvg({
  include: path.resolve(__dirname, "assets/svgs"),
  webpack(config, options) {
    config.experiments = { asyncWebAssembly: true };
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  eslint:{
    enabled: true,
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});
