import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const { themeColors } = useSelector((state) => state.themeReducer);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState([]);

  // Position motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    // Only enable on devices that have a cursor (no touch devices)
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
      
    if (isTouchDevice) return;

    setIsVisible(true);
    document.documentElement.classList.add("custom-cursor-enabled");

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = (e) => {
      setIsClicked(true);
      // Add a ripple effect at the click coordinate
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    const handleMouseUp = () => setIsClicked(false);

    // Watch hover states on links, buttons, inputs, and elements with cursor pointer
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.getAttribute("role") === "button" ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Click ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          style={{
            position: "fixed",
            top: ripple.y,
            left: ripple.x,
            width: 10,
            height: 10,
            borderRadius: "50%",
            border: `2px solid ${themeColors.primaryColor}`,
            x: "-50%",
            y: "-50%",
            pointerEvents: "none",
            zIndex: 99998,
          }}
          initial={{ scale: 0.2, opacity: 0.8 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      ))}

      {/* Main Cursor Arrow/Hand */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: cursorX,
          y: cursorY,
          pointerEvents: "none",
          zIndex: 100000,
          transformOrigin: "0px 0px", // Animates relative to the pointer tip
        }}
        animate={{
          scale: isClicked ? 0.85 : isHovered ? 1.15 : 1,
          rotate: isClicked ? -8 : isHovered ? -15 : 0, // Tilt slightly when hovered (like hand) or clicked
        }}
        transition={{
          type: "spring",
          stiffness: 450,
          damping: 25,
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          style={{
            overflow: "visible",
          }}
        >
          {isHovered ? (
            // Pointing Hand (when hovering) or Grabbing Fist (when clicked on hovered item)
            isClicked ? (
              // Grabbing hand
              <g transform="translate(-11, -5)">
                <path
                  d="M12,5 C11.5,5 11,5.5 11,6 L11,11 L10,11 L10,7 C10,6.5 9.5,6 9,6 C8.5,6 8,6.5 8,7 L8,11 L7,11 L7,7.5 C7,7 6.5,6.5 6,6.5 C5.5,6.5 5,7 5,7.5 L5,11 L4,11 L4,8.5 C4,8 3.5,7.5 3,7.5 C2.5,7.5 2,8 2,8.5 L2,13.5 C2,16.5 4.5,19 7.5,19 L9.5,19 C12.5,19 15,16.5 15,13.5 L15,8.5 C15,8 14.5,7.5 14,7.5 C13.5,7.5 13,8 13,8.5 L13,11 L12,11 L12,6 C12,5.5 11.5,5 11,5 Z"
                  fill={themeColors.primaryColor}
                  stroke={themeColors.bg}
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  style={{
                    filter: `drop-shadow(1px 2px 2px ${themeColors.shadow || "rgba(0,0,0,0.3)"})`
                  }}
                />
              </g>
            ) : (
              // Pointing hand (finger tip at (11, 2) translated to (0,0))
              <g transform="translate(-11, -2)">
                <path
                  d="M12,2 C11.5,2 11,2.5 11,3 L11,11 L10,11 L10,5.5 C10,5 9.5,4.5 9,4.5 C8.5,4.5 8,5 8,5.5 L8,11 L7,11 L7,6.5 C7,6 6.5,5.5 6,5.5 C5.5,5.5 5,6 5,6.5 L5,11 L4,11 L4,7.5 C4,7 3.5,6.5 3,6.5 C2.5,6.5 2,7 2,7.5 L2,13.5 C2,16.5 4.5,19 7.5,19 L9.5,19 C12.5,19 15,16.5 15,13.5 L15,7.5 C15,7 14.5,6.5 14,6.5 C13.5,6.5 13,7 13,7.5 L13,11 L12,11 L12,3 C12,2.5 11.5,2 11,2 Z"
                  fill={themeColors.primaryColor}
                  stroke={themeColors.bg}
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  style={{
                    filter: `drop-shadow(1px 2px 2px ${themeColors.shadow || "rgba(0,0,0,0.3)"})`
                  }}
                />
              </g>
            )
          ) : (
            // Default Arrow (tip at (0, 0))
            <g transform="translate(0, 0)">
              <path
                d="M0,0 L0,16 L4.5,11.5 L8.5,19.5 L11,18 L7.2,10.2 L13,10.2 Z"
                fill={themeColors.primaryColor}
                stroke={themeColors.bg}
                strokeWidth="1.5"
                strokeLinejoin="round"
                style={{
                  filter: `drop-shadow(1px 2px 2px ${themeColors.shadow || "rgba(0,0,0,0.3)"})`
                }}
              />
            </g>
          )}
        </svg>
      </motion.div>
    </>
  );
};

export default CustomCursor;
