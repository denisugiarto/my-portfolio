import React, { useRef } from "react";
import data from "../../../constant/data.json";
import Image from "next/image";
import dayjs from "dayjs";
import { LazyMotion, domAnimation, m } from "framer-motion";

const Experience = () => {
  return (
    <LazyMotion features={domAnimation}>
        <div className="container">
          <h2 className="title-section text-center">Experience</h2>
          <div className="mx-auto flex flex-col gap-4 lg:max-w-lg">
            {data.experience.map((item, index) => (
              <m.div
                key={`contact-${index}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                transition={{ duration: 0.5 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div
                  key={`${index}`}
                  className="flex gap-4 rounded-lg bg-blue-900 p-4 font-semibold text-white shadow-card"
                >
                  <div id="image" className="basis-12">
                    <Image
                      src={item.companyImgUrl}
                      className="rounded-lg"
                      width={48}
                      height={48}
                      alt={`logo ${item.companyName}`}
                    />
                  </div>
                  <div id="content" className="flex-1">
                    <h3 className="font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-sm font-normal">
                      {item.companyName} · {item.employmentType}
                    </p>
                    <p className="mb-4 text-sm text-slate-300 font-normal">
                      {`${dayjs(item.startDate).format("MMM YYYY")} - ${
                        item.endDate === "Present"
                          ? item.endDate
                          : dayjs(item.endDate).format("MMM YYYY")
                      }`}
                      <br />
                      {item.location} - {item.locationType}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Skills:</span>
                      {item.skills.map((skill, index) => (
                        <span className="font-light" key={skill}>{` ${skill} ${
                          index !== item.skills.length - 1 ? "·" : ""
                        }`}</span>
                      ))}
                    </p>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </div>
    </LazyMotion>
  );
};

export default Experience;
