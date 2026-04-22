import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmartSearch } from "@/components/SmartSearch";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const Cookies = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Cookie Policy — Flixora</title>
        <meta name="description" content="Understand how Flixora uses cookies and similar tracking technologies on our streaming platform." />
      </Helmet>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar onSearchToggle={() => setSearchOpen(true)} />
        {searchOpen && <SmartSearch onClose={() => setSearchOpen(false)} />}

        <div className="pt-28 pb-20 max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-display tracking-tight mb-2">Cookie Policy</h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: April 1, 2026</p>

          <div className="space-y-8 text-foreground/85 leading-relaxed">
            <section>
              <h2 className="text-2xl font-display tracking-tight mb-3">What Are Cookies?</h2>
              <p>Cookies are small text files stored on your device when you visit a website. They help us recognize your browser, remember your preferences, and understand how you interact with our Service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display tracking-tight mb-3">Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-1">Essential Cookies</h3>
                  <p className="text-sm text-foreground/75">Required for the Service to function. These handle authentication, security, and basic playback. Cannot be disabled.</p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-1">Functional Cookies</h3>
                  <p className="text-sm text-foreground/75">Remember your preferences such as language, playback quality, subtitle settings, and volume level.</p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-1">Analytics Cookies</h3>
                  <p className="text-sm text-foreground/75">Help us understand how users interact with the platform — which pages are visited, how long sessions last, and where errors occur. Data is aggregated and anonymized.</p>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-1">Advertising Cookies</h3>
                  <p className="text-sm text-foreground/75">Used on ad-supported plans to deliver relevant advertisements. These cookies may be set by our advertising partners and track browsing activity across sites.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display tracking-tight mb-3">Managing Cookies</h2>
              <p>You can manage your cookie preferences at any time through your browser settings. Most browsers allow you to block or delete cookies. Please note that disabling certain cookies may affect the functionality of the Service.</p>
              <ul className="list-disc list-inside space-y-1 text-foreground/80 mt-2">
                <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                <li><strong>Edge:</strong> Settings → Cookies and Site Permissions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display tracking-tight mb-3">Third-Party Cookies</h2>
              <p>Some cookies are placed by third-party services that appear on our pages, including analytics providers and payment processors. We do not control these cookies and recommend reviewing the privacy policies of these third parties.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display tracking-tight mb-3">Updates to This Policy</h2>
              <p>We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated revision date. For questions, contact us at <span className="text-primary">privacy@flixora.com</span>.</p>
            </section>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Cookies;
