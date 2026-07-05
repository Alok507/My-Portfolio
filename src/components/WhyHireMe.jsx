import { motion } from "framer-motion";
import { Zap, Star, Code2, Users, Minus } from "lucide-react";

const points = [
  {
    icon: Zap,
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    title: "Problem Solver",
    desc: "Analyze complex requirements and deliver efficient, scalable solutions with a practical approach.",
  },
  {
    icon: Star,
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-400",
    title: "Fast Learner",
    desc: "Quickly adapts to new technologies, frameworks and business requirements with minimal guidance.",
  },
  {
    icon: Code2,
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
    title: "Clean Code",
    desc: "Develops maintainable, reusable and well-structured applications following industry best practices.",
  },
  {
    icon: Users,
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
    title: "Team Player",
    desc: "Collaborates effectively using Git, communicates clearly and contributes positively to team goals.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WhyHireMe() {
  return (
   <section className="py-10 px-6 max-w-7xl mx-auto bg-gradient-to-b from-[#020617] via-[#0a0f2c] to-[#020617]">
    <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent mb-26" />
      {/* eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center gap-2 mb-4"
      >
        <Minus size={16} className="text-indigo-400" />
        <span className="text-xs font-semibold tracking-[0.2em] text-indigo-400 uppercase">
          Why Choose Me
        </span>
      </motion.div>

      {/* heading */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="text-center text-4xl md:text-5xl font-extrabold mb-6"
      >
        <span className="text-white">Why </span>
        <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Hire Me?
        </span>
      </motion.h2>

      {/* subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center text-slate-400 max-w-2xl mx-auto mb-16 leading-relaxed"
      >
        Combining technical expertise, problem-solving ability and a passion
        for continuous learning to build scalable, user-friendly and
        business-focused web applications.
      </motion.p>

      {/* cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {points.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              variants={card}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 text-center hover:border-white/20 transition-colors"
            >
              <div
                className={`w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center ${item.iconBg} ${item.iconColor}`}
              >
                <Icon size={24} strokeWidth={2} />
              </div>

              <h4 className="font-semibold text-white text-lg mb-3">
                {item.title}
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}