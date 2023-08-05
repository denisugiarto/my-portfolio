import { ReactNode } from 'react';
import Head from 'next/head';
import Header from '../Header';
import Footer from '../Footer';

export default function Layout({ children, pageTitle }) {
	return (
		<>
			<Head>
				{/* <!-- Primary Meta Tags --> */}
				<title>Deni Sugiarto | Frontend Web Developer | Mobile App Developer | {pageTitle}</title>
				<meta name="title" content="Deni Sugiarto | Frontend Web Developer | Mobile App Developer" />
				<meta
					name="description"
					content="I'm a Front-End Web Developer Based in Tulungagung, Indonesia. I am passionate about Ui effects, animation, and creating intuitive, dynamic user experiences."
				/>

				{/* <!-- Open Graph / Facebook --> */}
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://metatags.io/" />
				<meta property="og:title" content="Deni Sugiarto | Frontend Web Developer | Mobile App Developer" />
				<meta
					property="og:description"
					content="I'm a Front-End Web Developer Based in Tulungagung, Indonesia. I am passionate about Ui effects, animation, and creating intuitive, dynamic user experiences."
				/>
				<meta property="og:image" content="https://metatags.io/images/meta-tags.png" />

				{/* <!-- Twitter --> */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://metatags.io/" />
				<meta property="twitter:title" content="Deni Sugiarto | Frontend Web Developer | Mobile App Developer" />
				<meta
					property="twitter:description"
					content="I'm a Front-End Web Developer Based in Tulungagung, Indonesia. I am passionate about Ui effects, animation, and creating intuitive, dynamic user experiences."
				/>
				<meta property="twitter:image" content="https://metatags.io/images/meta-tags.png" />

				{/* <!-- Meta Tags Generated with https://metatags.io --> */}
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<script
					strategy="lazyOnload"
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
				/>
				<script id="google-analytics-script" strategy="lazyOnload">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
							page_path: window.location.pathname,
						});
			    	`}
				</script>
			</Head>
			<div>
				<Header />
				<main>{children}</main>
				<Footer />
			</div>
		</>
	);
}
