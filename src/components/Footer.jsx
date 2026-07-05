import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { Github, Linkedin, Twitter } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-slate-950/80 py-12 relative overflow-hidden">
      {/* Background radial soft light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[100px] bg-brand-purple/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Left Side: Credits */}
        <div className="text-center md:text-left">
          <p className="text-sm text-slate-400 font-sans">
            &copy; {currentYear} <span className="text-white font-medium">{portfolioData.about.name}</span>. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 mt-1 font-sans">
            Built with React, Tailwind CSS v4, Three.js & Framer Motion
          </p>
        </div>

        {/* Center: Social Icons */}
        <div className="flex items-center space-x-5">
          <a
            href={portfolioData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-brand-cyan hover:border-brand-cyan/40 hover:-translate-y-1 transition-all"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={portfolioData.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-brand-purple hover:border-brand-purple/40 hover:-translate-y-1 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={portfolioData.contact.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-brand-cyan hover:border-brand-cyan/40 hover:-translate-y-1 transition-all"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${portfolioData.contact.email}`}
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-rose-400 hover:border-rose-400/40 hover:-translate-y-1 transition-all"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Right Side: Back to Top */}
        <button
          onClick={handleScrollToTop}
          className="w-10 h-10 rounded-full border border-white/10 hover:border-brand-cyan/50 hover:bg-brand-cyan/5 text-slate-400 hover:text-brand-cyan flex items-center justify-center transition-all cursor-pointer group shadow-md"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
