"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import bg from "@/public/assets/images/bg-gradient.webp";

import dynamic from "next/dynamic";
import warning from "@/public/assets/triangle-warning.json";
import success from "@/public/assets/images/success.webp";
import Image from "next/image";
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
import { Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { storage } from "@/utils/useStorage";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { m } from "motion/react";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
interface IRegistration {
  page: number;
}
const countWords = (html: string) => {
  if (!html) return 0;
  const text = html.replace(/<[^>]*>/g, " ").trim();
  return text ? text.split(/\s+/).length : 0;
};
const validationSchema = Yup.object().shape({
  lgu: Yup.string()
    .required("This field is required")
    .max(200, "Limit: 100 characters"),
  lguAbbreviation: Yup.string()
    .required("This field is required")
    .max(200, "Limit: 200 characters"),
  province: Yup.string()
    .required("This field is required")
    .max(200, "Limit: 200 characters"),
  region: Yup.string()
    .required("This field is required")
    .max(200, "Limit: 200 characters"),
  nameOfLCE: Yup.string()
    .required("This field is required")
    .max(200, "Limit: 200 characters"),
  nameOfOffice: Yup.string()
    .required("This field is required")
    .max(200, "Limit: 200 characters"),
  contactPerson: Yup.string()
    .required("This field is required")
    .max(200, "Limit: 200 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("This field is required")
    .max(200, "Limit: 200 characters"),
  officeNumber: Yup.string()
    .required("This field is required")
    .max(15, "Invalid"),
  mobileNumber: Yup.string()
    .required("This field is required")
    .max(15, "Invalid"),
  website: Yup.string()
    .matches(
      /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/.*)?$/i,
      "Must be a valid website URL"
    )
    .max(200, "Limit: 200 characters"),
  facebook: Yup.string()
    .matches(
      /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/.*)?$/i,
      "Must be a valid website URL"
    )
    .max(200, "Limit: 200 characters"),
  egovAwardsCount: Yup.string()
    .required("This field is required")
    .max(200, "Limit: 200 characters"),

  projectName: Yup.string()
    .required("This field is required")
    .max(200, "Limit: 100 characters"),
  projectCategory: Yup.string()
    .required("This field is required")
    .max(200, "Limit: 200 characters"),
  projectPeriod: Yup.string()
    .required("This field is required")
    .max(200, "Limit: 200 characters"),
  projectURL: Yup.string()
    .required("This field is required")
    .matches(
      /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/.*)?$/i,
      "Must be a valid website URL"
    )
    .max(200, "Limit: 200 characters"),
  documents: Yup.mixed()
    .test("fileSize", "Max 3MB per file", (value) => {
      if (!value || !Array.isArray(value)) return true; // Allow empty
      return value.every((file) => file.size <= 3 * 1024 * 1024); // 3MB limit
    })
    .test("fileCount", "Max 5 files", (value) => {
      if (!value || !Array.isArray(value)) return true;
      return value.length <= 5;
    }),
  impactText: Yup.string().test("maxWords", "Limit: 1000 words", (value) => {
    if (!value) return true;

    return countWords(value) <= 1000;
  }),
  impactFile: Yup.mixed()
    .nullable()
    .test("fileSize", "Max 3MB per file", (value: any) => {
      if (!value) return true;
      return value.size <= 3 * 1024 * 1024;
    }),
  impactCheck: Yup.mixed().test(
    "eitherTextOrFile",
    "At least one input field must be filled",
    function () {
      const { impactText, impactFile } = this.parent;

      const hasText = !!impactText?.trim();
      const hasFile = impactFile instanceof File;

      return hasText || hasFile;
    }
  ),
  relevanceText: Yup.string().test("maxWords", "Limit: 1000 words", (value) => {
    if (!value) return true;

    return countWords(value) <= 1000;
  }),
  relevanceFile: Yup.mixed()
    .nullable()
    .test("fileSize", "Max 3MB per file", (value: any) => {
      if (!value) return true;
      return value.size <= 3 * 1024 * 1024;
    }),
  relevanceCheck: Yup.mixed().test(
    "eitherTextOrFile",
    "At least one input field must be filled",
    function () {
      const { relevanceText, relevanceFile } = this.parent;

      const hasText = !!relevanceText?.trim();
      const hasFile = relevanceFile instanceof File;

      return hasText || hasFile;
    }
  ),
  sustainabilityText: Yup.string().test(
    "maxWords",
    "Limit: 1000 words",
    (value) => {
      if (!value) return true;

      return countWords(value) <= 1000;
    }
  ),
  sustainabilityFile: Yup.mixed()
    .nullable()
    .test("fileSize", "Max 3MB per file", (value: any) => {
      if (!value) return true;
      return value.size <= 3 * 1024 * 1024;
    }),
  sustainabilityCheck: Yup.mixed().test(
    "eitherTextOrFile",
    "At least one input field must be filled",
    function () {
      const { sustainabilityText, sustainabilityFile } = this.parent;

      const hasText = !!sustainabilityText?.trim();
      const hasFile = sustainabilityFile instanceof File;

      return hasText || hasFile;
    }
  ),
  innovationText: Yup.string().test(
    "maxWords",
    "Limit: 1000 words",
    (value) => {
      if (!value) return true;

      return countWords(value) <= 1000;
    }
  ),
  innovationFile: Yup.mixed()
    .nullable()
    .test("fileSize", "Max 3MB per file", (value: any) => {
      if (!value) return true;
      return value.size <= 3 * 1024 * 1024;
    }),
  innovationCheck: Yup.mixed().test(
    "eitherTextOrFile",
    "At least one input field must be filled",
    function () {
      const { innovationText, innovationFile } = this.parent;

      const hasText = !!innovationText?.trim();
      const hasFile = innovationFile instanceof File;

      return hasText || hasFile;
    }
  ),
  goalText1: Yup.string().test("maxWords", "Limit: 1000 words", (value) => {
    if (!value) return true;

    return countWords(value) <= 1000;
  }),
  goalFile1: Yup.mixed()
    .nullable()
    .test("fileSize", "Max 3MB per file", (value: any) => {
      if (!value) return true;
      return value.size <= 3 * 1024 * 1024;
    }),
  goal1Check: Yup.mixed().test(
    "eitherTextOrFile",
    "At least one input field must be filled",
    function () {
      const { goalText1, goalFile1 } = this.parent;

      const hasText = !!goalText1?.trim();
      const hasFile = goalFile1 instanceof File;

      return hasText || hasFile;
    }
  ),
  goalText2: Yup.string().test("maxWords", "Limit: 1000 words", (value) => {
    if (!value) return true;

    return countWords(value) <= 1000;
  }),
  goalFile2: Yup.mixed()
    .nullable()
    .test("fileSize", "Max 3MB per file", (value: any) => {
      if (!value) return true;
      return value.size <= 3 * 1024 * 1024;
    }),
  goal2Check: Yup.mixed().test(
    "eitherTextOrFile",
    "At least one input field must be filled",
    function () {
      const { goalText2, goalFile2 } = this.parent;

      const hasText = !!goalText2?.trim();
      const hasFile = goalFile2 instanceof File;

      return hasText || hasFile;
    }
  ),
  goals: Yup.mixed().test(
    "required",
    "At least one goal is required",
    (value) => {
      if (typeof value === "string") return value.trim().length > 0;
      if (Array.isArray(value)) return value.length > 0;
      return false;
    }
  ),
});
const handleSubmit = async (values: any /* { region: string } */) => {
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
  lguAbbreviation: "",
  province: "",
  region: "",
  nameOfLCE: "",
  nameOfOffice: "",
  contactPerson: "",
  email: "",
  officeNumber: "",
  mobileNumber: "",
  website: "",
  facebook: "",
  egovAwardsCount: "",
  projectName: "",
  projectCategory: "",
  projectPeriod: "",
  projectURL: "",
  documents: [new File([""], "", { type: "" })] as File[],
  impactText: "",
  impactFile: null,
  relevanceText: "",
  relevanceFile: null,
  sustainabilityText: "",
  sustainabilityFile: null,
  innovationText: "",
  innovationFile: null,
  goalText1: "",
  goalFile1: null,
  goalText2: "",
  goalFile2: null,

  goals: [],
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
  setValue: Function
) => {
  const files = event.target.files;
  const size = event.target.files?.[0]?.size;
  if (size) {
    if (size > 3 * 1024 * 1024) {
      toast({
        title: "File too large!",
        description: "Please upload a file smaller than 3MB.",
        variant: "destructive",
        duration: 2500,
      });
      return;
    } else {
      if (files && files.length > 0) {
        setValue();
      }
    }
  }
};

