"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import Page1 from "@/components/registration/page-1";
import Page2 from "@/components/registration/page-2";
import Page3 from "@/components/registration/page-3";
import Page4 from "@/components/registration/page-4";
import Page5 from "@/components/registration/page-5";
import Page6 from "@/components/registration/page-6";
import Page7 from "@/components/registration/page-7";
import Summary from "@/components/registration/summary";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as Yup from "yup";

import Link from "next/link";
import SuccessPage from "@/components/registration/success-page";
import { Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { json } from "stream/consumers";
import { storage } from "@/utils/useStorage";
/* const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
 */ interface IRegistration {
  action: string;
  page: number;
}
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),

  /*   documents: Yup.array()
    .of(
      Yup.mixed().test(
        "fileSize",
        "File size must be less than 3MB",
        (file) => {
          return file ? file.size <= 3 * 1024 * 1024 : true;
        }
      )
    )
    .max(5, "You can upload up to 5 files only"), */
});
const handleSubmit = async (
  values: any /* { region: string } */,
  { setFieldError }: FormikHelpers<any /* { region: string } */>
) => {
  console.log("Submit Values:", values);

  /*  setIsLoading(true); */

  /*   await apiPost("/api/auth/login", values)
      .then((res) => {
        const { success, message, data } = res;
        if (success) {
          window.localStorage.setItem(
            "account",
            data && encrypt(JSON.stringify(data))
          );
          setCookie("authToken", encrypt(data.token) ?? "");
          router.push("/");
        }
        toast({
          title: "Login Success!",
          description: message,
          duration: 2000,
        });
      })
      .catch((e) => {
        console.log(e);
        setFieldError("password", "Please check your credentials");
        setIsLoading(false);
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          duration: 2000,
        });
      }); */
  /* router.push("/"); */

  /*   setTimeout(() => {
    router.push("/");
    setIsLoading(false);
  }, 2000); */
};
const initialValues = {
  lgu: "",
  province: "",
  region: "",
  nameOfLCE: "",
  nameOfOffice: "",
  contactPerson: "",
  email: "",
  officeNumber: "",
  mobileNumber: "",
  website: "",
  facebookPage: "",
  egovAwardsCount: "",
  projectName: "",
  projectCategory: "",
  projectPeriod: "",
  projectURL: "",
  documents: [new File([""], "", { type: "" })] as File[],
  impact: { text: "", file: null },
  relevance: { text: "", file: null },
  sustainability: { text: "", file: null },
  innovation: { text: "", file: null },
  goals: [],
  goaltext1: { text: "", file: null },
  goaltext2: { text: "", file: null },
};
export const WordCounter = (
  value: string,
  setCount: (count: number) => void,

  reset: Function
) => {
  const plainText = value.replace(/<[^>]*>/g, "");
  const words = plainText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  setCount(words);
  if (words <= 0) {
    reset();
  }
};
export const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  name: string,
  setFieldValue: Function
) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    setFieldValue(name, files[0]);
  }
};
export default function Registration({ action, page }: IRegistration) {
  const [submitDialog, setSubmitDialog] = useState(false);
  const cachedData = storage.getItem("formData");

  return (
    <Formik
      initialValues={/* cachedData ? cachedData :  */ initialValues}
      validationSchema={"" /* validationSchema */}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => {
        useEffect(() => {
          const isPaused = storage.getItem("isPaused");

          if (!isPaused) {
            const handler = setTimeout(() => {
              storage.setItem("formData", values);
            }, 2000);
            return () => clearTimeout(handler);
          }
        }, [values]);

        return (
          <Form className="mx-10 lg:mx-16 flex flex-col gap-6 ">
            {page < 9 && page != 0 && (
              <section className="space-y-8">
                <div className="space-y-3">
                  <h1 className="font-bold text-3xl texxt-slate-900">
                    Registration Form
                  </h1>
                  <p className="text-[#1E3A8A] text-base">
                    <strong>11th eGOV Awards:</strong> Excellence in Governance
                    Through Information and Communications Technology Awards
                  </p>
                </div>
              </section>
            )}

            <section>
              <>
                {
                  [
                    <Page1 values={values} setFieldValue={setFieldValue} />,
                    <Page2 values={values} setFieldValue={setFieldValue} />,
                    <Page3 values={values} setFieldValue={setFieldValue} />,
                    <Page4 values={values} setFieldValue={setFieldValue} />,
                    <Page5 values={values} setFieldValue={setFieldValue} />,
                    <Page6 values={values} setFieldValue={setFieldValue} />,
                    <Page7 values={values} setFieldValue={setFieldValue} />,
                    <Summary values={values} setFieldValue={setFieldValue} />,
                    <SuccessPage />,
                  ][page - 1]
                }
                <Button type="submit">Submit</Button>
              </>
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
          </Form>
        );
      }}
    </Formik>
  );
}
