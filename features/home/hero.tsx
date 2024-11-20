import data from "@/constant/data.json";
import { SiReact } from "@icons-pack/react-simple-icons";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";

// eslint-disable-next-line react/display-name
export const linkHireMe = data.contact?.find(
  (contact) => contact.type === "email",
)?.link;
type HeroProps = {
  sectionColor: string;
};
const Hero = ({ sectionColor }: HeroProps) => {
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
            <p className="text-4xl font-bold">Frontend Web Developer</p>
            <p className="mt-6 leading-loose">{data.aboutMe}</p>
            <div className="mt-12">
              <a
                href={linkHireMe}
                className="group relative block w-fit cursor-pointer border-none bg-transparent p-0 font-body text-base font-medium uppercase outline-none"
              >
                <span className="duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:duration-[250ms] absolute left-0 top-0 h-full w-full translate-y-0.5 transform rounded-lg bg-black bg-opacity-25 transition group-hover:translate-y-1 group-active:translate-y-px"></span>

                <span className="absolute left-0 top-0 h-full w-full animate-pulse rounded-lg bg-gradient-to-l from-[hsl(217,33%,16%)] via-[hsl(217,33%,32%)]  to-[hsl(217,33%,16%)]"></span>

                <div className="duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:duration-[250ms] relative flex -translate-y-1 transform items-center justify-between gap-3 rounded-lg border border-gray-700 bg-gradient-to-r from-primary to-blue-800 px-6 py-3 text-lg text-white brightness-100 transition group-hover:-translate-y-1.5 group-hover:brightness-110 group-active:-translate-y-0.5">
                  <span className="select-none">Let&apos;s Talk!</span>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="duration-250 -mr-1 ml-2 h-5 w-5 transition group-hover:translate-x-1"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </div>
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
