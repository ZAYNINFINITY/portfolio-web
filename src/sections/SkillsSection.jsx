import React from "react";
import { motion } from "framer-motion";

const skillGroups = [
  {
    category: "Frontend",
    color: "from-blue-500 to-blue-600",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-500/10",
    skills: ["React", "Tailwind CSS", "Framer Motion", "JavaScript ES6+", "HTML5", "CSS3"]
  },
  {
    category: "Backend",
    color: "from-green-500 to-green-600",
    borderColor: "border-green-500/30",
    bgColor: "bg-green-500/10",
    skills: ["Node.js", "Express", "PHP", "Python", "REST APIs", "WebSockets"]
  },
  {
    category: "Database",
    color: "from-purple-500 to-purple-600",
    borderColor: "border-purple-500/30",
    bgColor: "bg-purple-500/10",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Query Optimization", "Schema Design"]
  },
  {
    category: "DevOps & Deployment",
    color: "from-orange-500 to-orange-600",
    borderColor: "border-orange-500/30",
    bgColor: "bg-orange-500/10",
    skills: ["Docker", "Vercel", "GitHub Actions", "Git", "CI/CD", "AWS EC2"]
  },
  {
    category: "AI & ML Adjacent",
    color: "from-pink-500 to-pink-600",
    borderColor: "border-pink-500/30",
    bgColor: "bg-pink-500/10",
    skills: ["LangChain", "OpenAI API", "Prompt Engineering", "Vector DBs", "JSON Validation", "API Integration"]
  }
];

const SkillsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="skills" className="section-block">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-3 mb-4 text-primary font-mono text-sm">
            <span className="w-8 h-px bg-primary"></span>
            <span>03. Technical Skills</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">
            Technologies & <span className="text-secondary">Proficiency</span>
          </h2>
          <p className="text-muted text-lg">
            Organized by domain — from frontend interactivity to backend architecture and DevOps practices.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.category}
              variants={cardVariants}
              className={`relative rounded-2xl p-8 border ${group.borderColor} ${group.bgColor} overflow-hidden group hover:border-opacity-100 transition-all duration-300`}
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${group.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

              {/* Category Label */}
              <div className="mb-6">
                <h3 className={`text-xl font-display font-bold text-white mb-2`}>
                  {group.category}
                </h3>
                <div className={`w-12 h-1 rounded-full bg-gradient-to-r ${group.color}`}></div>
              </div>

              {/* Skills Pills */}
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, idx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className={`px-4 py-2 rounded-full text-sm font-medium text-white/80 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-200`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Proficiency indicator */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-xs text-white/60">
                  {group.category === "Frontend" && "🔥 Primary Focus"}
                  {group.category === "Backend" && "🔥 Primary Focus"}
                  {group.category === "Database" && "Senior Level"}
                  {group.category === "DevOps & Deployment" && "Intermediate • Growing"}
                  {group.category === "AI & ML Adjacent" && "Learning • Actively Exploring"}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Learning Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-white/60 text-sm">
            <span className="inline-block mr-2">📚</span>
            Always learning • Experimenting with new technologies weekly • Open to challenging projects
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
