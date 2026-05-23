import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      message: "",
    });

    try {
      const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS is not configured. Please set up your environment variables (.env file) with VITE_APP_EMAILJS_SERVICE_ID, VITE_APP_EMAILJS_TEMPLATE_ID, and VITE_APP_EMAILJS_PUBLIC_KEY from https://dashboard.emailjs.com/");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          name: formData.name,
          email: formData.email,
        },
        { publicKey }
      );

      setFormStatus({
        isSubmitting: false,
        isSuccess: true,
        isError: false,
        message: "Thank you for your message! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });

      // Auto-dismiss success message after 5 seconds
      setTimeout(() => {
        setFormStatus((prev) => ({
          ...prev,
          isSuccess: false,
        }));
      }, 5000);
    } catch (error) {
      console.error("ContactSection Error:", error);
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: error.message || "Failed to send message. Please try again or contact via email.",
      });

      // Auto-dismiss error message after 5 seconds
      setTimeout(() => {
        setFormStatus((prev) => ({
          ...prev,
          isError: false,
        }));
      }, 5000);
    }
  };

  return (
    <section id="contact" className="section-block bg-slate-900/50">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle mx-auto">
            Have a project in mind or want to collaborate? Let's talk!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-surface p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <motion.div layout>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Your Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-4 py-3 bg-slate-800 border ${
                    errors.name ? "border-red-500" : "border-slate-700"
                  } rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors`}
                  placeholder="John Doe"
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-red-400 text-sm mt-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email Field */}
              <motion.div layout>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Email Address
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-4 py-3 bg-slate-800 border ${
                    errors.email ? "border-red-500" : "border-slate-700"
                  } rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors`}
                  placeholder="john@example.com"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-red-400 text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Message Field */}
              <motion.div layout>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Your Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-4 py-3 bg-slate-800 border ${
                    errors.message ? "border-red-500" : "border-slate-700"
                  } rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none`}
                  placeholder="Tell me about your project..."
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-red-400 text-sm mt-1"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={formStatus.isSubmitting}
                whileHover={{ scale: formStatus.isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  formStatus.isSubmitting
                    ? "bg-slate-600 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-400 hover:-translate-y-0.5"
                }`}
                style={{
                  boxShadow: formStatus.isSubmitting ? "none" : "0 10px 30px rgba(59, 130, 246, 0.3)"
                }}
              >
                {formStatus.isSubmitting && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                )}
                <span>{formStatus.isSubmitting ? "Sending..." : "Send Message"}</span>
              </motion.button>

              {/* Success Message */}
              <AnimatePresence>
                {formStatus.isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start gap-3"
                  >
                    <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-emerald-400 text-sm">{formStatus.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {formStatus.isError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3"
                  >
                    <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-400 text-sm">{formStatus.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Direct Contact Cards */}
            <div className="card-surface p-8">
              <h3 className="text-xl font-semibold text-white mb-6">
                Let's Connect
              </h3>
              <p className="text-slate-400 mb-6">
                Prefer to reach out directly? Here's how you can contact me:
              </p>

              <div className="space-y-4">
                {/* Email */}
                <motion.a
                  href="mailto:zaynbu269@gmail.com"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500/30 transition-colors group"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                      zaynbu269@gmail.com
                    </p>
                  </div>
                </motion.a>

                {/* GitHub */}
                <motion.a
                  href="https://github.com/ZAYNINFINITY"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500/30 transition-colors group"
                >
                  <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">GitHub</p>
                    <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                      @ZAYNINFINITY
                    </p>
                  </div>
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  href="https://www.linkedin.com/in/zain-ul-abideen-429735231/"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500/30 transition-colors group"
                >
                  <div className="w-12 h-12 bg-blue-700/20 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">LinkedIn</p>
                    <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                      Zain Ul Abideen
                    </p>
                  </div>
                </motion.a>
              </div>
            </div>

            {/* Availability Note */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="card-surface p-6"
            >
              <div className="flex items-center gap-3">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-emerald-400 rounded-full"
                ></motion.span>
                <p className="text-slate-300 font-medium">
                  Available for opportunities
                </p>
              </div>
              <p className="text-slate-500 text-sm mt-2">
                I'm currently looking for internship or entry-level opportunities in web development.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
