import { motion } from 'framer-motion';
import Image from 'next/image';
import data from '../../constant/data.json';
import { useMemo, useState } from 'react';
import { ImGithub } from 'react-icons/im';
import { FaArrowDown, FaExternalLinkAlt } from 'react-icons/fa';

const listProject = data.projects.reverse();
export default function Projects() {
	const [totalShow, setTotalShow] = useState(3);
	return (
		<section  className="bg-white">
			<motion.div
				className="container"
				initial={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.5, delay: 0.5 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
			>
				<h2 className="title-section font-title text-primary">projects</h2>
				<div className="grid md:grid-cols-2 xl:grid-cols-3 justify-between gap-8">
					{listProject.map((project, index) => {
						return (
							<motion.div
								className={`${index > totalShow - 1 ? 'hidden' : ''} card md:mr-4`}
								key={project.id}
								initial={{ opacity: 0, y: -20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								viewport={{ once: true }}
							>
								<Image
									placeholder={`blur-${project.picture}`}
									blurDataURL={`blur-${project.picture}`}
									src={project.picture}
									width={420}
									height={300}
									alt={`${project.title} project`}
									objectFit="cover"
									objectPosition="top"
								/>
								<div className="px-6 py-4">
									<h3 className="font-bold text-xl mb-2 capitalize">{project.title}</h3>
									<p className="text-gray-700 text-base">{project.description}</p>
									<div className="flex gap-4 mt-4">
										{project?.link && (
											<a
												href={project?.link}
												target="_blank"
												rel="noreferrer"
												title="website link"
												className="flex items-center gap-2 border rounded-lg shadow-md px-3 py-2 leading-none bg-primary text-white hover:scale-110 transition-all ease-in-out"
											>
												<FaExternalLinkAlt /> Web
											</a>
										)}
										{project?.github && (
											<a
												href={project?.github}
												target="_blank"
												rel="noreferrer"
												title="github repo"
												className="flex items-center gap-2 border rounded-lg shadow-md px-3 py-2 leading-none bg-primary text-white hover:scale-110 transition-all ease-in-out"
											>
												<ImGithub /> Repository
											</a>
										)}
									</div>
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
					<div className="mt-14">
						<button
							className="bg-primary mx-auto flex items-center gap-2 hover:scale-110 transition-all duration-700 ease-in-out px-6 py-3 rounded-lg text-white animate-bounce hover:animate-none"
							onClick={(prev) => setTotalShow(prev + 3)}
						>
							Load More
							<FaArrowDown />
						</button>
					</div>
				)}
			</motion.div>
		</section>
	);
}
