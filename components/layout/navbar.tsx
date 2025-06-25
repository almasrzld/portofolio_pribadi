"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./toggle-darkmode";
import { motion } from "framer-motion";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("#home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        root: null,
        rootMargin: "-30% 0px -70% 0px",
        threshold: 0,
      }
    );

    const sectionIds = ["home", "about", "skill", "project", "contact"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const NAVBAR_ITEMS = [
    {
      name: "Home",
      path: "#home",
    },
    {
      name: "About",
      path: "#about",
    },
    {
      name: "Skill",
      path: "#skill",
    },
    {
      name: "Project",
      path: "#project",
    },
    {
      name: "Contact",
      path: "#contact",
    },
  ];

  return (
    <nav
      className={`fixed top-4 left-0 right-0 z-[999] transition-all duration-300 ${
        scrolled ? "px-4" : ""
      }`}
    >
      <div
        className={`container transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md shadow-md dark:shadow-purple-500/30 rounded-full py-3"
            : "py-4"
        }`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-instrumentserif font-bold italic hover-neon">
            <Link href="/" onClick={() => setActiveSection("#home")}>
              Almasrzld.
            </Link>
          </h1>

          <ul className="flex items-center gap-8">
            {NAVBAR_ITEMS.map((item, index) => (
              <li key={index}>
                <Link href={item.path}>
                  <motion.div
                    className="relative cursor-pointer"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    <span
                      className={`transition-colors ${
                        activeSection === item.path
                          ? "text-primary font-semibold"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </span>
                    <motion.div
                      className="absolute left-0 -bottom-1 h-[1px] w-full bg-primary"
                      variants={{
                        rest: { scaleX: 0, transformOrigin: "right" },
                        hover: { scaleX: 1, transformOrigin: "left" },
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </motion.div>
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
