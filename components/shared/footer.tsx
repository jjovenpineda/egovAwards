"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import republika from "@/public/assets/images/republika.webp";
import dict from "@/public/assets/images/dict.webp";
import { m } from "motion/react";

export function Footer() {
  return (
    <div className="bg-gray-800 z-10">
      <div className="container relative mx-auto px-10 lg:px-8 py-8 lg:py-16 text-sm text-white">
        <div className="flex max-w-full flex-col items-center justify-evenly gap-8 md:gap-20  md:flex-row ">
          <div className="max-w-40 hidden 2xl:block ">
            <Image
              src={republika}
              alt=""
              className="object-contain opacity-50"
            />
          </div>
          <div className="flex w-fit flex-col  justify-evenly gap-8  xl:gap-20 md:flex-row ">
            <div className="">
              <Image
                src={dict}
                className="max-w-[143px] w-full pb-2"
                alt=""
                loading="lazy"
              />

              <p className=" h-auto">
                All content is in the public domain unless otherwise stated.
              </p>
            </div>

            <div className="flex flex-col gap-2 text-xs max-w-64 ">
              <div className="font-bold uppercase text-sm ">About Us</div>
              <div className=" ">
                <p className="">
                  Learn more about the Philippines govenrment, its structure,
                  how government works and the people behind it.
                </p>
              </div>
              <div>
                <Link
                  draggable="false"
                  href="/"
                  className="hover:text-gray-300 hover:underline"
                >
                  GOVPH
                </Link>
              </div>
              <div>
                <Link
                  draggable="false"
                  href="https://data.gov.ph/"
                  target="_blank"
                  className="hover:text-gray-300 hover:underline"
                >
                  Open Data PH
                </Link>
              </div>
              <div>
                <Link
                  draggable="false"
                  href="https://www.officialgazette.gov.ph/"
                  target="_blank"
                  className="hover:text-gray-300 hover:underline"
                >
                  Official Gazette
                </Link>
              </div>
              <div>
                <Link
                  draggable="false"
                  href="/"
                  className="hover:text-gray-300 hover:underline"
                >
                  FAQs
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-xs ">
              <div className="font-bold uppercase text-sm">
                Government Links
              </div>
              <div className=" ">
                <Link
                  draggable="false"
                  href="https://op-proper.gov.ph/"
                  target="_blank"
                  className="hover:text-gray-300 hover:underline"
                >
                  Office of the President
                </Link>
              </div>
              <div>
                <Link
                  draggable="false"
                  href="https://www.ovp.gov.ph/"
                  target="_blank"
                  className="hover:text-gray-300 hover:underline"
                >
                  Office of the Vice President
                </Link>
              </div>
              <div>
                <Link
                  draggable="false"
                  href="https://legacy.senate.gov.ph/"
                  target="_blank"
                  className="hover:text-gray-300 hover:underline"
                >
                  Senate of the Philippines
                </Link>
              </div>
              <div>
                <Link
                  draggable="false"
                  href="https://www.congress.gov.ph/"
                  target="_blank"
                  className="hover:text-gray-300 hover:underline"
                >
                  House of Representatives
                </Link>
              </div>
              <div>
                <Link
                  draggable="false"
                  href="https://sc.judiciary.gov.ph/"
                  target="_blank"
                  className="hover:text-gray-300 hover:underline"
                >
                  Supreme Court
                </Link>
              </div>
              <div>
                <Link
                  draggable="false"
                  href="https://ca.judiciary.gov.ph/"
                  target="_blank"
                  className="hover:text-gray-300 hover:underline"
                >
                  Court of Appeals
                </Link>
              </div>
              <div>
                <Link
                  draggable="false"
                  href="https://sb.judiciary.gov.ph/"
                  target="_blank"
                  className="hover:text-gray-300 hover:underline"
                >
                  Sandigan Bayan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
