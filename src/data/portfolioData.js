import p1 from "../assets/project1.png";
import p2 from "../assets/project2.png";
import p3 from "../assets/project3.png";

export const portfolioData = {
  about: {
    name: "Alok Pardeshi",
    title: "Software Developer",
    subtitle: "Software Developer | Crafting Modern, High-Performance Web Experiences",
    bio: "I am a passionate Software Developer with a strong focus on building modern, high-performance web applications. I specialize in the MERN stack (MongoDB, Express.js, React, Node.js) and enjoy creating visually appealing, user-friendly interfaces with smooth animations and interactive 3D elementsI have hands-on experience developing real-world projects, including an AI-powered Resume Analyzer, and continuously work on improving performance, scalability, and user experience. My interest in application security also drives me to follow secure coding practices and build reliable systems.I am always eager to learn new technologies, solve complex problems, and build impactful digital solutions that stand out.",
    stats: [
      { label: "Industry Experience", value: "4 Months" },
      { label: "Projects Completed", value: "3+" },
      { label: "Technologies", value: "10+" },
      { label: "Contributions", value: "50+" }
    ]
  },
  
  projects: [
    {
      id: 1,
      title: "Courier Management System",
      description: "The Courier Management System is a web-based application designed to streamline and automate the process of managing courier services efficiently. It enables users to book shipments, track parcels in real-time, and manage delivery details with ease. The system provides an intuitive interface for both customers and administrators, ensuring a smooth and transparent workflow.",
      image: p1,
      tech: ["React", "React Three Fiber", "Node", "Express", "REST APIs", "MongoDB"],
      category: "Creative",
      github: "https://github.com",
      live: "https://example.com",
      gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
      accent: "text-cyan-400"
    },
    {
      id: 2,
      title: "AI Resume Analyzer",
      image: p2,
      description: "The AI Resume Analyzer is a web-based application designed to evaluate resumes and provide insights based on ATS (Applicant Tracking System) standards. It helps users improve their resumes by analyzing content, structure, keywords, and formatting to increase their chances of getting shortlisted.",
      tech: ["Express.js", "TypeScript", "Node.js", "React.js", "REST APIs", "MongoDB"],
      category: "Fullstack",
      github: "https://github.com",
      live: "https://example.com",
      gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
      accent: "text-purple-400"
    },
    {
      id: 3,
      title: "Fake News Detection System",
      description: "The Fake News Detection System is a web-based application designed to identify and classify news content as real or fake using machine learning techniques. It helps users verify the authenticity of news articles by analyzing textual data, patterns, and linguistic features.",
      image: p3,
      tech: ["React", "Node", "Express", "MongoDB", "Vercel", "REST APIs"],
      category: "Frontend",
      github: "https://github.com",
      live: "https://example.com",
      gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
      accent: "text-indigo-400"
    },
  ],

  skills: {
    frontend: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Three.js / React Three Fiber", level: 85 },
    ],
    backend: [
      { name: "Node.js / Express", level: 90 },
      { name: "GraphQL / REST APIs", level: 88 },
      { name: "PostgreSQL / Prisma", level: 85 },
    ],
    tools: [
      { name: "Git & GitHub Actions", level: 92 },
      { name: "Visual Studio Code", level: 80 },
      { name: "Vercel / Netlify", level: 95 },
      { name: "Figma (UI/UX Design)", level: 85 },
    ]
  },

  experience: [
    {
      id: 1,
      period: "Feb 2026 - Mar 2026",
      role: "Software Development Engineer Intern",
      company: "Bluestock Technologies",
      description: "Contributed to building and enhancing scalable, high-performance web applications as part of the engineering team.",
      responsibilities: [
        "Developed and optimized responsive user interfaces using React and Tailwind CSS, improving client-side page load speed by 15%.",
        "Implemented backend RESTful API endpoints in Node.js/Express, ensuring secure and efficient database operations.",
        "Collaborated on containerizing local development environments using Docker, streamlining onboarding time for new engineers."
      ],
      skills: ["React", "TypeScript", "Node.js", "REST APIs", "Docker"]
    },
    
    {
      id: 2,
      period: "July 2024 - Aug 2024",
      role: "Software Developer Intern",
      company: "IBM India Pvt. Ltd.",
      description: "Assisted in the design, development, and maintenance of enterprise-level software solutions and analytics dashboards.",
      responsibilities: [
        "Designed and implemented complex UI screens in Next.js, integrating real-time charts and data visualization widgets.",
        "Created optimized GraphQL query structures to fetch metrics from PostgreSQL databases, reducing latency by 20%.",
        "Utilized AWS services for deploying and testing feature branches, gaining experience in continuous integration pipelines."
      ],
      skills: ["Next.js", "Tailwind CSS", "GraphQL", "PostgreSQL", "AWS"]
    },
  ],

  contact: {
    email: "avpardeshi2003@gmail.com",
    github: "https://github.com/Alok507",
    linkedin: "https://www.linkedin.com/in/alok-pardeshi-a28014241/",
    twitter: "https://x.com/Alok684092",
    location: "Nashik, Maharashtra, India"
  }
};
