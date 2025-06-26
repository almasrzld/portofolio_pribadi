"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { ChevronRight, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";

const HeroSectionFeature = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center container pt-5 md:pt-0"
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
          I <i>design</i>, <i>build</i>, and <i>ship</i>{" "}
          <span className="text-accent hover-neon glow">
            Full Stack web experiences
          </span>
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Combining frontend finesse with backend power to create fast,
          reliable, and elegant web applications.
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

        <div className="flex justify-center gap-0 md:gap-0 -space-x-52 md:-space-x-20">
          <Card className="w-60 h-64 z-0 -rotate-6 transition-transform duration-300 hover:-translate-y-16 hover:rotate-0 hover:z-10 cursor-pointer">
            <img
              src="/images/hero-img-1.jpeg"
              alt="Hero1"
              className="h-44 w-52 mx-auto object-cover rounded-md"
            />
            <p className="-mt-2 text-primary">Midodaren</p>
          </Card>
          <Card className="w-60 h-64 z-0 rotate-6 mt-4 transition-transform duration-300 hover:-translate-y-16 hover:rotate-0 hover:z-10 cursor-pointer">
            <img
              src="/images/hero-img-2.jpeg"
              alt="Hero2"
              className="h-44 w-52 mx-auto object-cover rounded-md"
            />
            <p className="-mt-2 text-primary">Karimun Jawa</p>
          </Card>
          <Card className="w-60 h-64 z-0 -rotate-6 mt-4 transition-transform duration-300 hover:-translate-y-16 hover:rotate-0 hover:z-10 cursor-pointer">
            <img
              src="/images/hero-img-3.jpeg"
              alt="Hero3"
              className="h-44 w-52 mx-auto object-cover rounded-md"
            />
            <p className="-mt-2 text-primary">My Love</p>
          </Card>
          <Card className="w-60 h-64 z-0 rotate-6 transition-transform duration-300 hover:-translate-y-16 hover:rotate-0 hover:z-10 cursor-pointer">
            <img
              src="/images/hero-img-4.jpeg"
              alt="Hero4"
              className="h-44 w-52 mx-auto object-cover rounded-md"
            />
            <p className="-mt-2 text-primary">SUGBK</p>
          </Card>
        </div>
      </div>

      <motion.div
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSectionFeature;
