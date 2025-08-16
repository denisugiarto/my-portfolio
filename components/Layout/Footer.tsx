import { Mail, MapPin, MessageCircle } from "lucide-react";
import { SiGithub, SiLinkedin, SiUpwork, SiWhatsapp } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import data from "../../constant/data.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Get contact links from data
  const contacts = {
    github: data.contact.find((contact) => contact.type === "github"),
    linkedin: data.contact.find((contact) => contact.type === "linkedin"),
    email: data.contact.find((contact) => contact.type === "email"),
    upwork: data.contact.find((contact) => contact.type === "upwork"),
    whatsapp: data.contact.find((contact) => contact.type === "whatsapp"),
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-card-foreground mb-3">
              Deni Sugiarto
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Frontend Web Developer specializing in React.js, Next.js, and React Native. 
              Creating seamless digital experiences with modern web technologies.
            </p>
            
            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <MapPin size={16} />
              <span>Based in Indonesia (GMT+7)</span>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {contacts.github && (
                <a
                  href={contacts.github.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub Profile"
                >
                  <SiGithub size={20} />
                </a>
              )}
              {contacts.linkedin && (
                <a
                  href={contacts.linkedin.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <SiLinkedin size={20} />
                </a>
              )}
              {contacts.upwork && (
                <a
                  href={contacts.upwork.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Upwork Profile"
                >
                  <SiUpwork size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-card-foreground mb-3 uppercase tracking-wider">
              Navigation
            </h4>
            <nav className="space-y-2">
              <Link
                href="/#about"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/#experience"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Experience
              </Link>
              <Link
                href="/projects"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-sm font-semibold text-card-foreground mb-3 uppercase tracking-wider">
              Get in Touch
            </h4>
            <div className="space-y-3">
              {contacts.email && (
                <a
                  href={contacts.email.link}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Mail size={16} className="group-hover:text-primary" />
                  <span>{contacts.email.value}</span>
                </a>
              )}
              
              {contacts.whatsapp && (
                <a
                  href={contacts.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <SiWhatsapp size={16} className="group-hover:text-primary" />
                  <span>{contacts.whatsapp.value}</span>
                </a>
              )}

              <Link
                href="/contact"
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
              >
                <MessageCircle size={16} className="group-hover:text-primary/80" />
                <span>Send Message</span>
              </Link>

              {/* Services */}
              <div className="pt-2 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-2 font-medium">Services:</p>
                <p className="text-xs text-muted-foreground">Web Development • Mobile Apps</p>
                <p className="text-xs text-muted-foreground">UI/UX • Technical Consulting</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              <span>&copy; {currentYear} Deni Sugiarto. All rights reserved.</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>Made with Next.js & Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
