import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Award, Code2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';


export default function About() {
  const { bio, stats, experience } = portfolioData.about ? portfolioData : {
    about: { bio: "", stats: [] },
    experience: []
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="about" className="py-24 px-6 relative max-w-7xl mx-auto">
      {/* Top subtle light effect */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-display font-black text-white tracking-tight"
        >
          About <span className="bg-gradient-to-r from-brand-cyan to-brand-blue bg-clip-text text-transparent">Me</span>
        </motion.h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mx-auto mt-4 rounded-full shadow-[0_0_8px_#00f0ff]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* Left Column: Biography */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-7 space-y-6 flex flex-col justify-between"
        >
          <motion.div variants={itemVariants} className="glass-card p-8 rounded-2xl relative overflow-hidden group flex-grow">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-cyan/5 rounded-full blur-[40px] group-hover:bg-brand-cyan/10 transition-colors" />
            <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center space-x-2">
              <Code2 className="w-5 h-5 text-brand-cyan" />
              <span>Who I Am</span>
            </h3>
            <p className="text-slate-400 font-sans leading-relaxed font-light text-base mb-4">
              {portfolioData.about.bio}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            {portfolioData.about.stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="glass-card p-6 rounded-2xl text-center hover:scale-[1.02] transition-transform relative group"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-cyan/5 via-brand-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <p className="text-3xl md:text-4xl font-display font-extrabold bg-gradient-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent mb-1">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-slate-500 font-sans tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Core Philosophies & Value Cards */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5"
        >
          <div className="glass-card p-8 rounded-2xl relative overflow-hidden h-full flex flex-col justify-between">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-purple/5 rounded-full blur-[40px]" />
            <div>
              <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center space-x-2">
                <Award className="w-5 h-5 text-brand-purple" />
                <span>Professional Core Values</span>
              </h3>
              
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 hover:border-brand-cyan/20 transition-colors">
                  <h4 className="text-sm font-display font-bold text-slate-200">Security-First Mindset</h4>
                  <p className="text-xs text-slate-400 font-sans font-light mt-1.5 leading-relaxed">
                    Auditing architectures for OWASP hazards, enforcing robust authentication models, and sanitizing input channels across data lines.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 hover:border-brand-purple/20 transition-colors">
                  <h4 className="text-sm font-display font-bold text-slate-200">Scalable & Responsive Architecture</h4>
                  <p className="text-xs text-slate-400 font-sans font-light mt-1.5 leading-relaxed">
                    Constructing asynchronous APIs, optimizing query patterns, and compiling micro-frontends designed to render at peak performance.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 hover:border-brand-cyan/20 transition-colors">
                  <h4 className="text-sm font-display font-bold text-slate-200">Dynamic User Experiences</h4>
                  <p className="text-xs text-slate-400 font-sans font-light mt-1.5 leading-relaxed">
                    Crafting rich 3D workspaces, reactive components, and micro-interactions that engage visitors and elevate overall product appeal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
