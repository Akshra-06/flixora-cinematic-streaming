import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmartSearch } from "@/components/SmartSearch";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const About = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>About Us — Flixora</title>
        <meta name="description" content="Learn about Flixora, the next-generation streaming platform delivering premium entertainment worldwide." />
      </Helmet>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar onSearchToggle={() => setSearchOpen(true)} />
        {searchOpen && <SmartSearch onClose={() => setSearchOpen(false)} />}

        <div className="pt-28 pb-20 max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-display tracking-tight mb-8">About Flixora</h1>

          <section className="space-y-4 text-foreground/85 leading-relaxed">
            <p>
              Flixora is a next-generation streaming platform built for the modern viewer. We believe entertainment should be effortless — no cable boxes, no contracts, no compromise. Just press play.
            </p>

            <h2 className="text-2xl font-display tracking-tight pt-6">Our Mission</h2>
            <p>
              We exist to connect audiences with the stories that move them. From blockbuster films and gripping series to hidden indie gems, Flixora curates a library that reflects the full spectrum of human creativity. Our recommendation engine learns what you love and surfaces content you'd never find on your own.
            </p>

            <h2 className="text-2xl font-display tracking-tight pt-6">What Sets Us Apart</h2>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li><strong>Smart Personalization:</strong> Our AI-driven engine adapts to your taste in real time — not just genre preferences, but mood, pacing, and visual style.</li>
              <li><strong>Studio-Quality Streaming:</strong> 4K HDR with Dolby Atmos on supported devices, adaptive bitrate for flawless playback on any connection.</li>
              <li><strong>Multi-Profile Support:</strong> Up to five profiles per account, each with its own watch history, recommendations, and parental controls.</li>
              <li><strong>Global Library:</strong> Thousands of titles spanning 40+ languages, with professionally localized subtitles and dubbing.</li>
            </ul>

            <h2 className="text-2xl font-display tracking-tight pt-6">Our Team</h2>
            <p>
              Flixora was founded in 2024 by a team of engineers, designers, and film enthusiasts who were frustrated by the fragmentation of the streaming landscape. Headquartered in San Francisco with offices in London, Mumbai, and Seoul, our diverse team of over 200 professionals works every day to make streaming better for everyone.
            </p>

            <h2 className="text-2xl font-display tracking-tight pt-6">Press & Media</h2>
            <p>
              For press inquiries, partnerships, or media assets, please reach out to our communications team at <span className="text-primary">press@flixora.com</span>. We're always happy to share our story.
            </p>
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default About;
