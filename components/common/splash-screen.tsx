"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SplashScreen = () => {
  const TEXT_ITEMS = ["WELCOME", "TO", "MY", "PERSONAL", "PORTFOLIO"];
  const [centered, setCentered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCentered(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-background text-primary flex items-center justify-between z-[9999]">
      {TEXT_ITEMS.map((text, index) => {
        const offset = (index - TEXT_ITEMS.length / 2 + 0.5) * 255;
        const isBold = text === "MY" || text === "PERSONAL";

        return (
          <motion.h1
            key={index}
            className={`text-4xl ${
              isBold ? "font-bold" : "font-normal"
            } font-instrumentserif`}
            initial={{ x: 0, opacity: 0 }}
            animate={{
              x: centered ? -offset : 0,
              opacity: [0, 1, 0.5, 1],
            }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: "easeInOut",
            }}
          >
            {text}
          </motion.h1>
        );
      })}
    </div>
  );
};

export default SplashScreen;
