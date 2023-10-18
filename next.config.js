const path = require('path')
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const { i18n } = require("./next-i18next.config");

module.exports = withBundleAnalyzer({
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ["."],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: "",
  reactStrictMode: false,
  i18n: {
    defaultLocale: "en",
    locales: ["ar", "en"],
    localePath: path.resolve('./public/locales'),
  },
  images: {
    domains: ["cdn.nejoumaljazeera.co", "nejoumaljazeera.co"],
  },
  
  // Adding the redirect configuration here:
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://new.naj.ae/:path*',
        permanent: true, // Change to false if you want a 302 redirection instead of 301
      },
    ]
  },
});
