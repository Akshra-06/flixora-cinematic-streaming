import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_BASE = "https://flixora-cinematic-streaming.onrender.com";

type Errors = { email?: string; password?: string; confirm?: string };

const validate = (email: string, password: string, confirm: string): Errors => {
  const errors: Errors = {};
  if (!email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email";
  if (!password) errors.password = "Password is required";
  else if (password.length < 6) errors.password = "Password must be at least 6 characters";
  if (confirm !== password) errors.confirm = "Passwords do not match";
  return errors;
};

const passwordChecks = (pw: string) => ({
  length: pw.length >= 6,
  number: /\d/.test(pw),
  letter: /[a-zA-Z]/.test(pw),
});

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const checks = passwordChecks(password);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate(email, password, confirm);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      toast.success("Account created. Please sign in.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Account — Flixora</title>
        <meta name="description" content="Join Flixora to stream movies and shows." />
      </Helmet>

      <div className="relative min-h-screen w-full overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_60%)]" />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <div className="mb-8 text-center">
              <Link to="/" className="inline-block">
                <h1 className="text-4xl font-extrabold tracking-tight text-primary">FLIXORA</h1>
              </Link>
            </div>

            <div className="rounded-xl border border-border/50 bg-card/80 p-8 shadow-2xl backdrop-blur-xl">
              <h2 className="mb-1 text-2xl font-bold text-foreground">Create your account</h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Stream unlimited movies and shows.
              </p>

              <form onSubmit={handleSignup} className="space-y-4" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      aria-invalid={!!errors.email}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      aria-invalid={!!errors.password}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-destructive">{errors.password}</p>
                  )}
                  {password && (
                    <ul className="mt-2 space-y-1 text-xs">
                      {[
                        { ok: checks.length, label: "At least 6 characters" },
                        { ok: checks.letter, label: "Contains a letter" },
                        { ok: checks.number, label: "Contains a number" },
                      ].map((c) => (
                        <li
                          key={c.label}
                          className={`flex items-center gap-1.5 ${c.ok ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          <Check className={`h-3 w-3 ${c.ok ? "text-primary" : "opacity-30"}`} />
                          {c.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm password</Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="confirm"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      className="pl-10"
                      aria-invalid={!!errors.confirm}
                    />
                  </div>
                  {errors.confirm && (
                    <p className="text-xs text-destructive">{errors.confirm}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account…
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-foreground hover:text-primary">
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
