import React from "react";
import { useSelector } from "react-redux";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const FooterSocial = () => {
  const { themeColors } = useSelector((state) => state.themeReducer);
  const socials = [
    {
      id: "whatsapp",
      icon: FaWhatsapp,
      label: "8658263704",
      url: "https://wa.me/918658263704",
      color: "#128C7E",
    },
    {
      id: "linkedin",
      icon: FiLinkedin,
      label: "in/sunil",
      url: "https://www.linkedin.com/in/sunil-sahoo96/",
      color: "#0e76a8",
    },
    {
      id: "github",
      icon: FiGithub,
      label: "Sunilsahoo96",
      url: "https://github.com/Sunilsahoo96/",
      color: themeColors.text,
    },
      {
      id: "instagram",
      icon: FiInstagram,
      label: "sunil_sahoo_45",
      url: "https://www.instagram.com/sunil_sahoo_45/",
      color: "#E4405F",
    },
  ];

  return (
    <div className="flex items-center justify-center flex-wrap gap-3">
      {/* eslint-disable-next-line */}
      {socials.map(({ id, icon: Icon, label, url, color }) => (
        <a
          key={id}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center justify-start h-12.5 w-12.5 rounded-xl shadow-md transition-all duration-300 overflow-hidden hover:w-40 hover:rounded-md cursor-pointer`}
          style={{
            backgroundColor: themeColors.bg,
          }}
        >
          <div className="flex items-center gap-2 px-2">
            <Icon className="w-6 h-6" style={{ color }} />
            <span
              className={`text-sm font-medium transition-all duration-300 w-0 overflow-hidden group-hover:w-22.5`}
              style={{ color: themeColors.text }}
            >
              {label}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default FooterSocial;