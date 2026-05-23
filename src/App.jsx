import { useEffect, useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  AnimatePresence,
  MotionConfig,
  motion as Motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import { useGenjutsuEngine } from "./hooks/useGenjutsuEngine";
import {
  AVAILABLE_FOR_WORK,
  CAPABILITY_GROUPS,
  EXPERIENCE_TIMELINE,
  HERO_METRICS,
  HIGHLIGHTS,
  NAV_LINKS,
  NPM_PACKAGE,
  PROFILE,
  PROJECTS,
  TECH_STRIP_ITEMS,
  WHAT_I_BRING,
} from "./constants/index";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schemaMap = {
  "collaborative-workspace": {
    nodes: [
      { label: "Client", x: 18, y: 46 },
      { label: "Socket.io", x: 42, y: 22 },
      { label: "Express", x: 42, y: 70 },
      { label: "MongoDB", x: 74, y: 46 },
    ],
    links: [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
    ],
  },
  "zse-website": {
    nodes: [
      { label: "Client", x: 16, y: 46 },
      { label: "API", x: 42, y: 46 },
      { label: "Stripe", x: 72, y: 24 },
      { label: "MongoDB", x: 72, y: 68 },
    ],
    links: [
      [0, 1],
      [1, 2],
      [1, 3],
    ],
  },
  "queue-simulator": {
    nodes: [
      { label: "UI", x: 16, y: 46 },
      { label: "Flask", x: 42, y: 46 },
      { label: "SQLite", x: 72, y: 24 },
      { label: "Capacitor", x: 72, y: 68 },
    ],
    links: [
      [0, 1],
      [1, 2],
      [0, 3],
    ],
  },
  "car-auction": {
    nodes: [
      { label: "Frontend", x: 16, y: 46 },
      { label: "PHP", x: 42, y: 46 },
      { label: "MySQL", x: 72, y: 24 },
      { label: "Bids", x: 72, y: 68 },
    ],
    links: [
      [0, 1],
      [1, 2],
      [1, 3],
    ],
  },
};

const relatedSkills = {
  React: ["JavaScript", "Node.js", "MongoDB"],
  "Node.js": ["React", "Express.js", "MongoDB", "Socket.io"],
  MongoDB: ["Node.js", "Express.js", "OAuth 2.0"],
  "OAuth 2.0": ["Passport.js", "Session Management", "MongoDB"],
  "Express.js": ["Node.js", "REST APIs", "MongoDB"],
  "Socket.io": ["Node.js", "React", "REST APIs"],
};

const terminalPlaceholders = {
  name: "guest@zain:~$ enter_identifier_",
  email: "guest@zain:~$ enter_email_",
  subject: "guest@zain:~$ route_subject_",
  message: "guest@zain:~$ compose_payload_",
};

const projectRouteMap = {
  "collaborative-workspace": [
    "[ROUTING_LAYER]: /api/workspaces/:id",
    "[SOCKET_GATEWAY]: /socket/live-room",
    "[AUTH_CHAIN]: OAuth -> Session Resolver",
    '[MONGO_COLLECTION]: workspaces { members: ObjectId[], board: Mixed }',
  ],
  "zse-website": [
    "[ROUTING_ENDPOINT]: /api/v1/checkout/intent",
    "[CONTROLLER]: StripeGateway.js -> ValidateSession()",
    "[SECURITY_TOKEN]: Session_JWT (HttpOnly, SameSite=Strict)",
    "[MONGO_COLLECTION]: orders { user: ObjectId, total: Decimal128, paid: Boolean }",
  ],
  "queue-simulator": [
    "[CORE_RUNTIME]: Flask WSGI Server Context Engine",
    "[DB_ENGINE]: SQLite Layer -> Structured Relational Threading",
    "[PROCESSING_QUEUE]: FIFO Array Logic Handling Concurrency Matrix",
    "[CROSS_PLATFORM]: Capacitor bridge -> web + mobile shell",
  ],
  "car-auction": [
    "[ROUTING_ENDPOINT]: /auction/bids",
    "[CONTROLLER]: BidHandler.php -> ValidateOffer()",
    "[LEDGER_STATE]: transactional settlement + user ownership checks",
    "[MYSQL_TABLE]: bid_ledger { auction_id, bidder_id, amount, accepted }",
  ],
};

function scrollToHash(hash) {
  const target = document.querySelector(hash);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionHeading({ eyebrow, title, body }) {
  return (
    <div className="max-w-2xl">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl tracking-tight text-primary sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-muted sm:text-lg">{body}</p>
    </div>
  );
}

function RavenIcon() {
  return (
    <svg viewBox="0 0 72 40" className="h-8 w-14" aria-hidden="true">
      <path
        d="M10 22c7-10 17-16 30-15 7 0 13 3 20 8-5 1-9 3-11 7 3 1 6 3 9 6-8 0-14-2-20-5-5 3-12 5-20 6 2-2 4-4 5-7-6 1-10 1-13 0z"
        className="raven-fill"
      />
      <path d="M44 14l8-3-5 6" className="raven-stroke" />
      <circle cx="40" cy="15" r="1.2" className="raven-eye" />
    </svg>
  );
}

function MarqueeRaven() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-muted" aria-hidden="true">
      <path
        d="M3 13c3-5 8-8 13-7 2 0 4 1 5 2-2 .5-3 1.5-4 3 1 .4 2 .8 3 2-3 0-5.5-.6-8-2-2.5 1.2-5.5 2-9 2z"
        fill="currentColor"
      />
    </svg>
  );
}

