import { PhoneIcon, AtSymbolIcon } from "@heroicons/react/outline";
import data from "../../../constant/data.json";
import Image from "next/image";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  IoLogoGithub,
  IoMdMail,
  IoLogoWhatsapp,
  IoLogoLinkedin,
} from "react-icons/io";
import { SiUpwork } from "react-icons/si";

const iconContactList = {
  email: <IoMdMail className="h-6 w-6" />,
  whatsapp: <IoLogoWhatsapp className="h-6 w-6 text-green-600" />,
  linkedin: <IoLogoLinkedin className="h-7 w-7 text-blue-700" />,
  github: <IoLogoGithub className="h-6 w-6" />,
  upwork: <SiUpwork className="h-6 w-6 text-green-500" />,
};

export default function Contact() {
  return (
    <LazyMotion features={domAnimation}>
        <div className="container overflow-hidden">
          <h2 className="title-section text-center text-white">Contact Me</h2>
          <div className="content mx-auto mt-16 grid max-w-sm grid-cols-1 gap-y-10">
            {data.contact.map((item, index) => (
              <m.div
                key={`contact-${index}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -120 : 120 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="cursor-pointer"
              >
                <a
                  title={item.type}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex gap-2 rounded-lg bg-white p-2 shadow-lg transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-gray-50"
                >
                  <div className="flex w-8 items-center justify-center">
                    {iconContactList[item.type]}
                  </div>
                  <p className="ml-4 text-xl">{item.value}</p>
                </a>
              </m.div>
            ))}
          </div>
        </div>
    </LazyMotion>
  );
}
