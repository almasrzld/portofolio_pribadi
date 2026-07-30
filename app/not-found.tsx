"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Home, Compass, MessageSquare, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-[calc(100vh-160px)] pt-32 pb-20 md:pt-40 md:pb-28 flex items-center justify-center overflow-hidden px-4 container mx-auto">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-purple-600/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/3 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="relative max-w-lg w-full text-center space-y-8 my-auto">
        {/* Animated 404 Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative inline-block"
        >
          <span className="text-8xl sm:text-9xl font-extrabold tracking-tighter bg-gradient-to-r from-purple-500 via-indigo-400 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl">
            404
          </span>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-2 -right-4 p-2 rounded-2xl bg-purple-500/20 border border-purple-500/30 text-purple-400 backdrop-blur-md shadow-lg"
          >
            <Compass className="w-6 h-6" />
          </motion.div>
        </motion.div>

        {/* Content Details */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Page Not Found</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            Lost in Digital Space?
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            The page you are looking for might have been moved, renamed, or never existed. Let&apos;s get you back on track!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2"
        >
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <a
            href="https://wa.me/62895412528975"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-foreground bg-card/80 hover:bg-card border border-border/80 hover:border-purple-500/40 backdrop-blur-md shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageSquare className="w-4 h-4 text-purple-400" />
            <span>Contact Almas</span>
          </a>
        </motion.div>
      </div>
    </main>
  );
}
