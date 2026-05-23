import React from "react";

const LearningSection = () => {
  const currentlyLearning = [
    {
      name: "React",
      progress: 45,
      status: "In Progress",
      icon: "R",
      color: "from-blue-400 to-blue-600",
    },
    {
      name: "Node.js",
      progress: 35,
      status: "In Progress",
      icon: "N",
      color: "from-green-400 to-green-600",
    },
    {
      name: "REST APIs",
      progress: 60,
      status: "Learning",
      icon: "A",
      color: "from-purple-400 to-purple-600",
    },
  ];

  const futureGoals = [
    {
      title: "Full-Stack Development",
      description: "Building complete end-to-end applications",
      timeline: "2025",
    },
    {
      title: "Modern JavaScript Frameworks",
      description: "Mastering React and Next.js",
      timeline: "2025-2026",
    },
    {
      title: "Cloud & Deployment",
      description: "AWS, Vercel, and CI/CD pipelines",
      timeline: "2026",
    },
  ];

  return (
    <section id="learning" className="section-block">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-blue-400 font-semibold tracking-wider uppercase text-sm">
            Growth Journey
          </span>
          <h2 className="section-title text-center mt-2">Currently Learning</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Continuously expanding my skillset to become a full-stack developer
          </p>
        </div>

        {/* Currently Learning */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6">In Progress</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {currentlyLearning.map((skill, index) => (
              <div key={index} className="card-surface p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-white font-bold text-lg`}
                  >
                    {skill.icon}
                  </div>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                    {skill.status}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {skill.name}
                </h4>
                <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                  <div
                    className={`bg-gradient-to-r ${skill.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
                <span className="text-slate-500 text-sm">
                  {skill.progress}% Complete
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Future Goals */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6">Roadmap</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {futureGoals.map((goal, index) => (
              <div
                key={index}
                className="card-surface p-6 border-l-4 border-blue-500"
              >
                <span className="text-blue-400 text-sm font-medium">
                  {goal.timeline}
                </span>
                <h4 className="text-lg font-semibold text-white mt-2 mb-2">
                  {goal.title}
                </h4>
                <p className="text-slate-400 text-sm">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningSection;
