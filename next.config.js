/* eslint-disable import/no-extraneous-dependencies */

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
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: false,
  i18n: {
    // The locales you want to support in your app
    locales: ["ar", "en"],
    // The default locale you want to be used when visiting a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en",
  },
});
