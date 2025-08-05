"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashBoardNavLinks } from "@/app/utils/data";
import { AnimatePresence, motion } from "motion/react";

const MobileMenu = ({ isOpen, toggleMenu }: { isOpen: boolean, toggleMenu: () => void }) => {
  const pathname = usePathname();
  const AnimeLink = motion(Link);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Dark overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={toggleMenu}
        aria-hidden={!isOpen}
      />

      <button
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="flex items-center justify-center"
      >
        <div className="flex flex-col justify-center items-center gap-1 w-7 h-7">
          <span
            className={`w-7 h-0.5 bg-foreground transition-all duration-300 rounded-full ${isOpen ? "rotate-45 translate-y-1" : ""
              }`}
          ></span>
          {/* <span
            className={`w-5 h-0.5 bg-foreground transition-all duration-300 rounded-full ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span> */}
          <span
            className={`w-7 h-0.5 bg-foreground transition-all duration-300 rounded-full ${isOpen ? "-rotate-45 -translate-y-1" : ""
              }`}
          ></span>
        </div>
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          exit={{ opacity: 0 }}
          className="w-full mx-auto absolute top-12 left-0 mt-5 z-50 bg-background py-5 rounded-b-sm border-t-2 border-muted-background px-5"
          role="dialog"
          aria-hidden={!isOpen}
        >
          <div className="flex flex-col gap-2">
            {dashBoardNavLinks.map((link, index) => (
              <AnimeLink
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0, transition: { delay: index * 0.05, type: "spring", bounce: 0.3 } }}
                exit={{ opacity: 0, x: -5 }}
                key={index}
                href={link.href}
                onClick={toggleMenu}
                className={`px-3 py-2 rounded-xl transition-colors text-sm ${pathname === link.href ? "bg-muted-foreground/20 border-[1px] border-accent-foreground/20 text-foreground" : ""
                  }`}
              >
                {link.title}
              </AnimeLink>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;