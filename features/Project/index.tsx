"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Sistem Manajemen Kejuaraan Taekwondo",
    description:
      "A fullstack web app for managing national Taekwondo championships including registration, bracket system, and automated reports.",
    techStack: ["Next.js", "Express", "MongoDB", "Cloudinary", "Midtrans"],
    repo: "https://github.com/almasrzld/taekwondo-championship",
    demo: "#",
  },
  {
    title: "Portfolio Website",
    description:
      "Responsive portfolio site built with Next.js, showcasing projects, skills, and contact section with dark mode support.",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    repo: "https://github.com/almasrzld/portfolio",
    demo: "#home",
  },
];

const ProjectSectionFeature = () => {
  return (
    <section
      id="project"
      className="min-h-screen py-20 bg-background text-foreground"
    >
      <div className="container space-y-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary">
          Projects
        </h2>

        <div className="grid gap-10 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3 className="text-xl font-semibold text-accent">
                {project.title}
              </h3>
              <p className="text-muted-foreground mt-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-4 mt-6">
                <Button asChild size="sm">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSectionFeature;
