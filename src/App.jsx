import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import CursorGlow from './components/CursorGlow';
import Background3D from './components/Background3D';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhyHireMe from "./components/WhyHireMe";

export default function App() {
  // Page scroll progress tracker
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-brand-purple/30 selection:text-brand-purple/10">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple z-50 origin-[0%] shadow-[0_0_10px_#00f0ff]"
        style={{ scaleX }}
      />

      {/* Cursor Glow Effect */}
      <CursorGlow />

      {/* 3D Canvas Background & Fallback Glows */}
      <Background3D />

      {/* Floating Navigation */}
      <Navbar />

      {/* Layout Content Container */}
      <main className="relative z-10 w-full overflow-hidden">
        {/* Hero Section */}
        <Hero />

        {/* Separator Line */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </div>

        {/* About Section */}
        <About />

        {/* Separator Line */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </div>

        {/* Experience Section */}
        <Experience />

        {/* Separator Line */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </div>

        {/* Projects Section */}
        <Projects />

        {/* Separator Line */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </div>

        {/* Skills Section */}
        <Skills />

        {/* Separator Line */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </div>

        {/* Resume Section */}
        <Resume />
        <WhyHireMe />

        {/* Separator Line */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </div>

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}
