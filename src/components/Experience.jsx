import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, ShieldCheck, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Experience() {
  const experiences = portfolioData.experience || [];

  // Helper to pick icons based on the role name
  const getRoleIcon = (role) => {
    const r = role.toLowerCase();
    if (r.includes('security')) return <ShieldCheck className="w-5 h-5 text-brand-purple" />;
    if (r.includes('engineer') || r.includes('developer')) return <Terminal className="w-5 h-5 text-brand-cyan" />;
    return <Briefcase className="w-5 h-5 text-brand-blue" />;
  };

  // Helper to choose card hover glow colors
  const getGlowStyle = (role) => {
    const r = role.toLowerCase();
    if (r.includes('security')) return 'group-hover:border-brand-purple/40 hover:shadow-[0_0_25px_rgba(189,0,255,0.15)]';
    if (r.includes('engineer')) return 'group-hover:border-brand-cyan/40 hover:shadow-[0_0_25px_rgba(0,240,255,0.15)]';
    return 'group-hover:border-brand-blue/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]';
  };

  return (
    <section id="experience" className="py-24 px-6 relative max-w-7xl mx-auto overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-display font-black text-white tracking-tight"
        >
          Professional <span className="bg-gradient-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent">Experience</span>
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mx-auto mt-4 rounded-full shadow-[0_0_8px_#00f0ff]"
        />
      </div>

      {/* Timeline Wrapper */}
      <div className="relative max-w-5xl mx-auto">
        {/* Vertical Timeline Axis (Visible on Desktop in middle, Mobile on left) */}
        <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-brand-cyan via-brand-purple to-slate-800 -translate-x-1/2 hidden sm:block shadow-[0_0_8px_rgba(0,240,255,0.2)]" />
        <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-brand-cyan via-brand-purple to-slate-800 sm:hidden shadow-[0_0_8px_rgba(0,240,255,0.2)]" />

        {/* Entries Container */}
        <div className="space-y-12 relative">
          {experiences.map((exp, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div 
                key={exp.id}
                className="flex flex-col sm:flex-row items-stretch sm:justify-between relative w-full group"
              >
                {/* Timeline center node */}
                <div className="absolute left-4 sm:left-1/2 top-6 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-110 group-hover:border-brand-cyan transition-all duration-300 shadow-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-brand-cyan to-brand-purple group-hover:bg-brand-cyan animate-pulse" />
                </div>

                {/* Left Side Content Placement (Odd indices on desktop) */}
                <div className="w-full sm:w-[45%] pl-12 sm:pl-0 order-2 sm:order-1 hidden sm:block">
                  {isLeft && (
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className={`glass-card p-6 md:p-8 rounded-2xl border border-white/5 relative overflow-hidden transition-all duration-300 ${getGlowStyle(exp.role)}`}
                    >
                      {/* Sub-card glow background */}
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-cyan/5 rounded-full blur-[35px] pointer-events-none" />
                      
                      {/* Period Badge */}
                      <div className="inline-flex items-center space-x-2 bg-slate-900 border border-white/5 text-slate-400 text-xs px-3 py-1 rounded-full font-sans mb-4">
                        <Calendar className="w-3.5 h-3.5 text-brand-cyan" />
                        <span>{exp.period}</span>
                      </div>

                      {/* Header */}
                      <div className="flex items-start justify-between space-x-4 mb-4">
                        <div>
                          <h3 className="text-xl font-display font-extrabold text-white leading-tight">
                            {exp.role}
                          </h3>
                          <p className="text-sm font-sans font-medium text-brand-cyan mt-1">
                            {exp.company}
                          </p>
                        </div>
                        <div className="p-2 bg-slate-900 border border-white/5 rounded-xl shadow-inner shrink-0">
                          {getRoleIcon(exp.role)}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-slate-400 font-sans font-light leading-relaxed mb-4 border-b border-white/5 pb-3">
                        {exp.description}
                      </p>

                      {/* Key Responsibilities Bullet Points */}
                      {exp.responsibilities && (
                        <ul className="space-y-2 mb-4">
                          {exp.responsibilities.map((resp, ridx) => (
                            <li key={ridx} className="text-xs text-slate-400 font-sans font-light flex items-start space-x-2">
                              <span className="text-brand-purple mt-1 shrink-0 font-bold">•</span>
                              <span className="leading-normal">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Technical Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {exp.skills.map((s, sidx) => (
                          <span 
                            key={sidx} 
                            className="text-[10px] font-sans font-medium bg-slate-950 border border-white/5 text-slate-500 px-2 py-0.5 rounded-md hover:border-brand-purple/20 hover:text-slate-300 transition-colors"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Right Side Content Placement (Even indices on desktop) */}
                <div className="w-full sm:w-[45%] pl-12 sm:pl-0 order-2 sm:order-3">
                  {(!isLeft || window.innerWidth < 640) && (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className={`glass-card p-6 md:p-8 rounded-2xl border border-white/5 relative overflow-hidden transition-all duration-300 ${getGlowStyle(exp.role)}`}
                    >
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-purple/5 rounded-full blur-[35px] pointer-events-none" />
                      
                      {/* Period Badge */}
                      <div className="inline-flex items-center space-x-2 bg-slate-900 border border-white/5 text-slate-400 text-xs px-3 py-1 rounded-full font-sans mb-4">
                        <Calendar className="w-3.5 h-3.5 text-brand-purple" />
                        <span>{exp.period}</span>
                      </div>

                      {/* Header */}
                      <div className="flex items-start justify-between space-x-4 mb-4">
                        <div>
                          <h3 className="text-xl font-display font-extrabold text-white leading-tight">
                            {exp.role}
                          </h3>
                          <p className="text-sm font-sans font-medium text-brand-purple mt-1">
                            {exp.company}
                          </p>
                        </div>
                        <div className="p-2 bg-slate-900 border border-white/5 rounded-xl shadow-inner shrink-0">
                          {getRoleIcon(exp.role)}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-slate-400 font-sans font-light leading-relaxed mb-4 border-b border-white/5 pb-3">
                        {exp.description}
                      </p>

                      {/* Key Responsibilities Bullet Points */}
                      {exp.responsibilities && (
                        <ul className="space-y-2 mb-4">
                          {exp.responsibilities.map((resp, ridx) => (
                            <li key={ridx} className="text-xs text-slate-400 font-sans font-light flex items-start space-x-2">
                              <span className="text-brand-cyan mt-1 shrink-0 font-bold">•</span>
                              <span className="leading-normal">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Technical Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {exp.skills.map((s, sidx) => (
                          <span 
                            key={sidx} 
                            className="text-[10px] font-sans font-medium bg-slate-950 border border-white/5 text-slate-500 px-2 py-0.5 rounded-md hover:border-brand-cyan/20 hover:text-slate-300 transition-colors"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
