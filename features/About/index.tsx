"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { Download } from "lucide-react";

const AboutSectionFeature: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="about"
      className="bg-background text-foreground relative py-20"
    >
      <div className="container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col lg:flex-row items-center gap-10"
        >
          <div className="w-full max-w-[300px] lg:max-w-[400px]">
            <Image
              src="/images/avatar-img.png"
              alt="Avatar"
              width={400}
              height={600}
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-instrumentserif">
              About <span className="text-purple-500/30">Me</span>
            </h2>

            <p className="text-muted-foreground">
              My name is Almas. I'm a Full Stack Developer based in Rembang,
              Central Java, passionate and dedicated to my work. With 2 years of
              experience, I’ve gained the skills needed to build high-quality
              and impactful websites.
            </p>

            <div className="grid gap-2 text-sm sm:text-base">
              <div className="flex">
                <span className="w-32 shrink-0 font-medium">Name:</span>
                <span className="text-muted-foreground">
                  Muhammad Almas Rizaldi
                </span>
              </div>
              <div className="flex">
                <span className="w-32 shrink-0 font-medium">
                  Date of Birth:
                </span>
                <span className="text-muted-foreground">December 16, 2003</span>
              </div>
              <div className="flex items-start">
                <span className="w-32 shrink-0 font-medium">Address:</span>
                <span className="text-muted-foreground max-w-xs">
                  Purworejo Village RT 04 RW 02 Kaliori, Rembang, Central Java,
                  Indonesia
                </span>
              </div>
              <div className="flex">
                <span className="w-32 shrink-0 font-medium">Email:</span>
                <span className="text-muted-foreground">
                  almasrzld@gmail.com
                </span>
              </div>
              <div className="flex">
                <span className="w-32 shrink-0 font-medium">Phone:</span>
                <span className="text-muted-foreground">
                  +62 895-4125-28975
                </span>
              </div>
            </div>

            <Button asChild>
              <a href="/CV_Muhammad Almas Rizaldi.pdf" download>
                Download CV <Download className="w-5 h-5" />
              </a>
            </Button>

            <div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                GitHub Contributions
              </h3>
              <div>
                <Image
                  src="/images/contribution-img.png"
                  alt="GitHub Stats"
                  width={700}
                  height={200}
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-[42%] md:top-[11%] left-[28%] md:left-[45%] -translate-x-1/2 opacity-10 font-instrumentserif font-bold text-8xl tracking-wide select-none z-0">
        About
      </div>
    </section>
  );
};

export default AboutSectionFeature;
