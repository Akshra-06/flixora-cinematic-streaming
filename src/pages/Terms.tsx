import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmartSearch } from "@/components/SmartSearch";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "eligibility", title: "2. Eligibility" },
  { id: "accounts", title: "3. Accounts & Profiles" },
  { id: "subscription", title: "4. Subscription & Billing" },
  { id: "content", title: "5. Content & Licensing" },
  { id: "conduct", title: "6. User Conduct" },
  { id: "ip", title: "7. Intellectual Property" },
  { id: "termination", title: "8. Termination" },
  { id: "liability", title: "9. Limitation of Liability" },
  { id: "changes", title: "10. Changes to Terms" },
  { id: "governing", title: "11. Governing Law" },
  { id: "contact", title: "12. Contact" },
];

const Terms = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Terms of Use — Flixora</title>
        <meta name="description" content="Read the Flixora Terms of Use governing your access to and use of our streaming platform." />
      </Helmet>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar onSearchToggle={() => setSearchOpen(true)} />
        {searchOpen && <SmartSearch onClose={() => setSearchOpen(false)} />}

        <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 flex gap-10">
          {/* Table of Contents — sticky sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <nav className="sticky top-28 space-y-1.5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Contents</p>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className="flex-1 min-w-0">
            <h1 className="text-4xl md:text-5xl font-display tracking-tight mb-2">Terms of Use</h1>
            <p className="text-sm text-muted-foreground mb-10">Last updated: April 1, 2026</p>

            <div className="space-y-8 text-foreground/85 leading-relaxed">
              <section id="acceptance">
                <h2 className="text-2xl font-display tracking-tight mb-3">1. Acceptance of Terms</h2>
                <p>By accessing or using the Flixora platform ("Service"), you agree to be bound by these Terms of Use. If you do not agree, you may not access or use the Service. These Terms constitute a legally binding agreement between you and Flixora Inc.</p>
              </section>

              <section id="eligibility">
                <h2 className="text-2xl font-display tracking-tight mb-3">2. Eligibility</h2>
                <p>You must be at least 18 years of age, or the age of majority in your jurisdiction, to create an account. Minors may use the Service only under the supervision of a parent or legal guardian who agrees to these Terms on their behalf.</p>
              </section>

              <section id="accounts">
                <h2 className="text-2xl font-display tracking-tight mb-3">3. Accounts & Profiles</h2>
                <p>You are responsible for maintaining the confidentiality of your account credentials. Each account supports up to five profiles. You may not share, sell, or transfer your account to any third party. Kids profiles restrict access to age-appropriate content as rated by regional classification boards.</p>
              </section>

              <section id="subscription">
                <h2 className="text-2xl font-display tracking-tight mb-3">4. Subscription & Billing</h2>
                <p>Flixora offers multiple subscription tiers (Basic, Standard, Premium). Subscriptions renew automatically at the end of each billing cycle unless cancelled. Prices are subject to change with at least 30 days' prior notice. Refunds are handled in accordance with applicable consumer protection laws.</p>
              </section>

              <section id="content">
                <h2 className="text-2xl font-display tracking-tight mb-3">5. Content & Licensing</h2>
                <p>All content available through the Service is licensed, not sold. Content availability varies by region and may change without notice. Flixora does not guarantee that any specific title will remain available. Downloading content for offline viewing is permitted only within the Flixora application and subject to license restrictions.</p>
              </section>

              <section id="conduct">
                <h2 className="text-2xl font-display tracking-tight mb-3">6. User Conduct</h2>
                <p>You agree not to: (a) circumvent, disable, or interfere with security features; (b) use automated systems to access the Service; (c) redistribute, sublicense, or publicly perform any content; (d) use the Service for any unlawful purpose. Violation may result in immediate account termination.</p>
              </section>

              <section id="ip">
                <h2 className="text-2xl font-display tracking-tight mb-3">7. Intellectual Property</h2>
                <p>The Flixora name, logo, user interface, and all associated trademarks are the property of Flixora Inc. Content is owned by or licensed from respective rights holders. Nothing in these Terms grants you any right to use Flixora's trademarks without prior written consent.</p>
              </section>

              <section id="termination">
                <h2 className="text-2xl font-display tracking-tight mb-3">8. Termination</h2>
                <p>We may suspend or terminate your access at any time for violations of these Terms. You may cancel your subscription at any time through your Account settings. Upon termination, your right to access the Service ceases immediately, though certain provisions of these Terms survive termination.</p>
              </section>

              <section id="liability">
                <h2 className="text-2xl font-display tracking-tight mb-3">9. Limitation of Liability</h2>
                <p>To the maximum extent permitted by law, Flixora shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. Our total liability shall not exceed the amount you paid in the twelve months preceding the claim.</p>
              </section>

              <section id="changes">
                <h2 className="text-2xl font-display tracking-tight mb-3">10. Changes to Terms</h2>
                <p>We reserve the right to modify these Terms at any time. Material changes will be communicated via email or in-app notification at least 30 days before they take effect. Continued use of the Service after changes constitutes acceptance of the revised Terms.</p>
              </section>

              <section id="governing">
                <h2 className="text-2xl font-display tracking-tight mb-3">11. Governing Law</h2>
                <p>These Terms are governed by the laws of the State of California, United States, without regard to conflict of law principles. Any disputes shall be resolved through binding arbitration in San Francisco, California, unless otherwise required by local consumer protection laws.</p>
              </section>

              <section id="contact">
                <h2 className="text-2xl font-display tracking-tight mb-3">12. Contact</h2>
                <p>If you have questions about these Terms, please contact us at <span className="text-primary">legal@flixora.com</span> or write to: Flixora Inc., 550 Market Street, San Francisco, CA 94104.</p>
              </section>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Terms;
