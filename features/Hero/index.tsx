"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { ChevronRight, Mail } from "lucide-react";

const HeroSectionFeature = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center container"
    >
      <AnimatedGridPattern
        className="absolute inset-0 -z-10 opacity-40"
        width={60}
        height={60}
        numSquares={100}
        strokeDasharray={0}
        maxOpacity={0.08}
      />

      <div className="text-center space-y-8">
        <motion.h1
          className="text-4xl md:text-6xl font-bold leading-tight text-primary font-instrumentserif"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hi, I'm{" "}
          <span className="text-accent hover-neon glow">Almas Rizaldi</span>
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          A Full Stack Developer crafting exceptional digital experiences
        </motion.p>

        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <Button asChild>
            <a href="#project">
              View Projects <ChevronRight className="w-5 h-5" />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#contact">
              Contact Me <Mail className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSectionFeature;
