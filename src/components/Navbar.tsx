import { useState, useEffect, useRef } from "react";
import { Search, Bell, ChevronDown, User, Settings, HelpCircle, LogOut, Menu, X, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useProfiles } from "@/hooks/useProfiles";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onSearchToggle?: () => void;
  searchOpen?: boolean;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

const navLinks = [
  { label: "Home", to: "/" },
  { label: "TV Shows", to: "/tv-shows" },
  { label: "Movies", to: "/movies" },
  { label: "New & Popular", to: "/browse" },
  { label: "My List", to: "/my-list" },
];

export const Navbar = ({ onSearchToggle = () => {} }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { activeProfile, clearActive } = useProfiles();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = () => {
    clearActive();
    setLogoutOpen(false);
    setProfileOpen(false);
    navigate("/profiles");
  };

  const profileMenuItems = [
    { icon: Users, label: "Manage Profiles", action: () => navigate("/profiles") },
    { icon: Settings, label: "Account", action: () => navigate("/account") },
    { icon: HelpCircle, label: "Help Center", action: () => navigate("/help") },
    { icon: LogOut, label: "Sign out of Flixora", action: () => setLogoutOpen(true) },
  ];

  const avatarNode = activeProfile ? (
    <div className={`w-8 h-8 rounded overflow-hidden bg-gradient-to-br ${activeProfile.color} flex items-center justify-center text-base ring-1 ring-transparent group-hover:ring-muted-foreground/30 transition-all`}>
      <span>{activeProfile.avatar}</span>
    </div>
  ) : (
    <div className="w-8 h-8 rounded overflow-hidden bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center ring-1 ring-transparent group-hover:ring-muted-foreground/30 transition-all">
      <User className="w-4 h-4 text-primary-foreground" />
    </div>
  );

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
          : "bg-gradient-to-b from-background/80 via-background/40 to-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-16 md:h-[72px]">
        <div className="flex items-center gap-8">
          <Link to="/">
            <h1 className="font-display text-3xl md:text-4xl tracking-[0.15em] text-gradient cursor-pointer select-none">
              FLIXORA
            </h1>
          </Link>

          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`text-[13px] font-medium transition-colors duration-200 ${
                    active ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={onSearchToggle} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Search className="w-5 h-5" />
          </button>

          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors hidden sm:flex relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          </button>

          <div ref={profileRef} className="relative hidden sm:block">
            <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-1.5 group">
              {avatarNode}
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-background/95 backdrop-blur-md border border-border rounded-md shadow-[0_8px_40px_rgba(0,0,0,0.6)] overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-border flex items-center gap-3">
                    {activeProfile ? (
                      <div className={`w-8 h-8 rounded bg-gradient-to-br ${activeProfile.color} flex items-center justify-center text-base`}>
                        <span>{activeProfile.avatar}</span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-foreground">{activeProfile?.name ?? "Guest"}</p>
                      <p className="text-xs text-muted-foreground">{activeProfile?.isKids ? "Kids profile" : "Premium plan"}</p>
                    </div>
                  </div>
                  <div className="py-1">
                    {profileMenuItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          setProfileOpen(false);
                          item.action();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={() => setMobileMenu(!mobileMenu)} className="p-2 text-muted-foreground hover:text-foreground lg:hidden">
            {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileMenu(false)}
                  className={`text-left text-sm py-2 font-medium transition-colors ${
                    location.pathname === link.to ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border mt-2 pt-2">
                {profileMenuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setMobileMenu(false);
                      item.action();
                    }}
                    className="w-full flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign out of Flixora?</DialogTitle>
            <DialogDescription>
              Are you sure you want to sign out? You'll be returned to the profile selection screen.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLogoutOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleSignOut}>Sign out</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.nav>
  );
};
