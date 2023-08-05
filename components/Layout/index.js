import Head from 'next/head';
import Footer from '../Footer';
import Header from '../Header';

export default function Layout({ children, pageTitle }) {
	return (
		<>
			<div>
				<Head>
					<title>{pageTitle} | Deni Sugiarto | Frontend Web Developer | Mobile App Developer</title>
				</Head>
				<Header />
				<main>{children}</main>
				<Footer />
			</div>
		</>
	);
}