function HeroCanvas({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext("2d");
    if (!context) return undefined;

    let animationFrame = 0;
    let pointer = { x: 0.5, y: 0.45, influence: 0 };

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const render = (time) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      const cx = width * 0.68;
      const cy = height * 0.42;
      const maxRadius = Math.min(width, height) * 0.38;
      pointer.influence += ((active ? 1 : 0) - pointer.influence) * 0.045;

      for (let ring = 0; ring < 18; ring += 1) {
        const radius = (maxRadius / 18) * (ring + 1);
        context.beginPath();

        for (let angle = 0; angle <= Math.PI * 2 + 0.12; angle += 0.12) {
          const wave =
            Math.sin(angle * 3 + time * 0.0018 + ring * 0.18) * 5 +
            Math.cos(angle * 5 + time * 0.0012) * 2.6;
          const pointerWarp =
            pointer.influence *
            Math.sin(angle * 2 + pointer.x * Math.PI * 2) *
            Math.cos(pointer.y * Math.PI + ring * 0.15) *
            12;
          const currentRadius = radius + wave + pointerWarp;
          const x = cx + Math.cos(angle) * currentRadius;
          const y = cy + Math.sin(angle) * currentRadius * 0.84;

          if (angle === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }

        context.strokeStyle = `rgba(154, 3, 30, ${0.025 + ring * 0.004})`;
        context.lineWidth = 1;
        context.stroke();
      }

      for (let spoke = 0; spoke < 16; spoke += 1) {
        const angle = (Math.PI * 2 * spoke) / 16 + time * 0.00012;
        const inner = 26;
        const outer = maxRadius * (0.88 + Math.sin(time * 0.001 + spoke) * 0.03);
        context.beginPath();
        context.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner * 0.84);
        context.lineTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer * 0.84);
        context.strokeStyle = "rgba(230, 57, 70, 0.03)";
        context.stroke();
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
    };

    resize();
    animationFrame = window.requestAnimationFrame(render);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}

