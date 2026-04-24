import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmartSearch } from "@/components/SmartSearch";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const sections = [
  { id: "collect", title: "1. Information We Collect" },
  { id: "use", title: "2. How We Use Your Data" },
  { id: "share", title: "3. Sharing & Disclosure" },
  { id: "cookies", title: "4. Cookies & Tracking" },
  { id: "retention", title: "5. Data Retention" },
  { id: "security", title: "6. Security" },
  { id: "rights", title: "7. Your Rights" },
  { id: "children", title: "8. Children's Privacy" },
  { id: "international", title: "9. International Transfers" },
  { id: "changes", title: "10. Changes to This Policy" },
  { id: "contact", title: "11. Contact Us" },
];

const Privacy = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Privacy Policy — Flixora</title>
        <meta name="description" content="Learn how Flixora collects, uses, and protects your personal data when you use our streaming service." />
      </Helmet>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar onSearchToggle={() => setSearchOpen(true)} />
        {searchOpen && <SmartSearch onClose={() => setSearchOpen(false)} />}

        <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 flex gap-10">
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <nav className="sticky top-28 space-y-1.5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Contents</p>
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className="flex-1 min-w-0">
            <h1 className="text-4xl md:text-5xl font-display tracking-tight mb-2">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground mb-10">Last updated: April 1, 2026</p>

            <div className="space-y-8 text-foreground/85 leading-relaxed">
              <section id="collect">
                <h2 className="text-2xl font-display tracking-tight mb-3">1. Information We Collect</h2>
                <p className="mb-2">We collect information you provide directly, as well as data generated through your use of the Service:</p>
                <ul className="list-disc list-inside space-y-1 text-foreground/80">
                  <li><strong>Account Data:</strong> Name, email address, payment information, and profile details.</li>
                  <li><strong>Usage Data:</strong> Viewing history, search queries, interactions with recommendations, playback settings, and device information.</li>
                  <li><strong>Device Data:</strong> IP address, browser type, operating system, device identifiers, and network information.</li>
                  <li><strong>Communication Data:</strong> Support requests, survey responses, and feedback you submit.</li>
                </ul>
              </section>

              <section id="use">
                <h2 className="text-2xl font-display tracking-tight mb-3">2. How We Use Your Data</h2>
                <ul className="list-disc list-inside space-y-1 text-foreground/80">
                  <li>Provide, maintain, and improve the Service</li>
                  <li>Personalize content recommendations and search results</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Send service notifications and, with your consent, promotional communications</li>
                  <li>Detect, prevent, and address fraud, abuse, and security issues</li>
                  <li>Comply with legal obligations and enforce our Terms of Use</li>
                </ul>
              </section>

              <section id="share">
                <h2 className="text-2xl font-display tracking-tight mb-3">3. Sharing & Disclosure</h2>
                <p>We do not sell your personal data. We may share information with: (a) service providers who assist in operating the platform (payment processors, CDN providers, analytics); (b) law enforcement when required by law; (c) affiliated companies within the Flixora group; (d) other parties with your explicit consent.</p>
              </section>

              <section id="cookies">
                <h2 className="text-2xl font-display tracking-tight mb-3">4. Cookies & Tracking</h2>
                <p>We use cookies, pixels, and similar technologies to authenticate users, remember preferences, analyze traffic, and deliver personalized content. You may manage cookie preferences through your browser settings or our Cookie Preferences page. Essential cookies cannot be disabled as they are necessary for the Service to function.</p>
              </section>

              <section id="retention">
                <h2 className="text-2xl font-display tracking-tight mb-3">5. Data Retention</h2>
                <p>We retain your personal data for as long as your account is active or as needed to provide services. After account deletion, we retain certain data for up to 90 days for fraud prevention and legal compliance, after which it is permanently deleted or anonymized.</p>
              </section>

              <section id="security">
                <h2 className="text-2xl font-display tracking-tight mb-3">6. Security</h2>
                <p>We implement industry-standard security measures including encryption in transit (TLS 1.3) and at rest (AES-256), regular security audits, and strict access controls. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
              </section>

              <section id="rights">
                <h2 className="text-2xl font-display tracking-tight mb-3">7. Your Rights</h2>
                <p className="mb-2">Depending on your jurisdiction, you may have the right to:</p>
                <ul className="list-disc list-inside space-y-1 text-foreground/80">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Rectify inaccurate or incomplete data</li>
                  <li>Request deletion of your data ("right to be forgotten")</li>
                  <li>Object to or restrict certain processing activities</li>
                  <li>Data portability — receive your data in a machine-readable format</li>
                  <li>Withdraw consent at any time for consent-based processing</li>
                </ul>
                <p className="mt-2">To exercise these rights, contact us at <span className="text-primary">privacy@flixora.com</span>.</p>
              </section>

              <section id="children">
                <h2 className="text-2xl font-display tracking-tight mb-3">8. Children's Privacy</h2>
                <p>Kids profiles collect minimal data necessary for content recommendations and parental controls. We do not serve personalized advertising to Kids profiles. We comply with COPPA, GDPR-K, and other applicable children's privacy regulations.</p>
              </section>

              <section id="international">
                <h2 className="text-2xl font-display tracking-tight mb-3">9. International Transfers</h2>
                <p>Your data may be processed in countries other than your own. We use Standard Contractual Clauses (SCCs) and other approved mechanisms to ensure adequate protection for international data transfers in compliance with GDPR and other applicable regulations.</p>
              </section>

              <section id="changes">
                <h2 className="text-2xl font-display tracking-tight mb-3">10. Changes to This Policy</h2>
                <p>We may update this Privacy Policy periodically. We will notify you of material changes via email or in-app notification at least 30 days before they take effect. The "Last updated" date at the top reflects the most recent revision.</p>
              </section>

              <section id="contact">
                <h2 className="text-2xl font-display tracking-tight mb-3">11. Contact Us</h2>
                <p>For privacy-related inquiries, contact our Data Protection Officer at <span className="text-primary">privacy@flixora.com</span>, or write to: Flixora Inc., Attn: Privacy Team, 550 Market Street, San Francisco, CA 94104.</p>
              </section>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Privacy;
