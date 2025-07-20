"use client";

import { motion } from "motion/react";

const SkillSectionFeature = () => {
  const SKILLS_ITEMS = [
    { name: "JavaScript", level: 98 },
    { name: "TypeScript", level: 82 },
    { name: "React.js", level: 97 },
    { name: "Next.js", level: 95 },
    { name: "Express.js", level: 80 },
    { name: "Laravel", level: 85 },
    { name: "WordPress", level: 86 },
  ];

  return (
    <section id="skill" className="bg-background text-foreground relative">
      <div className="container space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary font-instrumentserif">
          <span className="text-purple-500/30">My</span> Skills
        </h2>

        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          I specialize in both frontend and backend development using modern
          frameworks and technologies. Below are the core tools and skills I use
          to build performant and scalable web applications.
        </p>

        <div className="space-y-6 z-10 relative">
          {SKILLS_ITEMS.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-foreground">
                  {skill.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                <motion.div
                  className="bg-primary h-full rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-[1%] left-1/2 -translate-x-1/2 opacity-10 font-instrumentserif font-bold text-8xl tracking-wide select-none z-0">
        Skills
      </div>
    </section>
  );
};

export default SkillSectionFeature;
