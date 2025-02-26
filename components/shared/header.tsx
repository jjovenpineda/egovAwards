"use client";

import React, { ChangeEvent, useEffect, useState } from "react";

import { ChevronRight, Landmark, Lock, Menu, Search } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatePresence, m } from "motion/react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import gazette from "@/public/assets/images/gazette.webp";
import dict from "@/public/assets/images/dict.webp";
import Image from "next/image";
import egov from "@/public/assets/images/egov.webp";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
export default function Header() {
  const [hasScroll, setHasScroll] = useState(false);

  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?q=${query}`);
    setQuery("");
  };
  const [isHidden, setIsHidden] = useState(true);
  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };
  return (
    <>
      <div
        className={`border border-b-1 top-0 border-t-0 border-l-0 border-r-0 border-gray-200 w-full text-xs bg-slate-50 md:text-sm flex flex-col  md:justify-center items-center justify-end ${
          hasScroll && "shadow-xl"
        }`}
      >
        <button
          className="w-full px-1 md:px-32 grid grid-cols-3 py-3 space-y-2"
          onClick={toggleHidden}
        >
          <div className="flex mx-auto items-center justify-center max-w-32 col-span-3 gap-y-2 gap-x-5 md:order-2 md:col-span-1">
            <Image src={gazette} alt="officialGazette Logo" />{" "}
          </div>
          <div className="flex items-center justify-start col-span-2 md:order-1 md:col-span-1">
            <span className="font-semibold text-left text-textdescription">
              A Philippines Government Agency Website
            </span>
          </div>

          <div className="flex items-center justify-end md:order-3">
            <Link
              draggable="false"
              href="/"
              className="flex items-center font-semibold text-left transition-colors text-blue-900 hover:text-blue-600"
            >
              How to identify?
              <ChevronRight
                className={`transition-transform h-3 sm:w-4 sm:h-4 ${
                  !isHidden ? "rotate-90" : ""
                }`}
              />
            </Link>
          </div>
        </button>

        <AnimatePresence>
          {!isHidden && (
            <m.div
              initial={{ opacity: 0, height: 0, padding: 0 }}
              animate={{
                opacity: 1,
                height: !isHidden ? "auto" : 0,
              }}
              exit={{ opacity: 0, height: 0, padding: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="container  w-full md:px-32 grid grid-cols-1  gap-1 md:grid-cols-2 order-last col-span-3 space-y-2"
            >
              <div className="w-full text-left px-4">
                <p className="flex font-bold">
                  <Landmark className="w-4 h-4 mr-1" />
                  Official website links end with.gov.ph
                </p>
                <p className="ml-5 ">
                  Government agencies communicate via .gov.ph websites (e.g.
                  https://dict.gov.ph).
                  <Link
                    draggable="false"
                    className="inline-block ml-1 font-semibold text-blue-700 transition-colors hover:text-blue-500"
                    href="/"
                  >
                    Trusted websites
                  </Link>
                </p>
              </div>
              <div className="w-full text-left px-4">
                <span className="flex font-bold">
                  <Lock className="w-4 h-4 mr-1" />
                  Secure websites use HTTPS
                </span>
                <p className="items-center ml-5 ">
                  Look for a lock <Lock className="inline-block w-3 h-3 mx-1" />
                  or https:// as an added precaution. Share sensitive
                  information only on official, secure websites.
                </p>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      <div className={`top-0 sticky z-50 ${hasScroll && "shadow-sm"}`}>
        <header
          className={` w-full  bg-white  flex flex-col  justify-between max-w-full`}
        >
          <div className="flex flex-wrap justify-between items-center lg:px-32">
            <div className="flex gap-1 items-center mx-auto sm:mx-0">
              <div className="absolute invisible sm:block sm:visible max-w-32 p-2">
                <Image loading="lazy" alt="GovPH Logo Header" src={egov} />
              </div>
            </div>
            <div className="relative flex p-2 lg:p-0 flex-col w-full lg:flex-row gap-4 justify-end items-end lg:items-center lg:w-1/2 text-xs lg:text-sm font-semibold">
              <div className="visible sm:invisible max-w-28 p-2 absolute left-0">
                <Image loading="lazy" alt="GovPH Logo Header" src={egov} />
              </div>
              <div className=" gap-2 flex flex-wrap justify-end order-1 lg:flex-col lg:order-1">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-4 h-4 text-blue-800"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>

                  <h1>+(632) 8-920-0101</h1>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-4 h-4 text-blue-800"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                  <h1 className="break-all w-full">information@dict.gov.ph</h1>{" "}
                </div>
              </div>
              <div className="order:2 lg:order-2">
                <form onSubmit={handleSearchSubmit}>
                  <div className="flex w-full justify-center gap-2 ">
                    <div className="relative">
                      <Input placeholder="Search" className="max-w-80 pr-10" />
                      <Search className="text-muted-foreground absolute mr-2 right-0 top-1/2 transform -translate-y-1/2" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap absolute invisible lg:relative lg:visible gap-6 p-1 lg:px-32 bg-slate-50 font-bold text-sm border-2">
            {links.map((item, index) => (
              <Link
                draggable="false"
                href={
                  item.query
                    ? { pathname: item.url, query: item.query }
                    : { pathname: item.url }
                }
                key={index}
                className="cursor-pointer hover:bg-blue-100 p-1.5 active:bg-blue-200 rounded-sm transition-all duration-300 ease-in-out"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </header>
      </div>
    </>
  );
}
const links = [
  { name: "Home", url: "/" },
  {
    name: "Registration Form",
    url: "/registration",
    query: { action: "register", page: 1 },
  },
  { name: "About Us", url: "/about" },
  { name: "Contact Us", url: "/contact" },
];
