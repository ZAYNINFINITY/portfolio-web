import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  AnimatePresence,
  MotionConfig,
  motion as m,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";

import {
  AVAILABLE_FOR_WORK,
  CAPABILITY_GROUPS,
  EXPERIENCE_TIMELINE,
  HERO_METRICS,
  NAV_LINKS,
  PROFILE,
  PROJECTS,
  TECH_STRIP_ITEMS,
  WHAT_I_BRING,
} from "./constants/index";

/* ── helpers ── */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function goto(hash) { document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }); }

const rise = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = (d = 0.08) => ({ hidden: {}, show: { transition: { staggerChildren: d } } });
const VP = { once: true, margin: "-80px" };

/* ── Loader ── */
function Loader() {
  return (
    <m.div className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <m.p className="loader-name"
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
      >
        Zain Ul Abideen
      </m.p>
      <div className="loader-track">
        <m.div className="loader-fill"
          initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.1, ease: "easeInOut" }}
        />
      </div>
      <p className="loader-sub">Loading</p>
    </m.div>
  );
}

/* ── Navbar ── */
function Navbar({ active, setActive, open, setOpen }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <m.header
        className={`nav ${scrolled ? "nav-blur" : ""}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <a href="#home" className="nav-brand"
          onClick={(e) => { e.preventDefault(); setActive("#home"); goto("#home"); }}>
          <span className="nav-brand-dot" />
          ZUA
        </a>

        <nav className="nav-links">
          {NAV_LINKS.slice(1).map((l) => (
            <a key={l.href} href={l.href}
              className={`nav-link ${active === l.href ? "active" : ""}`}
              onClick={(e) => { e.preventDefault(); setActive(l.href); goto(l.href); }}>
              {l.label}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {AVAILABLE_FOR_WORK && <span className="nav-pill">Available for work</span>}
          <button onClick={() => setOpen(p => !p)} aria-label="Menu" className="mob-btn"
            style={{ display: "none", background: "none", border: "none", color: "var(--white)", cursor: "pointer", padding: "4px" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {open
                ? <><line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
                : <><line x1="3" y1="6"  x2="17" y2="6"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
              }
            </svg>
          </button>
        </div>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div className="mob-drawer"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}
          >
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="mob-link"
                onClick={(e) => { e.preventDefault(); setActive(l.href); setOpen(false); goto(l.href); }}>
                {l.label}
              </a>
            ))}
          </m.div>
        )}
      </AnimatePresence>

      <style>{`@media (max-width: 700px) { .mob-btn { display: flex !important; } }`}</style>
    </>
  );
}

/* ── Hero ── */
function Hero({ setActive }) {
  return (
    <section id="home" className="hero">
      <div className="hero-orb" aria-hidden="true" />

      <m.div variants={stagger(0.09)} initial="hidden" animate="show"
        style={{ position: "relative", zIndex: 1 }}>

        <m.p variants={rise} className="hero-eyebrow">
          Full-Stack Developer · Islamabad, Pakistan
        </m.p>

        {/* THE big moment — name fills the screen */}
        <m.h1 variants={rise} className="hero-name">
          Zain Ul<br />
          <em>Abideen</em>
        </m.h1>

        <m.div variants={rise} className="hero-bottom">
          <p className="hero-desc">
            CS student building full-stack products — from real-time
            backends to cross-platform apps. I care about how things
            work, not just that they do.
          </p>
          <div className="hero-right">
            <p className="hero-role">
              MERN · Real-time · Cross-platform
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-solid"
                onClick={(e) => { e.preventDefault(); setActive("#projects"); goto("#projects"); }}>
                See my work
              </a>
              <a href="/Zain_Ul_Abideen_CV.pdf" download className="btn btn-outline">
                Download CV
              </a>
            </div>
          </div>
        </m.div>

        <m.div variants={rise} className="metrics">
          {HERO_METRICS.map((metric) => (
            <div key={metric.label} className="metric">
              <div className="metric-val">{metric.value}</div>
              <div className="metric-label">{metric.label}</div>
            </div>
          ))}
        </m.div>
      </m.div>
    </section>
  );
}

/* ── Marquee ── */
function Marquee() {
  const reduced = useReducedMotion();
  const doubled = [...TECH_STRIP_ITEMS, ...TECH_STRIP_ITEMS];
  return (
    <div className="marquee">
      <m.div className="marquee-track"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={reduced ? undefined : { duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((t, i) => (
          <span key={`${t}-${i}`} className="marquee-item">
            {t}<span className="marquee-sep" />
          </span>
        ))}
      </m.div>
    </div>
  );
}

/* ── Projects ── */
function Projects() {
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <m.div variants={stagger()} initial="hidden" whileInView="show" viewport={VP}>
          <m.p variants={rise} className="section-label">Selected work</m.p>
          <m.h2 variants={rise} className="section-title">Projects</m.h2>
          <m.p variants={rise} className="section-sub">
            Things I've actually built and shipped — web, backend,
            real-time systems, and cross-platform.
          </m.p>
        </m.div>

        <div className="projects-list">
          {PROJECTS.map((p, i) => (
            <m.div key={p.id} className="project-row"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="project-num">0{i + 1}</span>
              <div>
                <div className="project-top">
                  <h3 className="project-title">{p.title}</h3>
                  <span className="project-cat">{p.category}</span>
                </div>
                <p className="project-desc">{p.description}</p>
                <div className="project-tech">
                  {p.tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                </div>
              </div>
              <div className="project-links">
                {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">Live ↗</a>}
                <a href={p.codeUrl} target="_blank" rel="noopener noreferrer" className="project-link">Code ↗</a>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Skills ── */
const RELATED = {
  "React":     ["JavaScript", "Component architecture", "Tailwind CSS"],
  "Node.js":   ["Express.js", "REST APIs", "Socket.io"],
  "MongoDB":   ["OAuth 2.0", "Session Management", "Express.js"],
  "OAuth 2.0": ["Passport.js", "Session Management", "MongoDB"],
  "Socket.io": ["Node.js", "React", "REST APIs"],
  "Flask":     ["REST APIs", "SQLite", "Python"],
};

function Skills() {
  const [lit, setLit] = useState("");
  return (
    <section id="capabilities" className="section">
      <div className="wrap">
        <m.div variants={stagger()} initial="hidden" whileInView="show" viewport={VP}>
          <m.p variants={rise} className="section-label">Capabilities</m.p>
          <m.h2 variants={rise} className="section-title">Skills</m.h2>
          <m.p variants={rise} className="section-sub">Hover a skill to see what it connects to.</m.p>
        </m.div>

        <m.div className="skills-grid" initial="hidden" whileInView="show" viewport={VP} variants={stagger(0.06)}>
          {CAPABILITY_GROUPS.map((g) => (
            <m.div key={g.title} className="skill-cell" variants={rise}>
              <p className="skill-cell-title">{g.title}</p>
              <p className="skill-cell-desc">{g.description}</p>
              <div className="skill-tags">
                {g.items.map((s) => (
                  <span key={s}
                    className={`skill-tag ${lit === s ? "lit" : ""} ${lit && RELATED[lit]?.includes(s) ? "related" : ""}`}
                    onMouseEnter={() => setLit(s)} onMouseLeave={() => setLit("")}
                  >{s}</span>
                ))}
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}

/* ── Experience ── */
function Experience() {
  return (
    <section id="journey" className="section">
      <div className="wrap">
        <m.div variants={stagger()} initial="hidden" whileInView="show" viewport={VP}>
          <m.p variants={rise} className="section-label">Background</m.p>
          <m.h2 variants={rise} className="section-title">Experience</m.h2>
          <m.p variants={rise} className="section-sub">
            Still early — but I ship real things and I'm always building.
          </m.p>
        </m.div>

        <div className="exp-layout">
          {/* Timeline */}
          <m.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={VP}>
            {EXPERIENCE_TIMELINE.map((step) => (
              <m.div key={step.title} className="tl-item" variants={rise}>
                <p className="tl-label">{step.label}</p>
                <p className="tl-title">{step.title}</p>
                <p className="tl-desc">{step.description}</p>
              </m.div>
            ))}
          </m.div>

          {/* What I bring */}
          <m.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={VP}>
            <m.p variants={rise} className="section-label" style={{ marginBottom: "0" }}>What I bring</m.p>
            <div className="bring-list">
              {WHAT_I_BRING.map((w, i) => (
                <m.div key={w} className="bring-item" variants={rise}>
                  <span className="bring-n">0{i + 1}</span>
                  <span>{w}</span>
                </m.div>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact ── */
function Contact() {
  const env = {
    serviceId:  import.meta.env.VITE_EMAILJS_SERVICE_ID  || import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
    publicKey:  import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
  };

  const [form, setForm]     = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSend]  = useState(false);
  const [status, setStatus] = useState(null);

  const set = (f, v) => {
    setForm(p => ({ ...p, [f]: v }));
    setErrors(p => { const n = { ...p }; delete n[f]; return n; });
  };
  const validate = () => {
    const e = {};
    if (!form.name.trim())                                  e.name    = "Required";
    if (!form.email.trim() || !emailRegex.test(form.email)) e.email   = "Valid email required";
    if (!form.subject.trim())                               e.subject = "Required";
    if (!form.message.trim())                               e.message = "Required";
    return e;
  };
  const submit = async (ev) => {
    ev.preventDefault(); setStatus(null);
    const errs = validate(); setErrors(errs);
    if (Object.keys(errs).length) return;
    if (!env.serviceId || !env.templateId || !env.publicKey) {
      setStatus({ ok: false, msg: "Mail service not configured." }); return;
    }
    setSend(true);
    try {
      await emailjs.send(env.serviceId, env.templateId,
        { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message },
        { publicKey: env.publicKey }
      );
      setStatus({ ok: true, msg: "Message sent." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch { setStatus({ ok: false, msg: "Something went wrong — try again." }); }
    finally   { setSend(false); }
  };

  return (
    <section id="contact" className="section">
      <div className="wrap-sm">
        <m.div variants={stagger()} initial="hidden" whileInView="show" viewport={VP}>
          <m.p variants={rise} className="section-label">Get in touch</m.p>
          <m.h2 variants={rise} className="section-title">Let's work together</m.h2>
          <m.p variants={rise} className="section-sub">
            Open to internships, junior roles, and interesting projects.
            I reply to every message.
          </m.p>
        </m.div>

        <m.div className="contact-box"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {status && <p className={status.ok ? "status-ok" : "status-err"}>{status.msg}</p>}
          <form onSubmit={submit} noValidate>
            <div className="form-pair">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input className="form-input" placeholder="Your name" value={form.name} onChange={e => set("name", e.target.value)} />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" placeholder="you@email.com" value={form.email} onChange={e => set("email", e.target.value)} />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input className="form-input" placeholder="What's this about?" value={form.subject} onChange={e => set("subject", e.target.value)} />
              {errors.subject && <span className="form-error">{errors.subject}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-input" rows={5} placeholder="Tell me about the role or project..." value={form.message} onChange={e => set("message", e.target.value)} />
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>
            <div className="form-foot">
              <p className="form-note">{PROFILE.email}</p>
              <button type="submit" className="btn btn-solid" disabled={sending}>
                {sending ? "Sending..." : "Send message →"}
              </button>
            </div>
          </form>
        </m.div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer({ setActive }) {
  return (
    <footer style={{ borderTop: "1px solid var(--line)" }}>
      <div className="footer">
        <p className="footer-copy">© 2026 Zain Ul Abideen</p>
        <div className="footer-links">
          {NAV_LINKS.slice(1).map((l) => (
            <a key={l.href} href={l.href} className="footer-link"
              onClick={(e) => { e.preventDefault(); setActive(l.href); goto(l.href); }}>
              {l.label}
            </a>
          ))}
          <a href={PROFILE.githubUrl}   target="_blank" rel="noopener noreferrer" className="footer-link">GitHub ↗</a>
          <a href={PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn ↗</a>
        </div>
      </div>
    </footer>
  );
}

/* ── App ── */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [active,  setActive]  = useState("#home");
  const [open,    setOpen]    = useState(false);

  const { scrollYProgress } = useScroll();
  const prog = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  useEffect(() => { const t = setTimeout(() => setLoading(false), 1400); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const tick = () => {
      const y = window.scrollY + 120;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.querySelector(NAV_LINKS[i].href);
        if (el && y >= el.offsetTop) { setActive(NAV_LINKS[i].href); break; }
      }
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    return () => window.removeEventListener("scroll", tick);
  }, []);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <m.div className="progress" style={{ scaleX: prog }} />
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      <Navbar active={active} setActive={setActive} open={open} setOpen={setOpen} />
      <main>
        <Hero     setActive={setActive} />
        <Marquee />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer setActive={setActive} />
    </MotionConfig>
  );
}