function LiveDiagnostics() {
  const [ping, setPing] = useState(18);

  useEffect(() => {
    const tick = () => setPing(16 + Math.floor(Math.random() * 9));
    tick();
    const interval = window.setInterval(tick, 2400);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="diag-pill">
      <RavenIcon />
      <div className="diag-copy">
        <span>SHARINGAN_CORE: ACTIVE</span>
        <span className="diag-meta">PING: {ping}ms</span>
      </div>
    </div>
  );
}

function WaveStream() {
  return (
    <svg viewBox="0 0 220 48" className="wave-stream" aria-hidden="true">
      <Motion.path
        d="M0 24C20 24 20 12 40 12C60 12 60 36 80 36C100 36 100 16 120 16C140 16 140 30 160 30C180 30 180 20 200 20C210 20 215 24 220 24"
        className="wave-stream-line"
        animate={{ pathLength: [0.2, 1, 0.2], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function SchemaDiagram({ projectId }) {
  const schema = schemaMap[projectId];
  if (!schema) return null;

  return (
    <div className="schema-shell">
      <svg viewBox="0 0 100 88" className="h-full w-full" aria-hidden="true">
        {schema.links.map(([fromIndex, toIndex], index) => {
          const from = schema.nodes[fromIndex];
          const to = schema.nodes[toIndex];
          return (
            <line
              // eslint-disable-next-line react/no-array-index-key
              key={`${from.label}-${to.label}-${index}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              className="schema-line"
            />
          );
        })}
        {schema.nodes.map((node) => (
          <g key={node.label}>
            <rect x={node.x - 13} y={node.y - 7} width="26" height="14" rx="4" className="schema-node-box" />
            <text x={node.x} y={node.y + 1.5} textAnchor="middle" className="schema-node-label">
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function OrbitToggle({ open, onClick }) {
  return (
    <button type="button" className="orbit-toggle" onClick={onClick} aria-label="Toggle project schema">
      <span className={`orbit-core ${open ? "orbit-core-active" : ""}`} />
      <span className="orbit-dot orbit-dot-a" />
      <span className="orbit-dot orbit-dot-b" />
      <span className="orbit-dot orbit-dot-c" />
    </button>
  );
}

function RaceCanvas({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return undefined;
    const context = canvas.getContext("2d");
    if (!context) return undefined;

    let frame = 0;
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const render = (time) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);
      context.beginPath();

      for (let x = 0; x <= width; x += 8) {
        const y =
          height * 0.5 +
          Math.sin(x * 0.035 + time * 0.008) * 18 +
          Math.cos(x * 0.018 + time * 0.003) * 8;
        if (x === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }

      context.strokeStyle = "rgba(230, 57, 70, 0.9)";
      context.lineWidth = 1.5;
      context.stroke();

      context.beginPath();
      for (let x = 0; x <= width; x += 8) {
        const y =
          height * 0.5 +
          Math.sin(x * 0.028 + time * 0.009 + 1.4) * 12;
        if (x === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = "rgba(154, 3, 30, 0.55)";
      context.stroke();

      frame = window.requestAnimationFrame(render);
    };

    resize();
    frame = window.requestAnimationFrame(render);
    window.addEventListener("resize", resize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="sandbox-canvas" aria-hidden="true" />;
}

function App() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 24,
    mass: 0.2,
  });

  const env = useMemo(
    () => ({
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
    }),
    []
  );

  const heroTitleRef = useRef(null);
  const milestoneRefs = useRef([]);
  const projectsGridRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeHash, setActiveHash] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [schemaOpen, setSchemaOpen] = useState({});
  const [heroActive, setHeroActive] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState("");
  const [hoveredTag, setHoveredTag] = useState("");
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [activeField, setActiveField] = useState("");
  const [sendStage, setSendStage] = useState("[EXECUTE_HANDSHAKE]");
  const [trackIndex, setTrackIndex] = useState(0);
  const [isGenjutsuActive, setIsGenjutsuActive] = useState(false);
  const [showFeatherDrop, setShowFeatherDrop] = useState(false);
  const [interceptLog, setInterceptLog] = useState([]);
  const [sandboxMode, setSandboxMode] = useState("IDLE");
  const [sandboxLogs, setSandboxLogs] = useState([
    "[SANDBOX]: Awaiting test vector.",
  ]);
  const [sandboxPreview, setSandboxPreview] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const probe = window.scrollY + 180;
      for (let index = NAV_LINKS.length - 1; index >= 0; index -= 1) {
        const hash = NAV_LINKS[index].href;
        const element = document.querySelector(hash);
        if (element && probe >= element.offsetTop) {
          setActiveHash(hash);
          break;
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setTrackIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    milestoneRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = document.body;
    if (isGenjutsuActive) root.classList.add("genjutsu-active-matrix");
    else root.classList.remove("genjutsu-active-matrix");
    return () => root.classList.remove("genjutsu-active-matrix");
  }, [isGenjutsuActive]);

  useEffect(() => {
    const node = projectsGridRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.4 &&
            !sessionStorage.getItem("hasFired")
          ) {
            sessionStorage.setItem("hasFired", "true");
            document.body.classList.add("genjutsu-blur-snap");
            window.setTimeout(() => document.body.classList.remove("genjutsu-blur-snap"), 400);
            window.setTimeout(() => setShowFeatherDrop(true), 150);
            window.setTimeout(() => setIsGenjutsuActive(true), 400);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useGenjutsuEngine(isGenjutsuActive, setInterceptLog);

  useEffect(() => {
    if (!sending) {
      setSendStage("[EXECUTE_HANDSHAKE]");
      return undefined;
    }

    const stages = ["Routing payload...", "Invoking secure tunnel...", "Resolving handshake..."];
    let index = 0;
    setSendStage(stages[0]);
    const interval = window.setInterval(() => {
      index = (index + 1) % stages.length;
      setSendStage(stages[index]);
    }, 380);

    return () => window.clearInterval(interval);
  }, [sending]);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Your name helps identify the sender.";
    if (!form.email.trim()) next.email = "A valid email is required.";
    else if (!emailRegex.test(form.email.trim())) next.email = "Enter a valid email address.";
    if (!form.subject.trim()) next.subject = "A short route subject is required.";
    if (!form.message.trim()) next.message = "Add a few details about the project or role.";
    return next;
  };

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    if (!env.serviceId || !env.templateId || !env.publicKey) {
      setStatus({
        type: "error",
        message: "STATUS: MAIL_CHANNEL_UNAVAILABLE_",
      });
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
        { publicKey: env.publicKey }
      );

      setStatus({ type: "success", message: "STATUS: HANDSHAKE_SUCCESSFUL_" });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: "STATUS: HANDSHAKE_FAILED_",
      });
    } finally {
      setSending(false);
    }
  };

  const copyInstallCommand = async () => {
    try {
      await navigator.clipboard.writeText(NPM_PACKAGE.installCommand);
      setCopiedInstall(true);
      window.setTimeout(() => setCopiedInstall(false), 1300);
    } catch {
      setCopiedInstall(false);
    }
  };

  const releaseGenjutsu = () => {
    setIsGenjutsuActive(false);
    setShowFeatherDrop(false);
    setInterceptLog([]);
    document.body.classList.remove("genjutsu-blur-snap");
    document.body.classList.remove("genjutsu-active-matrix");
  };

  const runSandboxMode = (mode) => {
    setSandboxMode(mode);

    if (mode === "XSS_INJECTION") {
      setSandboxPreview("<script>alert('xss')</script>");
      setSandboxLogs([
        "[VECTOR]: Injecting <script>alert('xss')</script> into contact surface...",
        "[MIDDLEWARE_ALERT]: Script tags isolated. Input sanitized via strict backend regex matching. Payload securely neutralized.",
      ]);
      return;
    }

    if (mode === "SIMULATE_RACE_CON") {
      setSandboxPreview("");
      setSandboxLogs([
        "[RUNTIME]: Opening concurrent socket stream test...",
        "[SOCKET_STREAM]: Simulating 2,500 concurrent WebSocket packets... Processing via micro-batches... Event loop lag: 0.9ms // Status: Stable.",
      ]);
      return;
    }

    setSandboxPreview("");
    setSandboxLogs(["[SANDBOX]: Awaiting test vector."]);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className={`relative min-h-screen overflow-x-hidden bg-main text-primary ${isGenjutsuActive ? "genjutsu-active-matrix" : ""}`}>
        <Motion.div className="progress-bar" style={{ scaleX: progressScale }} />
        <AnimatePresence>{isLoading ? <LoadingScreen key="loader" /> : null}</AnimatePresence>
        <AnimatePresence>
          {showFeatherDrop ? (
            <Motion.div
              initial={{ opacity: 0, top: "20%", left: "45%", rotate: -18, scale: 0.85 }}
              animate={{ opacity: [0.2, 1, 0.15], top: "75%", left: "35%", rotate: 22, scale: 1.05 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.45, ease: [0.2, 0.8, 0.2, 1] }}
              className="genjutsu-feather-layer"
            >
              <span className="genjutsu-feather" />
            </Motion.div>
          ) : null}
        </AnimatePresence>

        <header className="fixed inset-x-0 top-0 z-50">
          <nav className="mx-auto mt-4 flex w-[min(1120px,calc(100%-1.5rem))] items-center justify-between rounded-full border border-white/5 bg-card px-4 py-3 backdrop-blur-xl sm:px-6">
            <a
              href="#home"
              className="brand-mark"
              onMouseEnter={() => setHeroActive(true)}
              onMouseLeave={() => setHeroActive(false)}
              onClick={(event) => {
                event.preventDefault();
                setActiveHash("#home");
                scrollToHash("#home");
              }}
            >
              <span className="brand-feather" />
              <span className={`brand-text ${heroActive ? "brand-text-active" : ""}`}>ZAIN</span>
            </a>

            <div className="hidden items-center gap-2 md:flex">
              {NAV_LINKS.map((link) => {
                const isActive = activeHash === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      setActiveHash(link.href);
                      scrollToHash(link.href);
                    }}
                    className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <div className="nav-core-shell">
                <p className="nav-core-title">TSUKUYOMI // CORE</p>
                <div className="nav-core-logs">
                  {interceptLog.length ? (
                    interceptLog.slice(-2).map((line, index) => (
                      <p key={`${line}-${index}`} className="nav-core-line">
                        {line}
                      </p>
                    ))
                  ) : (
                    <p className="nav-core-line nav-core-line-dim">[IDLE]: observer waiting...</p>
                  )}
                </div>
              </div>
              {AVAILABLE_FOR_WORK ? (
                <span className="status-pill">
                  <span className="status-dot" />
                  Open to work
                </span>
              ) : null}
            </div>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/5 bg-white/[0.02] md:hidden"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label="Toggle navigation"
            >
              <span className="flex flex-col gap-1.5">
                <span className="h-px w-5 bg-white" />
                <span className="h-px w-5 bg-white" />
              </span>
            </button>
          </nav>

          <AnimatePresence>
            {menuOpen ? (
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mx-auto mt-3 w-[min(1120px,calc(100%-1.5rem))] rounded-[28px] border border-white/5 bg-card p-4 backdrop-blur-xl md:hidden"
              >
                <div className="flex flex-col gap-2">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="rounded-2xl px-4 py-3 text-sm font-medium text-muted transition hover:bg-white/[0.03] hover:text-primary"
                      onClick={(event) => {
                        event.preventDefault();
                        setActiveHash(link.href);
                        setMenuOpen(false);
                        scrollToHash(link.href);
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </Motion.div>
            ) : null}
          </AnimatePresence>
        </header>

        <main>
          <section id="home" className="relative overflow-hidden pt-32 sm:pt-36">
            <HeroCanvas active={heroActive} />
            <div className="mx-auto grid w-[min(1120px,calc(100%-1.5rem))] gap-12 pb-24 pt-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <Motion.div variants={container} initial="hidden" animate="show" className="relative z-10">
                <Motion.p variants={item} className="section-eyebrow">
                  SYSTEM_INITIALIZATION
                </Motion.p>
                <Motion.h1
                  ref={heroTitleRef}
                  variants={item}
                  onMouseEnter={() => setHeroActive(true)}
                  onMouseLeave={() => setHeroActive(false)}
                  className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] tracking-tight text-primary sm:text-6xl lg:text-7xl"
                >
                  I build full-stack and cross-platform applications.
                </Motion.h1>
                <Motion.p
                  variants={item}
                  className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl"
                >
                  {PROFILE.tagline}
                </Motion.p>

                <Motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className="button-primary"
                    onClick={(event) => {
                      event.preventDefault();
                      setActiveHash("#projects");
                      scrollToHash("#projects");
                    }}
                  >
                    View Projects
                  </a>
                  <a href="/Zain_Ul_Abideen_CV.pdf" download className="button-secondary">
                    Download CV
                  </a>
                </Motion.div>

                <Motion.div variants={item} className="mt-10 grid gap-4 sm:grid-cols-3">
                  {HERO_METRICS.map((metric) => (
                    <div key={metric.label} className="glass-card rounded-[28px] p-5">
                      <div className="font-display text-2xl text-primary">{metric.value}</div>
                      <p className="mt-2 text-sm leading-6 text-muted">{metric.label}</p>
                    </div>
                  ))}
                </Motion.div>
              </Motion.div>

              <Motion.aside
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="relative z-10"
              >
                <div className="hero-panel">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-muted">ACTIVE_EXECUTION_MODULE</p>
                      <h2 className="mt-3 font-display text-3xl text-primary">{PROFILE.role}</h2>
                    </div>
                    <LiveDiagnostics />
                  </div>

                  <div className="mt-8 grid gap-4">
                    {HIGHLIGHTS.map((line, index) => (
                      <Motion.div
                        key={line}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.35 + index * 0.08, ease: "easeOut" }}
                        className="hero-module"
                      >
                        <p className="text-sm uppercase tracking-[0.18em] text-muted">Focus</p>
                        <p className="mt-2 text-base text-primary">{line}</p>
                        {line === "Real-time features" ? <WaveStream /> : null}
                      </Motion.div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-[24px] border border-white/5 bg-[#0b0b0e] p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
                      Current stack
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {TECH_STRIP_ITEMS.slice(0, 8).map((tech, index) => (
                        <Motion.span
                          key={tech}
                          className="stack-pill"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: 0.55 + index * 0.06, ease: "easeOut" }}
                        >
                          {tech}
                        </Motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </Motion.aside>
            </div>
          </section>

          <section className="border-y border-white/5 py-5">
            <div className="mx-auto w-[min(1120px,calc(100%-1.5rem))] overflow-hidden">
              <Motion.div
                className="tech-strip-track flex w-max items-center gap-6 whitespace-nowrap"
                animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
                transition={shouldReduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: "linear" }}
              >
                {[...TECH_STRIP_ITEMS, ...TECH_STRIP_ITEMS].map((tech, index) => (
                  <button
                    key={`${tech}-${index}`}
                    type="button"
                    className={`marquee-tag ${hoveredTag === `${tech}-${index}` ? "marquee-tag-hot" : ""}`}
                    onMouseEnter={() => setHoveredTag(`${tech}-${index}`)}
                    onMouseLeave={() => setHoveredTag("")}
                  >
                    <span>{tech}</span>
                    <MarqueeRaven />
                    {hoveredTag === `${tech}-${index}` ? (
                      <span className="feather-burst" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                        <span />
                      </span>
                    ) : null}
                  </button>
                ))}
              </Motion.div>
            </div>
          </section>

          <section id="projects" className="section-shell pt-20">
            <div className="mx-auto w-[min(1120px,calc(100%-1.5rem))]">
              <SectionHeading
                eyebrow="EXECUTABLE_CORE_MATRIX"
                title="Selected Projects"
                body="Projects built across web, backend, real-time systems, and cross-platform development."
              />

              <Motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={container}
                ref={projectsGridRef}
                className="mt-14 grid gap-6 lg:grid-cols-2"
              >
                {PROJECTS.map((project) => (
                  <Motion.article
                    key={project.id}
                    variants={item}
                    whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                    className="project-card"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-scarlet">{project.category}</p>
                        <h3 className="mt-3 font-display text-3xl text-primary">{project.title}</h3>
                      </div>
                      <OrbitToggle
                        open={Boolean(schemaOpen[project.id])}
                        onClick={() => setSchemaOpen((current) => ({ ...current, [project.id]: !current[project.id] }))}
                      />
                    </div>

                    <AnimatePresence mode="wait">
                      {isGenjutsuActive || schemaOpen[project.id] ? (
                        <Motion.div
                          key={`${project.id}-schema`}
                          initial={{ opacity: 0, filter: "blur(16px)", scale: 0.98 }}
                          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                          exit={{ opacity: 0, filter: "blur(12px)", scale: 0.98 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className="mt-6"
                        >
                          <SchemaDiagram projectId={project.id} />
                          <div className="mt-4 rounded-[18px] border border-[rgba(230,57,70,0.12)] bg-[rgba(255,255,255,0.015)] p-4">
                            {projectRouteMap[project.id]?.map((line) => (
                              <p key={line} className="schema-log-line">
                                {line}
                              </p>
                            ))}
                          </div>
                        </Motion.div>
                      ) : (
                        <Motion.div
                          key={`${project.id}-copy`}
                          initial={{ opacity: 0, filter: "blur(16px)", scale: 0.98 }}
                          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                          exit={{ opacity: 0, filter: "blur(12px)", scale: 0.98 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                        >
                          <p className="mt-5 text-base leading-8 text-muted">{project.description}</p>
                          <p className="mt-5 rounded-[22px] border border-white/5 bg-white/[0.02] p-4 text-sm leading-7 text-[#c5c5cb]">
                            {project.impact}
                          </p>
                        </Motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="tech-pill">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      {project.liveUrl ? (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="button-primary">
                          Open live project
                        </a>
                      ) : null}
                      <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="button-secondary">
                        View repository
                      </a>
                    </div>
                  </Motion.article>
                ))}
              </Motion.div>
            </div>
          </section>

          <section id="capabilities" className="section-shell pt-0">
            <div className="mx-auto w-[min(1120px,calc(100%-1.5rem))] grid gap-10 xl:grid-cols-[0.9fr_1.1fr]">
              <SectionHeading
                eyebrow="SYSTEM_SKILL_MATRIX"
                title="Technical Skills"
                body="Core stack across frontend, backend, deployment tooling, databases, and authentication."
              />

              <Motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={container}
                className="grid gap-5 sm:grid-cols-2"
              >
                {CAPABILITY_GROUPS.map((group, groupIndex) => (
                  <Motion.article
                    key={group.title}
                    variants={item}
                    className={`skill-card skill-card-${groupIndex + 1} ${groupIndex === 0 ? "sm:col-span-2" : ""}`}
                  >
                    <h3 className="font-display text-2xl text-primary">{group.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{group.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {group.items.map((skill) => {
                        const isDirect = hoveredSkill === skill;
                        const isRelated = hoveredSkill && relatedSkills[hoveredSkill]?.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            className={`tech-pill tech-pill-button ${isDirect ? "tech-pill-active" : ""} ${isRelated ? "tech-pill-related" : ""}`}
                            onMouseEnter={() => setHoveredSkill(skill)}
                            onMouseLeave={() => setHoveredSkill("")}
                          >
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </Motion.article>
                ))}
              </Motion.div>
            </div>
          </section>

          <section id="journey" className="section-shell pt-0">
            <div className="mx-auto w-[min(1120px,calc(100%-1.5rem))] grid gap-10 lg:grid-cols-[0.88fr_1.12fr]">
              <div>
                <SectionHeading
                  eyebrow="PATH_OF_SACRIFICE"
                  title="Experience and Background"
                  body="Computer Science student with internship experience and active product work across multiple parts of the stack."
                />

                <div className={`repo-card mt-8 ${copiedInstall ? "repo-card-copied" : ""}`}>
                  <div className="repo-header">
                    <div className="repo-dots">
                      <span className="repo-dot repo-dot-red" />
                      <span className="repo-dot repo-dot-yellow" />
                      <span className="repo-dot repo-dot-green" />
                    </div>
                    <span className="repo-title">open-source / {NPM_PACKAGE.name}</span>
                  </div>
                  <div className="repo-body">
                    <p className="font-display text-3xl text-primary">{NPM_PACKAGE.name}</p>
                    <p className="mt-4 text-base leading-8 text-muted">{NPM_PACKAGE.description}</p>
                    <div className="terminal-command mt-6">
                      <span className="terminal-prompt">$</span>
                      <span>{NPM_PACKAGE.installCommand}</span>
                      <button type="button" className="copy-button" onClick={copyInstallCommand}>
                        {copiedInstall ? "Copied" : "Copy"}
                      </button>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a href={NPM_PACKAGE.npmUrl} target="_blank" rel="noopener noreferrer" className="button-primary">
                        View on npm
                      </a>
                      <a href={NPM_PACKAGE.githubUrl} target="_blank" rel="noopener noreferrer" className="button-secondary">
                        Repository
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="experience-track-shell">
                <div className="experience-track-line" />
                <Motion.div
                  className="track-feather"
                  animate={{ top: `${trackIndex * 31.5 + 1}%` }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <span className="track-feather-mark" />
                </Motion.div>

                <div className="grid gap-5">
                  {EXPERIENCE_TIMELINE.map((step, index) => (
                    <Motion.article
                      key={step.title}
                      ref={(element) => {
                        milestoneRefs.current[index] = element;
                      }}
                      data-index={index}
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
                      className="timeline-card"
                    >
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-scarlet">{step.label}</p>
                        <h3 className="mt-2 font-display text-2xl text-primary">{step.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-muted">{step.description}</p>
                      </div>
                    </Motion.article>
                  ))}

                </div>
              </div>
            </div>
            <div className="mx-auto mt-6 w-[min(1120px,calc(100%-1.5rem))]">
              <div className="glass-card rounded-[30px] p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-scarlet">What I Bring</p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {WHAT_I_BRING.map((point) => (
                    <div key={point} className="flex gap-3 text-sm leading-7 text-muted">
                      <span className="mt-2 h-2 w-2 rounded-full bg-scarlet" />
                      <p>{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="section-shell pt-0">
            <div className="mx-auto w-[min(1120px,calc(100%-1.5rem))]">
              <div className="sandbox-shell">
                <div className="sandbox-header">
                  <div>
                    <p className="section-eyebrow">CHUNIN_EXAM_MODULE</p>
                    <h2 className="mt-3 font-display text-3xl tracking-tight text-primary">
                      Secure AppSec & Reverse Engineering Sandbox
                    </h2>
                  </div>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
                  <div className={`sandbox-terminal ${sandboxMode === "XSS_INJECTION" ? "sandbox-terminal-alert" : ""}`}>
                    <p className="sandbox-prompt">guest@zain:~$ sandbox_test_vector</p>
                    <div className="sandbox-controls mt-4">
                      {["IDLE", "XSS_INJECTION", "SIMULATE_RACE_CON"].map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => runSandboxMode(mode)}
                          className={`sandbox-chip ${sandboxMode === mode ? "sandbox-chip-active" : ""}`}
                        >
                          [{mode}]
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 rounded-[16px] border border-white/5 bg-[rgba(255,255,255,0.015)] p-4 font-mono text-sm text-muted">
                      {sandboxPreview || "No payload injected. Select a vector to begin."}
                    </div>
                    {sandboxMode === "SIMULATE_RACE_CON" ? <RaceCanvas active /> : null}
                  </div>

                  <div className="sandbox-console">
                    {sandboxLogs.map((line) => (
                      <p key={line} className="sandbox-log-line">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="section-shell pt-0">
            <div className="mx-auto w-[min(960px,calc(100%-1.5rem))]">
              <div className="mb-10 text-center">
                <p className="section-eyebrow">SECURE_HANDSHAKE</p>
                <h2 className="mt-4 font-display text-3xl tracking-tight text-primary sm:text-4xl lg:text-5xl">
                  Contact Interface
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                  If you want to discuss a role, internship, freelance work, or a project, route a secure message below.
                </p>
              </div>

              <Motion.form
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                onSubmit={onSubmit}
                className={`contact-terminal ${sending ? "contact-terminal-sending" : ""} ${status?.type === "success" ? "contact-terminal-success" : ""}`}
              >
                <div className="terminal-log">
                  <span>secure-contact@zain</span>
                  <span>{sending ? sendStage : "Awaiting payload..."}</span>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <label className="form-field terminal-field">
                    <span>Name</span>
                    <input
                      className={activeField === "name" ? "terminal-input-active" : ""}
                      placeholder={terminalPlaceholders.name}
                      value={form.name}
                      onFocus={() => setActiveField("name")}
                      onBlur={() => setActiveField("")}
                      onChange={(event) => setField("name", event.target.value)}
                    />
                    {errors.name ? <small>{errors.name}</small> : null}
                  </label>
                  <label className="form-field terminal-field">
                    <span>Email</span>
                    <input
                      className={activeField === "email" ? "terminal-input-active" : ""}
                      placeholder={terminalPlaceholders.email}
                      value={form.email}
                      onFocus={() => setActiveField("email")}
                      onBlur={() => setActiveField("")}
                      onChange={(event) => setField("email", event.target.value)}
                    />
                    {errors.email ? <small>{errors.email}</small> : null}
                  </label>
                </div>

                <label className="form-field terminal-field mt-5">
                  <span>Subject</span>
                  <input
                    className={activeField === "subject" ? "terminal-input-active" : ""}
                    placeholder={terminalPlaceholders.subject}
                    value={form.subject}
                    onFocus={() => setActiveField("subject")}
                    onBlur={() => setActiveField("")}
                    onChange={(event) => setField("subject", event.target.value)}
                  />
                  {errors.subject ? <small>{errors.subject}</small> : null}
                </label>

                <label className="form-field terminal-field mt-5">
                  <span>Message</span>
                  <textarea
                    rows={6}
                    className={activeField === "message" ? "terminal-input-active" : ""}
                    placeholder={terminalPlaceholders.message}
                    value={form.message}
                    onFocus={() => setActiveField("message")}
                    onBlur={() => setActiveField("")}
                    onChange={(event) => setField("message", event.target.value)}
                  />
                  {errors.message ? <small>{errors.message}</small> : null}
                </label>

                {status ? (
                  <div className={`status-box mt-6 ${status.type === "success" ? "status-ok" : "status-error"}`}>
                    {status.message}
                  </div>
                ) : null}

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-sm leading-7 text-muted">
                    Open to internships, junior roles, freelance work, and collaborations.
                  </p>
                  <button type="submit" className="button-primary" disabled={sending}>
                    {sending ? sendStage : "[EXECUTE_HANDSHAKE]"}
                  </button>
                </div>
              </Motion.form>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/5 py-8">
          <div className="mx-auto flex w-[min(1120px,calc(100%-1.5rem))] flex-col gap-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
            <p>© 2026 {PROFILE.name}</p>
            <div className="flex flex-wrap gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-primary"
                  onClick={(event) => {
                    event.preventDefault();
                    setActiveHash(link.href);
                    scrollToHash(link.href);
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </footer>

        {isGenjutsuActive ? (
          <button type="button" className="genjutsu-release" onClick={releaseGenjutsu}>
            [ 解 // RELEASE ]
          </button>
        ) : null}
      </div>
    </MotionConfig>
  );
}

export default App;
