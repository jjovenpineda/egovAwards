"use client";

import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { m } from "motion/react";
import { Suspense, useEffect, useState } from "react";
import { storage } from "@/utils/useStorage";
import FloatingIcons from "@/components/shared/floating-icons";
import SideBar from "@/components/shared/sidebar";
import TopBar from "@/components/shared/top-bar";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/utils/utility";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [authChecked, setAuthChecked] = useState(false);

  const router = useRouter();
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
  const authChecker = () => {
    const account = storage.getItem("account_data");
    if (account) {
      setAuthChecked(true);
      return null;
    } else {
      router.push("/sign-up");
    }
  };
  useEffect(() => {
    authChecker();
  }, []);
  return (
    <>
      {authChecked && (
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
              className="w-full  min-h-screen px-8 lg:px-16 py-14 z-10 relative"
            >
              <Suspense> {children}</Suspense>
            </m.div>
            <FloatingIcons />
            <Footer />
          </div>
        </main>
      )}
    </>
  );
}
