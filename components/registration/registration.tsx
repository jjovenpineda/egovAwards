"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import React, { useState } from "react";
import Page1 from "@/components/registration/page-1";
import Page2 from "@/components/registration/page-2";
import Page3 from "@/components/registration/page-3";
import Page4 from "@/components/registration/page-4";
import Page5 from "@/components/registration/page-5";
import Page6 from "@/components/registration/page-6";
import Page7 from "@/components/registration/page-7";
import Summary from "@/components/registration/summary";
import test from "@/public/assets/triangle-warning.json";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";

import Link from "next/link";
import SuccessPage from "@/components/registration/success-page";
/* const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
 */ interface IRegistration {
  action: string;
  page: number;
}

export default function Registration({ action, page }: IRegistration) {
  const [submitDialog, setSubmitDialog] = useState(false);
  return (
    <div className="mx-10 lg:mx-16 flex flex-col gap-6 ">
      {page < 9 && page != 0 && (
        <section className="space-y-8">
          <div className="space-y-3">
            <h1 className="font-bold text-3xl texxt-slate-900">
              Registration Form
            </h1>
            <p className="text-[#1E3A8A] text-base">
              <strong>11th eGOV Awards:</strong> Excellence in Governance
              Through Information and Communications Technology Awards
              Application Form
            </p>
          </div>
        </section>
      )}

      <section>
        {/*   <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                      > */}
        {
          [
            <Page1 />,
            <Page2 />,
            <Page3 />,
            <Page4 />,
            <Page5 />,
            <Page6 />,
            <Page7 />,
            <Summary />,
            <SuccessPage />,
          ][page - 1]
        }
        {/*  </Formik> */}
      </section>

      {page < 9 && page != 0 && (
        <section className="flex justify-between items-center">
          <Link
            draggable="false"
            href={{
              pathname: "/registration",
              query: { action: "register", page: page - 1 },
            }}
            className={`text-slate-900 border border-black flex gap-2 text-xs items-center hover:bg-slate-200 p-2.5 px-6 rounded-md transition-colors duration-300 ${
              page === 1 ? "invisible " : "visible"
            }`}
          >
            <ArrowLeft size={15} /> Back
          </Link>
          {page < 8 ? (
            <Link
              draggable="false"
              href={{
                pathname: "/registration",
                query: { action: "register", page: page + 1 },
              }}
              className="bg-[#1F2937] flex gap-2 text-xs items-center transition-colors duration-300  hover:bg-slate-700 text-white p-2.5 px-6 rounded-md "
            >
              <ArrowRight size={15} />
              Next
            </Link>
          ) : (
            <Button
              onClick={() => {
                setSubmitDialog(true);
              }}
            >
              <Send />
              Submit
            </Button>
          )}
        </section>
      )}

      <Dialog open={submitDialog} onOpenChange={setSubmitDialog}>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0">
          <div className="flex flex-col items-center justify-center gap-2 m-4">
            <div className="size-36">
              {/*               <Lottie animationData={test} loop={false} />
               */}{" "}
            </div>
            <h2 className=" font-bold text-2xl">SUBMIT APPLICATION!</h2>
            <p className="font-medium text-base text-center text-slate-900">
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
            <Link
              draggable="false"
              href={{
                pathname: "/registration",
                query: { action: "register", page: page + 1 },
              }}
              onClick={() => {
                setSubmitDialog(false);
              }}
              className="w-full flex items-center justify-center rounded-0 bg-[#2563EB] p-3 text-white font-medium hover:bg-[#3674fa] transition-colos duration-300"
            >
              Submit
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
