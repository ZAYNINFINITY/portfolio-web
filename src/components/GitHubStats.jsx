import { motion } from "framer-motion";
import { GITHUB_USERNAME } from "../constants/index";

export default function GitHubStats() {
  const urls = [
    `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&hide_border=true&title_color=ffffff&text_color=9ca3af&icon_color=6366f1`,
    `https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=transparent&hide_border=true&ring=6366f1&fire=f59e0b&currStreakLabel=ffffff`,
    `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&hide_border=true&title_color=ffffff&text_color=9ca3af`,
  ];

  return (
    <section className="bg-[#0f0f1a] py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-[#f1f1f3] md:text-4xl">
              I ship code, not slides.
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            {urls.map((src) => (
              <img
                key={src}
                src={src}
                alt="GitHub stats card"
                loading="lazy"
                width="495"
                height="195"
                className="max-w-full rounded-[16px] border border-white/[0.06] bg-[#13131f]"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
