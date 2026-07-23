"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import SplashScreen from "../common/splash-screen";

const SplashWrapper = ({ children }: { children: React.ReactNode }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Lock body scroll and force page position to top (0, 0) while splash is active
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const splashDuration = 2400;
    const timer = setTimeout(() => {
      setShowSplash(false);
      document.body.style.overflow = "";
    }, splashDuration);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* Ultra-Smooth Parallax Curtain Overlay Layer */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash-curtain"
            initial={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 1.1,
              ease: [0.87, 0, 0.13, 1], // Ultra-fluid custom ease-in-out curve
            }}
            className="fixed inset-0 z-[9999] pointer-events-auto bg-background overflow-hidden shadow-2xl"
          >
            <SplashScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Content Layer with Synchronous Parallax Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1.2,
          delay: 2.1,
          ease: [0.25, 1, 0.5, 1], // Soft deceleration curve
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default SplashWrapper;
