import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import { Github } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const projects = portfolioData.projects || [];

  // Extract unique categories dynamically
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6 relative max-w-7xl mx-auto">
      {/* Background Soft Purple Glow */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[300px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-display font-black text-white tracking-tight"
        >
          Selected <span className="bg-gradient-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent">Projects</span>
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mx-auto mt-4 rounded-full shadow-[0_0_8px_#00f0ff]"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-xl text-sm font-sans font-medium tracking-wide border transition-all cursor-pointer ${
              filter === cat
                ? 'bg-gradient-to-r from-brand-cyan to-brand-blue border-transparent text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-[1.05]'
                : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white hover:border-white/15'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={proj.id}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between min-h-[420px] relative group"
            >
              {/* 📸 Project Image */}
<div className="w-full aspect-video mb-4 overflow-hidden rounded-lg">
  <img
    src={proj.image}
    alt={proj.title}
    className="w-full h-full object-cover"
  />
</div>
              {/* Glow overlay inside the card based on project theme */}
              <div className={`absolute -inset-px bg-gradient-to-b ${proj.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl`} />

              <div>
                {/* Header: Tech Icon / ID */}
                <div className="flex justify-between items-center mb-5">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5 text-brand-cyan group-hover:border-brand-cyan/35 transition-colors">
                    <Code className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-slate-600 font-sans tracking-widest font-bold">
                    0{proj.id} / PROJECT
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-white group-hover:text-brand-cyan transition-colors mb-3">
                  {proj.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm font-sans font-light leading-relaxed line-clamp-3">
                  {proj.description}
                </p>
              </div>

              {/* Bottom section: tech badges & links */}
              <div className="mt-6">
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-5 overflow-hidden max-h-[24px]">
                  {proj.tech.slice(0, 3).map((t, idx) => (
                    <span 
                      key={idx} 
                      className="text-[10px] font-sans font-medium bg-slate-950/60 border border-white/5 text-slate-500 px-2.5 py-0.5 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                  {proj.tech.length > 3 && (
                    <span className="text-[10px] font-sans text-slate-600 px-1 font-bold">
                      +{proj.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* Links */}
                
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className={`text-xs font-sans font-semibold tracking-wider ${proj.accent}`}>
                    {proj.category}
                  </span>
                  
                  <div className="flex items-center space-x-3">
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
                      aria-label="Code Repository"
                    >
                      <Github className="w-4.5 h-4.5" />
                    </a>
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-4.5 h-4.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
