import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css";
import { GoogleAnalytics } from "nextjs-google-analytics";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

function MyApp({ Component, pageProps }) {
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
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="worker"
      />
      <Script id="google-analytics" strategy="worker">
        {`
				window.dataLayer = window.dataLayer || [];
				function gtag(){window.dataLayer.push(arguments);}
				gtag('js', new Date());
				gtag('config', '${GA_MEASUREMENT_ID}');
				`}
      </Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
