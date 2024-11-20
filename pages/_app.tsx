import TanstackProvider from "@/components/providers/TanstackProvider";
import "@/styles/globals.css";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import { Montserrat, Montserrat_Alternates } from "next/font/google";
import Head from "next/head";
import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
const inter = Montserrat({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-inter",
});

const suezOne = Montserrat_Alternates({
  weight: ["300", "400", "500", "600", "700", "800","900"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-suez-one",
});

export const metadata = {
  manifest: "/manifest.json", // we are accessing our manifest file here
};

TimeAgo.addDefaultLocale(en);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta
          name="google-site-verification"
          content="wA-PDzFO_KCQRoPFGDEpvObLUt5ZLtNjTsD-nUANyJo"
        />
      </Head>
      {/* <Partytown debug={false} forward={["dataLayer.push"]} /> */}
      <script
        type="text/partytown"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `,
        }}
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
				window.dataLayer = window.dataLayer || [];
				function gtag(){window.dataLayer.push(arguments);}
				gtag('js', new Date());
				gtag('config', '${GA_MEASUREMENT_ID}');
				`}
      </Script>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        storageKey="theme"
        disableTransitionOnChange
      >
        <TanstackProvider>
          <div className={`${inter.variable} ${suezOne.variable}`}>
            <Component {...pageProps} />
          </div>
        </TanstackProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
