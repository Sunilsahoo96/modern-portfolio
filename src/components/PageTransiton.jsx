// components/PageTransition.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const PageTransition = ({ children }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="relative"
    >
      {/* Global hover background effect */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-[420px] h-[420px] rounded-full blur-3xl opacity-20 fixed inset-0 z-[1]"
        animate={{
          x: mousePos.x - 210,
          y: mousePos.y - 210,
        }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
        }}
        style={{
          background:
            "radial-gradient(circle at center, rgba(99,102,241,0.6), transparent 70%)",
        }}
      />

      {/* App content */}
      <div className="relative z-10">{children}</div>
    </motion.main>
  );
};

export default PageTransition;
