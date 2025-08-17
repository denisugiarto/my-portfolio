import { Button } from "@/components/ui/button";
import data from "@/constant/data.json";
import {
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
} from "@icons-pack/react-simple-icons";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Link from "next/link";

// eslint-disable-next-line react/display-name
export const linkHireMe = data.contact?.find(
  (contact) => contact.type === "whatsapp",
)?.link;
const Hero = () => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative mx-auto max-w-4xl pt-20 text-center">
        {/* Animated SVG Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient
                id="gradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
                <stop offset="50%" stopColor="rgba(147, 51, 234, 0.1)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
              </linearGradient>
              <linearGradient
                id="gradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(147, 51, 234, 0.05)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
              </linearGradient>
            </defs>

            {/* Floating geometric shapes */}
            <m.circle
              cx="200"
              cy="200"
              r="150"
              fill="url(#gradient1)"
              initial={{ scale: 0.8, opacity: 0.3 }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.6, 0.3],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <m.polygon
              points="800,150 900,300 700,300"
              fill="url(#gradient2)"
              initial={{ rotate: 0, opacity: 0.2 }}
              animate={{
                rotate: [0, 180, 360],
                opacity: [0.2, 0.4, 0.2],
                x: [0, -20, 0],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <m.rect
              x="100"
              y="600"
              width="200"
              height="200"
              rx="20"
              fill="url(#gradient1)"
              initial={{ rotate: 45, opacity: 0.2 }}
              animate={{
                rotate: [45, 225, 45],
                opacity: [0.2, 0.5, 0.2],
                x: [0, 30, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <m.circle
              cx="750"
              cy="700"
              r="100"
              fill="url(#gradient2)"
              initial={{ scale: 1, opacity: 0.3 }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [0, -40, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Grid pattern */}
            <defs>
              <pattern
                id="grid"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Floating dots */}
            {[...Array(20)].map((_, i) => (
              <m.circle
                key={i}
                cx={100 + i * 45}
                cy={50 + i * 30}
                r="2"
                fill="rgba(255,255,255,0.2)"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </svg>
        </div>
        {/* Main heading with animation */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
              Full-Stack Developer
            </span>
            <br />
            <span className="text-white drop-shadow-lg">
              Building Modern Web Applications
            </span>
          </h1>
        </m.div>

        {/* Subtitle with animation */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="mb-8 text-xl font-medium text-gray-300 md:text-2xl">
            Hi{" "}
            <m.span
              initial={{ rotate: 25 }}
              animate={{ rotate: 0 }}
              transition={{
                repeat: Infinity,
                duration: 0.3,
                repeatType: "reverse",
              }}
              className="inline-block origin-[70%_70%]"
            >
              👋
            </m.span>{" "}
            I&apos;m Deni Sugiarto
          </p>
        </m.div>

        {/* About text with animation */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
            I create fast, scalable, and user-friendly web applications using
            modern technologies. Specializing in React, Next.js, and Node.js
            with a focus on clean code and great user experiences.
          </p>
        </m.div>

        {/* CTA Buttons with animation */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="#projects">
            <Button
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/25"
              variant="outline"
              size="lg"
            >
              <span>See My Projects</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              >
                <path
                  clipRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  fillRule="evenodd"
                />
              </svg>
            </Button>
          </Link>

          <a href={linkHireMe}>
            <Button variant="outline" size="lg">
              <span>Let&apos;s Talk</span>
            </Button>
          </a>
        </m.div>

        {/* Tech stack indicator */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <p className="mb-6 text-sm text-gray-400">Technologies I work with</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <SiReact className="h-6 w-6 text-blue-400" />
              <span className="text-sm text-gray-300">React</span>
            </div>
            <span className="text-gray-500">•</span>
            <div className="flex items-center gap-2">
              <SiNextdotjs className="h-6 w-6 text-white" />
              <span className="text-sm text-gray-300">Next.js</span>
            </div>
            <span className="text-gray-500">•</span>
            <div className="flex items-center gap-2">
              <SiNodedotjs className="h-6 w-6 text-green-400" />
              <span className="text-sm text-gray-300">Node.js</span>
            </div>
            <span className="text-gray-500">•</span>
            <div className="flex items-center gap-2">
              <SiTypescript className="h-6 w-6 text-blue-400" />
              <span className="text-sm text-gray-300">TypeScript</span>
            </div>
            <span className="text-gray-500">•</span>
            <div className="flex items-center gap-2">
              <SiTailwindcss className="h-6 w-6 text-cyan-400" />
              <span className="text-sm text-gray-300">TailwindCSS</span>
            </div>
          </div>
        </m.div>
      </section>
    </LazyMotion>
  );
};

export default Hero;
