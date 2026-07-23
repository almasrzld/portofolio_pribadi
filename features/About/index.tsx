"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { animate, motion, useMotionValue } from "motion/react";
import { useInView } from "react-intersection-observer";
import { Download, GripHorizontal } from "lucide-react";

const AboutSectionFeature: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Track 2D displacement for free 360-degree drag & elastic string connection
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  // Dynamic spring bounce handler on drag release (Lebih Kalem & Smooth)
  const handleDragEnd = () => {
    const curX = cardX.get();
    const curY = cardY.get();

    // Calculate pull distance magnitude (Pythagorean theorem)
    const dist = Math.sqrt(curX * curX + curY * curY);

    // Smooth & calm spring physics parameters:
    const stiffness = Math.min(1000, 450 + dist * 2.5);
    const damping = Math.max(14, 22 - dist * 0.02);

    // Trigger smooth 2D spring animation back to origin (0, 0)
    animate(cardY, 0, {
      type: "spring",
      stiffness: stiffness,
      damping: damping,
      mass: 0.6,
    });

    animate(cardX, 0, {
      type: "spring",
      stiffness: stiffness,
      damping: damping,
      mass: 0.6,
    });
  };

  return (
    <section
      id="about"
      className="bg-background text-foreground relative py-20 overflow-hidden"
    >
      <div className="container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-10 lg:space-y-14"
        >
          {/* Section Header with Background Text Above Profile Image */}
          <div className="relative flex justify-center items-center py-2">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-primary font-instrumentserif tracking-wide relative z-10">
              About <span className="text-purple-500/30">Me</span>
            </h2>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 font-instrumentserif font-bold text-7xl sm:text-8xl md:text-9xl tracking-widest select-none z-0 pointer-events-none whitespace-nowrap">
              About
            </div>
          </div>

          {/* Main Content: Left Lanyard ID Card + Right Info Column */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-14">
            {/* Left Lanyard ID Card Container */}
            <div className="w-full max-w-[200px] sm:max-w-[240px] lg:max-w-[270px] shrink-0 mx-auto lg:mx-0 flex flex-col items-center relative z-30">

              {/* Lanyard Top Strap & Metal Clip Anchor (Fixed Top) */}
              <div className="w-full flex flex-col items-center z-20 pointer-events-none">
                {/* Lanyard Ribbon Strap */}
                <div className="w-6 h-9 bg-gradient-to-b from-purple-600 via-indigo-600 to-purple-800 rounded-t-md shadow-md flex items-center justify-center relative">
                  <div className="w-1 h-full bg-purple-400/30" />
                  <div className="absolute inset-y-0 left-0.5 w-0.5 border-r border-dashed border-purple-300/30" />
                  <div className="absolute inset-y-0 right-0.5 w-0.5 border-l border-dashed border-purple-300/30" />
                </div>
                {/* Metal Clip / Ring Clasp */}
                <div className="w-5 h-4 bg-gradient-to-r from-gray-400 via-zinc-200 to-gray-400 rounded-sm border border-zinc-500 shadow-md flex items-center justify-center -mt-0.5 z-20">
                  <div className="w-3 h-2.5 border-2 border-zinc-700 rounded-full bg-zinc-300/50" />
                </div>
              </div>

              {/* SVG Elastic Lanyard String connecting clip anchor to card in 2D space */}
              <svg viewBox="-300 0 600 600" className="absolute top-[48px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none z-10 overflow-visible">
                <motion.line
                  x1="0"
                  y1="0"
                  x2={cardX}
                  y2={cardY}
                  stroke="url(#lanyard-cord-grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="lanyard-cord-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d4d4d8" />
                    <stop offset="50%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#a1a1aa" />
                  </linearGradient>
                </defs>
              </svg>

              {/* 2D Free Draggable ID Card with Smooth Spring Recoil */}
              <motion.div
                style={{ x: cardX, y: cardY }}
                drag
                dragConstraints={{ left: -600, right: 600, top: -200, bottom: 600 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 1.05, zIndex: 50, cursor: "grabbing" }}
                className="relative w-full cursor-grab active:cursor-grabbing touch-none select-none z-40 -mt-2 group"
              >
                {/* ID Card Holder Container */}
                <div className="relative rounded-2xl p-2.5 sm:p-3 bg-gradient-to-b from-purple-500/20 via-card/95 to-card border-2 border-purple-500/40 shadow-xl transition-all duration-300 group-hover:border-purple-500/60 backdrop-blur-md">

                  {/* Top Slot Hole for Clip */}
                  <div className="w-8 h-2 bg-zinc-900/90 rounded-full mx-auto mb-2 border border-zinc-700/80 shadow-inner flex items-center justify-center">
                    <div className="w-3.5 h-0.5 bg-zinc-600/60 rounded-full" />
                  </div>

                  {/* Badge Header Bar */}
                  <div className="flex items-center justify-between text-[10px] font-semibold text-purple-400 uppercase tracking-wider mb-2 px-0.5">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      ACCESS GRANTED
                    </span>
                    <span className="text-muted-foreground/70 font-mono text-[9px]">ID: 2026-MAR</span>
                  </div>

                  {/* Avatar Photo Frame */}
                  <div className="relative overflow-hidden rounded-xl bg-card border border-border/60 aspect-[3/4] w-full">
                    <Image
                      src="/images/avatar-img.png"
                      alt="Muhammad Almas Rizaldi"
                      width={400}
                      height={600}
                      className="w-full h-full object-cover object-top pointer-events-none"
                      priority
                    />
                  </div>

                  {/* Badge Footer Info & Pull Hint */}
                  <div className="mt-2.5 pt-2 border-t border-border/50 text-center">
                    <h3 className="font-bold text-foreground text-xs tracking-wide">
                      M. ALMAS RIZALDI
                    </h3>
                    <p className="text-[10px] text-muted-foreground font-medium">
                      Full Stack Engineer
                    </p>

                    {/* Hint to Drag Card */}
                    <div className="mt-1.5 text-[9px] text-purple-400/80 font-medium flex items-center justify-center gap-1 animate-bounce">
                      <GripHorizontal className="w-2.5 h-2.5" />
                      <span>Drag me anywhere</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Info Column */}
            <div className="space-y-8 flex-1 w-full">
              <p className="text-muted-foreground leading-relaxed">
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
                <a href="/New-CV-Muhammad Almas Rizaldi.pdf" download className="flex items-center gap-2">
                  Download CV <Download className="w-5 h-5" />
                </a>
              </Button>

              {/* GitHub Contributions directly below Download CV */}
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
                    className="w-full h-auto rounded-xl object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSectionFeature;
