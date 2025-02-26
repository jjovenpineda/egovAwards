"use client";
export const dynamic = "force-dynamic"; // Ensure it's dynamic
import React, { Suspense, useState } from "react";

import { useSearchParams } from "next/navigation";

import AuthModal from "@/components/shared/auth-modal";
import Registration from "@/components/registration/registration";
export default function Page() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "0");
  const action = searchParams.get("action");
  return (
    <div className="mx-10 lg:mx-16 flex flex-col gap-6 ">
      <section>
        {/* {["login", "signup", "reset"].includes(action || "") && (
          <AuthModal action={action} page={page} />
        )} */}
        <Registration />
      </section>
    </div>
  );
}
