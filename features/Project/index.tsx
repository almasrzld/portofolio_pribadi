"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Image from "next/image";
import { ExternalLink, Github, Sparkles } from "lucide-react";

type ProjectCategory = "All" | "Next.js" | "Laravel" | "AI & Web";

type Project = {
  title: string;
  category: ProjectCategory[];
  image: string;
  description: string;
  techStack: string[];
  repo: string;
  demo: string;
  isFeatured?: boolean;
};

const PROJECTS: Project[] = [
  {
    title: "Sistem Informasi Manajemen Kejuaraan Taekwondo",
    category: ["All", "Next.js"],
    image: "/images/project1.png",
    description:
      "A fullstack web application for national Taekwondo championship administration featuring online registration, automated bracket management, payment gateway integration, and PDF report generation.",
    techStack: [
      "Next.js",
      "Express.js",
      "MongoDB",
      "Midtrans",
      "Cloudinary",
      "Axios",
    ],
    repo: "https://github.com/almasrzld/skripsi_ums-open",
    demo: "https://ums-open.vercel.app",
    isFeatured: true,
  },
  {
    title: "Futsal Field Reservation – Mini Project MSIB",
    category: ["All", "Next.js", "AI & Web"],
    image: "/images/project2.png",
    description:
      "Futsal booking platform with smart AI field suggestions, interactive slot reservations, and smooth animations built with React Query & Generative AI.",
    techStack: [
      "Next.js",
      "TypeScript",
      "React Query",
      "Framer Motion",
      "Google Generative AI",
    ],
    repo: "https://github.com/almasrzld/muhammad-almas-rizaldi_mini-project",
    demo: "https://muhammad-almas-rizaldi-mini-project.vercel.app/",
    isFeatured: true,
  },
  {
    title: "Plantopia – Capstone Project MSIB",
    category: ["All", "Next.js"],
    image: "/images/project3.png",
    description:
      "Comprehensive plant care and community platform featuring rich article editing, care reminders, and modern responsive UI design.",
    techStack: [
      "Next.js",
      "Redux Toolkit",
      "React-Quill",
      "DaisyUI",
      "Framer Motion",
    ],
    repo: "https://github.com/Plantopia-Alterra-Academy-Batch-6/react-capstone-km-alterra-batch-6",
    demo: "https://plantopia-eta.vercel.app/",
    isFeatured: true,
  },
  {
    title: "Dinas Sosial Surakarta Internal System",
    category: ["All", "Next.js"],
    image: "/images/project4.png",
    description:
      "Internal administrative tool for Dinsos Surakarta built with Next.js, Google APIs, and SheetJS for digital data automation and public service management.",
    techStack: [
      "Next.js",
      "Google APIs",
      "Tailwind CSS",
      "ShadCN UI",
      "SheetJS",
    ],
    repo: "https://github.com/almasrzld/magang_dinsos-surakarta",
    demo: "https://dinsos-surakarta.vercel.app/",
  },
  {
    title: "Management Article – Seller Pintar",
    category: ["All", "Next.js"],
    image: "/images/project5.png",
    description:
      "Article management platform designed for publishing, editing, and managing seller articles with optimized performance and state management.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "ShadCN UI",
      "React Query",
    ],
    repo: "https://github.com/almasrzld/test_sellerpintar",
    demo: "https://almasrzld-sellerpintar.vercel.app/",
  },
  {
    title: "Open AI Prompt Assistant",
    category: ["All", "AI & Web"],
    image: "/images/project6.png",
    description:
      "Experimental AI web application integrating Gemini API for dynamic prompt processing, intelligent response formatting, and interactive UI visualization.",
    techStack: ["Vite.js", "Gemini API", "Tailwind CSS"],
    repo: "https://github.com/almasrzld/react_muhammad-almas-rizaldi/tree/main/28_Basic%20Model%20OpenAI%20dan%20Prompt%20Engginer%20di%20React/praktikum/latihan",
    demo: "https://almasrzld.vercel.app/",
  },
  {
    title: "Sistem Informasi Administrasi Pondok Pesantren",
    category: ["All", "Laravel"],
    image: "/images/project7.png",
    description:
      "Web-based management information system for student (santri) administration, featuring online registration, authentication, and admin verification workflows built with Laravel.",
    techStack: ["Laravel", "MySQL", "Tailwind CSS"],
    repo: "https://github.com/almasrzld/project_pondok",
    demo: "",
  },
];

const ProjectSectionFeature = () => {
  return (
    <section
      id="project"
      className="py-20 bg-background text-foreground relative overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="container relative z-10 space-y-10">
        {/* Section Header */}
        <div className="relative flex justify-center items-center py-2">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-primary font-instrumentserif tracking-wide relative z-10">
            Featured <span className="text-purple-500/30">Projects</span>
          </h2>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 font-instrumentserif font-bold text-7xl sm:text-8xl md:text-9xl tracking-widest select-none z-0 pointer-events-none whitespace-nowrap">
            Projects
          </div>
        </div>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A showcase of web applications and digital platforms I’ve built, demonstrating full stack development and modern software engineering.
        </p>

        {/* Projects Grid (Full Container Width) */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 w-full">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="relative rounded-3xl p-5 sm:p-7 bg-card/75 border border-border/60 backdrop-blur-md shadow-xl transition-colors duration-300 hover:border-purple-500/50 hover:shadow-purple-500/10 group flex flex-col justify-between"
            >
                <div>
                  {/* Image Container with Zoom & Badge Overlay */}
                  <div className="relative w-full aspect-video overflow-hidden rounded-2xl border border-border/40 bg-background/50 mb-5">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    {project.isFeatured && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-purple-500/80 backdrop-blur-md text-white shadow-md uppercase tracking-wider">
                          <Sparkles className="w-3 h-3" />
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-foreground group-hover:text-purple-400 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4 pt-5 mt-4 border-t border-border/40">
                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {project.demo && (
                      <Button
                        asChild
                        size="sm"
                        className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-md flex items-center gap-2"
                      >
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      </Button>
                    )}
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-border/60 bg-background/50 hover:bg-background/80 hover:text-purple-400 font-semibold flex items-center gap-2"
                    >
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSectionFeature;
