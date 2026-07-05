import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Settings, Cpu, Database, Wrench } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const { frontend, backend, tools } = portfolioData.skills || {
    frontend: [],
    backend: [],
    tools: []
  };

  const categories = [
    {
      title: "Frontend Development",
      icon: <Layout className="w-5 h-5 text-brand-cyan" />,
      skills: frontend,
      color: "from-brand-cyan to-brand-blue",
      glow: "shadow-[0_0_15px_rgba(6,182,212,0.15)]",
      borderColor: "group-hover:border-brand-cyan/30"
    },
    {
      title: "Backend & Systems",
      icon: <Server className="w-5 h-5 text-brand-purple" />,
      skills: backend,
      color: "from-brand-purple to-pink-500",
      glow: "shadow-[0_0_15px_rgba(168,85,247,0.15)]",
      borderColor: "group-hover:border-brand-purple/30"
    },
    {
      title: "Tools & DevOps",
      icon: <Settings className="w-5 h-5 text-amber-500" />,
      skills: tools,
      color: "from-amber-500 to-orange-500",
      glow: "shadow-[0_0_15px_rgba(245,158,11,0.15)]",
      borderColor: "group-hover:border-amber-500/30"
    }
  ];

  return (
    <section id="skills" className="py-24 px-6 relative max-w-7xl mx-auto">
      {/* Background Soft Glow */}
      <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-display font-black text-white tracking-tight"
        >
          My Technical <span className="bg-gradient-to-r from-brand-cyan to-brand-blue bg-clip-text text-transparent">Skills</span>
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mx-auto mt-4 rounded-full shadow-[0_0_8px_#00f0ff]"
        />
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {categories.map((cat, catIdx) => (
          <motion.div
            key={catIdx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: catIdx * 0.15 }}
            className={`glass-card p-8 rounded-2xl relative overflow-hidden group ${cat.borderColor}`}
          >
            {/* Soft decorative glow */}
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${cat.color} opacity-5 blur-[30px] rounded-full`} />

            {/* Category Header */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5 shadow-inner">
                {cat.icon}
              </div>
              <h3 className="text-lg font-display font-bold text-white">
                {cat.title}
              </h3>
            </div>

            {/* Skills List */}
            <div className="space-y-6">
              {cat.skills.map((skill, skillIdx) => (
                <div key={skillIdx} className="space-y-2">
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-slate-300 font-light hover:text-white transition-colors duration-200">
                      {skill.name}
                    </span>
                    <span className="text-slate-500 font-semibold">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: skillIdx * 0.05 }}
                      className={`h-full bg-gradient-to-r ${cat.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
