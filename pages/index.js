import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';
import useInView from 'react-cool-inview';

import { InView } from 'react-cool-inview';

const Hero = dynamic(() => import('../components/Hero'));
const Projects = dynamic(() => import('../components/Projects'));
const About = dynamic(() => import('../components/About'));
const Contact = dynamic(() => import('../components/Contact'));
const Skills = dynamic(() => import('../components/Skills'));

export default function Index() {
	const { observe, inView } = useInView({
		onEnter: ({ unobserve }) => unobserve(), // only run once
	});
	console.log('inView: ', inView);
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
				openGraph={{
					url: 'https://www.denisugiarto.my.id',
					title: 'Deni Sugiarto | Frontend Web Developer',
					description:'Frontend Web Developer. Experience developing web apps using Nextjs, ReactJs, and mobile apps using React Native with SCRUM agile development.',
					type: 'website',
					images: [{
						url: "https://www.denisugiarto.my.id/android-chrome-512x512.png",
						width: 512,
            height: 512,
            alt: 'logo image',
            type: 'image/png',
					}]
				}}
				twitter={{
					handle: '@handle',
					site: '@site',
					cardType: 'summary_large_image',
				}}
			/>
		<Layout>
			<div ref={observe}>
				{inView && <Hero sectionColor={sectionColor[0].text} sectionBgColor={sectionColor[0].background} />}
				{inView && <Projects />}
				{inView && <Contact />}
				{inView && <Skills />}
			</div>
		</Layout>
		</>
	);
}
