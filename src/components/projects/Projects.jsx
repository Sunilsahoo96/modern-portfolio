import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projects = [
  // {
  //   title: "Upcoming MERN Stack Project",
  //   subtitle: "Coming Soon",
  //   description:
  //     "I'm currently architecting a new, full-stack MERN application with a Next.js 16 frontend. This project will focus on scalable real-time features and advanced backend architecture. The initial code will be pushed to GitHub soon — stay tuned!",
  //   tags: ["Ongoing", "MERN Stack", "Next.js", "TypeScript"],
  //   image: "/comingSoon.webp",
  //   liveDemo: "#",
  //   githubRepo: "#",
  //   projectColor: "#9333ea",
  // },
  {
    title: "SpeakVerse",
    subtitle:
      "A full-featured MERN stack blogging platform with real-time interactions and robust admin controls",
    description:
      "SpeakVerse is a modern, feature-rich full-stack blogging platform built using the MERN stack. It empowers users to create, manage, and engage with blogs in a seamless, responsive UI, while offering powerful admin capabilities for moderation and platform oversight. With real-time interactions, rich-text editing, role-based access control, and cloud integrations, SpeakVerse delivers a complete blogging experience.",
    tags: [
      "React.js",
      "Tailwind",
      "Shadcn/ui",
      "Redux Tookit",
      "Firebase",
      "Node",
      "Express",
      "MongoDB",
      "JWT",
      "Zod",
      "Cloudinary",
    ],
    image: "/speakeverse.png",
    liveDemo: "",
    githubRepo: "https://github.com/Sunilsahoo96/Speak-Verse",
    projectColor: "#9333ea",
  },
  {
    title: "Excel Analytics Platform",
    subtitle:
      "A MERN-based platform for analyzing and visualizing Excel data seamlessly.",
    description:
      "An intuitive, full-stack MERN-based application to upload, analyze, and visualize Excel files. The platform empowers users to extract insights from spreadsheets using rich charts, history tracking, and optional AI-powered analysis.",
    tags: [
      "React.js",
      "Redux Toolkit",
      "Chart.js",
      "Three.js",
      "JWT",
      "Tailwind",
      "Axios",
      "Node",
      "Express",
      "MongoDB",
      "Multer",
    ],
    image: "/excel.png",
    liveDemo: "",
    githubRepo: "https://github.com/Sunilsahoo96/Excel-Analytics",
    projectColor: "#432dd7",
  },
  {
    title: "Hospital Management System",
    subtitle:
      "A role-based hospital operations platform for efficient and secure healthcare management.",
    description:
      "Hospital Management System is a role-based, full-stack MERN application designed to streamline hospital operations and improve workflow efficiency.It supports multiple user roles including Admin, Doctor, and Receptionist with secure JWT-based authentication and controlled access.The system enables end-to-end management of patients, medicines, appointments, and billing with a strong focus on data integrity.A dynamic Sell Medicine module allows patient lookup via UAN, animated medicine selection, automated billing, and PDF invoice generation.The application follows a clean MVC architecture with a centralized API request utility for maintainability.Material UI is used for data-dense admin views, complemented by smooth UI animations for an enhanced user experience.Built with scalability, security, and responsiveness in mind, it is production-ready for real-world hospital environments.",
    tags: [
      "React",
      "Tailwind CSS",
      "Material UI",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
    ],
    image: "hospital.png",
    liveDemo: "https://hospital-management-system-fzws.onrender.com/",
    githubRepo: "https://github.com/Sunilsahoo96/Hospital-Mng-Frontend",
    projectColor: "#EA580C",
  },
  {
    title: "Realtime Collaberative Editor",
    subtitle:
      "Live collaborative rich-text editing powered by Socket.IO and Quill.",
    description:
      "Real-Time Collaborative Editor is a modern, multi-user editing platform that enables multiple users to write and edit documents simultaneously with live synchronization. Built using React and TypeScript, it delivers a type-safe, scalable frontend architecture with a clean and responsive UI powered by TailwindCSS. The editor leverages Quill.js for rich-text editing, providing a smooth and intuitive writing experience. Real-time collaboration is achieved using Socket.IO, ensuring instant content updates across all connected users. With quill-cursors integration, the editor visually displays active users and their cursor positions, making collaboration clear and efficient. The system is designed for low latency, conflict-free editing, and a seamless real-time user experience suitable for team-based content creation.",
    tags: [
      "React",
      "Typescript",
      "Tailwind CSS",
      "Axios",
      "Quill.js",
      "quill-cursors",
      "socket.io-client",
    ],
    image: "/editor.png",
    liveDemo: "https://sunil-sahoo-wasserstoff.onrender.com",
    githubRepo: "https://github.com/Sunilsahoo96/realtime-collaberative-editor",
    projectColor: "#d51243",
  },
  {
    title: "Jarvis AI - Virtual Assistant",
    subtitle:
      "An interactive JavaScript virtual assistant using Web Speech APIs.",
    description:
      "Jarvis AI is a simple virtual assistant that uses speech synthesis and speech recognition to assist users with various tasks. This project demonstrates the integration of JavaScript for creating an interactive virtual assistant that can understand commands and respond accordingly.",
    tags: ["HTML", "CSS", "JavaScript", "SpeechSynthesis", "SpeechRecognition"],
    image: "/jarvis.png",
    liveDemo: "https://virtual-assistant-jarvis.netlify.app/",
    githubRepo: "https://github.com/Sunilsahoo96/JARVIS-Virtual-Assistant",
    projectColor: "#2563eb",
  },

  {
    title: "Reciepe Finder",
    subtitle: "",
    description:"The Recipe Finder App is a user-friendly application designed to help users quickly discover recipes based on ingredients, cuisine, or meal preferences. It integrates with a public recipe API to fetch detailed recipe information, including ingredients, cooking instructions, and nutritional data. With a clean, responsive interface and optimized search experience, the app simplifies meal planning and inspires users to explore new dishes efficiently.",
    tags: ["React", "Tailwind CSS", "Food API"],
    image: "/food.png",
    liveDemo: "https://reciepe-react-app.netlify.app/",
    githubRepo: "https://github.com/Sunilsahoo96/Reciepe-Finder-App",
    projectColor: "#9333ea",
  },
];