export default function Registration() {
  const router = useRouter();
  const [submitDialog, setSubmitDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [page, setPage] = useState(1);
  const cachedData = storage.getItem("formData");

  const fields: Record<number, string[]> = {
    1: ["lgu", "email", "website"],
    2: ["projectName"],
  };
  const validateFields = async (
    setFieldTouched: any,
    validateField: any,
    errors: any,
    page: number
  ) => {
    const fieldsToValidate = fields[page] || [];

    await Promise.all(
      fieldsToValidate.map(async (field) => {
        await setFieldTouched(field, true, false);
        await validateField(field);
      })
    );

    const hasError = fieldsToValidate.some((field) => errors[field]);

    return hasError;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        validateForm,
        values,
        validateField,
        errors,
        setFieldTouched,
        resetForm,
      }) => {
        const [hasError, setHasError] = useState(false);

        useEffect(() => {
          const isPaused = storage.getItem("isPaused");
          if (!isPaused) {
            const handler = setTimeout(() => {
              storage.setItem("formData", values);
            }, 1000);
            return () => clearTimeout(handler);
          }
        }, [values]);

        return (
          <Form className="mx-0 lg:mx-16 flex flex-col gap-6 ">
            <section>
              <>
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
                  ][page - 1]
                }
              </>
            </section>

            {page < 9 && page != 0 && (
              <section className="flex justify-between items-center">
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => {
                    storage.setItem("isPaused", false), setPage(page - 1);
                    window.scrollTo({ top: 200, behavior: "smooth" });
                  }}
                  /* draggable="false"
                   href={{
                    pathname: "/registration",
                    query: { action: "register", page: page - 1 },
                  }} */
                  className={`text-slate-900 border border-black flex gap-2 text-xs items-center hover:bg-slate-100 p-2.5 px-6 rounded-md transition-colors duration-300 ${
                    page === 1 ? "invisible " : "visible"
                  }`}
                >
                  <ArrowLeft size={15} /> Back
                </Button>
                {page < 8 ? (
                  <Button
                    type="button"
                    onClick={() => {
                      storage.setItem("isPaused", false), setPage(page + 1);
                      window.scrollTo({ top: 200, behavior: "smooth" });
                    }}
                    /*  onClick={() => {
                      validateFields(
                        setFieldTouched,
                        validateField,
                        errors,
                        page
                      ).then((hasErrors) => {
                        if (!hasErrors) {
                          router.push(
                            `/registration?action=register&page=${page + 1}`
                          );
                        }
                      });
                    }} */
                    /*  href={{
                      pathname: "/registration",
                      query: { action: "register", page: page + 1 },
                    }} */
                    /*                     type="button"
                     */
                    className={`bg-[#1F2937] flex gap-2 text-xs items-center transition-colors duration-300  hover:bg-slate-700 text-white p-2.5 px-6 rounded-md ${
                      hasError &&
                      "opacity-50 cursor-not-allowed pointer-events-none"
                    }`}
                  >
                    <ArrowRight size={15} />
                    Next
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={async (e) => {
                      e.preventDefault();
                      Object.keys(validationSchema.fields).forEach((field) => {
                        setFieldTouched(field, true);
                        validateField(field);
                      });
                      const validationErrors = await validateForm(); // Validates the form

                      if (Object.keys(validationErrors).length === 0) {
                        setSubmitDialog(true);
                      } else {
                        toast({
                          title: "Submission Failed",
                          description: "Please check the required fields.",
                          variant: "destructive",
                          duration: 3000,
                        });
                      }
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
                    <Lottie animationData={warning} loop={false} />{" "}
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
                      className="w-full rounded-0 bg-slate-100 text-slate-900 p-3 hover:bg-slate-200 font-semibold text-base transition-colors duration-300"
                    >
                      Cancel
                    </button>
                  </DialogClose>
                  <div className="size-full group bg-[#2563EB] hover:bg-[#3674fa]">
                    <Button
                      type="submit"
                      /* href={{
                       pathname: "/registration",
                       query: { action: "register", page: page + 1 },
                     }} */
                      onClick={() => {
                        handleSubmit(values);
                        setSubmitDialog(false);
                        setSuccessDialog(true);
                      }}
                      className="w-full size-full flex items-center justify-center rounded-0 bg-[#2563EB] p-3 text-base text-white font-semibold group-hover:bg-[#3674fa] transition-colos duration-300"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={successDialog}>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <DialogContent className="sm:max-w-4xl  overflow-hidden border-0 p-16">
                <div className="relative">
                  <div className="mx-10 lg:mx-16 flex flex-col gap-6 ">
                    <div className="gap-3 flex flex-col items-center justify-center">
                      <Image src={success} alt="" className="mr-4" />
                      <h2 className="font-bold  text-2xl text-center lg:text-3xl text-blue-900">
                        Submission Successful!{" "}
                      </h2>
                      <div className="text-blue-500">
                        <h3 className="text-sm font-medium">
                          REFERENCE NUMBER{" "}
                        </h3>
                        <h3 className="font-bold text-3xl">25G2BCAL</h3>
                      </div>
                      <p className="font-semibold text-center text-sm lg:text-base">
                        Thank you for submitting your application.
                      </p>
                      <p className="font-[300] text-sm lg:text-base text-center text-slate-700">
                        We've received your information and are currently
                        validating it.
                        <br />
                        You’ll receive a confirmation email shortly. If you have
                        any questions, feel free to reach out!
                      </p>
                      <Button
                        type="button"
                        draggable="false"
                        /*  href={{
                          pathname: "/registration",
                          query: { action: "register", page: 1 },
                        }} */
                        onClick={() => {
                          resetForm();
                          setSuccessDialog(false);
                          setPage(1);
                          window.scrollTo({ top: 200, behavior: "smooth" });
                        }}
                        className="flex active items-center justify-center text-sm rounded-lg bg-[#DBEAFE]  py-2 px-3 font-semibold text-[#1E40AF] hover:bg-[#bed7f9] transition-colos duration-300"
                      >
                        Close{" "}
                      </Button>
                      {/*   <Button
                        type="button"
                        variant={"ghost"}
                        onClick={() => {
                          setSuccessDialog(false);
                        }}
                        className="font-semibold bg-transparent  hover:text-[#142AF6] text-[#2563EB]"
                      >
                        Close{" "}
                      </Button> */}
                    </div>
                  </div>
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 1,
                      ease: "easeInOut",
                    }}
                    className="scale-[1.30] absolute inset-0 pointer-events-none"
                  >
                    <Image src={bg} alt="" fill className=" object-cover" />
                  </m.div>
                </div>
              </DialogContent>
            </Dialog>
          </Form>
        );
      }}
    </Formik>
  );
}
