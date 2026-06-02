import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

const BackToTop = () => {
  const { themeColors } = useSelector((state) => state.themeReducer);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.pageYOffset > 350);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={handleClick}
          className="fixed right-5 bottom-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full shadow-xl focus:outline-none"
          style={{
            backgroundColor: themeColors.primaryColor,
            color: themeColors.cardBg,
            boxShadow: `0 22px 40px -28px ${themeColors.primaryColor}`,
          }}
          aria-label="Back to top"
        >
          <FiArrowUp className="text-xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
