import { motion } from "framer-motion";

const STATS = [
  { top: "5+", main: "Projects", sub: "Shipped & Live" },
  { top: "1", main: "NPM Package", sub: "Open Source" },
  { top: "Hardware +", main: "Software Stack", sub: "Full context" },
  { top: "Dev + IT", main: "Open to Both", sub: "Roles & support" },
];

export default function About() {
  return (
    <section id="about" className="bg-[#0a0a0f] py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-12 md:grid-cols-2"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-[#f1f1f3] md:text-4xl">
              Not just a developer.
            </h2>

            <div className="space-y-5 text-[15px] leading-relaxed text-[#7c7c8a]">
              <p>
                I build full-stack web apps and desktop tools with React, Node.js, Python, and
                Electron — from database to deployed product. I've shipped open-source packages and
                run apps on Vercel, Netlify, and Railway.
              </p>
              <p>
                Before I wrote code, I was taking apart hardware. Custom ROMs, bootloader unlocks,
                dead board diagnostics, device modding — that's where I started. It gave me a
                mental model most devs don't have: I understand the machine, not just the
                framework.
              </p>
              <p>
                Give me a problem — broken codebase, broken laptop, or a product that needs
                building from scratch. I'll figure it out.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {STATS.map((s) => (
              <motion.div
                key={s.main}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                viewport={{ once: true, margin: "-80px" }}
                className="rounded-[16px] border border-white/[0.06] bg-[#13131f] p-5"
              >
                <div className="border-l-2 border-[#6366f1] pl-4">
                  <div className="text-2xl font-bold text-[#f1f1f3]">{s.top}</div>
                  <div className="mt-1 text-sm font-semibold text-[#f1f1f3]">{s.main}</div>
                  <div className="mt-1 text-sm text-[#7c7c8a]">{s.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
