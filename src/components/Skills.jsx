import { motion } from "framer-motion";
import { SKILL_GROUPS } from "../constants/index";

export default function Skills() {
  return (
    <section id="skills" className="bg-[#0f0f1a] py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-[#f1f1f3] md:text-4xl">
              What I Work With
            </h2>
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
            {SKILL_GROUPS.map((group) => (
              <motion.div
                key={group.title}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
                }}
                className="rounded-[16px] border border-white/[0.06] bg-[#13131f] p-5"
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#6366f1]" />
                  <h3 className="text-base font-semibold text-[#f1f1f3]">{group.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white/[0.04] border border-white/[0.08] px-3 py-1 font-mono text-[12px] text-[#a0a0b0]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
