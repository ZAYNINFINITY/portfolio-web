import React from "react";
import { motion } from "framer-motion";

const DevOpsStrip = () => {
  const badges = [
    {
      name: "Docker",
      icon: "🐳",
      color: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-500/30",
    },
    {
      name: "AWS EC2",
      icon: "☁️",
      color: "from-orange-500/20 to-orange-600/20",
      borderColor: "border-orange-500/30",
    },
    {
      name: "Vercel",
      icon: "⚡",
      color: "from-gray-500/20 to-gray-600/20",
      borderColor: "border-gray-500/30",
    },
    {
      name: "GitHub Actions",
      icon: "🤖",
      color: "from-purple-500/20 to-purple-600/20",
      borderColor: "border-purple-500/30",
    },
    {
      name: "NPM Published",
      icon: "📦",
      color: "from-red-500/20 to-red-600/20",
      borderColor: "border-red-500/30",
    },
  ];

  return (
    <section className="py-6 border-y border-white/10 bg-gradient-to-r from-black via-black/50 to-black">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-3"
        >
          {badges.map((badge, idx) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.1 }}
              className={`px-4 py-2 rounded-full border ${badge.borderColor} bg-gradient-to-br ${badge.color} text-white text-sm font-medium flex items-center gap-2 cursor-pointer transition-all duration-300`}
            >
              <span>{badge.icon}</span>
              <span>{badge.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DevOpsStrip;
