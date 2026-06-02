import React, { memo } from "react";
import { useSelector } from "react-redux";

function RightSideContent() {
  const { themeColors } = useSelector((state) => state.themeReducer);

  const approachCards = [
    {
      icon: "🧠",
      title: "Analytical Problem Solving",
      description:
        "I enjoy breaking down complex problems into manageable solutions.",
    },
    {
      icon: "🔄",
      title: "Lifelong Learning",
      description:
        "Committed to staying updated with the latest web technologies.",
    },
  ];

  const Highlight = ({ children }) => (
    <span style={{ color: themeColors.primaryColor }}>{children}</span>
  );

  return (
    <div className="lg:w-1/2">
      <div className="sticky top-24">
        <div className="mb-10">
          {/* heading */}
          <h3
            className="text-3xl font-semibold mb-6"
            style={{ color: themeColors.primaryColor }}
          >
            My Development Philosophy
          </h3>

          {/* summary  */}
          <div
            className="p-6 rounded-xl"
            style={{
              backgroundColor: `${themeColors.primaryColor}08`,
              border: `1px solid ${themeColors.border}`,
            }}
          >
            <p
              className="text-lg leading-relaxed"
              style={{ color: themeColors.summeryText }}
            >
              <li>
                <Highlight>React, TypeScript, Flutter</Highlight>: Architecting
                type-safe, scalable frontend applications across web and mobile
                with a strong focus on performance, maintainability, and clean
                component design. I leverage modern React patterns, efficient
                state management, and SSR-capable architectures to deliver
                high-quality user experiences and SEO-friendly interfaces.
              </li>

              <li>
                <Highlight>
                  MERN Stack, MongoDB, Node.js, Laravel, PHP
                </Highlight>
                : Building robust and scalable backend architectures. I
                specialize in designing and implementing RESTful APIs using
                Express and MongoDB, as well as Laravel- and PHP-based backends,
                with a strong emphasis on performance, security, and
                maintainable full-stack solutions.
              </li>

              <li>
                <Highlight>Redux Toolkit, Zustand, Context API, Zod</Highlight>:
                Managing complex application and server state with predictable
                data flows and enforcing strict runtime validation. I ensure
                robust state architecture with optimized updates, type safety,
                and data integrity.
              </li>

              <li>
                <Highlight>
                  Tailwind CSS, Shadcn UI, Material UI, Framer Motion
                </Highlight>
                : Expertly crafting clean, accessible, and animated user
                interfaces. I ensure pixel-perfect implementation from complex
                Figma mockups with consistent design systems.
              </li>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {approachCards.map((card, index) => (
            <div
              key={index}
              className="p-5 rounded-lg flex flex-col"
              style={{
                backgroundColor: themeColors.bg,
                border: `1px solid ${themeColors.border}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-2xl"
                style={{
                  backgroundColor: `${themeColors.primaryColor}15`,
                  color: themeColors.primaryColor,
                }}
              >
                {card.icon}
              </div>
              <h4
                className="text-lg font-semibold mb-2"
                style={{ color: themeColors.primaryColor }}
              >
                {card.title}
              </h4>
              <p className="text-sm" style={{ color: themeColors.summeryText }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* <div className="mt-8">
          <h4
            className="text-lg font-semibold mb-4"
            style={{ color: themeColors.primaryColor }}
          >
            Upcoming Learning Goals
          </h4>
          <div className="flex flex-wrap gap-2">
            {["Frontend Specialization", "Modern Web Development"].map(
              (item, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: `${themeColors.primaryColor}15`,
                    color: themeColors.primaryColor,
                    border: `1px solid ${themeColors.primaryColor}30`,
                  }}
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default memo(RightSideContent);
