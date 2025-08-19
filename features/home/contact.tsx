import ContactForm from "@/components/contact-form";
import {
  SiGithub,
  SiLinkedin,
  SiUpwork,
  SiWhatsapp,
} from "@icons-pack/react-simple-icons";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { MailIcon } from "lucide-react";

type IconContactList = {
  [key: string]: JSX.Element;
};
const iconContactList: IconContactList = {
  email: <MailIcon className="h-6 w-6" />,
  whatsapp: <SiWhatsapp className="h-6 w-6 text-green-600" />,
  linkedin: <SiLinkedin className="h-7 w-7 text-blue-700" />,
  github: <SiGithub className="h-6 w-6" />,
  upwork: <SiUpwork className="h-6 w-6 text-green-500" />,
};

export default function Contact() {
  return (
    <LazyMotion features={domAnimation}>
      <section id="contact" className="relative overflow-hidden">
        {/* SVG Background for Contact */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="contact-gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(236, 72, 153, 0.08)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0.08)" />
              </linearGradient>
              <linearGradient id="contact-gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(34, 197, 94, 0.06)" />
                <stop offset="100%" stopColor="rgba(236, 72, 153, 0.06)" />
              </linearGradient>
              <radialGradient id="contact-radial" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.02)" />
              </radialGradient>
            </defs>
            
            {/* Communication waves */}
            <m.circle
              cx="500"
              cy="300"
              r="100"
              fill="none"
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="2"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: [0.5, 2, 0.5],
                opacity: [0, 0.6, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            
            <m.circle
              cx="500"
              cy="300"
              r="150"
              fill="none"
              stroke="rgba(168, 85, 247, 0.15)"
              strokeWidth="2"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: [0.5, 2.5, 0.5],
                opacity: [0, 0.4, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                delay: 0.5,
                ease: "easeOut"
              }}
            />
            
            {/* Message icons */}
            <m.rect
              x="200"
              y="150"
              width="80"
              height="50"
              rx="10"
              fill="url(#contact-gradient1)"
              initial={{ rotate: -10, opacity: 0.5 }}
              animate={{ 
                rotate: [-10, 5, -10],
                opacity: [0.5, 0.8, 0.5],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <m.ellipse
              cx="750"
              cy="600"
              rx="60"
              ry="40"
              fill="url(#contact-gradient2)"
              initial={{ rotate: 20, opacity: 0.4 }}
              animate={{ 
                rotate: [20, -15, 20],
                opacity: [0.4, 0.7, 0.4],
                x: [0, 15, 0],
                y: [0, -20, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Network connections */}
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * 2 * Math.PI;
              const x = 500 + Math.cos(angle) * 200;
              const y = 400 + Math.sin(angle) * 200;
              
              return (
                <m.line
                  key={i}
                  x1="500"
                  y1="400"
                  x2={x}
                  y2={y}
                  stroke="rgba(34, 197, 94, 0.1)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 0],
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              );
            })}
            
            {/* Floating contact bubbles */}
            {[...Array(12)].map((_, i) => (
              <m.circle
                key={i}
                cx={100 + (i * 80)}
                cy={800 - (i % 3) * 100}
                r="15"
                fill="url(#contact-radial)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.2, 0.8, 1],
                  opacity: [0, 0.8, 0.6, 0.4],
                  y: [0, -30, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </svg>
        </div>

        <div className="container relative z-10">
          <div className="mb-16 text-center">
            <h2 className="title-section">Get in Touch</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Ready to bring your ideas to life? Send me a message and I&apos;ll
              get back to you within 24 hours.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