const ProjectTimeline = () => {
  const { themeColors } = useSelector((state) => state.themeReducer);

  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <section
      id="projects"
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: themeColors.bg }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              backgroundColor: project.projectColor,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(60px)",
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-screen-xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold inline-block px-6 py-2 relative z-10"
            style={{
              color: themeColors.primaryColor,
              backgroundColor: themeColors.bg,
            }}
            whileHover={{ scale: 1.02 }}
          >
            <span className="relative z-10">Latest Works</span>
            <motion.span
              className="absolute bottom-0 left-0 right-0 h-1 mx-auto"
              style={{ backgroundColor: themeColors.primaryColor }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            />
          </motion.h2>
        </motion.div>

        {/* Vertical timeline line */}
        <div
          className="w-0.5 hidden sm:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2"
          style={{ backgroundColor: themeColors.primaryColor }}
        ></div>

        {/* Projects */}
        <div className="space-y-24 sm:space-y-32">
          {projects.map((project, index) => {
            const isHovered = hoveredProject === index;

            return (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                isHovered={isHovered}
                setHoveredProject={setHoveredProject}
              />
            );
          })}
        </div>
      </div>

      {/*Note for Read... */}
      <motion.div
        className="max-w-2xl mx-auto mt-20 px-6 relative group"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            backgroundColor: themeColors.cardBg,
            border: `1px solid ${themeColors.borderLight}`,
            boxShadow: `0 4px 20px ${themeColors.shadow}`,
            opacity: 0.7,
          }}
        />

        <div className="relative z-10 p-6 md:p-8">
          <div className="flex items-start gap-4">
            {/* <div
              className="flex-shrink-0 mt-1 w-3 h-3 rounded-full"
              style={{ backgroundColor: themeColors.accentGold }}
            /> */}

            <div>
              <motion.p
                className="text-lg md:text-xl leading-relaxed"
                style={{ color: themeColors.text }}
                whileHover={{
                  x: 4,
                  transition: { duration: 0.3 },
                }}
              >
                <span
                  className="font-bold"
                  style={{ color: themeColors.primaryColor }}
                >
                  Project Selection:{" "}
                </span>
                During my learning journey, I built several practice projects
                including{" "}
                <span
                  className="font-medium"
                  style={{ color: themeColors.accentBlue }}
                >
                  calculator
                </span>
                ,{" "}
                <span
                  className="font-medium"
                  style={{ color: themeColors.accentBlue }}
                >
                  watches
                </span>
                ,{" "}
                <span
                  className="font-medium"
                  style={{ color: themeColors.accentBlue }}
                >
                  website clones
                </span>
                , and{" "}
                <span
                  className="font-medium"
                  style={{ color: themeColors.accentBlue }}
                >
                  many more
                </span>{" "}
                to sharpen my skills. The projects shown above represent my{" "}
                <span
                  className="font-semibold"
                  style={{ color: themeColors.accentGreen }}
                >
                  best work
                </span>{" "}
                — fully designed and developed from scratch, showcasing complete{" "}
                <span
                  className="font-semibold"
                  style={{ color: themeColors.accentGold }}
                >
                  UI/UX ownership
                </span>{" "}
                and{" "}
                <span
                  className="font-semibold"
                  style={{ color: themeColors.accentGold }}
                >
                  project building logic
                </span>
                .
              </motion.p>

              <motion.div
                className="mt-6 pt-4 flex flex-wrap items-center justify-between gap-4 border-t"
                style={{ borderColor: themeColors.borderLight }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: themeColors.accentRed }}
                  />
                  <span
                    className="text-xs uppercase tracking-wider"
                    style={{ color: themeColors.summeryText }}
                  >
                    Currently Mastering
                  </span>
                </div>

                <div
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: themeColors.cardSecondary,
                    color: themeColors.secondary,
                    border: `1px solid ${themeColors.border}`,
                  }}
                >
                  Next.js
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectTimeline;
