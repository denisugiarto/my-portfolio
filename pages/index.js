import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';

import Contact from '../components/Contact';
import { useInView } from 'react-intersection-observer';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';

export default function Index() {
	const { ref: HomeRef, inView: isHomeVisible } = useInView();
	console.log(isHomeVisible);
	const sectionColor = [
		{
			background: 'primary',
			text: 'white',
		},
		{
			background: 'white',
			text: 'primary',
		},
	];
	return (
		<>
			<NextSeo
				title="Deni Sugiarto | Frontend Web Developer"
				description="Frontend Web Developer. Experience developing web apps using Nextjs, ReactJs, and mobile apps using React Native with SCRUM agile development."
				openGraph={{
					url: 'https://www.denisugiarto.my.id',
					title: 'Deni Sugiarto | Frontend Web Developer',
					description:
						'Frontend Web Developer. Experience developing web apps using Nextjs, ReactJs, and mobile apps using React Native with SCRUM agile development.',
					type: 'website',
					images: [
						{
							url: 'https://www.denisugiarto.my.id/android-chrome-512x512.png',
							width: 512,
							height: 512,
							alt: 'logo image',
							type: 'image/png',
						},
					],
				}}
				twitter={{
					handle: '@handle',
					site: '@site',
					cardType: 'summary_large_image',
				}}
			/>
			<Layout activeNavbar={isHomeVisible ? '#home' : '#projects'}>
				<Hero ref={HomeRef} sectionColor={sectionColor[0].text} sectionBgColor={sectionColor[0].background} />
				<Projects />
				<Contact />
				<Skills />
			</Layout>
		</>
	);
}
