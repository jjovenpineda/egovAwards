"use client";

import { m } from "motion/react";
import Image from "next/image";
import bg from "@/public/assets/images/bg-gradient.webp";
import { useSearchParams } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "0");
  const action = searchParams.get("action");
  return (
    <main className="flex flex-col">
      {" "}
      {(action != "register" || (action == "register" && page == 9)) && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none -z-50"
        >
          <Image src={bg} alt="" fill className="object-cover" />
        </m.div>
      )}
      {children}
    </main>
  );
}
