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
import image1 from "@/public/assets/images/carousel1.webp";

export default function Header() {
  const slides = [
    { id: 1, content: "Slide 1" },
    { id: 2, content: "Slide 2" },
    { id: 3, content: "Slide 3" },
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="flex justify-between items-center max-h-[183px] overflow-hidden border-b-2 bg-gradient-to-r  from-blue-100 from-1% via-[#DCEBFF] via-40% to-blue-50 to-80%">
        <div className="p-8 lg:px-32">
          <Image
            src={egov}
            alt="egov"
            loading="lazy"
            className="max-w-[300px] lg:max-w-[450px]"
          />
          <h2 className="text-xs font-medium text-blue-900">
            <strong>11th eGOV Awards:</strong> Excellence in Governance Through
            Information and Communications Technology Awards{" "}
          </h2>
          <h1 className="font-bold text-2xl lg:text-3xl text-[#2D2D2D]">
            Application Form
          </h1>
        </div>
        <div className="invisible hidden relative right-0 lg:block  lg:visible w-full h-[200px] max-w-lg overflow-hidden  ">
          <div className="flex size-full items-center justify-center relative">
            <AnimatePresence mode="wait">
              <div
                key={slides[index].id}
                className={`absolute w-full h-full flex items-center justify-center rounded-xl shadow-md `}
              >
                <div className="size-full ">
                  {index == 0 && (
                    <div className="flex size-full items-center gap-2">
                      <m.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className=""
                      >
                        <svg
                          className=""
                          width="88"
                          height="129"
                          viewBox="0 0 88 129"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M75.4443 28.1172L50.7221 -0.000593057L26 28.1172L38.0719 28.1172L50.3863 14.1113L62.7008 28.1172L75.4443 28.1172Z"
                            fill="#BFDBFE"
                          />
                          <path
                            d="M34 123C56.6437 123 75 105.091 75 83C75 60.9086 56.6437 43 34 43"
                            stroke="#93C5FD"
                            strokeWidth="9"
                          />
                          <mask id="path-3-inside-1_171823_2591" fill="white">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M14 110.444L42.1178 85.7221L14 61L14 73.0727L28.006 85.3872L14 97.7018L14 110.444Z"
                            />
                          </mask>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14 110.444L42.1178 85.7221L14 61L14 73.0727L28.006 85.3872L14 97.7018L14 110.444Z"
                            fill="#93C5FD"
                          />
                          <path
                            d="M42.1178 85.7221L42.7781 86.4731L43.6322 85.7221L42.7781 84.9711L42.1178 85.7221ZM14 110.444L13 110.444L13 112.655L14.6603 111.195L14 110.444ZM14 61L14.6603 60.249L13 58.7892L13 61L14 61ZM14 73.0727L13 73.0727L13 73.525L13.3397 73.8237L14 73.0727ZM28.006 85.3872L28.6663 86.1382L29.5204 85.3872L28.6663 84.6362L28.006 85.3872ZM14 97.7018L13.3397 96.9508L13 97.2494L13 97.7018L14 97.7018ZM41.4575 84.9711L13.3397 109.693L14.6603 111.195L42.7781 86.4731L41.4575 84.9711ZM13.3397 61.751L41.4575 86.4731L42.7781 84.9711L14.6603 60.249L13.3397 61.751ZM15 73.0727L15 61L13 61L13 73.0727L15 73.0727ZM13.3397 73.8237L27.3457 86.1382L28.6663 84.6362L14.6603 72.3217L13.3397 73.8237ZM27.3457 84.6362L13.3397 96.9508L14.6603 98.4528L28.6663 86.1382L27.3457 84.6362ZM15 110.444L15 97.7018L13 97.7018L13 110.444L15 110.444Z"
                            fill="#93C5FD"
                            mask="url(#path-3-inside-1_171823_2591)"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M-2.41789e-06 84.4443L28.1178 59.7221L0 35L-5.9037e-07 47.0727L14.006 59.3872L-1.79476e-06 71.7018L-2.41789e-06 84.4443Z"
                            fill="#60A5FA"
                          />
                          <mask id="path-6-inside-2_171823_2591" fill="white">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M69.0371 129.001L87.2687 112.971L69.0371 96.9414L69.0371 105.783L77.2464 112.78L69.0371 119.776L69.0371 129.001Z"
                            />
                          </mask>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M69.0371 129.001L87.2687 112.971L69.0371 96.9414L69.0371 105.783L77.2464 112.78L69.0371 119.776L69.0371 129.001Z"
                            fill="#93C5FD"
                          />
                          <path
                            d="M87.2687 112.971L87.929 113.722L88.7831 112.971L87.929 112.22L87.2687 112.971ZM69.0371 129.001L68.0371 129.001L68.0371 131.212L69.6974 129.752L69.0371 129.001ZM69.0371 96.9414L69.6974 96.1904L68.0371 94.7306L68.0371 96.9414L69.0371 96.9414ZM69.0371 105.783L68.0371 105.783L68.0371 106.245L68.3885 106.544L69.0371 105.783ZM77.2464 112.78L77.8951 113.541L78.7881 112.78L77.8951 112.018L77.2464 112.78ZM69.0371 119.776L68.3885 119.015L68.0371 119.314L68.0371 119.776L69.0371 119.776ZM86.6084 112.22L68.3768 128.25L69.6974 129.752L87.929 113.722L86.6084 112.22ZM68.3768 97.6924L86.6084 113.722L87.929 112.22L69.6974 96.1904L68.3768 97.6924ZM70.0371 105.783L70.0371 96.9414L68.0371 96.9414L68.0371 105.783L70.0371 105.783ZM68.3885 106.544L76.5977 113.541L77.8951 112.018L69.6858 105.022L68.3885 106.544ZM76.5977 112.018L68.3885 119.015L69.6858 120.537L77.8951 113.541L76.5977 112.018ZM70.0371 129.001L70.0371 119.776L68.0371 119.776L68.0371 129.001L70.0371 129.001Z"
                            fill="#93C5FD"
                            mask="url(#path-6-inside-2_171823_2591)"
                          />
                        </svg>
                      </m.div>
                      <m.div
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: "0%", opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-[80%] my-auto"
                      >
                        <h2 className="font-bold text-2xl text-[#EB4335] ">
                          <span className="text-[#2563EB]">
                            Smart Solutions,
                          </span>{" "}
                          Smarter Governance
                        </h2>
                        <p className="font-medium text-base text-slate-600">
                          Acknowledging digital advancements that enhance public
                          service efficiency.
                        </p>
                      </m.div>
                    </div>
                  )}
                  {index == 1 && (
                    <div className="flex size-full items-center gap-2">
                      <m.div
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: "0%", opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-[70%] relative z-10"
                      >
                        <h2 className="font-bold text-2xl text-[#EB4335] ">
                          <span className="text-[#2563EB]">
                            Bridging Innovation and
                          </span>{" "}
                          Public Service{" "}
                        </h2>
                        <p className="font-medium text-base text-slate-600">
                          Celebrating digital tools and strategies that enhance
                          governance and transparency.
                        </p>
                      </m.div>
                      <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className=""
                      >
                        <Image
                          src={image1}
                          alt="egov"
                          className="object-cover h-full w-[70%]  absolute top-0 -right-4 "
                          style={{
                            WebkitMaskImage:
                              "linear-gradient(to right, transparent, black 80%)",
                            maskImage:
                              "linear-gradient(to right, transparent, black 80%)",
                          }}
                        />
                      </m.div>
                    </div>
                  )}
                  {index == 2 && (
                    <div className="flex size-full items-center gap-2">
                      <m.div
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: "0%", opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-[80%] z-10"
                      >
                        <p className="font-medium text-base text-slate-600">
                          Recognizing forward-thinking solutions shaping the
                          future of governance.
                        </p>
                        <h2 className="font-bold text-2xl text-[#EB4335] ">
                          <span className="text-[#2563EB]">
                            Pioneering a Digital Tomorrow,{" "}
                          </span>{" "}
                          Today{" "}
                        </h2>
                      </m.div>
                      <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute top-0 opacity-70 max-w-[80%] right-0"
                      >
                        <svg
                          width="351"
                          height="213"
                          viewBox="0 0 351 213"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="77.7686"
                            y="46.1566"
                            width="98.9547"
                            height="104.981"
                            transform="rotate(45 77.7686 46.1566)"
                            stroke="#DBEAFE"
                            strokeWidth="5"
                          />
                          <rect
                            x="225.184"
                            y="-39.4449"
                            width="98.9547"
                            height="104.981"
                            transform="rotate(45 225.184 -39.4449)"
                            stroke="#DBEAFE"
                            strokeWidth="5"
                          />
                          <rect
                            x="225.184"
                            y="122.243"
                            width="98.9547"
                            height="104.981"
                            transform="rotate(45 225.184 122.243)"
                            stroke="#DBEAFE"
                            strokeWidth="5"
                          />
                          <rect
                            x="130.078"
                            y="46.1566"
                            width="98.9547"
                            height="104.981"
                            transform="rotate(45 130.078 46.1566)"
                            stroke="#DBEAFE"
                            strokeWidth="5"
                          />
                          <rect
                            x="277.493"
                            y="-39.4449"
                            width="98.9547"
                            height="104.981"
                            transform="rotate(45 277.493 -39.4449)"
                            stroke="#DBEAFE"
                            strokeWidth="5"
                          />
                          <rect
                            x="277.493"
                            y="122.243"
                            width="98.9547"
                            height="104.981"
                            transform="rotate(45 277.493 122.243)"
                            stroke="#DBEAFE"
                            strokeWidth="5"
                          />
                        </svg>
                      </m.div>
                    </div>
                  )}
                </div>
              </div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isScrolling && (
          <m.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{
              y: { duration: 0.3, ease: "easeIn" },
              exit: { duration: 0.1, ease: "easeOut" },
            }}
            className="fixed top-0 left-0 w-full text-white z-40 "
          >
            <div className="flex  overflow-hidden border-b-2 bg-gradient-to-r  from-blue-100 from-1% via-[#DCEBFF] via-40% to-blue-50 to-80%">
              <div className="flex flex-wrap-reverse items-center justify-between w-full p-2 lg:px-32">
                <div>
                  <h2 className="text-xs font-medium text-blue-900">
                    <strong>11th eGOV Awards:</strong> Excellence in Governance
                    Through Information and Communications Technology Awards{" "}
                  </h2>
                  <h1 className="font-bold text-xl lg:text-3xl text-[#2D2D2D]">
                    Application Form
                  </h1>
                </div>
                <Image
                  src={egov}
                  alt="egov"
                  loading="lazy"
                  className="max-w-[200px] lg:max-w-[300px]"
                />
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
