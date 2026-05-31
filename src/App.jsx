import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  AnimatePresence,
  MotionConfig,
  motion as m,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

import {
  AVAILABLE_FOR_WORK,
  CAPABILITY_GROUPS,
  CONTACT_PROMISES,
  EXPERIENCE_TIMELINE,
  HERO_METRICS,
  IDENTITY_CARDS,
  NAV_LINKS,
  PROFILE,
  PROJECTS,
  TECH_STRIP_ITEMS,
  WHAT_I_BRING,
  WORKING_PILLARS,
} from "./constants/index";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = (delay = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
});

const viewport = { once: true, margin: "-80px" };
const Motion = m;

function gotoSection(hash) {
  document.querySelector(hash)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function Loader() {
  return (
    <m.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45 } }}
    >
      <div className="loader-mark">
        <span />
        <span />
        <span />
      </div>
      <m.p
        className="loader-title"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        Zain Ul Abideen
      </m.p>
      <p className="loader-subtitle">Shaping the new portfolio</p>
    </m.div>
  );
}

function Navbar({ active, setActive, open, setOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <m.header
        className={`nav ${scrolled ? "nav-blur" : ""}`}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <a
          href="#home"
          className="nav-brand"
          onClick={(event) => {
            event.preventDefault();
            setActive("#home");
            gotoSection("#home");
          }}
        >
          <span className="nav-brand-dot" />
          ZUA
        </a>

        <nav className="nav-links">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${active === link.href ? "active" : ""}`}
              onClick={(event) => {
                event.preventDefault();
                setActive(link.href);
                gotoSection(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-meta">
          {AVAILABLE_FOR_WORK ? <span className="nav-pill">Available for work</span> : null}
          <button
            type="button"
            className="mob-btn"
            aria-label="Menu"
            onClick={() => setOpen((value) => !value)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {open ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </m.header>

      <AnimatePresence>
        {open ? (
          <m.div
            className="mob-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="mob-link"
                onClick={(event) => {
                  event.preventDefault();
                  setActive(link.href);
                  setOpen(false);
                  gotoSection(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function Hero({ setActive }) {
  return (
    <section id="home" className="hero">
      <div className="hero-orb hero-orb-a" aria-hidden="true" />
      <div className="hero-orb hero-orb-b" aria-hidden="true" />

      <div className="hero-shell">
        <m.div
          className="hero-copy"
          variants={stagger(0.1)}
          initial="hidden"
          animate="show"
        >
          <m.p variants={reveal} className="hero-eyebrow">
            Full-stack developer · Islamabad
          </m.p>

          <m.h1 variants={reveal} className="hero-title">
            I build calm software
            <span>with a clear point of view.</span>
          </m.h1>

          <m.p variants={reveal} className="hero-body">
            {PROFILE.tagline}
          </m.p>

          <m.div variants={reveal} className="hero-actions">
            <a
              href="#projects"
              className="btn btn-solid"
              onClick={(event) => {
                event.preventDefault();
                setActive("#projects");
                gotoSection("#projects");
              }}
            >
              See selected work
            </a>
            <a href="/Zain_Ul_Abideen_CV.pdf" download className="btn btn-outline">
              Download CV
            </a>
          </m.div>

          <m.div variants={reveal} className="hero-tags">
            <span className="hero-tag">{PROFILE.role}</span>
            <span className="hero-tag">{PROFILE.location}</span>
            <span className="hero-tag">{PROFILE.timezone}</span>
          </m.div>

          <m.div variants={reveal} className="metrics">
            {HERO_METRICS.map((metric) => (
              <div key={metric.label} className="metric">
                <div className="metric-val">{metric.value}</div>
                <div className="metric-label">{metric.label}</div>
              </div>
            ))}
          </m.div>
        </m.div>

        <m.div
          className="hero-visual"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
        >
          <div className="portrait-card">
            <div className="portrait-rim" aria-hidden="true" />
            <img
              className="portrait-image"
              src="/images/profile.png"
              alt="Zain Ul Abideen portrait"
            />

            <div className="portrait-overlay">
              <div className="portrait-pill portrait-pill-top">Quiet systems</div>
              <div className="portrait-pill portrait-pill-bottom">Fast to understand</div>
            </div>
          </div>

          <div className="now-card">
            <p className="now-label">Now</p>
            <p className="now-title">Turning coursework and real builds into a cleaner portfolio story.</p>
            <p className="now-copy">
              A portfolio should say what you do, how you think, and why someone should trust you in under five seconds.
            </p>
          </div>
        </m.div>
      </div>
    </section>
  );
}

function TechStrip() {
  const reducedMotion = useReducedMotion();
  const stripItems = [...TECH_STRIP_ITEMS, ...TECH_STRIP_ITEMS];

  return (
    <div className="marquee">
      <m.div
        className="marquee-track"
        animate={reducedMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={reducedMotion ? undefined : { duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {stripItems.map((item, index) => (
          <span key={`${item}-${index}`} className="marquee-item">
            {item}
            <span className="marquee-sep" />
          </span>
        ))}
      </m.div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <m.div variants={stagger()} initial="hidden" whileInView="show" viewport={viewport}>
          <m.p variants={reveal} className="section-label">
            Identity layer
          </m.p>
          <m.h2 variants={reveal} className="section-title">
            What makes this portfolio feel like me
          </m.h2>
          <m.p variants={reveal} className="section-sub">
            The goal is not to copy a reference site. It is to keep the confidence and add a stronger personality, clearer structure, and a more memorable first impression.
          </m.p>
        </m.div>

        <div className="identity-grid">
          <m.div
            className="identity-feature"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5 }}
          >
            <p className="identity-feature-label">My edge</p>
            <p className="identity-feature-title">I like building things that feel quiet, confident, and useful.</p>
            <p className="identity-feature-copy">
              That means fewer visual tricks, more clarity, and enough detail to make the project feel real instead of decorative.
            </p>
          </m.div>

          <div className="identity-cards">
            {IDENTITY_CARDS.map((card) => (
              <m.article
                key={card.title}
                className="identity-card"
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
              >
                <p className="identity-card-title">{card.title}</p>
                <p className="identity-card-copy">{card.description}</p>
              </m.article>
            ))}
          </div>

          <m.div
            className="identity-pillars"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5 }}
          >
            <p className="identity-pillars-label">How I work</p>
            <div className="pillar-list">
              {WORKING_PILLARS.map((pillar, index) => (
                <div key={pillar} className="pillar-row">
                  <span className="pillar-index">0{index + 1}</span>
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <m.div variants={stagger()} initial="hidden" whileInView="show" viewport={viewport}>
          <m.p variants={reveal} className="section-label">
            Selected work
          </m.p>
          <m.h2 variants={reveal} className="section-title">
            Projects with a point of view
          </m.h2>
          <m.p variants={reveal} className="section-sub">
            Each build shows a different part of the story: realtime collaboration, e-commerce, simulation, and backend logic.
          </m.p>
        </m.div>

        <div className="project-stack">
          {PROJECTS.map((project, index) => (
            <m.article
              key={project.id}
              className={`project-card ${index % 2 === 1 ? "project-card-reverse" : ""}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="project-stage" aria-hidden="true">
                <div className="project-stage-inner">
                  <span className="project-stage-kicker">{project.category}</span>
                  <span className="project-stage-title">{project.title}</span>
                  <span className="project-stage-copy">{project.accent}</span>
                </div>
              </div>

              <div className="project-content">
                <div className="project-head">
                  <div>
                    <p className="project-index">0{index + 1}</p>
                    <h3 className="project-title">{project.title}</h3>
                  </div>
                  <span className="project-cat">{project.category}</span>
                </div>

                <p className="project-desc">{project.description}</p>
                <p className="project-impact">{project.impact}</p>

                <div className="project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  {project.liveUrl ? (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                      Live ↗
                    </a>
                  ) : null}
                  <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                    Code ↗
                  </a>
                </div>
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="section">
      <div className="wrap">
        <m.div variants={stagger()} initial="hidden" whileInView="show" viewport={viewport}>
          <m.p variants={reveal} className="section-label">
            Stack
          </m.p>
          <m.h2 variants={reveal} className="section-title">
            Tools I reach for often
          </m.h2>
          <m.p variants={reveal} className="section-sub">
            A practical stack matters more than a huge one. These are the pieces that show up repeatedly in the way I build.
          </m.p>
        </m.div>

        <div className="skills-layout">
          <m.div
            className="skills-grid"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={stagger(0.06)}
          >
            {CAPABILITY_GROUPS.map((group) => (
              <m.article key={group.title} className="skill-cell" variants={reveal}>
                <p className="skill-cell-title">{group.title}</p>
                <p className="skill-cell-desc">{group.description}</p>
                <div className="skill-tags">
                  {group.items.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </m.article>
            ))}
          </m.div>

          <m.aside
            className="stack-note"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.55 }}
          >
            <p className="stack-note-label">Why this stack feels personal</p>
            <p className="stack-note-copy">
              It lets me move from interface to API to deployment without changing the language of the project.
            </p>
            <div className="stack-note-list">
              {WHAT_I_BRING.map((point, index) => (
                <div key={point} className="stack-note-row">
                  <span className="stack-note-index">0{index + 1}</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </m.aside>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <m.div variants={stagger()} initial="hidden" whileInView="show" viewport={viewport}>
          <m.p variants={reveal} className="section-label">
            Experience
          </m.p>
          <m.h2 variants={reveal} className="section-title">
            The part that makes it credible
          </m.h2>
          <m.p variants={reveal} className="section-sub">
            A memorable portfolio still needs proof. This section keeps the story grounded in education, internship work, and current building.
          </m.p>
        </m.div>

        <div className="experience-layout">
          <m.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewport}>
            {EXPERIENCE_TIMELINE.map((step) => (
              <m.article key={step.title} className="timeline-item" variants={reveal}>
                <p className="timeline-label">{step.label}</p>
                <p className="timeline-title">{step.title}</p>
                <p className="timeline-copy">{step.description}</p>
              </m.article>
            ))}
          </m.div>

          <m.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewport}>
            <m.div variants={reveal} className="bring-box">
              <p className="bring-box-label">What I bring</p>
              <div className="bring-list">
                {WHAT_I_BRING.map((point, index) => (
                  <div key={point} className="bring-row">
                    <span className="bring-index">0{index + 1}</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </m.div>

            <m.div variants={reveal} className="promise-box">
              <p className="bring-box-label">Working style</p>
              <div className="promise-list">
                {CONTACT_PROMISES.map((promise) => (
                  <div key={promise} className="promise-row">
                    <span className="promise-bullet" />
                    <span>{promise}</span>
                  </div>
                ))}
              </div>
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const env = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
  };

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function validate() {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Required";
    if (!form.email.trim() || !emailRegex.test(form.email)) nextErrors.email = "Valid email required";
    if (!form.subject.trim()) nextErrors.subject = "Required";
    if (!form.message.trim()) nextErrors.message = "Required";
    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (!env.serviceId || !env.templateId || !env.publicKey) {
      setStatus({ ok: false, msg: "Mail service not configured." });
      return;
    }

    setSending(true);

    try {
      await emailjs.send(
        env.serviceId,
        env.templateId,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        { publicKey: env.publicKey },
      );

      setStatus({ ok: true, msg: "Message sent." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus({ ok: false, msg: "Something went wrong — try again." });
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="section section-contact">
      <div className="wrap-sm">
        <m.div variants={stagger()} initial="hidden" whileInView="show" viewport={viewport}>
          <m.p variants={reveal} className="section-label">
            Contact
          </m.p>
          <m.h2 variants={reveal} className="section-title">
            Let&apos;s make your portfolio feel deliberate
          </m.h2>
          <m.p variants={reveal} className="section-sub">
            If you want the next step to be a redesign, a stronger identity, or a cleaner layout strategy, I can help shape it.
          </m.p>
        </m.div>

        <m.div
          className="contact-grid"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.55 }}
        >
          <div className="contact-aside">
            {status ? <p className={status.ok ? "status-ok" : "status-err"}>{status.msg}</p> : null}
            <p className="contact-aside-label">Direct line</p>
            <a className="contact-mail" href={`mailto:${PROFILE.email}`}>
              {PROFILE.email}
            </a>
            <div className="contact-promise-list">
              {CONTACT_PROMISES.map((promise) => (
                <div key={promise} className="contact-promise">
                  <span className="contact-promise-dot" />
                  <span>{promise}</span>
                </div>
              ))}
            </div>
          </div>

          <form className="contact-box" onSubmit={handleSubmit} noValidate>
            <div className="form-pair">
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className="form-input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                />
                {errors.name ? <span className="form-error">{errors.name}</span> : null}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  className="form-input"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                />
                {errors.email ? <span className="form-error">{errors.email}</span> : null}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                className="form-input"
                placeholder="What's this about?"
                value={form.subject}
                onChange={(event) => updateField("subject", event.target.value)}
              />
              {errors.subject ? <span className="form-error">{errors.subject}</span> : null}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="form-input"
                rows={5}
                placeholder="Tell me about the role, project, or portfolio idea."
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
              />
              {errors.message ? <span className="form-error">{errors.message}</span> : null}
            </div>

            <div className="form-foot">
              <p className="form-note">Open to internships, junior roles, and interesting product work.</p>
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

function Footer({ setActive }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-copy">© 2026 Zain Ul Abideen</p>
        <div className="footer-links">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="footer-link"
              onClick={(event) => {
                event.preventDefault();
                setActive(link.href);
                gotoSection(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
          <a href={PROFILE.githubUrl} target="_blank" rel="noopener noreferrer" className="footer-link">
            GitHub ↗
          </a>
          <a href={PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer" className="footer-link">
            LinkedIn ↗
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("#home");
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY + 120;

      for (let index = NAV_LINKS.length - 1; index >= 0; index -= 1) {
        const link = NAV_LINKS[index];
        const element = document.querySelector(link.href);
        if (element && offset >= element.offsetTop) {
          setActive(link.href);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <m.div className="progress" style={{ scaleX: progress }} />
      <AnimatePresence>{loading ? <Loader key="loader" /> : null}</AnimatePresence>
      <Navbar active={active} setActive={setActive} open={open} setOpen={setOpen} />
      <main>
        <Hero setActive={setActive} />
        <TechStrip />
        <About />
        <Projects />
        <Stack />
        <Experience />
        <Contact />
      </main>
      <Footer setActive={setActive} />
    </MotionConfig>
  );
}
