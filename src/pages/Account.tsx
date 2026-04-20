import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Shield, Settings as SettingsIcon, CreditCard, ArrowLeft, Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type Section = "account" | "subscription" | "security" | "preferences";

const sections: { key: Section; label: string; icon: typeof User }[] = [
  { key: "account", label: "Account", icon: User },
  { key: "subscription", label: "Subscription", icon: CreditCard },
  { key: "security", label: "Security", icon: Shield },
  { key: "preferences", label: "Preferences", icon: SettingsIcon },
];

const Account = () => {
  const [active, setActive] = useState<Section>("account");
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-28 pb-16 w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
        <h1 className="font-display text-3xl md:text-5xl tracking-tight text-foreground mb-8">
          Account Settings
        </h1>

        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 self-start">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
              {sections.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                    active === key
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="space-y-6">
            {active === "account" && <AccountInfo onSaved={(m) => toast({ title: m })} />}
            {active === "subscription" && <Subscription onSaved={(m) => toast({ title: m })} />}
            {active === "security" && <Security onSaved={(m) => toast({ title: m })} />}
            {active === "preferences" && <Preferences onSaved={(m) => toast({ title: m })} />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

/* ---------------- Sections ---------------- */

const AccountInfo = ({ onSaved }: { onSaved: (m: string) => void }) => {
  const [email, setEmail] = useState("user@flixora.app");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Info</CardTitle>
        <CardDescription>Manage your email and login details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label>Password</Label>
          <p className="text-xs text-muted-foreground mt-1">Last changed 24 days ago</p>
        </div>
        <div className="rounded-md bg-secondary/40 p-3 text-sm">
          <span className="text-muted-foreground">Last login: </span>
          <span className="text-foreground font-medium">Today at 9:42 AM · Chrome on Mac</span>
        </div>
        <Button onClick={() => onSaved("Account info saved")}>Save changes</Button>
      </CardContent>
    </Card>
  );
};

const Subscription = ({ onSaved }: { onSaved: (m: string) => void }) => {
  const [plan, setPlan] = useState<"basic" | "standard" | "premium">("standard");
  const plans = {
    basic: { name: "Basic", price: "$8.99", quality: "720p · 1 screen" },
    standard: { name: "Standard", price: "$15.49", quality: "1080p · 2 screens" },
    premium: { name: "Premium", price: "$22.99", quality: "4K HDR · 4 screens" },
  } as const;
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Next billing date: May 12, 2026</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-md bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30">
            <div>
              <p className="text-2xl font-bold text-foreground">{plans[plan].name}</p>
              <p className="text-sm text-muted-foreground">{plans[plan].quality}</p>
            </div>
            <p className="text-2xl font-display text-primary">{plans[plan].price}<span className="text-sm text-muted-foreground">/mo</span></p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Plan</CardTitle>
          <CardDescription>Upgrade or downgrade anytime.</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-3 gap-3">
          {(Object.keys(plans) as Array<keyof typeof plans>).map((k) => (
            <button
              key={k}
              onClick={() => {
                setPlan(k);
                onSaved(`Switched to ${plans[k].name}`);
              }}
              className={`text-left rounded-md border p-4 transition ${
                plan === k
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-muted-foreground/40"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-foreground">{plans[k].name}</p>
                {plan === k && <Check className="w-4 h-4 text-primary" />}
              </div>
              <p className="text-xs text-muted-foreground">{plans[k].quality}</p>
              <p className="text-lg font-display text-foreground mt-2">{plans[k].price}</p>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

const Security = ({ onSaved }: { onSaved: (m: string) => void }) => {
  const [twofa, setTwofa] = useState(false);
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Use a strong password you don't reuse elsewhere.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="cur">Current password</Label>
            <Input id="cur" type="password" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="new">New password</Label>
            <Input id="new" type="password" className="mt-1.5" />
          </div>
          <Button onClick={() => onSaved("Password updated")}>Update password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security at sign-in.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground">{twofa ? "Enabled" : "Disabled"}</p>
            <p className="text-xs text-muted-foreground">Authenticator app (TOTP)</p>
          </div>
          <Switch
            checked={twofa}
            onCheckedChange={(v) => {
              setTwofa(v);
              onSaved(v ? "2FA enabled" : "2FA disabled");
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sign Out Everywhere</CardTitle>
          <CardDescription>End all sessions on every device.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={() => onSaved("Signed out of all devices")}>
            Logout from all devices
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const Preferences = ({ onSaved }: { onSaved: (m: string) => void }) => {
  const [lang, setLang] = useState("en");
  const [quality, setQuality] = useState("auto");
  const [notif, setNotif] = useState(true);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Customize playback and language.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <Label>Language</Label>
          <Select value={lang} onValueChange={setLang}>
            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Playback quality</Label>
          <Select value={quality} onValueChange={setQuality}>
            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto (recommended)</SelectItem>
              <SelectItem value="720">720p</SelectItem>
              <SelectItem value="1080">1080p</SelectItem>
              <SelectItem value="4k">4K</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between rounded-md border border-border p-3">
          <div>
            <p className="text-sm font-medium text-foreground">Email notifications</p>
            <p className="text-xs text-muted-foreground">New releases, recommendations, account alerts.</p>
          </div>
          <Switch checked={notif} onCheckedChange={setNotif} />
        </div>
        <Button onClick={() => onSaved("Preferences saved")}>Save preferences</Button>
      </CardContent>
    </Card>
  );
};

export default Account;
