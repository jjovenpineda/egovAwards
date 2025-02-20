"use client";

import React, { useState } from "react";

import dynamic from "next/dynamic";

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
        {["login", "signup", "reset"].includes(action || "") && (
          <AuthModal action={action} page={page} />
        )}
        {action === "register" && <Registration action={action} page={page} />}
      </section>
    </div>
  );
}
