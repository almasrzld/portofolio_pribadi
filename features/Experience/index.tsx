"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import {
  GraduationCap,
  Briefcase,
  Code2,
  Building2,
  Sparkles,
  Calendar,
  MapPin,
  CheckCircle2,
} from "lucide-react";

interface TimelineItem {
  id: string;
  type: "work" | "freelance" | "education";
  title: string;
  subtitle: string;
  company: string;
  period: string;
  location: string;
  description: string;
  isCurrent?: boolean;
  isOpenForFreelance?: boolean;
  skills: string[];
  icon: React.ElementType;
  color: string;
}

const EXPERIENCES: TimelineItem[] = [
  {
    id: "education",
    type: "education",
    title: "Bachelor of Informatics Engineering",
    subtitle: "Universitas Muhammadiyah Surakarta",
    company: "Universitas Muhammadiyah Surakarta (UMS)",
    period: "Graduated",
    location: "Surakarta, Indonesia",
    description:
      "Graduated with a Bachelor's Degree in Informatics Engineering (S1 Teknik Informatika) from Universitas Muhammadiyah Surakarta. Specialized in Software Architecture, Data Structures, Web Systems Architecture, and Relational Database Systems.",
    isCurrent: false,
    skills: ["Software Engineering", "Algorithms & Data Structures", "Web Architecture", "Database Systems"],
    icon: GraduationCap,
    color: "from-emerald-500 via-teal-500 to-cyan-500",
  },
  {
    id: "dinsos",
    type: "work",
    title: "Web Developer Intern",
    subtitle: "Dinas Sosial Surakarta",
    company: "Dinas Sosial Surakarta",
    period: "Internship",
    location: "Surakarta, Indonesia",
    description:
      "Engineered an integrated assessment web system platform for Dinas Sosial Surakarta utilizing Next.js, streamlining digital evaluation workflows.",
    isCurrent: false,
    skills: ["Next.js", "Integrated Assessment Platform", "React", "TypeScript", "Tailwind CSS"],
    icon: Building2,
    color: "from-cyan-500 via-blue-500 to-indigo-500",
  },
  {
    id: "freelance",
    type: "freelance",
    title: "Freelance Full Stack Web Engineer",
    subtitle: "Self-Employed / Information Systems",
    company: "Freelance Projects",
    period: "2025 - Present",
    location: "Remote / Indonesia",
    description:
      "Architected and developed custom Information Systems for diverse clients. Currently open & available for freelance web development projects.",
    isCurrent: false,
    isOpenForFreelance: true,
    skills: ["Information Systems", "Full Stack Engineering", "Laravel", "Next.js", "Database Architecture"],
    icon: Code2,
    color: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    id: "solo-murni",
    type: "work",
    title: "Full Stack Developer",
    subtitle: "PT. Solo Murni (Kiky)",
    company: "PT. Solo Murni (Kiky)",
    period: "2026 - Present",
    location: "Boyolali, Indonesia",
    description:
      "Architected, developed, and maintained internal enterprise web systems for PT. Solo Murni (Kiky). Built high-performance internal web solutions utilizing Laravel, Bootstrap, and MySQL.",
    isCurrent: true,
    skills: ["Laravel", "Bootstrap", "MySQL", "Enterprise Internal Systems", "RESTful APIs", "PHP"],
    icon: Building2,
    color: "from-purple-500 via-indigo-500 to-purple-600",
  },
];

