"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { motion } from "framer-motion";

type Project = {
  title: string;
  description: string;
  techStack: string[];
  repo: string;
  demo: string;
};

const projects: Project[] = [
  {
    title: "Sistem Informasi Manajemen Kejuaraan Taekwondo",
    description:
      "A fullstack web app for managing national Taekwondo championships including registration, bracket system, and automated reports.",
    techStack: [
      "Next.js",
      "Express",
      "MongoDB",
      "Cloudinary",
      "Midtrans",
      "Axios",
    ],
    repo: "https://github.com/almasrzld/skripsi_ums-open",
    demo: "https://ums-open.vercel.app",
  },
  {
    title: "Futsal Field Reservation – Mini Project MSIB",
    description:
      "Futsal booking app with AI suggestions, built using Next.js, TypeScript, and React Query.",
    techStack: [
      "Next.js",
      "TypeScript",
      "React Query",
      "Framer Motion",
      "Google Generative AI",
    ],
    repo: "https://github.com/almasrzld/muhammad-almas-rizaldi_mini-project",
    demo: "https://muhammad-almas-rizaldi-mini-project.vercel.app/",
  },
  {
    title: "Plantopia – Capstone Project MSIB",
    description:
      "A plant care web app built with Next.js, Redux Toolkit, and React-Quill, featuring a clean UI with DaisyUI and animations using Framer Motion.",
    techStack: [
      "Next.js",
      "Redux Toolkit",
      "React-Quill",
      "DaisyUI",
      "Framer Motion",
    ],
    repo: "https://github.com/Plantopia-Alterra-Academy-Batch-6/react-capstone-km-alterra-batch-6",
    demo: "https://plantopia-eta.vercel.app/",
  },
  {
    title: "Magang Dinsos Surakarta",
    description:
      "An internal tool for Dinsos Surakarta built with Next.js, Google APIs, and SheetJS, featuring clean UI with Tailwind CSS and ShadCN.",
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
    title: "Portfolio Website",
    description:
      "Responsive portfolio site built with Next.js, showcasing projects, skills, and contact section with dark mode support.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "ShadCN UI",
      "Framer Motion",
    ],
    repo: "https://github.com/almasrzld/portofolio_pribadi",
    demo: "#home",
  },
];

const ProjectSectionFeature = () => {
  return (
    <section
      id="project"
      className="min-h-screen py-20 bg-background text-foreground relative"
    >
      <div className="container space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary font-instrumentserif">
          My <span className="text-purple-500/30">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground">
          A collection of web applications I’ve developed, showcasing my
          experience in building full-featured solutions.
        </p>

        <div className="grid gap-10 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="text-primary dark:text-accent text-xl">
                    {project.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex gap-4 mt-auto pt-4">
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
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute top-[7%] left-1/2 -translate-x-1/2 opacity-10 font-instrumentserif font-bold text-8xl tracking-wide select-none z-0">
        Projects
      </div>
    </section>
  );
};

export default ProjectSectionFeature;
