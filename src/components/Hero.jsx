import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import ComputerModel from "../components/ComputerModel";

export default function Hero() {
  const roles = [
    "Full Stack Developer",
    "Data Analyst",
    "Web Designer"
  ];
  
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    let timer;

    const handleTyping = () => {
      const fullText = roles[roleIndex];

      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));

        if (currentText === fullText) {
          setIsDeleting(true);
          setTypingSpeed(1200);
        } else {
          setTypingSpeed(80);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));

        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(400);
        } else {
          setTypingSpeed(40);
        }
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);

  }, [currentText, isDeleting, roleIndex, typingSpeed]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full max-w-7xl">

        {/* ================= LEFT SIDE ================= */}
        <div className="z-10">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-2 bg-slate-900/80 border border-brand-cyan/30 text-brand-cyan px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-6 w-fit"
          >
            <Terminal className="w-4 h-4 animate-pulse" />
            <span>Available for Freelance</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
          >
            Hi👋, I'm {" "}
  
  <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
    Alok Pardeshi
  </span>

</motion.h1>

          {/* Typing */}
          <motion.h2
            className="text-xl md:text-3xl text-gray-300 mb-6 min-h-[40px]"
          >
            I am a{" "}
            <span className="text-cyan-400 border-r-2 border-cyan-400 pr-1 animate-pulse">
              {currentText}
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p className="text-gray-400 max-w-xl mb-10">
            {portfolioData.about.subtitle}
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">

            <button
              onClick={() => scrollToSection('projects')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex items-center gap-2 hover:scale-105 transition"
            >
              View Projects <ArrowRight size={18} />
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-3 rounded-xl border border-gray-600 text-white flex items-center gap-2 hover:border-purple-400 transition"
            >
              <MessageSquare size={18} />
              Contact Me
            </button>

          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="hidden md:flex justify-center items-center relative h-[500px]">

          {/* 3D Model */}
          <div className="w-[400px] h-[400px]">
            <ComputerModel />
          </div>

          {/* Floating Shape */}
          <div className="absolute top-10 right-10 w-20 h-20 border border-cyan-400 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-10 left-10 w-16 h-16 border border-purple-500"></div>

        </div>

      </div>

      {/* Scroll Indicator */}
      <div
  onClick={() => scrollToSection('about')}
  className="absolute top-130 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer animate-bounce"
>
  <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center items-start p-1">
    <div className="w-1 h-2 bg-cyan-400 rounded-full"></div>
  </div>
</div>
  </section>
);
}