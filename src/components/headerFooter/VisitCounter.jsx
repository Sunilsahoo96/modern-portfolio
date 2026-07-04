import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiUsers } from "react-icons/fi";
import useVisitorCount from "../../hooks/useVisitorCount";

const VisitCounter = () => {
  const { themeColors, theme } = useSelector((state) => state.themeReducer);
  const { count, loading, error } = useVisitorCount();

  // If there's an error, hide the badge to keep the layout clean.
  if (error) return null;

  return (
    <motion.div
      className="flex items-center gap-1.5 px-3 py-1 md:py-1.5 rounded-full border text-[11px] md:text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm cursor-default select-none"
      style={{
        backgroundColor: theme === "dark" ? "rgba(30, 30, 30, 0.4)" : "rgba(255, 255, 255, 0.5)",
        borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: themeColors.text,
        boxShadow: theme === "dark" 
          ? `0 4px 15px -3px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)` 
          : `0 4px 15px -3px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.02)`,
      }}
      whileHover={{ 
        y: -2.5, 
        scale: 1.03,
        borderColor: themeColors.primaryColor,
        boxShadow: theme === "dark"
          ? `0 10px 25px -8px ${themeColors.primaryColor}50, 0 0 0 1px ${themeColors.primaryColor}20`
          : `0 10px 25px -8px ${themeColors.primaryColor}30, 0 0 0 1px ${themeColors.primaryColor}20`,
      }}
      initial={{ opacity: 0, scale: 0.9, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Pulsing Green status indicator */}
      <span className="relative flex h-2 w-2">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{ backgroundColor: themeColors.accentGreen || "#10B981" }}
        ></span>
        <span
          className="relative inline-flex rounded-full h-2 w-2"
          style={{ backgroundColor: themeColors.accentGreen || "#10B981" }}
        ></span>
      </span>

      {/* Icon */}
      <FiUsers 
        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" 
        style={{ color: themeColors.primaryColor }}
      />

      {/* Count Text */}
      {loading ? (
        <span className="animate-pulse bg-gray-400/25 h-3.5 w-8 rounded"></span>
      ) : (
        <span 
          className="font-medium tracking-normal"
          style={{ color: themeColors.text }}
        >
          {count?.toLocaleString() || "0"}
        </span>
      )}
    </motion.div>
  );
};

export default VisitCounter;
