"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";

import carousel from "@/public/assets/images/carousel1.webp";
import login from "@/public/assets/images/login.webp";
import egov from "@/public/assets/images/egov.svg";

import lgus from "@/public/assets/images/lgus.webp";

import { AnimatePresence, m } from "motion/react";
import FloatingIcons from "@/components/shared/floating-icons";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen overflow-hidden flex flex-col  lg:grid lg:grid-cols-[_60%,_40%] ">
      <AuthLayout />
      <div className="size-full relative">
        {children}

        <FloatingIcons />
      </div>
      {/* <Footer /> */}
    </main>
  );
}

const AuthLayout = () => {
  const [index, setIndex] = useState(0);

  const slides = [
    { id: 1, content: "Slide 1" },
    { id: 2, content: "Slide 2" },
    { id: 3, content: "Slide 3" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);
  return (
    <m.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="flex flex-col items-center  justify-end  md:h-full "
    >
      <div className="relative  size-full flex flex-col  ">
        <div className="relative flex flex-col justify-center  items-center md:items-start md:justify-end gap-4 z-10 p-7 md:pl-16 h-full ">
          <div className="w-full max-w-[300px] z-10">
            <Image
              src={egov}
              alt="bg"
              className="w-[70%] md:w-full h-auto mx-auto object-contain"
            />
          </div>
          <div className="w-[70%] md:w-full max-w-[320px] ml-12 md:ml-0 z-10">
            <Image src={lgus} alt="bg" className="z-10  object-contain" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#F4F7FFE5] via-[#F4F7FFE5] md:via-[#B1C6FC73] to-[#B1C6FC73]"></div>
        </div>
        {/* md:bg-gradient-to-l from-[#1F293700] to-[#1E3A77]  */}
        <div className="flex items-center z-20  h-full max-h-[160px] bg-gradient-to-tr from-blue-900 via-transparent to-transparent">
          <div className="xl:max-w-[65%] w-full p-4 py-8 md:px-16 md:py-2 flex flex-col bg-white md:bg-transparent">
            <h2 className="font-bold drop-shadow-2xl text-2xl md:text-[40px] text-slate-900 md:text-white">
              11th eGOV Awards
            </h2>
            <h2 className="text-base md:text-xl text-slate-900 md:text-white drop-shadow-2xl">
              Excellence in Governance Through Information and Communications
              Technology Awards{" "}
            </h2>
          </div>
        </div>
        <Image
          src={login}
          alt="bg"
          fill
          className=" bg-cover pointer-events-none  object-cover object-right  bg-right bg-fixed absolute"
        />{" "}
      </div>{" "}
      <div className="hidden md:block size-full relative  right-0  max-h-[213px]  h-full overflow-hidden ">
        <AnimatePresence mode="wait">
          <div
            key={slides[index].id}
            className={` w-full h-full  flex items-center justify-center rounded-xl shadow-md py-4`}
          >
            <div className="size-full">
              {index == 0 && (
                <div className="flex px-16 size-full items-center gap-2 ">
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
                    className="max-w-[50%] ml-6 my-auto"
                  >
                    <h2 className="font-bold text-2xl text-[#EB4335] ">
                      <span className="text-[#2563EB]">Smart Solutions,</span>{" "}
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
                <div className="flex px-16 size-full items-center gap-2">
                  <m.div
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: "0%", opacity: 1 }}
                    exit={{ x: "-100%", opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className=" relative z-10"
                  >
                    <h2 className="max-w-[50%] font-bold text-2xl text-[#EB4335] ">
                      <span className="text-[#2563EB]">
                        Bridging Innovation and
                      </span>{" "}
                      Public Service{" "}
                    </h2>
                    <p className="max-w-[60%] font-medium text-base text-slate-600">
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
                      src={carousel}
                      alt="egov"
                      className="object-cover h-full   absolute top-0 -right-4 "
                      style={{
                        WebkitMaskImage:
                          "linear-gradient(to right, transparent, black 100%, transparent 100%)",
                        maskImage:
                          "linear-gradient(to right, transparent, black 80%, transparent 100%)",
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
                    className=" px-16 z-10"
                  >
                    <p className="max-w-[65%] font-medium text-base text-slate-600">
                      Recognizing forward-thinking solutions shaping the future
                      of governance.
                    </p>
                    <h2 className="max-w-[50%] font-bold text-2xl text-[#EB4335] ">
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
                    className="absolute top-0 opacity-70 max-w-[80%] right-16 "
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
    </m.div>
  );
};
