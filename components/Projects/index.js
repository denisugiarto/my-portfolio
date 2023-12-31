import { motion } from 'framer-motion';
import Image from 'next/image';
import data from '../../constant/data.json';
import { useState } from 'react';

export default function Projects() {
	const [totalShow, setTotalShow] = useState(3);
	return (
		<section id="projects" className="bg-white">
			<motion.div
				className="container"
				initial={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.5 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
			>
				<h2 className="title-section font-serif">projects</h2>
				<div className="grid md:grid-cols-2 xl:grid-cols-3 justify-between gap-8">
					{data.projects.reverse().map((project, index) => {
						return (
							<motion.div
								className={`${index < totalShow ? 'hidden' : ''} card md:mr-4`}
								key={project.id}
								initial={{ opacity: 0, y: -20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 1, delay: index * 0.5 }}
								viewport={{ once: true }}
							>
								<Image
									placeholder={`blur-${project.picture}`}
									blurDataURL={`blur-${project.picture}`}
									src={project.picture}
									width={500}
									height={300}
									alt={`${project.title} project`}
									priority
									objectFit="cover"
									objectPosition="top"
								/>
								<div className="px-6 py-4">
									<h3 className="font-bold text-xl mb-2 capitalize">{project.title}</h3>
									<p className="text-gray-700 text-base">{project.description}</p>
								</div>
								<div className="px-6 pt-4 pb-2">
									{project.tech.map((item, index) => {
										return (
											<span key={index} className="tag">
												#{item}
											</span>
										);
									})}
								</div>
							</motion.div>
						);
					})}
				</div>
				{data.projects.length > totalShow && (
					<div className="mt-4 text-center">
						<button className="bg-primary px-4 py-2 rounded-lg text-white" onClick={(prev) => setTotalShow(prev + 3)}>
							Show More
						</button>
					</div>
				)}
			</motion.div>
		</section>
	);
}
