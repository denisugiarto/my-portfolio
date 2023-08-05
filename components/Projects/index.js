import { motion } from 'framer-motion';
import Image from 'next/image';
import data from '../../constant/data.json';

export default function Projects() {
	return (
		<section id="projects" className="bg-white">
			<motion.div
				className="container"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 1 }}
			>
				<h3 className="title-section font-serif">projects</h3>
				<div className="grid grid-cols-3 justify-between gap-8">
					{data.projects.map((project, index) => {
						return (
							<motion.div
								className="card md:mr-4"
								key={project.id}
								initial={{ opacity: 0, y: -20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 1, delay: index * 0.5 }}
								viewport={{ once: true }}
							>
								<Image src={project.picture} width={432} height={324} alt={project.title} priority layout="responsive" objectFit="cover" />
								<div className="px-6 py-4">
									<div className="font-bold text-xl mb-2">{project.title}</div>
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
			</motion.div>
		</section>
	);
}
