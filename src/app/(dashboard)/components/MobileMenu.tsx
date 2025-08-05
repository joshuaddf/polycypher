"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashBoardNavLinks } from "@/app/utils/data";

const MobileMenu = ({ isOpen, toggleMenu } : {isOpen: boolean, toggleMenu: () => void}) => {
  const pathname = usePathname();

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
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
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
        <div className="flex flex-col justify-center items-center gap-1 w-6 h-6">
          <span
            className={`w-6 h-0.5 bg-foreground transition-all duration-300 rounded-full ${
              isOpen ? "rotate-45 translate-y-1" : ""
            }`}
          ></span>
          {/* <span
            className={`w-5 h-0.5 bg-foreground transition-all duration-300 rounded-full ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span> */}
          <span
            className={`w-6 h-0.5 bg-foreground transition-all duration-300 rounded-full ${
              isOpen ? "-rotate-45 -translate-y-1" : ""
            }`}
          ></span>
        </div>
      </button>

      <div
        className={`w-full mx-auto absolute top-12 left-0 mt-5 z-50 bg-background pb-5 rounded-b-3xl transition-all duration-300 border-b-2 border-muted-background px-5 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        role="dialog"
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col gap-2">
          {dashBoardNavLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={toggleMenu}
              className={`px-3 py-2 rounded-md transition-colors ${
                pathname === link.href ? "bg-muted-foreground/20 border-2 border-accent-foreground text-foreground" : ""
              }`}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;