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
        {
          protocol: "https",
          hostname: "media2.dev.to",
          port: "",
          pathname: "/dynamic/**",
        },
        {
          protocol: "https",
          hostname: "cdn.sanity.io",
          port: "",
          pathname: "/images/**",
        },
      ],
    },
  }),
);

export default nextConfig;
