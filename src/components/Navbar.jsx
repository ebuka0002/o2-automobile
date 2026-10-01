import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Moon, Sun, X, Phone } from "lucide-react";
import Logo from "./Logo";
import { WhatsAppIcon } from "./icons";
import { useStore } from "../context/StoreContext";
import { useDialog } from "../hooks/useDialog";
import { siteConfig } from "../config/site";
import { whatsappLink } from "../lib/format";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/vehicles", label: "Vehicles" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/#why-us", label: "Why Us", hash: true },
  { to: "/contact", label: "Contact" },
];

function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useStore();
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`grid h-11 w-11 place-items-center text-fg/80 transition-colors hover:text-accent ${className}`}
    >
      {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  );
}

function MobileMenu({ onClose }) {
  const ref = useRef(null);
  useDialog(ref, onClose);
  const link = "block border-b border-line py-4 font-display text-4xl font-semibold uppercase tracking-wide";
  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
      tabIndex={-1}
      className="stage fixed inset-0 z-[70] flex flex-col overflow-y-auto px-6 pb-8 pt-5 outline-none lg:hidden"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between">
        <Logo size="sm" />
        <button onClick={onClose} aria-label="Close menu" className="grid h-11 w-11 place-items-center"><X className="h-6 w-6" /></button>
      </div>
      <nav aria-label="Mobile" className="mt-8 flex-1">
        {LINKS.filter((l) => l.label !== "Why Us").map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} onClick={onClose} className={({ isActive }) => `${link} ${isActive ? "text-accent" : ""}`}>
            {l.label}
          </NavLink>
        ))}
        <Link to="/saved" onClick={onClose} className={link}>Saved vehicles</Link>
      </nav>
      <div className="mt-8 grid gap-3">
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary" onClick={onClose}>
          <WhatsAppIcon className="h-5 w-5" /> WhatsApp us
        </a>
        <a href={`tel:${siteConfig.phoneDial}`} className="btn btn-outline"><Phone className="h-4 w-4" /> Call us</a>
        <div className="flex justify-end"><ThemeToggle /></div>
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  const { favorites } = useStore();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overHero = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || pathname !== "/";
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${overHero ? "stage border-transparent bg-transparent" : "border-line"} ${
          !overHero && solid ? "bg-bg/90 backdrop-blur-md" : ""
        } ${scrolled ? "h-16" : "h-20"}`}
        style={overHero ? { backgroundColor: "transparent" } : undefined}
      >
        <div className="container-x flex h-full items-center justify-between gap-6">
          <Link to="/" aria-label="02 Automobile — home"><Logo size={scrolled ? "sm" : "md"} /></Link>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) =>
              l.hash ? (
                <Link key={l.to} to={l.to} className="text-sm font-medium text-fg/80 transition-colors hover:text-accent">{l.label}</Link>
              ) : (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) => `relative py-2 text-sm font-medium transition-colors hover:text-accent ${isActive ? "text-accent" : "text-fg/80"}`}
                >
                  {({ isActive }) => (
                    <>
                      {l.label}
                      {isActive && <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-px bg-accent" />}
                    </>
                  )}
                </NavLink>
              )
            )}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle className="hidden lg:grid" />
            <Link to="/saved" aria-label={`Saved vehicles (${favorites.length})`} className="relative grid h-11 w-11 place-items-center text-fg/80 hover:text-accent">
              <Heart className="h-[18px] w-[18px]" />
              {favorites.length > 0 && (
                <span className="absolute right-1 top-1.5 grid h-4 min-w-4 place-items-center bg-accent px-1 text-[0.6rem] font-bold text-on-accent">{favorites.length}</span>
              )}
            </Link>
            <Link to="/vehicles" className="btn btn-primary ml-3 hidden !min-h-11 !px-5 lg:inline-flex">Find a Vehicle</Link>
            <button onClick={() => setOpen(true)} aria-label="Open menu" className="grid h-11 w-11 place-items-center lg:hidden"><Menu className="h-6 w-6" /></button>
          </div>
        </div>
      </header>
      <AnimatePresence>{open && <MobileMenu key="menu" onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}
