"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

const icons = [
  "fa-cloud",
  "fa-trophy",
  "fa-medal",
  "fa-laptop-code",
  "fa-code",
  "fa-cogs",
  "fa-fingerprint",
  "fa-microchip",
  "fa-database",
];

const colors = [
  "#C0D7F2",
  "#CFDCEB",
  "#BCDBFF",
  "#93C5FD",
  "#DBE3F1",
  "#BCDBFF",
  "#C4D4FA",
  "#CFDCEB",
  "#DBE3F1",
];

const fontSize = [".7rem", "1rem", "1.2rem", "1.2rem"];

export default function FloatingIcons() {
  const [iconElements, setIconElements] = useState<
    {
      id: number;
      icon: string;
      left: string;
      top: string;
      color: string;
      fontSize: string;
      animationDelay: string;
    }[]
  >([]);
  useEffect(() => {
    const newIcons = [];

    for (let i = 0; i < 100; i++) {
      newIcons.push({
        id: i,
        icon: icons[Math.floor(Math.random() * icons.length)],
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        color: colors[Math.floor(Math.random() * colors.length)],
        fontSize: fontSize[Math.floor(Math.random() * fontSize.length)],
        animationDelay: `${Math.random() * 4}s`,
      });
    }

    setIconElements(newIcons);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        />
      </div>
      <div className=" inset-0   overflow-hidden   ">
        <div className="absolute  w-full h-full opacity-30 ">
          {iconElements.map(
            ({ id, icon, left, top, color, fontSize, animationDelay }) => (
              <i
                key={id}
                className={`fa ${icon} absolute animate-float   `}
                style={{ left, top, color, fontSize, animationDelay }}
              ></i>
            )
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
