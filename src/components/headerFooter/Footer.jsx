import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { motion, useScroll, useTransform } from "framer-motion";
import SocialLinks from "../FooterSocials";

const Footer = () => {
  const { themeColors, theme } = useSelector((state) => state.themeReducer);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.25], [30, 0]);

  return (
    <motion.footer
      ref={containerRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: themeColors.bg,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: `1px solid ${themeColors.borderLight}`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 75% 20%, ${
            theme === "dark"
              ? "rgba(242, 140, 38, 0.05)"
              : "rgba(234, 88, 12, 0.05)"
          } 0%, transparent 55%)`,
        }}
      />

      <motion.div
        className="max-w-7xl mx-auto px-6 md:px-12 py-16 lg:py-20"
        style={{ opacity, y }}
      >
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2
              className="text-4xl md:text-5xl font-light leading-tight mb-4"
              style={{ color: themeColors.primaryColor }}
            >
              Thanks for stopping by.
            </h2>
            <p
              className="text-sm md:text-base max-w-xl leading-7"
              style={{ color: themeColors.summeryText }}
            >
              I&apos;m Sunil — a fullstack developer who enjoys making clean,
              calm web experiences with React, animation, and thoughtful detail.
            </p>
          </motion.div>

          <motion.div
            className="rounded-4xl border p-8 md:p-10 bg-opacity-70"
            style={{
              borderColor: themeColors.borderLight,
              backgroundColor: themeColors.cardBg,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <p
              className="text-sm uppercase tracking-[0.3em] mb-4"
              style={{ color: themeColors.primaryColor }}
            >
              Say Hello
            </p>
            <h3
              className="text-2xl font-semibold mb-6"
              style={{ color: themeColors.text }}
            >
              Let&apos;s connect
            </h3>
            <p
              className="text-sm leading-6 mb-8"
              style={{ color: themeColors.summeryText }}
            >
              If you want to chat about code, personal projects, or what I&apos;m
              working on next, send a quick note on LinkedIn.
            </p>
            <motion.a
              href="https://www.linkedin.com/in/sunil-sahoo96/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium"
              style={{
                backgroundColor: themeColors.primaryColor,
                color: themeColors.cardBg,
              }}
              whileHover={{ y: -2, boxShadow: `0 10px 30px -18px ${themeColors.primaryColor}` }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 360, damping: 18 }}
            >
              Start a conversation
            </motion.a>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1fr] items-center">
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <p
              className="text-sm leading-6"
              style={{ color: themeColors.summeryText }}
            >
              I enjoy building simple, thoughtful interfaces that are easy to
              use and pleasant to explore.
            </p>
            <div className="flex gap-4 items-center flex-wrap">
              <SocialLinks />
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-start md:items-end gap-4"
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <p
              className="text-xs uppercase tracking-[0.22em]"
              style={{ color: themeColors.summeryText }}
            >
              © {new Date().getFullYear()} Sunil Sahoo — Crafted with care.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