const ExperienceSectionFeature = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="bg-background text-foreground relative py-24 overflow-hidden min-h-[140vh]"
    >
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="container relative z-10 space-y-16">
        {/* Section Header */}
        <div className="relative flex justify-center items-center py-2">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-primary font-instrumentserif tracking-wide relative z-10">
            <span className="text-purple-500/30">Career</span> & Education
          </h2>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 font-instrumentserif font-bold text-7xl sm:text-8xl md:text-9xl tracking-widest select-none z-0 pointer-events-none whitespace-nowrap">
            Journey
          </div>
        </div>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Explore my academic milestones and professional software engineer career progression.
        </p>

        {/* 3D Timeline Container */}
        <div className="relative max-w-5xl mx-auto pt-6 pb-12">

          {/* Background Guide Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border/40 -translate-x-1/2 z-0" />

          {/* Active Glowing Scroll Beam */}
          <motion.div
            style={{ scaleY: smoothProgress }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-purple-500 via-indigo-500 to-emerald-400 origin-top shadow-[0_0_15px_rgba(168,85,247,0.8)] z-10 rounded-full"
          />

          {/* Timeline Experience Cards List */}
          <div className="space-y-16 md:space-y-24 relative z-20">
            {EXPERIENCES.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <TimelineCardItem
                  key={item.id}
                  item={item}
                  index={index}
                  isEven={isEven}
                  containerRef={containerRef}
                />
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

interface CardProps {
  item: TimelineItem;
  index: number;
  isEven: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const TimelineCardItem: React.FC<CardProps> = ({ item, isEven, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  const IconComponent = item.icon;

  return (
    <div
      ref={cardRef}
      className={`relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${isEven ? "" : "md:flex-row-reverse"
        }`}
    >
      {/* Central Node Glowing Icon Marker */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
        <motion.div
          style={{ scale }}
          className={`w-12 h-12 rounded-2xl bg-card border-2 shadow-xl flex items-center justify-center transition-all duration-300 ${item.isCurrent
            ? "border-emerald-500 shadow-emerald-500/40 text-emerald-400"
            : "border-purple-500/60 shadow-purple-500/30 text-purple-400"
            }`}
        >
          <IconComponent className="w-5 h-5" />
        </motion.div>
        {item.isCurrent && (
          <span className="absolute w-12 h-12 rounded-2xl bg-emerald-500/30 animate-ping pointer-events-none" />
        )}
      </div>

      {/* Timeline Card Container (Alternating 5 cols Left / Right) */}
      <div
        className={`pl-20 md:pl-0 md:col-span-5 ${
          isEven ? "md:col-start-1 md:text-right" : "md:col-start-8 md:text-left"
        }`}
      >
        <motion.div
          style={{ y, opacity, rotateX, scale, perspective: 1000 }}
          whileHover={{
            y: -6,
            rotateY:
              typeof window !== "undefined" && window.innerWidth >= 768
                ? isEven
                  ? -3
                  : 3
                : 0,
          }}
          transition={{ duration: 0.3 }}
          className="relative rounded-3xl p-6 sm:p-8 bg-card/75 border border-border/60 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-500/10 group overflow-hidden"
        >
          {/* Subtle Card Accent Gradient */}
          <div
            className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`}
          />

          {/* Card Header & Badges */}
          <div
            className={`flex flex-wrap items-center gap-2 mb-3 ${isEven ? "md:justify-end" : "md:justify-start"
              }`}
          >
            {item.isCurrent && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Current Role
              </span>
            )}
            {item.isOpenForFreelance && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-purple-500/15 border border-purple-500/40 text-purple-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                Open for Freelance
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              <Calendar className="w-3 h-3" />
              {item.period}
            </span>
          </div>

          {/* Job / Education Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-purple-400 transition-colors leading-snug">
            {item.title}
          </h3>

          {/* Company / Institution */}
          <h4 className="text-sm font-semibold text-muted-foreground mt-1 flex items-center gap-1.5 justify-start md:justify-inherit">
            <Building2 className="w-3.5 h-3.5 text-purple-400 shrink-0 inline" />
            <span>{item.company}</span>
          </h4>

          {/* Location */}
          <p className="text-xs text-muted-foreground/80 mt-1 flex items-center gap-1 justify-start md:justify-inherit">
            <MapPin className="w-3 h-3 text-purple-400 shrink-0 inline" />
            <span>{item.location}</span>
          </p>

          {/* Description */}
          <p className="text-xs sm:text-sm text-muted-foreground mt-4 leading-relaxed">
            {item.description}
          </p>

          {/* Skill / Tech Tags */}
          <div
            className={`flex flex-wrap gap-2 mt-5 pt-4 border-t border-border/40 ${isEven ? "md:justify-end" : "md:justify-start"
              }`}
          >
            {item.skills.map((skill) => (
              <span
                key={skill}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-background/50 border border-border/50 text-foreground/80"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExperienceSectionFeature;
