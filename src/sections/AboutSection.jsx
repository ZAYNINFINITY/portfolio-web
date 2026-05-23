import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="section-block bg-slate-900/50">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle mx-auto">
            Get to know the developer behind the code
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left Column - Bio */}
          <div className="card-surface p-8">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Backend-Focused Web Application Developer
            </h3>
            <div className="space-y-4 text-slate-400">
              <p>
                I am a Computer Science undergraduate at PAF-IAST with hands-on
                experience building complete, database-driven web applications
                from concept to deployment.
              </p>
              <p>
                My core strength lies in backend development using PHP and
                MySQL, where I focus on relational database design, secure
                authentication systems, and structured business logic
                implementation.
              </p>
              <p>
                Alongside backend systems, I integrate responsive frontend
                interfaces and continuously expand my skillset by exploring
                modern technologies such as React and Node.js.
              </p>
            </div>

            {/* Key Focus Areas */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-700">
              <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                <p className="text-sm font-medium text-white">
                  Database Design
                </p>
                <p className="text-xs text-slate-500">
                  Relational Architecture
                </p>
              </div>
              <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                <p className="text-sm font-medium text-white">Authentication</p>
                <p className="text-xs text-slate-500">Secure Systems</p>
              </div>
            </div>

            {/* Download CV Button */}
            <div className="mt-8">
              <a
                href="/Zain_Ul_Abideen_CV.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5"
                style={{ boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download CV
              </a>
            </div>
          </div>

          {/* Right Column - Info Cards */}
          <div className="space-y-6">
            {/* Profile Info */}
            <div className="card-surface p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Profile</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-slate-700 rounded-lg text-blue-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </span>
                  <span className="text-slate-300">Islamabad, Pakistan</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-slate-700 rounded-lg text-blue-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                    </svg>
                  </span>
                  <span className="text-slate-300">
                    BASc Computer Science (PAF-IAST)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-slate-700 rounded-lg text-blue-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </span>
                  <span className="text-slate-300">PHP & MySQL Specialist</span>
                </li>
              </ul>
            </div>

            {/* What I Do */}
            <div className="card-surface p-6">
              <h4 className="text-lg font-semibold text-white mb-4">
                Core Competencies
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 2.21 7c0 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                      />
                    </svg>
                  </div>
                  <h5 className="font-medium text-white mb-1">
                    Backend Development
                  </h5>
                  <p className="text-xs text-slate-500">PHP, MySQL, APIs</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-3">
                    <svg
                      className="w-5 h-5 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h5 className="font-medium text-white mb-1">
                    Frontend Integration
                  </h5>
                  <p className="text-xs text-slate-500">
                    HTML, CSS, JavaScript
                  </p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
                    <svg
                      className="w-5 h-5 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                      />
                    </svg>
                  </div>
                  <h5 className="font-medium text-white mb-1">
                    Database Architecture
                  </h5>
                  <p className="text-xs text-slate-500">ERD, Normalization</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center mb-3">
                    <svg
                      className="w-5 h-5 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h5 className="font-medium text-white mb-1">Security</h5>
                  <p className="text-xs text-slate-500">
                    Authentication, Authorization
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://github.com/ZAYNINFINITY"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-center text-slate-300 hover:text-white transition-all"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/zain-ul-abideen-429735231/"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-center text-slate-300 hover:text-white transition-all"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
