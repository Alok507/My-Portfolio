import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Github, Linkedin, Twitter } from './Icons';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required.";
    else if (formData.name.trim().length < 2) tempErrors.name = "Name must be at least 2 characters.";

    if (!formData.email.trim()) tempErrors.email = "Email is required.";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      tempErrors.email = "Email is invalid.";
    }

    if (!formData.message.trim()) tempErrors.message = "Message is required.";
    else if (formData.message.trim().length < 10) tempErrors.message = "Message must be at least 10 characters.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on input change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

   const phoneNumber = "919423235022"; //

const text = encodeURIComponent(
  `Hello, my name is ${formData.name}
Email: ${formData.email}

Message: ${formData.message}`
);

const whatsappURL = `https://wa.me/${phoneNumber}?text=${text}`;

// WhatsApp open
window.open(whatsappURL, "_blank");

// UI feedback (optional but recommended)
setIsSubmitting(false);
setSubmitSuccess(true);
setFormData({ name: '', email: '', message: '' });

// Confetti (same ठेव)
confetti({
  particleCount: 120,
  spread: 80,
  origin: { y: 0.6 },
  colors: ['#00f0ff', '#bd00ff', '#3b82f6', '#00ffcc']
});

// Success message hide
setTimeout(() => {
  setSubmitSuccess(false);
}, 5000);
  }
  return (
    <section id="contact" className="py-24 px-6 relative max-w-7xl mx-auto">
      {/* Background soft glow */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[300px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-display font-black text-white tracking-tight"
        >
          Get In <span className="bg-gradient-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent">Touch</span>
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
        {/* Left Column: Contact details & Social Connect */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 flex flex-col justify-between space-y-8"
        >
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-white leading-tight">
              Let's build something epic together
            </h3>
            <p className="text-slate-400 font-sans font-light leading-relaxed">
              If you have an interesting contract, a full-time opening, or want to collaborate on open source 3D graphics projects, feel free to drop a message. I usually respond within 24 hours.
            </p>

            <div className="space-y-4 pt-4">
              {/* Email Card */}
              <a 
                href={`mailto:${portfolioData.contact.email}`}
                className="flex items-center space-x-4 p-4 rounded-2xl glass-card border border-white/5 hover:border-brand-cyan/20 hover:scale-[1.01] transition-all"
              >
                <div className="p-3 bg-slate-900 border border-white/5 text-brand-cyan rounded-xl">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-sans font-medium uppercase">Email Address</p>
                  <p className="text-sm font-sans font-medium text-slate-200">{portfolioData.contact.email}</p>
                </div>
              </a>

              {/* Location Card */}
              <div className="flex items-center space-x-4 p-4 rounded-2xl glass-card border border-white/5 hover:border-brand-purple/20 transition-all">
                <div className="p-3 bg-slate-900 border border-white/5 text-brand-purple rounded-xl">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-sans font-medium uppercase">Location</p>
                  <p className="text-sm font-sans font-medium text-slate-200">{portfolioData.contact.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social icons */}
          <div className="space-y-4 pt-6 border-t border-white/5">
            <p className="text-xs text-slate-500 font-sans uppercase font-bold tracking-wider">Connect with me online</p>
            <div className="flex space-x-4">
              <a
                href={portfolioData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-900 border border-white/5 hover:border-brand-cyan/30 text-slate-400 hover:text-white transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={portfolioData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-900 border border-white/5 hover:border-brand-purple/30 text-slate-400 hover:text-white transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={portfolioData.contact.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-900 border border-white/5 hover:border-brand-cyan/30 text-slate-400 hover:text-white transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden bg-slate-950/65 h-full">
            <h3 className="text-xl font-display font-bold text-white mb-6">Send Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-sans text-slate-400 uppercase tracking-wide">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className={`w-full font-sans text-sm rounded-xl px-4 py-3 bg-slate-950 border focus:outline-none transition-all ${
                    errors.name 
                      ? 'border-rose-500/50 focus:border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.1)]' 
                      : 'border-white/5 focus:border-brand-cyan focus:shadow-[0_0_12px_rgba(6,182,212,0.2)] text-white'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-xs text-rose-400 font-sans flex items-center space-x-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-sans text-slate-400 uppercase tracking-wide">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. johndoe@example.com"
                  className={`w-full font-sans text-sm rounded-xl px-4 py-3 bg-slate-950 border focus:outline-none transition-all ${
                    errors.email 
                      ? 'border-rose-500/50 focus:border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.1)]' 
                      : 'border-white/5 focus:border-brand-cyan focus:shadow-[0_0_12px_rgba(6,182,212,0.2)] text-white'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-xs text-rose-400 font-sans flex items-center space-x-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-sans text-slate-400 uppercase tracking-wide">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project, timeline, and requirements..."
                  className={`w-full font-sans text-sm rounded-xl px-4 py-3 bg-slate-950 border focus:outline-none transition-all resize-none ${
                    errors.message 
                      ? 'border-rose-500/50 focus:border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.1)]' 
                      : 'border-white/5 focus:border-brand-cyan focus:shadow-[0_0_12px_rgba(6,182,212,0.2)] text-white'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p className="text-xs text-rose-400 font-sans flex items-center space-x-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button & Notifications */}
              <div className="pt-2 flex flex-col items-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-brand-cyan to-brand-blue hover:from-brand-cyan hover:to-brand-cyan text-slate-950 font-sans font-semibold rounded-xl flex items-center justify-center space-x-2.5 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-[0_0_15px_#00f0ff] cursor-pointer disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mt-4 flex items-center space-x-2 text-emerald-400 text-sm font-sans"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Message sent successfully! Confetti fired!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
