import Head from 'next/head';
import Header from '../Header';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('../Footer'));

export default function Layout({ children, activeNavbar }) {
	return (
		<>
			<div>
				<Header activeNavbar={activeNavbar} />
				<main>{children}</main>
				<Footer />
			</div>
		</>
	);
}
