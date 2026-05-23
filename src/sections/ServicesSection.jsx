import React from "react";

const ServicesSection = () => {
  const services = [
    {
      title: "Web Development",
      description:
        "Custom websites and web applications built with modern technologies like PHP, MySQL, and JavaScript.",
      icon: "💻",
      features: [
        "Custom Web Applications",
        "CMS Development",
        "E-commerce Solutions",
        "API Integration",
      ],
    },
    {
      title: "Backend Development",
      description:
        "Robust server-side solutions with database design, API development, and system architecture.",
      icon: "⚙️",
      features: [
        "Database Design",
        "RESTful APIs",
        "Authentication Systems",
        "Server Configuration",
      ],
    },
    {
      title: "Frontend Development",
      description:
        "Responsive and interactive user interfaces that provide seamless user experiences.",
      icon: "🎨",
      features: [
        "Responsive Design",
        "UI/UX Implementation",
        "Interactive Features",
        "Performance Optimization",
      ],
    },
    {
      title: "Technical Consulting",
      description:
        "Expert advice on technology stack selection, architecture design, and best practices.",
      icon: "📊",
      features: [
        "Tech Stack Advice",
        "Code Review",
        "Performance Audit",
        "Best Practices",
      ],
    },
  ];

  return (
    <section id="services" className="section-block">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-semibold tracking-wider uppercase text-sm">
            What I Offer
          </span>
          <h2 className="section-title text-center mt-2">Services</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            I offer a range of web development services tailored to bring your
            ideas to life with clean, efficient code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-surface p-8 hover:border-cyan-500/50 transition-all duration-300 group"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-400 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, fIndex) => (
                  <li
                    key={fIndex}
                    className="flex items-center gap-2 text-slate-300 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
