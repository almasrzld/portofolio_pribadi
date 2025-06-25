"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplashScreen from "../common/splash-screen";

const SplashWrapper = ({ children }: { children: React.ReactNode }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const splashDuration = 3000;

    const splashTimeout = setTimeout(() => {
      setShowSplash(false);

      const contentTimeout = setTimeout(() => {
        setShowContent(true);
      }, 100);

      return () => clearTimeout(contentTimeout);
    }, splashDuration);

    return () => clearTimeout(splashTimeout);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <SplashScreen />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            key="main"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SplashWrapper;
