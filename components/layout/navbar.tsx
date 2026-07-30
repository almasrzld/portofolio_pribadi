"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./toggle-darkmode";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const NAVBAR_ITEMS = [
  {
    name: "Home",
    path: "/#home",
    id: "#home",
  },
  {
    name: "About",
    path: "/#about",
    id: "#about",
  },
  {
    name: "Skill",
    path: "/#skill",
    id: "#skill",
  },
  {
    name: "Experience",
    path: "/#experience",
    id: "#experience",
  },
  {
    name: "Project",
    path: "/#project",
    id: "#project",
  },
  {
    name: "Contact",
    path: "/#contact",
    id: "#contact",
  },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("#home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // Determine active section based on current scroll position
      const sectionIds = ["home", "about", "skill", "experience", "project", "contact"];
      const scrollPosition = window.scrollY + 200; // Account for fixed navbar offset

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(`#${id}`);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Recalculate section positions after splash screen animation finishes
    const splashTimer = setTimeout(() => {
      handleScroll();
    }, 2600);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(splashTimer);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent,
    item: { path: string; id: string }
  ) => {
    setActiveSection(item.id);

    // If currently on the homepage, perform smooth in-page scrolling
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      const targetId = item.id.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", item.path);
      }
    }
  };

  return (
    <nav
      className={`fixed top-4 left-0 right-0 z-[999] transition-all duration-300 ease-in-out ${
        scrolled ? "px-4" : ""
      }`}
    >
      <div
        className={`container transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-background/80 backdrop-blur-md shadow-md dark:shadow-purple-500/30 rounded-full py-1 md:py-3"
            : "py-1 md:py-4"
        }`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-instrumentserif font-bold hover-neon">
            <Link
              href="/"
              onClick={(e) =>
                handleNavClick(e, { path: "/#home", id: "#home" })
              }
            >
              Almasrzld.
            </Link>
          </h1>

          <ul className="hidden md:flex items-center gap-8">
            {NAVBAR_ITEMS.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  <motion.div
                    className="relative cursor-pointer"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    <span
                      className={`transition-colors ${
                        activeSection === item.id
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
          <div className="hidden md:flex items-center">
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <button aria-label="Open mobile menu">
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <VisuallyHidden>
                    <SheetTitle>Menu</SheetTitle>
                  </VisuallyHidden>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {NAVBAR_ITEMS.map((item, index) => (
                    <Link
                      key={index}
                      href={item.path}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`block px-2 py-1 text-lg rounded-md transition-colors ${
                        activeSection === item.id
                          ? "text-primary font-semibold"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
