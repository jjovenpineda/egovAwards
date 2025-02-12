"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import Page1 from "./page-1";
import Page2 from "./page-2";

export default function Registration() {
  const [currentPage, SetCurrentPage] = useState(0);

  return (
    <div className="mx-10 lg:mx-16 flex flex-col gap-6 min-h-screen">
      <section className="space-y-8">
        <div className="space-y-3">
          <h1 className="font-bold text-3xl texxt-slate-900">
            Registration Form
          </h1>
          <p className="text-[#1E3A8A] text-base">
            <strong>11th eGOV Awards:</strong> Excellence in Governance Through
            Information and Communications Technology Awards Application Form
          </p>
        </div>
      </section>

      <section>
        {currentPage === 0 && <Page1 />}
        {currentPage === 1 && <Page2 />}
      </section>

      <section className="flex justify-between">
        <Button
          size={"sm"}
          variant={"outline"}
          className={`outline outline-1 ${
            currentPage === 0 ? "invisible " : "visible"
          }`}
          onClick={() => {
            SetCurrentPage(currentPage - 1);
          }}
        >
          <ArrowLeft /> Back
        </Button>
        <Button
          size={"sm"}
          variant={"default"}
          onClick={() => {
            SetCurrentPage(currentPage + 1);
          }}
        >
          <ArrowRight />
          Next
        </Button>
      </section>
    </div>
  );
}
