"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  FileCode2,
  Cpu,
  Globe,
  Server,
  Database,
  Layout,
  Sparkles,
  Wrench,
  Layers,
  LayoutTemplate,
  Palette,
} from "lucide-react";

type SkillCategory = "All" | "Frontend" | "Backend" | "Design & Tools";

interface SkillItem {
  name: string;
  level: number;
  category: "Frontend" | "Backend" | "Design & Tools";
  icon: React.ElementType;
  description: string;
}

const SKILLS: SkillItem[] = [
  {
    name: "JavaScript",
    level: 98,
    category: "Frontend",
    icon: Code2,
    description: "ES6+, Async/Await, DOM, Modern JS",
  },
  {
    name: "TypeScript",
    level: 95,
    category: "Frontend",
    icon: FileCode2,
    description: "Strict Typing, Interfaces, Generics",
  },
  {
    name: "React",
    level: 97,
    category: "Frontend",
    icon: Cpu,
    description: "Hooks, Context API, Performance",
  },
  {
    name: "Next.js",
    level: 96,
    category: "Frontend",
    icon: Globe,
    description: "App Router, SSR, SSG, Server Actions",
  },
  {
    name: "Tailwind CSS & Bootstrap",
    level: 95,
    category: "Frontend",
    icon: Sparkles,
    description: "Responsive Design, Utility & Component UI Frameworks",
  },
  {
    name: "UI/UX Design",
    level: 88,
    category: "Design & Tools",
    icon: Palette,
    description: "Figma, Wireframing, Prototyping & User Flow",
  },
  {
    name: "Express.js",
    level: 80,
    category: "Backend",
    icon: Server,
    description: "RESTful APIs, Middleware, Auth",
  },
  {
    name: "Laravel",
    level: 85,
    category: "Backend",
    icon: Layers,
    description: "Blade, Eloquent ORM, MVC Architecture",
  },
  {
    name: "RESTful APIs",
    level: 92,
    category: "Backend",
    icon: Globe,
    description: "API Architecture, JSON, Auth & Endpoints",
  },
  {
    name: "PostgreSQL, MySQL & MongoDB",
    level: 85,
    category: "Backend",
    icon: Database,
    description: "Relational & NoSQL Databases, SQL Queries",
  },
  {
    name: "WordPress",
    level: 83,
    category: "Design & Tools",
    icon: Layout,
    description: "Custom Themes, Plugins, Elementor",
  },
  {
    name: "Git & GitHub",
    level: 90,
    category: "Design & Tools",
    icon: Wrench,
    description: "Version Control, CI/CD, Workflows",
  },
];

const CATEGORIES: SkillCategory[] = ["All", "Frontend", "Backend", "Design & Tools"];

const SkillSectionFeature = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("All");

  const filteredSkills =
    activeCategory === "All"
      ? SKILLS
      : SKILLS.filter((skill) => skill.category === activeCategory);

  return (
    <section
      id="skill"
      className="bg-background text-foreground relative py-20 overflow-hidden"
    >
      <div className="container relative z-10 space-y-10">
        {/* Section Header */}
        <div className="relative flex justify-center items-center py-2">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-primary font-instrumentserif tracking-wide relative z-10">
            <span className="text-purple-500/40">My</span> Skills
          </h2>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 font-instrumentserif font-bold text-7xl sm:text-8xl md:text-9xl tracking-widest select-none z-0 pointer-events-none whitespace-nowrap">
            Skills
          </div>
        </div>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          I specialize in building full-stack web applications using modern frameworks and robust tools. Here is my core technical stack:
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 bg-primary rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                {category}
              </button>
            );
          })}
        </div>

        {/* Modern Skill Cards Grid */}
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="group relative rounded-2xl p-5 bg-card/70 border border-border/60 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-purple-500/40 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon + Category Badge */}
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant="secondary" className="text-xs font-normal">
                        {skill.category}
                      </Badge>
                    </div>

                    {/* Skill Info */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-foreground text-base group-hover:text-purple-500 transition-colors">
                          {skill.name}
                        </h3>
                        <span className="text-xs font-semibold text-purple-500">
                          {skill.level}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {skill.description}
                      </p>
                    </div>
                  </div>

                  {/* Glowing Animated Progress Bar */}
                  <div className="mt-4 pt-3 border-t border-border/40">
                    <div className="w-full bg-muted/60 h-2 rounded-full overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillSectionFeature;
