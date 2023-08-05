import Layout from '../components/Layout';
import dynamic from 'next/dynamic';
import useInView from 'react-cool-inview';

const Hero = dynamic(() => import('../components/Hero'));
const Projects = dynamic(() => import('../components/Projects'));
const About = dynamic(() => import('../components/About'));
const Contact = dynamic(() => import('../components/Contact'));

export default function Index() {
	const { observe, inView } = useInView({
		onEnter: ({ unobserve }) => unobserve(), // only run once
	});
	console.log('inView: ', inView);
	return (
		<Layout pageTitle="Home">
			<div ref={observe}>
				{inView && <Hero />}
				{inView && <Projects />}
				{inView && <Contact />}
			</div>
		</Layout>
	);
}
