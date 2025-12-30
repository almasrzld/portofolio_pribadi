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
import { motion } from "motion/react";
import Image from "next/image";

type Project = {
  title: string;
  image: string;
  description: string;
  techStack: string[];
  repo: string;
  demo: string;
};

const projects: Project[] = [
  {
    title: "Sistem Informasi Manajemen Kejuaraan Taekwondo",
    image: "/images/project1.png",
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
    image: "/images/project2.png",
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
    image: "/images/project3.png",
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
    image: "/images/project4.png",
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
    title: "Management Article – Seller Pintar",
    image: "/images/project5.png",
    description:
      "A content management platform for managing, posting, and editing articles. Built with modern tech stack and optimized for maintainability and performance.",
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
    title: "Open AI",
    image: "/images/project6.png",
    description:
      "An experimental AI web app using Gemini API to demonstrate basic AI integration, prompt handling, and response visualization built with Vite and Tailwind.",
    techStack: ["Vite.js", "Gemini API", "Tailwind CSS"],
    repo: "https://github.com/almasrzld/react_muhammad-almas-rizaldi/tree/main/28_Basic%20Model%20OpenAI%20dan%20Prompt%20Engginer%20di%20React/praktikum/latihan",
    demo: "https://almasrzld.vercel.app/",
  },
  {
    title: "Sistem Informasi Administrasi Pondok Pesantren",
    image: "/images/project7.png",
    description:
      "A web-based management information system for student (santri) administration, featuring registration, authentication, data management, and admin verification workflows built with Laravel.",
    techStack: ["Laravel", "MySQL", "Tailwind CSS"],
    repo: "https://github.com/almasrzld/project_pondok",
    demo: "",
  },
];

const ProjectSectionFeature = () => {
  return (
    <section
      id="project"
      className="py-20 bg-background text-foreground relative"
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
                  <div className="relative w-full overflow-hidden rounded-lg border">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={1000}
                      height={600}
                      className="object-contain w-full h-auto"
                    />
                  </div>

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
                  {project.demo && (
                    <Button asChild size="sm">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Demo
                      </a>
                    </Button>
                  )}
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

      <div className="absolute top-[2%] md:top-[3%] left-1/2 -translate-x-1/2 opacity-10 font-instrumentserif font-bold text-8xl tracking-wide select-none z-0">
        Projects
      </div>
    </section>
  );
};

export default ProjectSectionFeature;
