import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AVAILABLE_FOR_WORK, NAV_LINKS } from "../constants/index";

const scrollToHash = (hash) => {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Navbar() {
  const links = useMemo(() => NAV_LINKS, []);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#about");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const probeY = window.scrollY + 120;
      for (let i = links.length - 1; i >= 0; i -= 1) {
        const hash = links[i].href;
        const id = hash.replace("#", "");
        const el = document.getElementById(id);
        if (!el) continue;
        if (probeY >= el.offsetTop) {
          setActiveHash(hash);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <motion.nav
      className={[
        "fixed top-0 z-50 w-full",
        "transition-colors duration-300",
        isScrolled
          ? "bg-[rgba(10,10,15,0.85)] backdrop-blur-[12px] border-b border-white/[0.06]"
          : "bg-transparent",
      ].join(" ")}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#home"
            className="font-bold tracking-tight text-[#f1f1f3]"
            onClick={(e) => {
              e.preventDefault();
              scrollToHash("#home");
            }}
            aria-label="Home"
          >
            <span className="text-[22px] font-bold text-[#6366f1]">Z.</span>
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveHash(link.href);
                    scrollToHash(link.href);
                  }}
                  className={[
                    "relative py-2 text-sm font-medium",
                    isActive
                      ? "text-[#f1f1f3]"
                      : "text-[#7c7c8a] hover:text-[#f1f1f3]",
                  ].join(" ")}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-[#6366f1]"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {AVAILABLE_FOR_WORK && (
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e]/60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
                </span>
                <span className="text-sm text-[#7c7c8a]">Available</span>
              </div>
            )}
            <a
              href="/resume.pdf"
              download="ZainUlAbideen_Resume.pdf"
              className="rounded-[10px] border border-white/[0.10] bg-white/[0.02] px-4 py-2 text-sm font-medium text-[#f1f1f3] hover:border-[#6366f1]/40 hover:bg-[#6366f1]/10 transition-colors"
            >
              Resume
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="md:hidden rounded-[10px] border border-white/[0.08] bg-white/[0.02] p-2 text-[#f1f1f3]"
            aria-label="Open menu"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, pointerEvents: "auto" },
          closed: { opacity: 0, pointerEvents: "none" },
        }}
        className="fixed inset-0 z-50 md:hidden"
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
        <motion.div
          variants={{
            open: { x: 0 },
            closed: { x: "-100%" },
          }}
          transition={{ type: "spring", stiffness: 380, damping: 36 }}
          className="absolute inset-y-0 left-0 w-full bg-[#0a0a0f] px-6 py-6"
        >
          <div className="flex items-center justify-between">
            <span className="text-[22px] font-bold text-[#6366f1]">Z.</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-[10px] border border-white/[0.08] bg-white/[0.02] p-2 text-[#f1f1f3]"
              aria-label="Close menu"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>

          <motion.div
            className="mt-10 flex flex-col gap-4"
            variants={{
              open: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
              closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
            }}
          >
            {links.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                variants={{
                  open: { x: 0, opacity: 1 },
                  closed: { x: -18, opacity: 0 },
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-xl font-semibold text-[#f1f1f3]"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  setActiveHash(link.href);
                  scrollToHash(link.href);
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>

          <div className="mt-10">
            <a
              href="/resume.pdf"
              download="ZainUlAbideen_Resume.pdf"
              className="inline-flex w-full items-center justify-center rounded-[10px] bg-[#6366f1] px-5 py-3 text-sm font-semibold text-white"
              onClick={() => setIsOpen(false)}
            >
              Download Resume
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
}

