"use client";
export const dynamic = "force-dynamic"; // Ensure it's dynamic
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import egovLogo from "@/public/assets/images/eGovAwardsLogo_Study1.webp";
import AuthModal from "@/components/shared/auth-modal";
import Registration from "@/components/registration/registration";
import { getUserInfo } from "@/utils/utility";
export default function Page() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "0");
  const action = searchParams.get("action");
  const [isApproved, setisApproved] = useState(false);

  useEffect(() => {
    const info = getUserInfo();
    if (info) {
      setisApproved(info.authRep.isApproved);
    }
    /*     setisApproved(authRep.isApproved);
     */
  }, []);

  return (
    <div className="flex flex-col gap-6 ">
      <section>{isApproved ? <Registration /> : <Unauthorized />}</section>
    </div>
  );
}

const Unauthorized = () => {
  return (
    <div className="w-full">
      <div className="space-y-2">
        <p className="text-blue-900 text-base ">
          11th eGOV Awards: Excellence in Governance Through Information and
          Communications Technology Awards
        </p>
        <h2 className="text-slate-600 font-bold text-2xl">Application Form</h2>
      </div>
      <div className="flex flex-col items-center justify-center mt-[96px] w-full max-w-[494px] bg-gray-50 px-4 mx-auto">
        <Image src={egovLogo} alt="egov" className="w-full max-w-[185px]" />

        <h2 className="text-base text-slate-500 font-semibold">
          Form Unavailable
        </h2>

        <p className="mt-4 text-sm text-slate-700 text-center">
          This form is only accessible to approved authorized persons.
        </p>

        <div className="mt-10 text-sm bg-teal-100 text-teal-700 px-4 py-3 rounded-lg text-center">
          Your request for Authorized Person approval has been submitted and is
          currently under review. You will be notified once approved.
        </div>
      </div>
    </div>
  );
};
