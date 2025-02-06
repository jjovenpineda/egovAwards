"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "../ui/separator";
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
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify, LogOut, LogOutIcon, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { m } from "motion/react";
import { deleteCookie } from "@/utils/utility";
import { useRouter } from "next/navigation";
import { storage } from "@/utils/useStorage";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { links } from "@/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Link from "next/link";
export default function TopBar() {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState("");

  const logout = () => {
    deleteCookie("authToken");
    storage.removeAll();
    router.push("/sign-in");
  };
  return (
    <m.div
      initial={{
        y: -100,
        opacity: 0,
      }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="flex items-center sticky top-0 shadow-sm p-3 justify-between w-full  bg-white "
    >
      <Breadcrumb className="">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Themes</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="hidden md:block">
        <Popover>
          <PopoverTrigger>
            <div
              className={`animate-click  flex  w-full gap-2 items-center rounded-md group justify-between hover:bg-current/90 `}
            >
              <div className="flex items-center gap-2">
                <div className="rounded-full size-9 overflow-hidden">
                  <img
                    src={"https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
                    alt=""
                    className="object-cover size-full"
                  />
                </div>

                <div className="text-start text-nowrap">
                  <p className="text-xs text-slate-900 ">
                    {/*  {userInfo?.fullname} */}John Doe
                  </p>
                  <p className="text-sm text-slate-800 ">
                    {/* {userInfo?.email} */}JohnDoe@yopmail.com
                  </p>
                </div>
              </div>

              {/* {!isCollapsed && (
                <ChevronsUpDown
                  size={15}
                  className="text-slate-200 h-4 w-4 object-contain"
                />
              )} */}
            </div>
          </PopoverTrigger>
          <PopoverContent side="bottom" className="mb-4  ">
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
                    <p className="text-sm ">John Doe</p>
                    <p className="text-xs ">JohnDoe@yopmail.com</p>
                  </div>
                </div>
              </div>
              <Separator />
              <button className="animate-click flex w-full gap-2 items-center p-2 rounded-md hover:bg-slate-100">
                <Settings size={15} className=" h-4 w-4 object-contain " />{" "}
                <div className="text-sm ">Settings</div>
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

      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger>
            <AlignJustify size={18} />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full mt-8 mb-2"
                >
                  <AccordionItem value="item-1" className="border-0">
                    <AccordionTrigger className="hover:bg-slate-200 hover:no-underline p-2 rounded-md">
                      {" "}
                      <div className="flex items-center gap-2 ">
                        <div className="rounded-md size-9 overflow-hidden">
                          <img
                            src={
                              "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                            }
                            alt=""
                            className="object-cover size-full"
                          />
                        </div>

                        <div className="text-start">
                          <p className="text-sm ">John Doe</p>
                          <p className="text-xs ">JohnDoe@yopmail.com</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-1 w-full">
                        <Button
                          variant={"outline"}
                          size={"icon"}
                          className="w-full"
                        >
                          Settings <Settings size={15} />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant={"outline"}
                              size={"icon"}
                              className="w-full text-slate-50 bg-slate-900 hover:bg-slate-800 hover:text-white active:bg-slate-700"
                            >
                              Logout <LogOutIcon size={15} />
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
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <hr className="opacity-55 " />
              </SheetTitle>
              <div className="space-y-1 cursor-pointer">
                {links.map((link, index) => (
                  <div key={index}>
                    {link.children ? (
                      <Accordion type="single" collapsible className="w-full">
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
                  `}
                            >
                              <div>
                                <link.icons
                                  size={15}
                                  className={`shrink-0  text-slate-900 `}
                                />
                              </div>

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
                      ${
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
                  ${
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
                        <m.p
                          className={` text-sm text-slate-900 text-nowrap`}
                          initial={{ opacity: 0, position: "relative" }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1 }}
                        >
                          {link.label}
                        </m.p>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </SheetHeader>
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </div>
    </m.div>
  );
}
