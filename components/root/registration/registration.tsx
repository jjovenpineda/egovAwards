"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import React, { useState } from "react";
import Page1 from "./page-1";
import Page2 from "./page-2";
import Page3 from "./page-3";
import Page4 from "./page-4";
import Page5 from "./page-5";
import Page6 from "./page-6";
import Page7 from "./page-7";
import Image from "next/image";
import Summary from "./summary";
import Lottie from "lottie-react";
import test from "@/public/assets/triangle-warning.json";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Registration() {
  const [currentPage, SetCurrentPage] = useState(0);
  const [submitDialog, setSubmitDialog] = useState(false);
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
        {currentPage === 2 && <Page3 />}
        {currentPage === 3 && <Page4 />}
        {currentPage === 4 && <Page5 />}
        {currentPage === 5 && <Page6 />}
        {currentPage === 6 && <Page7 />}
        {currentPage === 7 && <Summary />}
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
            currentPage > 7
              ? SetCurrentPage(currentPage + 1)
              : setSubmitDialog(true);
          }}
        >
          {currentPage < 7 ? <ArrowRight /> : <Send />}
          {currentPage < 7 ? "Next" : "Submit"}
        </Button>
      </section>

      <Dialog open={submitDialog} onOpenChange={setSubmitDialog}>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0">
          <div className="flex flex-col items-center justify-center gap-2 m-4">
            <Lottie animationData={test} loop={false} className="size-36" />
            <h2 className=" font-bold text-2xl">SUBMIT APPLICATION!</h2>
            <p className="font-medium text-base text-slate-900">
              Are you sure you want to submit your application?
            </p>
          </div>

          <div className="flex w-full">
            <DialogClose asChild>
              <button
                type="button"
                className="w-full rounded-0 bg-slate-100 text-slate-900 p-3 hover:bg-slate-200 font-medium transition-colors duration-300"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              className="w-full rounded-0 bg-[#2563EB] p-3 text-white font-medium hover:bg-[#3674fa] transition-colos duration-300"
            >
              Submit
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
