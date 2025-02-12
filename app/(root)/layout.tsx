"use client";

import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { m } from "motion/react";
import { useEffect, useState } from "react";
import { storage } from "@/utils/useStorage";

/* import useInactivityTimeout from "@/hooks/use-inactibe-timeout";
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [hasAnimated, setHasAnimated] = useState(
    JSON.parse(storage.getItem("hasAnimated") || "false")
  );
  useEffect(() => {
    const handleBeforeUnload = () => {
      storage.removeItem("hasAnimated");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  useEffect(() => {
    storage.setItem("hasAnimated", JSON.stringify(hasAnimated));
  }, [hasAnimated]);

  return (
    <main className="flex flex-col bg-slate-50">
      <div>
        <Header />
      </div>

      <m.div
        initial={!hasAnimated && { y: 100, opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onAnimationComplete={() => setHasAnimated(true)}
        className="w-full lg:px-16 py-14 "
      >
        {children}
      </m.div>
      <Footer />
      {/*   {isInactive && (
        <div className="inactivity-dialog">
          <p>Are you still there?</p>
          <button onClick={() => handleUserResponse("yes")}>Yes</button>
          <button onClick={() => handleUserResponse("no")}>No</button>
        </div>
      )} */}
    </main>
  );
}
