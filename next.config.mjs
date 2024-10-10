import withBundleAnalyzer from "@next/bundle-analyzer";
import withSvgr from "next-plugin-svgr";

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = withBundleAnalyzerConfig(
  withSvgr({
    reactStrictMode: true,
    images: {
      minimumCacheTTL: 86400,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "media.dev.to",
          port: "",
          pathname: "/dynamic/**",
        },
      ],
    },
    i18n: {
      locales: ["en"],
      defaultLocale: "en",
    },
    experimental: {
      nextScriptWorkers: true,
    },
  }),
);

export default nextConfig;
