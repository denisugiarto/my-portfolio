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
            <div className="mx-auto max-w-2xl">
              <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
                  Get in Touch
                </h1>
                <p className="text-lg text-muted-foreground">
                  Ready to bring your ideas to life? Send me a message and
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
