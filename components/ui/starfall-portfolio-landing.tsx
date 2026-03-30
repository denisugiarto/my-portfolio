"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Cpu,
  Layers3,
  Sparkles,
} from "lucide-react";
import { Button } from "./button";

interface NavLink {
  label: string;
  href: string;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  imageContent?: React.ReactNode;
}

interface Stat {
  value: string;
  label: string;
}

export interface PortfolioPageProps {
  logo?: {
    initials: React.ReactNode;
    name: React.ReactNode;
  };
  navLinks?: NavLink[];
  resume?: {
    label: string;
    onClick?: () => void;
  };
  hero?: {
    titleLine1: React.ReactNode;
    titleLine2Gradient: React.ReactNode;
    subtitle: React.ReactNode;
  };
  ctaButtons?: {
    primary: {
      label: string;
      onClick?: () => void;
    };
    secondary: {
      label: string;
      onClick?: () => void;
    };
  };
  projects?: Project[];
  stats?: Stat[];
  showAnimatedBackground?: boolean;
}

const AuroraBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.zIndex = "0";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.pointerEvents = "none";
    currentMount.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
      vertexShader: "void main() { gl_Position = vec4(position, 1.0); }",
      fragmentShader: `
        uniform float iTime; uniform vec2 iResolution;
        #define NUM_OCTAVES 3
        float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
        float noise(vec2 p){ vec2 ip=floor(p);vec2 u=fract(p);u=u*u*(3.0-2.0*u);float res=mix(mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);return res*res; }
        float fbm(vec2 x) { float v=0.0;float a=0.3;vec2 shift=vec2(100);mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.50));for(int i=0;i<NUM_OCTAVES;++i){v+=a*noise(x);x=rot*x*2.0+shift;a*=0.4;}return v;}
        void main() {
          vec2 p=((gl_FragCoord.xy)-iResolution.xy*0.5)/iResolution.y*mat2(6.,-4.,4.,6.);vec4 o=vec4(0.);float f=2.+fbm(p+vec2(iTime*5.,0.))*.5;
          for(float i=0.;i++<35.;){vec2 v=p+cos(i*i+(iTime+p.x*.08)*.025+i*vec2(13.,11.))*3.5;float tailNoise=fbm(v+vec2(iTime*.5,i))*.3*(1.-(i/35.));vec4 auroraColors=vec4(.1+.3*sin(i*.2+iTime*.4),.3+.5*cos(i*.3+iTime*.5),.7+.3*sin(i*.4+iTime*.3),1.);vec4 currentContribution=auroraColors*exp(sin(i*i+iTime*.8))/length(max(v,vec2(v.x*f*.015,v.y*1.5)));float thinnessFactor=smoothstep(0.,1.,i/35.)*.6;o+=currentContribution*(1.+tailNoise*.8)*thinnessFactor;}
          o=tanh(pow(o/100.,vec4(1.6)));gl_FragColor=o*1.5;
        }`,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      material.uniforms.iTime.value += 0.016;
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.iResolution.value.set(
        window.innerWidth,
        window.innerHeight,
      );
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }

      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" />;
};

const ProjectPreview = ({
  imageUrl,
  icon: Icon,
  alt,
}: {
  imageUrl: string;
  icon: React.ComponentType<{ className?: string }>;
  alt: string;
}) => {
  return (
    <div
      className="project-image relative h-32 overflow-hidden rounded-none"
      role="img"
      aria-label={alt}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.05), rgba(15, 23, 42, 0.65)), url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_36%)]" />
      <div className="bg-slate-950/45 absolute bottom-3 left-3 flex items-center gap-2 rounded-none border border-white/20 px-3 py-1.5 text-white shadow-lg backdrop-blur-md">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium">{alt}</span>
      </div>
    </div>
  );
};

const defaultLogo: NonNullable<PortfolioPageProps["logo"]> = {
  initials: "MT",
  name: "Meng To",
};

const defaultNavLinks: NonNullable<PortfolioPageProps["navLinks"]> = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
];

const defaultResume: NonNullable<PortfolioPageProps["resume"]> = {
  label: "Resume",
};

const defaultHero: NonNullable<PortfolioPageProps["hero"]> = {
  titleLine1: "Creative Developer &",
  titleLine2Gradient: "Digital Designer",
  subtitle:
    "I craft beautiful digital experiences through code and design. Specializing in modern web development, UI/UX design, and bringing innovative ideas to life.",
};

const defaultCtaButtons: NonNullable<PortfolioPageProps["ctaButtons"]> = {
  primary: { label: "View My Work" },
  secondary: { label: "Get In Touch" },
};

