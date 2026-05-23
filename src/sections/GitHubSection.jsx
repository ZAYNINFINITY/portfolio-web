import React from "react";
import { motion } from "framer-motion";

const GitHubSection = () => {
  return (
    <section className="section-block">
      <div className="container max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4 text-primary font-mono text-sm">
            <span className="w-8 h-px bg-primary"></span>
            <span>04. GitHub Activity</span>
            <span className="w-8 h-px bg-primary"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white">
            Consistent <span className="text-secondary">Builder</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Open source contributions, code consistency, and daily development streaks.
          </p>
        </motion.div>

        {/* GitHub Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* GitHub Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <img
              src="https://github-readme-stats.vercel.app/api?username=ZAYNINFINITY&show_icons=true&theme=transparent&hide_border=true&title_color=ffffff&text_color=9ca3af&icon_color=6366f1&card_width=400"
              alt="Zain's GitHub Stats"
              className="w-full h-auto"
              loading="lazy"
            />
          </motion.div>

          {/* GitHub Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <img
              src="https://github-readme-streak-stats.herokuapp.com/?user=ZAYNINFINITY&theme=transparent&hide_border=true&stroke=6366f1&ring=6366f1&fire=f59e0b&currStreakLabel=ffffff&sideLabels=9ca3af&dates=6b7280"
              alt="GitHub Streak"
              className="w-full h-auto"
              loading="lazy"
            />
          </motion.div>

          {/* Top Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=ZAYNINFINITY&layout=compact&theme=transparent&hide_border=true&title_color=ffffff&text_color=9ca3af&langs_count=6"
              alt="Top Languages"
              className="w-full h-auto"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/ZAYNINFINITY"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View Full GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubSection;
