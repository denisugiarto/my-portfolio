import { motion } from 'framer-motion';
import Image from 'next/image';
import data from '../../constant/data.json';
import React from 'react';

// eslint-disable-next-line react/display-name
const Hero = React.forwardRef(({sectionBgColor, sectionColor}, ref) => {
	return (
		<section id="home" className={`bg-${sectionBgColor} text-${sectionColor} xl:min-h-screen`}>
			<motion.div
				className="container my-auto"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 1 }}
			>
				<div className=" flex justify-between items-center">
					<div className="py-10 my-auto lg:max-w-xl">
						<p className="leading-10 ">Hello, I&apos;m</p>
						<h1 className="text-4xl "> Frontend Web Developer.</h1>
						{data.aboutMe.map((item, index) => (
							<p key={index} className="leading-loose mt-4">
								{item}
							</p>
						))}
						<div className="flex mt-10">
							<a
								href={
									data.contact.filter((item) => {
										return item.type === 'whatsapp';
									})[0].link
								}
								className={`px-20 py-3 rounded-xl font-bold font-serif border-2 capitalize  hover:shadow-card duration-300 transition easy-in-out transform hover:scale-110 bg-${sectionBgColor} text-${sectionColor} hover:bg-${sectionColor}`}
							>
								Hire me
							</a>
						</div>
					</div>
					<div className="img-wrapper mx-auto sm:mx-0 hidden md:block">
						<div className="w-72 h-72 rounded-full shadow-xl overflow-hidden">
							<Image src="/img/profile.webp" width={400} height={400} alt="profile-picture" priority="true" />
						</div>
					</div>
				</div>
			</motion.div>
		</section>
	);
});

export default Hero;
