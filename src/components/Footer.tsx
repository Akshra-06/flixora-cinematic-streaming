import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

const sections = [
  {
    title: "Navigation",
    links: [
      { label: "Home", to: "/" },
      { label: "TV Shows", to: "/tv-shows" },
      { label: "Movies", to: "/movies" },
      { label: "New & Popular", to: "/browse" },
      { label: "My List", to: "/my-list" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Press", to: "/press" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", to: "/help" },
      { label: "FAQ", to: "/help" },
      { label: "Contact Us", to: "/help" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Use", to: "/terms" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Cookie Preferences", to: "/cookies" },
    ],
  },
];

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com", letter: "in" },
  { label: "Twitter", href: "https://twitter.com", letter: "𝕏" },
  { label: "Instagram", href: "https://instagram.com", letter: "📷" },
];

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

export const Footer = () => {
  return (
    <footer className="border-t border-border mt-16 pt-12 pb-8 bg-background">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      onClick={scrollToTop}
                      className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" onClick={scrollToTop}>
            <h2 className="font-display text-2xl tracking-widest text-gradient">FLIXORA</h2>
          </Link>

          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <s.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">© 2026 Flixora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
