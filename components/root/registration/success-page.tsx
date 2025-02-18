"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import bg from "@/public/assets/images/bg-gradient.webp";
import { useRouter } from "next/navigation";
import success from "@/public/assets/images/success.webp";
import { m } from "motion/react";
export default function SuccessPage() {
  const router = useRouter();
  return (
    <div className="relative">
      <div className="mx-10 lg:mx-16 flex flex-col gap-6 ">
        <div className="gap-3 flex flex-col items-center justify-center">
          <Image src={success} alt="" />
          <h2 className="font-bold  text-2xl lg:text-3xl text-blue-900">
            Submission Successful!{" "}
          </h2>
          <div className="text-blue-500">
            <h3 className="text-sm font-medium">REFERENCE NUMBER </h3>
            <h3 className="font-[900] text-3xl">25G2BCAL</h3>
          </div>
          <p className="font-semibold text-sm lg:text-base">
            Thank you for submitting your application.
          </p>
          <p className="font-[300] text-sm lg:text-base text-center text-slate-700">
            We've received your information and are currently validating it.
            <br />
            You’ll receive a confirmation email shortly. If you have any
            questions, feel free to reach out!
          </p>
          <Link
            href={{
              pathname: "/registration",
              query: { page: 1 },
            }}
            className="flex active items-center justify-center text-sm rounded-md bg-[#2563EB]  py-2 px-4 font-semibold text-white hover:bg-[#3674fa] transition-colos duration-300"
          >
            Submit another entry
          </Link>
          <Button
            variant={"outline"}
            onClick={() => {
              router.push("/");
            }}
            className="font-semibold bg-transparent outline outline-1 hover:text-[#142AF6] text-[#142AF6] outline-[#142AF6]"
          >
            Return to Homepage
          </Button>
        </div>
      </div>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
        className="-top-14 absolute -left-16 scale-110 pointer-events-none"
      >
        <Image src={bg} alt="" className=" object-cover" />
      </m.div>
    </div>
  );
}
