import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { QueryProvider } from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    default: "Web Developer: Frontend web developer - Deni Sugiarto",
    template: "%s | Deni Sugiarto",
  },
  description:
    "Web Developer magician. Experience developing web apps using Nextjs, ReactJs, and mobile apps using React Native with SCRUM agile development.",
  keywords: [
    "Web developer",
    "Freelancer",
    "javascript",
    "typescript",
    "Frontend web developer",
    "Reactjs",
    "Nextjs",
    "React Native",
    "Deni",
    "Deni Sugiarto",
  ],
  authors: [{ name: "Deni Sugiarto" }],
  creator: "Deni Sugiarto",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Deni Sugiarto",
    title: "Web Developer: Frontend web developer - Deni Sugiarto",
    description:
      "Web Developer magician. Experience developing web apps using Nextjs, ReactJs, and mobile apps using React Native with SCRUM agile development.",
    images: [
      {
        url: "https://www.denisugiarto.my.id/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "logo image",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: process.env.NEXT_PUBLIC_SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${montserrat.variable}`}>
        {/* Google Analytics with Web Worker */}
        <GoogleAnalytics
          measurementId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          themes={["dark", "light"]}
          enableSystem={false}
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
