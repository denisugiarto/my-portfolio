import { motion } from "framer-motion";
import Image from "next/image";
import data from "../../constant/data.json";
import React from "react";
import { SiReact } from "react-icons/si";

// eslint-disable-next-line react/display-name
const Hero = React.forwardRef(({ sectionBgColor, sectionColor }, ref) => {
  const linkHireMe = data.contact.find((item) => {
    return item.type === "whatsapp";
  }).link;
  return (
    <section className={`bg-hero text-${sectionColor} min-h-[80dvh]`}>
      <motion.div
        className="container my-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col-reverse items-center justify-between md:flex-row xl:gap-40">
          <div className="relative my-auto py-10">
            <h1 className="relative leading-10">
              Hi{" "}
              <motion.span
                initial={{ rotate: 45 }}
                animate={{ rotate: 0 }}
                transition={{
                  repeat: Infinity,
                  duration: 0.5,
                  repeatType: "reverse",
                }}
                className="absolute -top-1 left-6"
              >
                👋
              </motion.span>
              ,
              <br />{" "}
              <span className="font-title text-4xl">
                {" "}
                I&apos;m Deni Sugiarto
              </span>
            </h1>
            <p className="text-2xl font-bold text-green-500">
              Frontend Web Developer
            </p>
            <p className="mt-6">{data.aboutMe}</p>
            <div className="mt-12">
              <a
                href={linkHireMe}
                className={`font-serif easy-in-out block transform rounded-xl border-2 px-20 py-3 text-center font-bold  capitalize transition duration-300 hover:shadow-card md:inline bg-${sectionBgColor} text-${sectionColor}`}
              >
                Let&apos;s Connect
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
      </motion.div>
    </section>
  );
});

export default Hero;
