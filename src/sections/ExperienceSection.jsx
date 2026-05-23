import React from "react";
import { motion } from "framer-motion";

const ExperienceSection = () => {
  const experiences = [
    {
      type: "💼",
      typeLabel: "Software Engineering Intern",
      title: "Web Developer & Venture Development Intern",
      organization: "TEKNEFY",
      period: "July 2025 - Sept 2025",
      location: "Islamabad, Pakistan",
      isExpected: true,
      description: [
        "Architecting backend solutions and implementing responsive frontend components.",
        "Collaborating in agile environments, translating business needs into technical specifications.",
        "Focusing on scalable system design and optimized data workflows.",
      ],
    },
    {
      type: "🎓",
      typeLabel: "Education",
      title: "Bachelor of Applied Science in Computer Science",
      organization: "PAK-AUSTRIA FACHHOCHSCHULE (PAF-IAST)",
      period: "2024 - 2028",
      location: "Haripur, Pakistan",
      description: [
        "Specializing in data structures, algorithms, and software engineering principles.",
        "Demonstrating practical application through complex database design projects.",
        "Maintaining a strong focus on secure, robust full-stack development methodologies.",
      ],
    },
    {
      type: "💻",
      typeLabel: "Freelance",
      title: "Full-Stack Web Developer",
      organization: "Independent",
      period: "2023 - Present",
      location: "Remote",
      description: [
        "Architected an end-to-end Car Auction System with real-time bidding logic.",
        "Developed Enterprise Business Management frameworks optimizing daily operational workflows.",
        "Implemented secure authentication, RBAC, and normalized relational REST APIs.",
      ],
    },
  ];

  return (
    <section id="experience" className="section-block relative">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-3 mb-4 text-primary font-mono text-sm">
            <span className="w-8 h-px bg-primary"></span>
            <span>03. Career Path</span>
            <span className="w-8 h-px bg-primary"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white">
            Experience & Education
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            A solid foundation in theoretical computer science combined with practical, production-oriented professional experience.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  {/* Dot */}
                  <div className={`absolute left-4 md:left-1/2 w-3 h-3 rounded-full transform -translate-x-1/2 z-10 ring-4 ring-background ${exp.isExpected ? "bg-amber-400" : "bg-primary"
                    }`}></div>

                  {/* Card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0
                        ? "md:mr-auto md:pr-8"
                        : "md:ml-auto md:pl-8"
                      }`}
                  >
                    <div className="card-surface p-6 hover:border-primary/30 transition-colors">
                      {/* Type badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl">{exp.type}</span>
                        <span className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded border ${exp.isExpected
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-primary/10 text-primary border-primary/20"
                          }`}>
                          {exp.typeLabel}
                        </span>
                        {exp.isExpected && (
                          <span className="px-2 py-1 bg-surface-hover border border-border text-muted text-[10px] font-mono uppercase tracking-wider rounded">
                            Upcoming
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-1 font-display">
                        {exp.title}
                      </h3>

                      {/* Organization */}
                      <p className="text-primary text-sm font-semibold mb-3">
                        {exp.organization}
                      </p>

                      {/* Period & Location */}
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted font-mono mb-6">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2 2 2V7a0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          {exp.period}
                        </span>
                        {exp.location && (
                          <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {exp.location}
                          </span>
                        )}
                      </div>

                      {/* Description bullets */}
                      <ul className="space-y-2.5">
                        {exp.description.map((desc, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary leading-relaxed">
                            <span className="text-primary text-xs mt-1">▹</span>
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
