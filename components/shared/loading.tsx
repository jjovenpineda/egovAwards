"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import egov from "@/public/assets/images/egov.svg";
import { m } from "motion/react";

export default function Loading() {
  return (
    <>
      <div className=" fixed z-50 inset-0 flex h-full items-center justify-center bg-white px-10 ">
        <div className="relative flex gap-6 flex-col items-center justify-center">
          <div className="px-2">
            <Image
              src={egov}
              alt="egov"
              loading="lazy"
              className="max-w-[300px] w-full lg:max-w-[350px]"
            />
          </div>
          <div className="size-full">
            <m.div
              className="h-1.5 rounded-full w-full bg-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
