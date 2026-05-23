import { motion } from "framer-motion";
import { EXPERIENCE_TIMELINE, WHAT_I_BRING } from "../constants/index";

export default function Experience() {
  return (
    <section className="bg-[#0a0a0f] py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-[#f1f1f3] md:text-4xl">
              The Journey
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-6">
              {EXPERIENCE_TIMELINE.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.05 }}
                  viewport={{ once: true, margin: "-80px" }}
                  className="relative rounded-[16px] border border-white/[0.06] bg-[#13131f] p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-[#6366f1]/30 bg-[#6366f1]/10 text-sm font-semibold text-[#6366f1]">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-mono text-xs text-[#7c7c8a]">{item.label}</div>
                      <div className="mt-1 text-base font-semibold text-[#f1f1f3]">
                        {item.title}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[#7c7c8a]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="rounded-[16px] border border-white/[0.06] bg-[#13131f] p-6">
              <div className="mb-5 text-base font-semibold text-[#f1f1f3]">
                What I Bring to a Team
              </div>
              <ul className="space-y-3">
                {WHAT_I_BRING.map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-[#7c7c8a]">
                    <span className="mt-[2px] text-[#6366f1]">✓</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
