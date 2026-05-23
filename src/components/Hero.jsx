import { useMemo, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  AVAILABLE_FOR_WORK,
  HERO_CODE_SNIPPET,
  NPM_PACKAGE,
  PROFILE,
} from "../constants/index";

const splitWords = (text) => text.split(" ").filter(Boolean);

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const rotateXSpring = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const glossX = useTransform(mouseX, [-0.5, 0.5], ["60%", "40%"]);
  const glossY = useTransform(mouseY, [-0.5, 0.5], ["60%", "40%"]);

  const heading = "Building things that actually work.";
  const words = useMemo(() => splitWords(heading), [heading]);

  const onMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="home" className="relative overflow-hidden bg-[#0a0a0f] pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-dot-grid" />

      <div className="mx-auto grid max-w-5xl items-center gap-12 px-4 md:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
          className="md:col-span-3"
        >
          {AVAILABLE_FOR_WORK && (
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Available for opportunities
            </div>
          )}

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#f1f1f3] md:text-[56px] md:leading-[1.05]">
            {words.map((w, idx) => (
              <motion.span
                // eslint-disable-next-line react/no-array-index-key
                key={`${w}-${idx}`}
                className="inline-block"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.06 }}
                viewport={{ once: true, margin: "-80px" }}
              >
                {w}&nbsp;
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, margin: "-80px" }}
            className="mt-5 text-[18px] text-[#7c7c8a]"
          >
            Full Stack Developer{" "}
            <span className="text-[#6366f1]">·</span> Hardware Tinkerer{" "}
            <span className="text-[#6366f1]">·</span> Problem Solver
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true, margin: "-80px" }}
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#5a5a6e]"
          >
            I build and deploy web apps, ship open-source tools, and understand the hardware they
            run on.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true, margin: "-80px" }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-[10px] bg-[#6366f1] px-5 py-3 text-sm font-semibold text-white hover:bg-[#5457e8] transition-colors"
            >
              See My Work
            </a>
            <a
              href="/resume.pdf"
              download="ZainUlAbideen_Resume.pdf"
              className="rounded-[10px] border border-[#6366f1]/50 px-5 py-3 text-sm font-semibold text-[#6366f1] hover:bg-[#6366f1]/10 transition-colors"
            >
              Download CV
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            viewport={{ once: true, margin: "-80px" }}
            className="mt-8 flex items-center gap-6 text-sm"
          >
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7c7c8a] hover:text-[#f1f1f3] transition-colors"
            >
              GitHub
            </a>
            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7c7c8a] hover:text-[#f1f1f3] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-[#7c7c8a] hover:text-[#f1f1f3] transition-colors"
            >
              Email
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, margin: "-80px" }}
          className="md:col-span-2"
        >
          <motion.div
            ref={cardRef}
            onMouseMove={shouldReduceMotion ? undefined : onMouseMove}
            onMouseLeave={shouldReduceMotion ? undefined : onMouseLeave}
            className="relative mx-auto h-[360px] w-[280px] rounded-[20px] border border-[#6366f1]/30 bg-[linear-gradient(135deg,#13131f,#1a1a2e)] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
            style={
              shouldReduceMotion
                ? undefined
                : {
                    rotateX: rotateXSpring,
                    rotateY: rotateYSpring,
                    transformPerspective: 1000,
                  }
            }
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -10, 0],
                  }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          >
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[20px]"
              style={
                shouldReduceMotion
                  ? { opacity: 0.08 }
                  : {
                      background:
                        "radial-gradient(650px circle at var(--x) var(--y), rgba(255,255,255,0.16), transparent 45%)",
                      opacity: 0.08,
                      "--x": glossX,
                      "--y": glossY,
                    }
              }
            />

            <div className="relative space-y-4">
              <div className="rounded-[14px] border border-white/[0.06] bg-[#0f0f1a] p-4 font-mono text-[13px] leading-relaxed text-[#a0a0b0]">
                {HERO_CODE_SNIPPET.map((line, idx) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={idx} className="whitespace-pre">
                    <span className="text-[#3d3d4f]">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="pl-3">
                      <span className="text-[#6366f1]">{line}</span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between rounded-[12px] border border-white/[0.06] bg-white/[0.02] px-3 py-2 font-mono text-xs text-[#f1f1f3]">
                <span className="text-[#7c7c8a]">npm</span>
                <span>{NPM_PACKAGE.name}</span>
                <span className="text-[#7c7c8a]">v{NPM_PACKAGE.version}</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {["React", "Node", "Python", "MongoDB", "Electron"].map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 font-mono text-[12px] text-[#a0a0b0]"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
