import { SiReact } from "@icons-pack/react-simple-icons";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";
import React from "react";
import data from "../../../constant/data.json";

// eslint-disable-next-line react/display-name
export const linkHireMe = data.contact?.find(
  (contact) => contact.type === "whatsapp",
)?.link;
type HeroProps = {
  sectionBgColor: string;
  sectionColor: string;
};
const Hero = ({ sectionBgColor, sectionColor }: HeroProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <div className={`text-${sectionColor} container lg:py-32`}>
        <div className="flex flex-col-reverse items-center justify-between md:flex-row xl:gap-40">
          <div className="relative my-auto py-10">
            <h1 className="relative leading-10">
              Hi{" "}
              <m.span
                initial={{ rotate: 25 }}
                animate={{ rotate: 0 }}
                transition={{
                  repeat: Infinity,
                  duration: 0.3,
                  repeatType: "reverse",
                }}
                className="absolute left-6 top-0 origin-[70%_70%]"
              >
                👋
              </m.span>
              ,<span className="ml-6 text-2xl"> I&apos;m Deni Sugiarto</span>
            </h1>
            <p className="text-4xl font-bold">
              Frontend Web Developer
            </p>
            <p className="mt-6 leading-loose">{data.aboutMe}</p>
            <div className="mt-12">
              <a
                href={linkHireMe}
                className={`easy-in-out block transform rounded-xl border-2 px-20 py-3 text-center font-serif font-bold  capitalize transition duration-300 hover:shadow-card md:inline bg-${sectionBgColor} text-${sectionColor}`}
              >
                Let&apos;s Talk!
              </a>
            </div>
            <div className="absolute right-10 top-0">
              <SiReact className="h-10 w-10 animate-spin-slow" />
            </div>
          </div>
          <div className="img-wrapper mx-auto flex-grow-0 sm:mx-0">
            <div className="h-80 w-80">
              <Image
                priority
                blurDataURL="/img/profileBlur.webp"
                placeholder="blur"
                src="/img/profile.webp"
                width={320}
                height={320}
                alt="profile-picture"
              />
            </div>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
};

export default Hero;
