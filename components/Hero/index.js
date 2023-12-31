import { motion } from 'framer-motion';
import Image from 'next/image';
import data from '../../constant/data.json';
import React from 'react';

// eslint-disable-next-line react/display-name
const Hero = React.forwardRef(({ sectionBgColor, sectionColor }, ref) => {
	return (
		<section id="home" className={`bg-hero text-${sectionColor} xl:min-h-screen`}>
			<motion.div
				className="container my-auto"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 1 }}
			>
				<div className=" flex flex-col-reverse md:flex-row justify-between items-center xl:gap-40">
					<div className="py-10 my-auto">
						<p className="leading-10 ">Hello, I&apos;m</p>
						<h1 className="text-4xl "> Frontend Web Developer.</h1>
						{data.aboutMe.map((item, index) => (
							<p key={index} className="leading-loose mt-4">
								{item}
							</p>
						))}
						<div className="flex mt-10">
							<motion.div className="box" whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
								<a
									href={
										data.contact.filter((item) => {
											return item.type === 'whatsapp';
										})[0].link
									}
									className={`px-20 py-3 rounded-xl font-bold font-serif border-2 capitalize  hover:shadow-card duration-300 transition easy-in-out transform bg-${sectionBgColor} text-${sectionColor} hover:bg-${sectionColor}`}
								>
									Hire me
								</a>
							</motion.div>
						</div>
					</div>
					<div className="img-wrapper mx-auto sm:mx-0 flex-grow-0">
						<div className="w-80 h-80">
							<Image src="/img/profile.webp" width={400} height={400} alt="profile-picture" />
						</div>
					</div>
				</div>
			</motion.div>
		</section>
	);
});

export default Hero;
