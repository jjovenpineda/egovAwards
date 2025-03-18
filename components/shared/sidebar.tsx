"use client";

import React, { useEffect, useState } from "react";
import { dashboardLinks } from "@/constants";
import { AnimatePresence, m } from "motion/react";
import Link from "next/link";

import { useSearchParams } from "next/navigation";

import { useRouter } from "next/navigation";
import { getUserInfo } from "@/utils/utility";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import eGOVLogo from "@/public/assets/images/eGOV_Logo.webp";
import { storage } from "@/utils/useStorage";
import { Label } from "../ui/label";
interface Info {
  email: string;
  fullname: string;
  id: string;
  role: string;
  token: string;
}
export default function SideBar() {
  const router = useRouter();
  const [isCollapsed, setCollapse] = useState(false);
  const [userInfo, setUserInfo] = useState<Info>();
  const [currentPath, setCurrentPath] = useState("");
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  const getInfo = () => {
    const info = getUserInfo();
    if (info) {
      setUserInfo(info);
    }
  };

  const CurrentPathname = () => {
    const url = window.location.pathname;
    const firstParam = url.split("/")[1];
    setCurrentPath(firstParam);
  };

  useEffect(() => {
    CurrentPathname();
    getInfo();
  }, []);
  return (
    <AnimatePresence>
      <m.div
        animate={{
          opacity: 1,
          x: 0,
          width: isCollapsed ? "70px" : "230px",
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        className="w-[230px] sticky top-0 hidden md:block z-10"
      >
        <m.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          className="flex flex-col bg-slate-950 sticky px-2 top-0 h-screen col-span-1 ring-1 ring-gray-950/5 border-r"
        >
          <div className="flex py-2 px-6 justify-center h-32 mt-8">
            <div className="w-full  ">
              <Image
                src={eGOVLogo}
                alt="egov logo"
                className="size-full object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col h-full justify-between p-2">
            <div className="space-y-2">
              <div className="space-y-4 cursor-pointer">
                {dashboardLinks.map((link, index) => (
                  <div key={index} className="text-slate-400 ">
                    <Label className="font-bold text-xs uppercase text-slate-500">
                      {link.category}
                    </Label>
                    {link.items &&
                      link.items.length > 0 &&
                      link.items.map((child, index) => (
                        <React.Fragment key={index}>
                          {child.query != null ? (
                            <div key={index}>
                              <Link
                                draggable={false}
                                href={{
                                  pathname: child.href,
                                  query: child.query,
                                }}
                                key={child.label}
                                onClick={() =>
                                  setCurrentPath(child.href.slice(1))
                                }
                                className={`flex overflow-hidden items-center gap-2 p-2 px-2 group hover:bg-blue-950 w-full
                   ${isCollapsed && "justify-center"} ${
                                  filter === child.query?.filter &&
                                  " bg-blue-950 border-blue-500 border-l-4 "
                                }`}
                              >
                                <child.icons
                                  size={15}
                                  className={`shrink-0  ${
                                    filter === child.query?.filter
                                      ? "text-white"
                                      : "text-slate-400 "
                                  }`}
                                />

                                {!isCollapsed && (
                                  <m.p
                                    className={` text-sm font-semibold text-nowrap ${
                                      filter === child.query?.filter
                                        ? "text-white"
                                        : "text-slate-400 "
                                    }`}
                                    initial={{
                                      opacity: 0,
                                      position: "relative",
                                    }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1 }}
                                  >
                                    {child.label}
                                  </m.p>
                                )}
                              </Link>
                            </div>
                          ) : (
                            <div key={index}>
                              <Link
                                draggable={false}
                                href={{
                                  pathname: child.href,
                                  query: child.query,
                                }}
                                key={child.label}
                                onClick={() =>
                                  setCurrentPath(child.href.slice(1))
                                }
                                className={`flex overflow-hidden items-center gap-2 p-2 px-2 group hover:bg-blue-950 w-full
                   ${isCollapsed && "justify-center"} ${
                                  currentPath === child.href.slice(1) &&
                                  " bg-blue-950 border-blue-500 border-l-4 "
                                }`}
                              >
                                <child.icons
                                  size={15}
                                  className={`shrink-0  ${
                                    currentPath === child.href.slice(1)
                                      ? "text-white"
                                      : "text-slate-400 "
                                  }`}
                                />

                                {!isCollapsed && (
                                  <m.p
                                    className={` text-sm font-semibold text-nowrap ${
                                      currentPath === child.href.slice(1)
                                        ? "text-white"
                                        : "text-slate-400 "
                                    }`}
                                    initial={{
                                      opacity: 0,
                                      position: "relative",
                                    }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1 }}
                                  >
                                    {child.label}
                                  </m.p>
                                )}
                              </Link>
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </m.div>
      </m.div>
    </AnimatePresence>
  );
}
