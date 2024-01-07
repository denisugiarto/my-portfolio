import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';

import { ArrowCircleUpIcon, ChevronUpIcon } from '@heroicons/react/outline';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useInView } from 'react-intersection-observer';
import Hero from '../components/Hero';
import { SiUps } from 'react-icons/si';
import Link from 'next/link';
const Contact = dynamic(() => import('../components/Contact'), {
	loading: () => <p>Loading...</p>,
	ssr: false,
});
const Experience = dynamic(() => import('../components/Experience'), {
	loading: () => <p>Loading...</p>,
	ssr: false,
});
const Projects = dynamic(() => import('../components/Projects'), {
	loading: () => <p>Loading...</p>,
	ssr: false,
});

export default function Index() {
	const { ref: HomeRef, inView: isHomeVisible } = useInView({ threshold: 0.2 });
	const { ref: ProjectRef, inView: isProjectVisible } = useInView({ threshold: 0.15 });
	const { ref: ContactRef, inView: isContactVisible } = useInView({ threshold: 0.15 });
	const { ref: WorkRef, inView: isWorkVisible } = useInView();
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
			<Layout activeNavbar={isHomeVisible ? '#home' : isProjectVisible ? '#projects' : isContactVisible ? '#contactMe' : '#experience'}>
				<div id="home" className="scroll-mt-24" ref={HomeRef}>
					<Hero sectionColor={sectionColor[0].text} sectionBgColor={sectionColor[0].background} />
				</div>
				<div id="projects" className="scroll-mt-20" ref={ProjectRef}>
					<Projects />
				</div>
				<div id="contactMe" className="scroll-mt-20" ref={ContactRef}>
					<Contact />
				</div>
				<div id="experience" className="scroll-mt-20" ref={WorkRef}>
					<Experience />
				</div>
				{/* <Skills /> */}
				<a
					href="#"
					className="group fixed block right-8 bottom-8 rounded-xl w-10 h-10 bg-red-700 text-white border border-white shadow-red-600"
					aria-label="Back to Top"
				>
					<ChevronUpIcon className="translate-y-0 group-hover:-translate-y-1 ease-in-out duration-300" />
				</a>
			</Layout>
		</>
	);
}
