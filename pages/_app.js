import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';
import { GoogleAnalytics } from 'nextjs-google-analytics';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				{/* <!-- Primary Meta Tags --> */}				
				<meta name="title" content="Deni Sugiarto | Frontend Web Developer | Mobile App Developer" />
				<meta
					name="description"
					content="I'm a Front-End Web Developer Based in Tulungagung, Indonesia. I am passionate about Ui effects, animation, and creating intuitive, dynamic user experiences."
				/>

				{/* <!-- Open Graph / Facebook --> */}
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://www.denisugiarto.my.id/" />
				<meta property="og:title" content="Deni Sugiarto | Frontend Web Developer | Mobile App Developer" />
				<meta
					property="og:description"
					content="I'm a Front-End Web Developer Based in Tulungagung, Indonesia. I am passionate about Ui effects, animation, and creating intuitive, dynamic user experiences."
				/>
				<meta property="og:image" content="https://www.denisugiarto.my.id/android-chrome-512x512.png" />

				{/* <!-- Twitter --> */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://metatags.io/" />
				<meta property="twitter:title" content="Deni Sugiarto | Frontend Web Developer | Mobile App Developer" />
				<meta
					property="twitter:description"
					content="I'm a Front-End Web Developer Based in Tulungagung, Indonesia. I am passionate about Ui effects, animation, and creating intuitive, dynamic user experiences."
				/>
				<meta property="twitter:image" content="https://www.denisugiarto.my.id/android-chrome-512x512.png" />

				{/* <!-- Meta Tags Generated with https://metatags.io --> */}
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<meta name="google-site-verification" content="wA-PDzFO_KCQRoPFGDEpvObLUt5ZLtNjTsD-nUANyJo" />
			</Head>
			<GoogleAnalytics gaMeasurementId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />			
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
