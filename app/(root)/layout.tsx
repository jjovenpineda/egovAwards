"use client";

import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { m } from "motion/react";
import { Suspense, useEffect, useState } from "react";
import { storage } from "@/utils/useStorage";
import FloatingIcons from "@/components/shared/floating-icons";
import SideBar from "@/components/shared/sidebar";
import TopBar from "@/components/shared/top-bar";

/* import useInactivityTimeout from "@/hooks/use-inactibe-timeout";
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [hasBeenAnimated, sethasBeenAnimated] = useState(
    storage.getItem("hasBeenAnimated") || "false"
  );
  useEffect(() => {
    const handleBeforeUnload = () => {
      storage.removeItem("hasBeenAnimated");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  useEffect(() => {
    storage.setItem("hasBeenAnimated", JSON.stringify(hasBeenAnimated));
  }, [hasBeenAnimated]);

  return (
    <main className=" flex z-50">
      <div>
        <SideBar />
      </div>
      <div className="size-full">
        <TopBar />
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full  min-h-screen px-8 lg:px-32 py-14 z-10 relative"
        >
          <Suspense> {children}</Suspense>
        </m.div>
        <FloatingIcons />
        <Footer />
      </div>
    </main>
  );
}
