"use client";
import ContactForm from "@/components/contact-form";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function Contact() {
  return (
    <LazyMotion features={domAnimation}>
      <section id="contact" className="relative pb-24">
        <div className="container relative z-10">
          <div className="rounded-none border-[3px] border-foreground bg-card p-5 shadow-[4px_4px_0px_0px_hsl(var(--foreground))] sm:p-8 md:p-10 md:shadow-[8px_8px_0px_0px_hsl(var(--foreground))]">
            <div className="mb-8 text-center md:mb-16">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-300 md:mb-3">
                Start a conversation
              </p>
              <h2 className="font-title text-2xl font-black uppercase tracking-tight text-foreground md:text-4xl">
                Let&apos;s make the next thing feel excellent
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm font-bold leading-relaxed text-foreground/80 md:mt-4 md:text-lg">
                Ready to bring your ideas to life? Send me a message and
                I&apos;ll get back to you within 24 hours.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
