"use client";

import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { m } from "motion/react";
import { Suspense, useEffect, useState } from "react";
import { storage } from "@/utils/useStorage";
import FloatingIcons from "@/components/shared/floating-icons";

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full min-h-[80%] lg:px-16 py-14 "
        >
          <Suspense>
            {" "}
            <FloatingIcons /> {children}
          </Suspense>
        </m.div>
      </div>
      <Footer />
    </main>
  );
}
