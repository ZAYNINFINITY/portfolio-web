import React from "react";
import { motion } from "framer-motion";
import { scrollToSection } from "../utils/scrollHelper";
import { AVAILABLE_FOR_WORK } from "../constants";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-20 relative overflow-hidden"
    >
      {/* Background Architectural Grid & Glow */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 pointer-events-none"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl">
          {/* Open to Work Badge */}
          {AVAILABLE_FOR_WORK && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Open to full-time & internship roles</span>
            </motion.div>
          )}

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-4 tracking-tight text-white"
          >
            Zain Ul Abideen
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl font-semibold text-primary mb-6 max-w-2xl"
          >
            Full Stack Developer crafting production-ready apps with React, Node.js & AI integrations
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-muted mb-8 max-w-xl leading-relaxed"
          >
            I design and develop production-ready web applications with a focus on relational database architecture, secure APIs, and reliable execution. Passionate about solving complex logic problems and delivering measurable business value.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="btn-primary"
            >
              View My Work
            </button>
            <a
              href="/resume.pdf"
              download="Zain_Resume.pdf"
              className="btn-secondary"
            >
              Download CV
            </a>
          </motion.div>

          {/* Stats as glass cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-border"
          >
            <div className="px-6 py-4 bg-surface/50 backdrop-blur-md border border-border rounded-xl">
              <p className="text-lg font-display font-semibold text-white">
                End-to-End Delivery
              </p>
              <p className="text-sm text-muted font-mono mt-1">From DB Schema to Deployment</p>
            </div>
            <div className="px-6 py-4 bg-surface/50 backdrop-blur-md border border-border rounded-xl">
              <p className="text-lg font-display font-semibold text-white">
                Secure Architecture
              </p>
              <p className="text-sm text-muted font-mono mt-1">RBAC & Data Integrity</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float"
      >
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center gap-2 text-muted hover:text-white transition-colors"
        >
          <span className="text-xs uppercase font-mono tracking-widest">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
