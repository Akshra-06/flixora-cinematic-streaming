import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  CreditCard,
  Tv,
  Users,
  Wrench,
  MonitorSmartphone,
  MessageCircle,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Article {
  id: string;
  title: string;
  body: string;
  category: string;
}

const CATEGORIES = [
  { key: "billing", label: "Account & Billing", icon: CreditCard, color: "from-primary/30 to-primary/5" },
  { key: "streaming", label: "Streaming Issues", icon: Tv, color: "from-blue-500/30 to-blue-500/5" },
  { key: "profiles", label: "Managing Profiles", icon: Users, color: "from-pink-500/30 to-pink-500/5" },
  { key: "trouble", label: "Troubleshooting", icon: Wrench, color: "from-amber-500/30 to-amber-500/5" },
  { key: "device", label: "Device Setup", icon: MonitorSmartphone, color: "from-emerald-500/30 to-emerald-500/5" },
] as const;

const ARTICLES: Article[] = [
  { id: "a1", category: "billing", title: "How do I update my payment method?", body: "Go to Account → Subscription → Update payment. We accept all major cards and PayPal." },
  { id: "a2", category: "billing", title: "When will I be charged?", body: "Your billing date is shown in Account → Subscription. Charges occur on the same day each month." },
  { id: "a3", category: "billing", title: "Cancel or pause my subscription", body: "You can cancel anytime from the Subscription page. Your plan stays active until the end of the billing cycle." },
  { id: "b1", category: "streaming", title: "Video keeps buffering", body: "Try lowering playback quality in Preferences, or test your network speed. We recommend 5 Mbps for HD and 25 Mbps for 4K." },
  { id: "b2", category: "streaming", title: "Audio out of sync", body: "Pause for 5 seconds and resume. If it persists, restart the app or your device." },
  { id: "b3", category: "streaming", title: "Subtitles aren't showing", body: "Open the captions menu in the player and toggle the desired language. Captions are reset per device." },
  { id: "c1", category: "profiles", title: "Create a Kids profile", body: "Go to Manage Profiles → Add Profile and toggle 'Kids profile' to restrict content to age-appropriate titles." },
  { id: "c2", category: "profiles", title: "Delete a profile", body: "From Manage Profiles, switch to manage mode, tap the trash icon on a profile, and confirm." },
  { id: "d1", category: "trouble", title: "App won't open", body: "Force-close and reopen. If that fails, sign out and back in, or reinstall the app." },
  { id: "d2", category: "trouble", title: "Error code NSES-500", body: "This usually indicates a network interruption. Refresh the page or restart your router." },
  { id: "e1", category: "device", title: "Set up Flixora on a Smart TV", body: "Search for 'Flixora' in your TV's app store, install, then sign in with your account credentials." },
  { id: "e2", category: "device", title: "Cast from your phone", body: "Tap the cast icon in the player and pick your device. Both devices must be on the same Wi-Fi." },
];

const Help = () => {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const { toast } = useToast();

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return ARTICLES.filter((a) => a.title.toLowerCase().includes(q) || a.body.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const visibleArticles = useMemo(() => {
    if (!activeCat) return [];
    return ARTICLES.filter((a) => a.category === activeCat);
  }, [activeCat]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-b from-secondary/40 to-background pt-28 pb-16">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition">
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>
            <h1 className="font-display text-4xl md:text-6xl tracking-tight text-foreground mb-3">
              How can we help?
            </h1>
            <p className="text-muted-foreground mb-8">Search articles, browse topics, or reach out to support.</p>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search help articles..."
                className="h-14 pl-12 text-base bg-background/80 backdrop-blur"
              />
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute left-0 right-0 top-full mt-2 bg-popover border border-border rounded-md shadow-lg overflow-hidden z-10 text-left"
                  >
                    {suggestions.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setActiveCat(s.category);
                          setOpenId(s.id);
                          setQuery("");
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-secondary/50 transition border-b border-border last:border-0"
                      >
                        <p className="text-sm text-foreground font-medium">{s.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{s.body}</p>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">Browse topics</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((c) => {
              const active = activeCat === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => setActiveCat(active ? null : c.key)}
                  className={`group rounded-lg border p-5 text-left transition-all bg-gradient-to-br ${c.color} ${
                    active ? "border-primary shadow-[0_8px_30px_hsl(var(--primary)/0.2)]" : "border-border hover:border-muted-foreground/40"
                  }`}
                >
                  <c.icon className="w-7 h-7 text-foreground mb-3" />
                  <p className="font-semibold text-foreground">{c.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {ARTICLES.filter((a) => a.category === c.key).length} articles
                  </p>
                </button>
              );
            })}
          </div>

          {/* Articles list */}
          <AnimatePresence>
            {activeCat && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-10"
              >
                <h3 className="font-display text-xl text-foreground mb-4">
                  {CATEGORIES.find((c) => c.key === activeCat)?.label}
                </h3>
                <div className="space-y-2">
                  {visibleArticles.map((a) => (
                    <div key={a.id} className="rounded-md border border-border bg-card overflow-hidden">
                      <button
                        onClick={() => setOpenId(openId === a.id ? null : a.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/30 transition"
                      >
                        <span className="text-sm md:text-base font-medium text-foreground">{a.title}</span>
                        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openId === a.id ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {openId === a.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{a.body}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Contact */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-20">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">Still need help?</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-primary/10 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" /> Live Chat
                </CardTitle>
                <CardDescription>Average response time: under 2 minutes.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => toast({ title: "Live chat opening soon" })}>Start chat</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Support</CardTitle>
                <CardDescription>We'll reply within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm onSent={() => toast({ title: "Message sent", description: "We'll be in touch soon." })} />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const ContactForm = ({ onSent }: { onSent: () => void }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !issue.trim()) return;
    onSent();
    setName("");
    setEmail("");
    setIssue("");
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <Label htmlFor="cn">Name</Label>
        <Input id="cn" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="ce">Email</Label>
        <Input id="ce" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={120} className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="ci">Describe your issue</Label>
        <Textarea id="ci" value={issue} onChange={(e) => setIssue(e.target.value)} maxLength={1000} rows={4} className="mt-1.5" />
      </div>
      <Button type="submit">Send message</Button>
    </form>
  );
};

export default Help;
