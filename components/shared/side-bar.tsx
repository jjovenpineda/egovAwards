"use client";

import React, { useEffect, useState } from "react";
import { links } from "@/constants";
import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteCookie, getUserInfo } from "@/utils/utility";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronsUpDown,
  LogOut,
  PanelRightClose,
  PanelRightOpen,
  Settings,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { storage } from "@/utils/useStorage";
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
  const logout = () => {
    deleteCookie("authToken");
    storage.removeAll();
    router.push("/sign-in");
  };
  const getInfo = () => {
    const info = getUserInfo();
    if (info) {
      setUserInfo(info);
    }
  };
  const toggleSidebarcollapse = () => {
    setCollapse((prevState) => !prevState);
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
        animate={{ opacity: 1, x: 0, width: isCollapsed ? "70px" : "230px" }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        className="w-[230px] sticky top-0 hidden md:block"
      >
        <m.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          className="flex flex-col bg-white sticky top-0 h-screen col-span-1 ring-1 ring-gray-900/5 border-r"
        >
          <div className="flex py-2 justify-center h-20 mt-8">
            {isCollapsed ? (
              <div className="w-full ">
                <img
                  src="https://img.freepik.com/premium-vector/logo-lorem-ipsum-slogan-design-art-template_642953-198.jpg?w=360"
                  className="size-full object-contain"
                />
              </div>
            ) : (
              <div className="w-full ">
                <img
                  src="https://img.freepik.com/premium-vector/logo-lorem-ipsum-slogan-design-art-template_642953-198.jpg?w=360"
                  className="size-full object-contain"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col h-full justify-between p-2">
            <div className="space-y-2">
              <button
                onClick={toggleSidebarcollapse}
                className={`w-full transition-colors flex hover:outline hover:bg-slate-100 outline-1 outline-slate-400  items-center gap-2  px-3 py-1.5 text-sm font-medium rounded-md hover:text-blue-800 text-[#334155] ${
                  isCollapsed
                    ? "justify-center bg-blue-100 outline"
                    : "justify-between"
                }`}
              >
                {isCollapsed ? (
                  <PanelRightClose className="h-4 w-4 text-slate-900 " />
                ) : (
                  <>
                    <h1 className="text-slate-900 text-nowrap">
                      Minimize sidebar
                    </h1>{" "}
                    <PanelRightOpen className="h-4 w-4 text-slate-900 " />
                  </>
                )}
              </button>
              <hr className="opacity-55" />
              <div className="space-y-1 cursor-pointer">
                {links.map((link, index) => (
                  <div key={index}>
                    {link.children ? (
                      <Accordion type="single" collapsible className="w-full ">
                        <AccordionItem value="item-1" className="border-0">
                          <m.div
                            initial={{ opacity: 0, position: "relative" }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className=""
                          >
                            <AccordionTrigger
                              className={`animate-click pl-0 [data-state]:opacity-0 hover:no-underline flex overflow-hidden items-center gap-2 p-1 px-2 rounded-md group text-slate-900 hover:bg-slate-100 w-full
                  ${isCollapsed && "justify-center gap-0 pl-3"} `}
                            >
                              <div>
                                <link.icons
                                  size={15}
                                  className={`shrink-0  text-slate-900 ${
                                    isCollapsed && "ml-3"
                                  }`}
                                />
                              </div>

                              {!isCollapsed && (
                                <m.p
                                  initial={{
                                    opacity: 0,
                                    position: "relative",
                                  }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 1 }}
                                  className="w-full text-slate-900"
                                >
                                  {link.label}{" "}
                                </m.p>
                              )}
                            </AccordionTrigger>
                          </m.div>
                          <AccordionContent className="text-slate-100 pb-2 border-b ">
                            {link.children.map((child, index) => (
                              <Link
                                href={child.href}
                                key={index}
                                onClick={() =>
                                  setCurrentPath(child.href.slice(1))
                                }
                                className={`animate-click mx-4 flex overflow-hidden items-center gap-2 p-1 px-2 rounded-md group hover:bg-slate-100 
                       ${isCollapsed && "justify-center ml-0 w-full"} ${
                                  currentPath === child.href.slice(1) &&
                                  "bg-slate-200 hover:bg-slate-200 shadow-sm border border-slate-700"
                                }`}
                              >
                                {" "}
                                <child.icons
                                  size={15}
                                  className="shrink-0 text-slate-900 
     "
                                />
                                {!isCollapsed && (
                                  <m.p
                                    className={` text-sm text-slate-900 text-nowrap`}
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
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <Link
                        href={link.href}
                        key={link.label}
                        onClick={() => setCurrentPath(link.href.slice(1))}
                        className={`animate-click flex overflow-hidden items-center gap-2 p-1 px-2 rounded-md group hover:bg-slate-100 w-full
                  ${isCollapsed && "justify-center"} ${
                          currentPath === link.href.slice(1) &&
                          "bg-slate-200 hover:bg-slate-200 shadow-sm border border-slate-700"
                        }`}
                      >
                        {" "}
                        <link.icons
                          size={15}
                          className="shrink-0 text-slate-900 
"
                        />
                        {!isCollapsed && (
                          <m.p
                            className={` text-sm text-slate-900 text-nowrap`}
                            initial={{ opacity: 0, position: "relative" }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                          >
                            {link.label}
                          </m.p>
                        )}
                      </Link>
                    )}
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
