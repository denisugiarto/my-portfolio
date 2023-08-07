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
		<Layout pageTitle="Home">
			<div ref={observe}>
				{inView && <Hero sectionColor={sectionColor[0].text} sectionBgColor={sectionColor[0].background} />}
				{inView && <Projects />}
				{inView && <Contact />}
				{inView && <Skills />}
			</div>
		</Layout>
	);
}
