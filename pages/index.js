import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import useInView from "react-cool-inview";

const Hero = dynamic(() => import("../components/Hero"));
const Projects = dynamic(() => import("../components/Projects"));
const About = dynamic(() => import("../components/About"));
const Contact = dynamic(() => import("../components/Contact"));

export default function Index() {
  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
  });
  return (
    <Layout pageTitle='Home'>
      <div ref={observe}>
        {inView && <Hero />}
        {inView && <Projects />}
        {inView && (
          <section id='aboutAndContactMe' className=' bg-blue-100'>
            <div className='flex flex-col md:flex-row justify-between container animate-fade-in-down'>
              <div className='flex-grow mr-4'>
                <About />
              </div>
              <div className='flex-none '>
                <Contact />
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
