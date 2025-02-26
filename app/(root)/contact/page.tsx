"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import underDev from "@/public/assets/website-maintenance.json";
import { m } from "motion/react";
import bg from "@/public/assets/images/bg-gradient.webp";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import Image from "next/image";
export default function Contact() {
  return (
    <div className="p-10 relative">
      {" "}
      <div className="max-w-[600px] mx-auto">
        <Lottie animationData={underDev} loop={true} />{" "}
      </div>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
        className="scale-[1.30] absolute inset-0 pointer-events-none"
      >
        <Image src={bg} alt="" fill className=" object-cover -z-50" />
      </m.div>
    </div>
  );
}
