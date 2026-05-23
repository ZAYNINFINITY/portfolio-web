import React from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Project Collaborator",
      role: "Team Member at PAF-IAST",
      quote:
        "Zain demonstrated strong problem-solving skills and delivered quality work on our web project. His backend expertise with PHP and MySQL is solid.",
      avatar: "ZC",
    },
    {
      name: "Freelance Client",
      role: "Business Owner",
      quote:
        "Professional and responsive. Zain built exactly what we needed for our business management system. Highly recommended for PHP-MySQL projects.",
      avatar: "BC",
    },
    {
      name: "Mentor",
      role: "Senior Developer",
      quote:
        "Zain shows great potential in backend development. His willingness to learn and improve is commendable. Keep building!",
      avatar: "SM",
    },
  ];

  return (
    <section id="testimonials" className="section-block bg-slate-900/30">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-blue-400 font-semibold tracking-wider uppercase text-sm">
            Recommendations
          </span>
          <h2 className="section-title text-center mt-2">What People Say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card-surface p-6 relative">
              {/* Quote icon */}
              <div className="absolute top-4 right-6 text-6xl text-blue-500/10 font-serif">
                "
              </div>

              <p className="text-slate-300 mb-6 relative z-10">
                {testimonial.quote}
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    {testimonial.name}
                  </h4>
                  <p className="text-slate-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
