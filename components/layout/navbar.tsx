"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./toggle-darkmode";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("#home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // ➊ Scroll-spy observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // id section = target hash (#home, #about, dst)
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px", // trigger saat tengah layar
        threshold: 0,
      }
    );

    // observe tiap section yg ada id-nya
    const sectionIds = ["home", "about", "project", "contact"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // ➋ Effect sticky navbar rounded
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
                <Link
                  href={item.path}
                  className={
                    activeSection === item.path
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  }
                  onClick={() => setActiveSection(item.path)}
                >
                  {item.name}
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
