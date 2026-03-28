import { Metadata } from "next";
import { Layout } from "@/components/Layout/Layout";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact | Deni Sugiarto - Frontend Developer",
  description:
    "Get in touch with me for your next project. I'm available for frontend development, web applications, and technical consulting.",
  keywords:
    "contact, hire frontend developer, web development services, React developer, Next.js developer",
  openGraph: {
    title: "Contact | Deni Sugiarto - Frontend Developer",
    description:
      "Get in touch with me for your next project. I'm available for frontend development, web applications, and technical consulting.",
    url: "https://denisugiarto.my.id/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Deni Sugiarto - Frontend Developer",
    description:
      "Get in touch with me for your next project. I'm available for frontend development, web applications, and technical consulting.",
  },
};

export default function ContactPage() {
  return (
    <Layout activeNavbar="Contact">
      <div className="min-h-screen">
        <section className="py-24 lg:py-32">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="mb-16">
                <h1 className="mb-8 inline-block text-5xl font-black uppercase leading-none tracking-tight text-foreground md:text-7xl lg:text-8xl border-b-8 border-foreground pb-2">
                  GET IN TOUCH
                </h1>
                <p className="max-w-2xl border-l-8 border-primary bg-secondary p-6 text-xl font-bold leading-relaxed shadow-[8px_8px_0px_0px_hsl(var(--foreground))] text-foreground">
                  READY TO BRING YOUR IDEAS TO LIFE? SEND ME A MESSAGE AND
                  I&apos;LL GET BACK TO YOU WITHIN 24 HOURS.
                </p>
              </div>

              <div className="border-4 border-foreground bg-card p-6 shadow-[12px_12px_0px_0px_hsl(var(--foreground))] md:p-12">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
