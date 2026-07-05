import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, GraduationCap, Award, BookOpen } from 'lucide-react';

export default function Resume() {

  // ✅ Resume Download Function
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'My_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ✅ Education Data
  const previewEducation = [
    {
      degree: "Higher Secondary Education (HSC) - Science",
      College: "Maharashtra State Board",
      year: "2020 - 2021",
      Score: "71.00%",
      description:  "Completed higher secondary education with a focus on Physics, Chemistry, and Mathematics (PCM), building a strong foundation for computer science and analytical problem-solving."
    },
    {
      degree: "B.Sc. in Computer Science",
      College: "KTHM College Nashik, University of Pune",
      year: "2021 - 2025",
      Score: "5.95 CGPA",  
      description: "Focused on programming fundamentals, data structures, application design, and system architecture."
    },
    {
      degree: "Master's of Computer Applications (MCA)",
      College: "Sandip Foundation's, University of Pune",
      year: "2025 - 2027",
      Score: "In Progress",
      description: "Advanced study of software development principles, distributed computing, database management, and design patterns."
    }
  ];

  // ✅ Certifications Data (Fixed)
  const certifications = [
    {
      title: "Professional Data Analyst Certification",
      org: "Google",
      link: "/certificates/google.pdf"
    },
    {
      title: "TCS iON Career Edge",
      org: "TCS iON",
      link: "/certificates/tcs.pdf"
    },
    {
      title: "Data Analytics",
      org: "Deloitte",
      link: "/certificates/deloitte.pdf"
    },
    {
      title: "Microsoft Azure AI Essentials",
      org: "Microsoft & LinkedIn",
      link: "/certificates/microsoft.pdf"
    },
    {
      title: "AI Job Simulation",
      org: "Cognizant",
      link: "/certificates/cognizant.pdf"
    },
    {
      title: "Data Analytics & Visualization",
      org: "Accenture",
      link: "/certificates/accenture.pdf"
    }
  ];

  return (
    <section id="resume" className="py-24 px-6 relative max-w-7xl mx-auto">

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[300px] bg-brand-blue/5 rounded-full blur-[100px]" />

      {/* Heading */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-black text-white"
        >
          My <span className="bg-gradient-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent">Resume</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* LEFT SIDE */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-6">

          <div className="p-3 bg-slate-900 border border-white/10 text-brand-purple rounded-xl w-fit">
            <FileText className="w-6 h-6" />
          </div>

          <h3 className="text-2xl font-bold text-white">
            Looking for my complete credentials?
          </h3>

          <p className="text-slate-400">
            Download my full resume with detailed experience and achievements.
          </p>

          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-gradient-to-r from-brand-cyan to-brand-blue text-black font-semibold rounded-xl flex items-center gap-2 hover:scale-105 transition"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-8">

          <div className="bg-slate-950/70 p-8 rounded-3xl border border-white/10">

            <div className="grid md:grid-cols-2 gap-8">

              {/* EDUCATION */}
              <div>
                <h4 className="text-white font-bold flex items-center gap-2 mb-6">
                  <GraduationCap className="text-cyan-400 w-5 h-5" />
                  Education
                </h4>

                {previewEducation.map((edu, idx) => (
                  <div key={idx} className="mb-6">
                    <p className="text-xs text-slate-500">{edu.year}</p>
                    <h5 className="text-sm text-white font-semibold">{edu.degree}</h5>
                    <p className="text-xs text-cyan-400">{edu.College}</p>
                    <p className="text-xs text-slate-400 mt-1">{edu.description}</p>
                    <p className="text-xs text-green-400 font-bold mt-1">{edu.Score}</p>
                  </div>
                ))}
              </div>

              {/* CERTIFICATIONS */}
              <div>
                <h4 className="text-white font-bold flex items-center gap-2 mb-6">
                  <Award className="text-purple-400 w-5 h-5" />
                  Certifications
                </h4>

                <div className="space-y-4">
                  {certifications.map((cert, idx) => (
                    <a
                      key={idx}
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-purple-400 transition"
                    >
                      <BookOpen className="w-4 h-4 text-purple-400" />

                      <div>
                        <p className="text-xs text-white font-medium">
                          {cert.title}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {cert.org}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}