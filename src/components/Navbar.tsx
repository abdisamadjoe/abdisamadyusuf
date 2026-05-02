"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/5 backdrop-blur-md border-b border-white/10 font-inter">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo (always visible) */}
          <Link href="#home" className="flex items-center">
            <Image
              src="/abdisamadylogo.svg"
              alt="Abdisamad Logo"
              width={150}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
          {/* Desktop Menu */}
          <ul className="hidden sm:flex space-x-8 text-sm font-medium">
            <li>
              <Link href="#home" className="text-white transition hover:text-[#00ff9d]">
                Home
              </Link>
            </li>
            <li>
              <Link href="#work" className="text-white transition hover:text-[#00ff9d]">
                Work
              </Link>
            </li>
            <li>
              <a
                href="https://medium.com/@abdisamadjoe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition hover:text-[#00ff9d]"
              >
                Blogs
              </a>
            </li>
            <li>
              <Link href="#contact" className="text-white transition hover:text-[#00ff9d]">
                Contact
              </Link>
            </li>
          </ul>
          {/* Hamburger Button (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block sm:hidden text-white focus:outline-none"
            aria-label="Open Menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Mobile Dropdown Menu */}
        <div className={`sm:hidden ${isOpen ? "block" : "hidden"} px-6`}>
          <div className="flex flex-col space-y-4 bg-white/5 backdrop-blur-md mt-2 rounded-lg p-4">
            <Link
              href="#home"
              onClick={() => setIsOpen(false)}
              className="text-white transition hover:text-[#00ff9d]"
            >
              Home
            </Link>
            <Link
              href="#work"
              onClick={() => setIsOpen(false)}
              className="text-white transition hover:text-[#00ff9d]"
            >
              Work
            </Link>
            <a
              href="https://medium.com/@abdisamadjoe"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="text-white transition hover:text-[#00ff9d]"
            >
              Blogs
            </a>
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="text-white transition hover:text-[#00ff9d]"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
