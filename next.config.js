const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  images: {
    domains: [],
    minimumCacheTTL: 86400,
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});
