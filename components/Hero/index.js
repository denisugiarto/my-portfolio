import { motion } from 'framer-motion';
import Image from 'next/image';
import data from '../../constant/data.json';
import React from 'react';
import { SiReact } from 'react-icons/si';

// eslint-disable-next-line react/display-name
const Hero = React.forwardRef(({ sectionBgColor, sectionColor }, ref) => {
	const linkHireMe = data.contact.find((item) => {
		return item.type === 'whatsapp';
	}).link;
	return (
		<section id="home" className={`bg-hero text-${sectionColor}`}>
			<motion.div
				className="container my-auto"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 1 }}
			>
				<div className="flex flex-col-reverse md:flex-row justify-between items-center xl:gap-40">
					<div className="relative py-10 my-auto">
						<h1 className="leading-10 relative">
							Hi{' '}
							<motion.span
								initial={{ rotate: 45 }}
								animate={{ rotate: 0 }}
								transition={{ repeat: Infinity, duration: .5, repeatType: 'reverse' }}
								className="absolute -top-1 left-6"
							>
								👋
							</motion.span>
							,
							<br /> <span className="text-4xl font-title"> I&apos;m Deni Sugiarto</span>
						</h1>
						<p className="text-2xl text-green-500 font-bold">Frontend Web Developer</p>
						<p className="mt-6">{data.aboutMe}</p>
						<div className="mt-12">
							<a
								href={linkHireMe}
								className={`px-20 py-3 rounded-xl font-bold font-serif border-2 capitalize  hover:shadow-card duration-300 transition easy-in-out transform bg-${sectionBgColor} text-${sectionColor}`}
							>
								Hire me
							</a>
						</div>
						<div className="absolute right-10 top-0">
							<SiReact className="animate-spin-slow w-10 h-10" />
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
