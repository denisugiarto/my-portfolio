import withBundleAnalyzer from "@next/bundle-analyzer";
import withSvgr from "next-plugin-svgr";

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
  analyzerMode: "static",
  reportFilename: "analyze/nodejs.html",
});

const nextConfig = withBundleAnalyzerConfig(
  withSvgr({
    reactStrictMode: true,
    images: {
      minimumCacheTTL: 86400,
      formats: ["image/avif", "image/webp"],
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
    compress: true,
    poweredByHeader: false,
    // Optimize bundle splitting
    experimental: {
      optimizePackageImports: [
        "@icons-pack/react-simple-icons",
        "lucide-react",
        "framer-motion",
      ],
      // Optimize CSS loading
      optimizeCss: true,
    },
  }),
);

export default nextConfig;
