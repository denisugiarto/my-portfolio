"use client";
import ContactForm from "@/components/contact-form";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function Contact() {
  return (
    <LazyMotion features={domAnimation}>
      <section id="contact" className="relative pb-24">
        <div className="container relative z-10">
          <div className="rounded-none border border-border/60 bg-background/80 p-8 shadow-[0_30px_100px_rgba(15,23,42,0.12)] backdrop-blur-2xl md:p-10">
            <div className="mb-16 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-amber-700 dark:text-amber-300">
                Start a conversation
              </p>
              <h2 className="font-title text-4xl font-bold tracking-tight text-foreground">
                Let&apos;s make the next thing feel excellent
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
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
