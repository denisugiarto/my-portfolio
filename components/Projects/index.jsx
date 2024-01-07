import { motion } from "framer-motion";
import Image from "next/image";
import data from "../../constant/data.json";
import { useMemo, useState } from "react";
import { ImGithub } from "react-icons/im";
import { FaArrowDown, FaExternalLinkAlt } from "react-icons/fa";

const listProject = data.projects.reverse();
export default function Projects() {
  const [totalShow, setTotalShow] = useState(3);
  return (
    <section className="bg-white">
      <motion.div
        className="container"
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="title-section font-title text-primary">projects</h2>
        <div className="grid justify-between gap-8 md:grid-cols-2 xl:grid-cols-3">
          {listProject.map((project, index) => {
            return (
              <motion.div
                className={`${
                  index > totalShow - 1 ? "hidden" : ""
                } card transition-all ease-linear hover:scale-105 md:mr-4 md:hover:scale-110`}
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
                  <h3 className="mb-2 text-xl font-bold capitalize">
                    {project.title}
                  </h3>
                  <p className="text-base text-gray-700">
                    {project.description}
                  </p>
                  <div className="mt-4 flex gap-4">
                    {project?.link && (
                      <a
                        href={project?.link}
                        target="_blank"
                        rel="noreferrer"
                        title="website link"
                        className="flex items-center gap-2 rounded-lg border bg-primary px-3 py-2 leading-none text-white shadow-md transition-all ease-in-out hover:scale-110"
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
                        className="flex items-center gap-2 rounded-lg border bg-primary px-3 py-2 leading-none text-white shadow-md transition-all ease-in-out hover:scale-110"
                      >
                        <ImGithub /> Repository
                      </a>
                    )}
                  </div>
                </div>
                <div className="px-6 pb-2 pt-4">
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
              className="mx-auto flex animate-bounce items-center gap-2 rounded-lg bg-primary px-6 py-3 text-white transition-all duration-700 ease-in-out hover:scale-110 hover:animate-none"
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
