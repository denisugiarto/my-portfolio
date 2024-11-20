import data from "@/constant/data.json";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
const listProject = data.projects.reverse();
export default function Projects() {
  const [totalShow, setTotalShow] = useState(3);
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="container"
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="title-section font-title">projects</h2>
        <div className="grid justify-between gap-8 md:grid-cols-2 xl:grid-cols-3">
          {listProject.map((project, index) => {
            return (
              <m.div
                className={`${
                  index > totalShow - 1 ? "hidden" : ""
                } transition-all ease-linear hover:scale-105 md:mr-4 md:hover:scale-110`}
                key={project.id}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Image
                  placeholder="blur"
                  blurDataURL={`blur-${project.picture}`}
                  src={project.picture}
                  width={420}
                  height={300}
                  className="h-60 w-full rounded-lg object-cover shadow-lg"
                  alt={`${project.title} project`}
                />
                <div className="py-4">
                  <h3 className="mb-2 text-xl font-bold capitalize text-slate-900 dark:text-slate-200">
                    {project.title}
                  </h3>
                  <p className="text-base text-slate-600 dark:text-slate-300">
                    {project.description}
                  </p>
                  <div className="mt-4 flex gap-4">
                    {project?.link && (
                      <a
                        href={project?.link}
                        target="_blank"
                        rel="noreferrer"
                        title="website link"
                        className="flex items-center gap-2 rounded-lg border bg-primary px-2 py-1 text-sm leading-none text-white shadow-md transition-all ease-in-out hover:scale-110"
                      >
                        <ExternalLink className="h-4 w-4" /> Web
                      </a>
                    )}
                    {project?.github && (
                      <a
                        href={project?.github}
                        target="_blank"
                        rel="noreferrer"
                        title="github repo"
                        className="flex items-center gap-2 rounded-lg border bg-primary px-2 py-1 text-sm leading-none text-white shadow-md transition-all ease-in-out hover:scale-110"
                      >
                        <SiGithub className="h-4 w-4" /> Repository
                      </a>
                    )}
                  </div>
                </div>
                <div className="pb-2 pt-0">
                  {project.tech.map((item, index) => {
                    return (
                      <span key={index} className="tag">
                        #{item}
                      </span>
                    );
                  })}
                </div>
              </m.div>
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
              <ArrowDown />
            </button>
          </div>
        )}
      </m.div>
    </LazyMotion>
  );
}