const defaultProjects: NonNullable<PortfolioPageProps["projects"]> = [
  {
    title: "FinTech Mobile App",
    description: "React Native app with AI-powered financial insights.",
    tags: ["React Native", "Node.js"],
    imageContent: (
      <ProjectPreview
        imageUrl="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80"
        icon={Sparkles}
        alt="FinTech mobile interface"
      />
    ),
  },
  {
    title: "Data Visualization Platform",
    description: "Interactive dashboard for complex data analysis.",
    tags: ["D3.js", "Python"],
    imageContent: (
      <ProjectPreview
        imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
        icon={Layers3}
        alt="Analytics dashboard"
      />
    ),
  },
  {
    title: "3D Portfolio Site",
    description: "Immersive WebGL experience with 3D elements.",
    tags: ["Three.js", "WebGL"],
    imageContent: (
      <ProjectPreview
        imageUrl="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
        icon={Cpu}
        alt="3D development workspace"
      />
    ),
  },
];

const defaultStats: NonNullable<PortfolioPageProps["stats"]> = [
  { value: "50+", label: "Projects Completed" },
  { value: "5+", label: "Years Experience" },
  { value: "15+", label: "Happy Clients" },
];

const PortfolioPage: React.FC<PortfolioPageProps> = ({
  logo = defaultLogo,
  navLinks = defaultNavLinks,
  resume = defaultResume,
  hero = defaultHero,
  ctaButtons = defaultCtaButtons,
  projects = defaultProjects,
  stats = defaultStats,
  showAnimatedBackground = true,
}) => {
  return (
    <div className="bg-background text-foreground">
      {showAnimatedBackground ? <AuroraBackground /> : null}

      <div className="relative z-10">
        <nav className="w-full px-6 py-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-none border border-border bg-border/60 backdrop-blur-md">
                <span className="geist-font text-sm font-bold text-foreground">
                  {logo.initials}
                </span>
              </div>
              <span className="geist-font text-lg font-medium text-foreground">
                {logo.name}
              </span>
            </div>

            <div className="hidden items-center space-x-8 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="inter-font text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <Button
              type="button"
              onClick={resume.onClick}
              className="glass-button inter-font rounded-none px-4 py-2 text-sm font-medium text-foreground"
            >
              {resume.label}
            </Button>
          </div>
        </nav>

        <div className="divider" />

        <main
          id="about"
          className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-20"
        >
          <div className="mx-auto max-w-6xl text-center">
            <div className="float-animation mb-8">
              <h1 className="geist-font mb-4 text-5xl font-light leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
                {hero.titleLine1}
                <span className="gradient-text block tracking-tight">
                  {hero.titleLine2Gradient}
                </span>
              </h1>

              <p className="inter-font mx-auto max-w-3xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
                {hero.subtitle}
              </p>
            </div>

            <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                type="button"
                onClick={ctaButtons.primary.onClick}
                className="primary-button min-w-[160px] rounded-none px-6 py-3 text-sm font-medium text-foreground"
              >
                <span>{ctaButtons.primary.label}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                onClick={ctaButtons.secondary.onClick}
                className="glass-button inter-font min-w-[160px] rounded-none px-6 py-3 text-sm font-medium text-foreground"
              >
                {ctaButtons.secondary.label}
              </Button>
            </div>

            <div className="divider mb-16" />

            <div
              id="projects"
              className="mx-auto mb-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="glass-card rounded-none p-6 text-left"
                >
                  {project.imageContent ? (
                    project.imageContent
                  ) : (
                    <div className="project-image rounded-none" />
                  )}
                  <h3 className="geist-font mb-2 mt-4 text-lg font-medium text-card-foreground">
                    {project.title}
                  </h3>
                  <p className="inter-font mb-4 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="skill-badge rounded-none px-2 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="divider mb-16" />

            <div
              id="skills"
              className="flex flex-col items-center justify-center gap-8 text-center sm:flex-row"
            >
              {stats.map((stat, index) => (
                <React.Fragment key={stat.label}>
                  <div>
                    <div className="geist-font mb-1 text-3xl font-light tracking-tight text-foreground md:text-4xl">
                      {stat.value}
                    </div>
                    <div className="inter-font text-sm font-normal text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>

                  {index < stats.length - 1 ? (
                    <div className="hidden h-12 w-px bg-gradient-to-b from-transparent via-input to-transparent sm:block" />
                  ) : null}
                </React.Fragment>
              ))}
            </div>

            <div className="mt-16 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.28em] text-muted-foreground/80">
              <BriefcaseBusiness className="h-4 w-4" />
              <span>Available for select collaborations</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export { AuroraBackground, PortfolioPage };
