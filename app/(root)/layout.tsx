"use client";

import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { m } from "motion/react";
import { Suspense, useEffect, useState } from "react";
import { storage } from "@/utils/useStorage";

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
    <main className="min-h-screen  overflow-hidden flex justify-between flex-col">
      <div>
        <Header />

        <m.div
          initial={!hasBeenAnimated && { y: 100, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onAnimationComplete={() => sethasBeenAnimated(true)}
          className="w-full lg:px-16 py-14 "
        >
          <Suspense> {children}</Suspense>
        </m.div>
      </div>
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
