import { motion } from "framer-motion";
import { PROJECTS } from "../constants/index";

export default function Projects() {
  return (
    <section id="projects" className="bg-[#0f0f1a] py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-[#f1f1f3] md:text-4xl">
              Things I've Built
            </h2>
            <p className="mt-3 text-[#7c7c8a]">Real projects. Deployed. Working.</p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {PROJECTS.map((p) => (
              <motion.article
                key={p.id}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
                }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-white/[0.06] bg-[#13131f]"
              >
                <div className="h-40 w-full border-b border-white/[0.06] bg-dot-grid" aria-hidden="true" />

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[18px] font-semibold text-[#f1f1f3]">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#7c7c8a]">
                    {p.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[#6366f1]/30 bg-[#6366f1]/10 px-3 py-1 font-mono text-[11px] text-[#c7c8ff]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <a
                      href={p.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[#7c7c8a] hover:text-[#f1f1f3] transition-colors"
                    >
                      View Code
                    </a>
                    {p.liveUrl ? (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-[#f1f1f3] hover:text-[#6366f1] transition-colors"
                      >
                        Live Demo →
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
