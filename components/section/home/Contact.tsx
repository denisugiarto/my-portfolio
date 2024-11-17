import { LazyMotion, domAnimation, m } from "framer-motion";
import { MailIcon } from "lucide-react";
import data from "../../../constant/data.json";
import {
  SiWhatsapp,
  SiLinkedin,
  SiGithub,
  SiUpwork,
} from "@icons-pack/react-simple-icons";
import { ContactItem } from "@/types";

type IconContactList = {
  [key: string]: JSX.Element;
}
const iconContactList : IconContactList = {
  email: <MailIcon className="h-6 w-6" />,
  whatsapp: <SiWhatsapp className="h-6 w-6 text-green-600" />,
  linkedin: <SiLinkedin className="h-7 w-7 text-blue-700" />,
  github: <SiGithub className="h-6 w-6" />,
  upwork: <SiUpwork className="h-6 w-6 text-green-500" />,
};

export default function Contact() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="container overflow-hidden">
        <h2 className="title-section text-center text-white">Contact Me</h2>
        <div className="content mx-auto mt-16 grid max-w-sm grid-cols-1 gap-y-10">
          {data.contact.map((item: ContactItem, index) => (
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
                className="flex gap-2 rounded-lg bg-background p-2 text-foreground shadow-lg transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-700"
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
