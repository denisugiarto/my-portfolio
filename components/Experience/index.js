import React, { useRef } from 'react';
import data from '../../constant/data.json';
import Image from 'next/image';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

const Experience = () => {
	return (
		<section className="overflow-hidden max-w-screen">
			<div className="container">
				<h2 className="title-section text-center">Work Experience</h2>
				<div className="flex flex-col gap-4 lg:max-w-lg mx-auto">
					{data.experience.map((item, index) => (
						<motion.div
							key={`contact-${index}`}
							initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
							transition={{ duration: .5 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="hover:scale-110 transition-all ease-linear"
						>
							<div key={`${index}`} className="p-4 rounded-lg shadow-card bg-blue-900 text-white font-semibold flex gap-4">
								<div id="image" className="basis-12">
									<Image src={item.companyImgUrl} className="rounded-lg" width={48} height={48} alt={`logo ${item.companyName}`} />
								</div>
								<div id="content" className="flex-1">
									<h3 className="font-extrabold leading-none">{item.title}</h3>
									<p className="text-sm">
										{item.companyName} · {item.employmentType}
									</p>
									<p className="text-sm text-slate-300 mb-4">
										{`${dayjs(item.startDate).format('MMM YYYY')} - ${
											item.endDate === 'Present' ? item.endDate : dayjs(item.endDate).format('MMM YYYY')
										}`}
										<br />
										{item.location} - {item.locationType}
									</p>
									<p className="text-sm">
										<span className="font-extrabold">Skills:</span>
										{item.skills.map((skill, index) => (
											<span key={skill}>{` ${skill} ${index !== item.skills.length - 1 ? '·' : ''}`}</span>
										))}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Experience;
