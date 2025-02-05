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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
    <m.div
      animate={{ opacity: 1, x: 0, width: isCollapsed ? "55px" : "230px" }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      className="w-[230px]"
    >
      <m.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        className="flex flex-col bg-slate-800 sticky top-0 h-screen col-span-1 ring-1 ring-gray-900/5"
      >
        <div className="flex gap-2 py-2 justify-center">
          {isCollapsed ? (
            <div className="rounded-md bg-slate-800 w-full h-20 flex items-center justify-center text-md font-semibold text-slate-100">
              PSGC
            </div>
          ) : (
            <div className="rounded-md bg-slate-800 w-full h-20 flex items-center justify-center text-4xl font-semibold text-slate-100">
              PSGC
            </div>
          )}
        </div>
        <div className="flex flex-col h-full justify-between p-2">
          <div className="space-y-2">
            <button
              onClick={toggleSidebarcollapse}
              className={`w-full transition-colors flex hover:outline hover:bg-slate-700 outline-1 outline-slate-400  items-center gap-2  px-3 py-1.5 text-sm font-medium rounded-md hover:text-blue-800 text-[#334155] ${
                isCollapsed ? "justify-center" : "justify-between "
              }`}
            >
              {isCollapsed ? (
                <PanelRightClose className="h-4 w-4 text-slate-300 " />
              ) : (
                <>
                  <h1 className="text-slate-300 text-nowrap">
                    Minimize sidebar
                  </h1>{" "}
                  <PanelRightOpen className="h-4 w-4 text-slate-300 " />
                </>
              )}
            </button>
            <hr className="opacity-55" />
            <div className="space-y-1">
              {links.map((link) => (
                <Link
                  href={link.href}
                  key={link.label}
                  onClick={() => setCurrentPath(link.href.slice(1))}
                  className={`animate-click flex overflow-hidden items-center gap-2 p-1 px-2 rounded-md group hover:bg-slate-700 w-full
                    ${isCollapsed && "justify-center"} ${
                    currentPath === link.href.slice(1) && "bg-slate-700"
                  }`}
                >
                  <link.icons
                    size={15}
                    className="shrink-0 text-slate-100 
"
                  />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <m.p
                        className={` text-sm text-slate-100 text-nowrap`}
                        initial={{ opacity: 0, position: "relative" }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                      >
                        {link.label}
                      </m.p>
                    )}
                  </AnimatePresence>
                </Link>
              ))}
            </div>
          </div>
          <Popover>
            <PopoverTrigger>
              <div
                className={`animate-click flex  w-full gap-2 items-center p-2 rounded-md group hover:bg-slate-700 ${
                  isCollapsed ? "justify-center " : "justify-between"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="rounded-md size-9 overflow-hidden">
                    <img
                      src={"https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
                      alt=""
                      className="object-cover size-full"
                    />
                  </div>
                  {!isCollapsed && (
                    <div className="text-start text-nowrap">
                      <p className="text-xs text-slate-200 ">
                        {userInfo?.fullname}
                      </p>
                      <p className="text-sm text-slate-100 ">
                        {userInfo?.email}
                      </p>
                    </div>
                  )}
                </div>
                {!isCollapsed && (
                  <ChevronsUpDown
                    size={15}
                    className="text-slate-200 h-4 w-4 object-contain"
                  />
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent side="right" className="mb-4  ">
              <div className="space-y-1">
                <div className="flex w-full gap-2 items-center p-2 rounded-md justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-md size-9 overflow-hidden">
                      <img
                        src={"https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
                        alt=""
                        className="object-cover size-full"
                      />
                    </div>

                    <div className="text-start">
                      <p className="text-sm "> {userInfo?.fullname}</p>
                      <p className="text-xs ">{userInfo?.email}</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <button className="animate-click flex w-full gap-2 items-center p-2 rounded-md hover:bg-slate-100">
                  <Settings size={15} className=" h-4 w-4 object-contain " />{" "}
                  <p className="text-sm ">Settings</p>
                </button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className=" w-full justify-start animate-click flex cursor-pointer gap-2 items-center p-2 rounded-md hover:bg-slate-100"
                    >
                      {" "}
                      <LogOut
                        size={15}
                        className=" h-4 w-4 object-contain "
                      />{" "}
                      <p className="text-sm ">Logout</p>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-sm">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Log out?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to log out?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => logout()}>
                        Log out
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </m.div>
    </m.div>
  );
}
