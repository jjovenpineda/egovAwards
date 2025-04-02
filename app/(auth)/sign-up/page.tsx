"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import dict from "@/public/assets/images/dict2.webp";
import pdf from "@/public/assets/svgs/pdf.svg";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import ph from "@/public/assets/svgs/ph.svg";
import { Label } from "@/components/ui/label";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  FileTextIcon,
  Info,
  Mail,
  Search,
  Trash2,
} from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { signupInitialValues } from "@/constants";
import { apiGet, apiPost } from "@/utils/api";
import { toast } from "@/hooks/use-toast";
import FileViewer from "@/components/shared/file-viewer";
import { handleFileUpload } from "@/utils/file-upload";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
export interface ILGU {
  lgu: string;
  province: string;
  region: string;
  tenDigitCode: string;
}

const terms = [
  {
    title: "Introduction",
    content: `Welcome to the <strong>eGov Awards</strong>. By submitting an application, you agree to follow and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not proceed with the application"`,
  },
  {
    title: "Eligibility",
    content:
      "Applicants must meet the eligibility criteria outlined in the award guidelines. Submissions that do not meet the requirements may be disqualified.",
  },
  {
    title: "Application Submission",
    content: [
      "All applications must be submitted before the deadline specified on our official platform.",
      "Submitted materials must be original and must not infringe on any third-party rights.",
      "Incomplete or falsified applications will be rejected.",
    ],
  },
  {
    title: "Evaluation and Selection",
    content:
      "A designated panel of judges will review all applications. The selection process is based on predefined criteria, and the decision of the panel is final.",
  },
  {
    title: "Privacy and data use",
    content: `By submitting an application, you agree that your personal and project-related data may be collected, stored, and used for evaluating your application and for promotional activities related to the awards. For more details, please refer to our <a href='/privacy-policy' class='text-blue-500'>Privacy Policy</a>.`,
  },
  {
    title: "Intellectual Property",
    content:
      "Applicants own their materials. However, by submitting an application, you give eGov Awards the right to use, copy, and show your project details for marketing and storage.",
  },
  {
    title: "Award Disbursement",
    content:
      "Winners will be notified through the contact details provided in the application. Prizes, grants, or recognitions will be awarded as per the terms specified in the award program.",
  },
  {
    title: "Disqualification and Termination",
    content:
      "We reserve the right to disqualify any application that violates these terms, includes false information, or engages in misconduct.",
  },
  {
    title: "Amendments",
    content:
      "We may update these Terms and Conditions from time to time. Continued participation in the award program constitutes acceptance of any changes.",
  },
  {
    title: "Contact Information",
    content:
      "For any inquiries regarding these terms, please contact us at [Your Contact Email or Address].",
  },
];
export default function SignInPage() {
  const [page, setPage] = useState("email");
  const router = useRouter();
  const [LguList, setLguList] = useState<ILGU[]>([]);
  const [lguPopover, setLguPopover] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lguPage, setLguPage] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getLGUList = async () => {
    try {
      const res = await apiGet("/api/lgu/list");
      const { data } = res;
      if (!data) return;
      setLguList(data);
    } catch (e) {
      console.error("Error fetching LGU list:", e);
    }
  };

  const verifyEmail = async (values: any) => {
    try {
      const res = await apiGet(
        `/api/auth/forgot-password/verify/${values.email}`
      );
      const { success, message, data } = res;
      if (!success) {
        setIsLoading(false);
        setPage("info");
      } else if (success) {
        toast({
          title: "Email Already Exists",
          description: "Try using a different email.",
          variant: "destructive",
          duration: 2000,
        });
      }
    } catch (e) {
      console.error("Error:", e);
      setIsLoading(false);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
        duration: 2000,
      });
    }
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),

    firstname: Yup.string()
      .trim()
      .min(2, "At least 2 characters")
      .max(50, "Max 50 characters")
      .required("Required"),

    lastname: Yup.string()
      .trim()
      .min(2, "At least 2 characters")
      .max(50, "Max 50 characters")
      .required("Required"),

    middlename: Yup.string().trim().max(50, "Max 50 characters").nullable(),
    suffix: Yup.string().trim().max(10, "Max 10 characters").nullable(),

    joinCount: Yup.number()
      .typeError("Must be a number")
      .integer("Must be whole number")
      .min(0, "Cannot be negative")
      .required("Required"),

    lgu: Yup.string().trim().required("Required"),

    abbr: Yup.string().trim().max(10, "Max 10 characters").required("Required"),

    province: Yup.string().trim().required("Required"),

    region: Yup.string().trim().required("Required"),

    mobile: Yup.string()
      .matches(/^[1-9]\d{9}$/, "Invalid number")
      .required("Required"),
    authLetter: Yup.string().required("Required"),
  });

  const handleSubmit = async (values: any) => {
    try {
      await apiPost("/api/lgu/signup", values);
      setPage("complete");
    } catch (e) {
      console.error("Error:", e);
      setIsLoading(false);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
        duration: 2000,
      });
    }
  };
  useEffect(() => {
    getLGUList();
    /*     setIsLoaded(true);
     */
  }, []);
  return (
    <m.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="relative size-full overflow-hidden lg:py-20"
    >
      <div className="z-30 flex size-full  relative items-center justify-center">
        <Formik
          initialValues={{ ...signupInitialValues }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            setFieldTouched,
            values,
            setFieldValue,
            validateField,
            touched,
            errors,
          }) => {
            /*  useEffect(() => {
              const selectedLgu = LguList.find((lgu) => lgu.lgu === values.lgu);

              if (selectedLgu) {
                setFieldValue("province", selectedLgu.province);
                setFieldValue("region", selectedLgu.region);
              }
            }, [values.lgu]); */
            const animation = {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: 20 },
              transition: {
                duration: 0.2,
                ease: "easeInOut",
              },
            };
            return (
              <Form className="max-w-[380px]  mx-auto lg:mx-0 max-h-screen  w-full">
                {" "}
                <h2 className="font-bold text-base uppercase mb-4 text-center text-blue-600">
                  sign up
                </h2>{" "}
                <AnimatePresence mode="wait">
                  <div className="">
                    <div
                      defaultValue={"email"}
                      className="max-w-[438px]  mx-auto"
                    >
                      <div className="flex justify-center mb-2 items-center gap-4 h-11 pointer-events-none">
                        <div
                          className={`flex  items-center cursor-pointer  ${
                            page == "email"
                              ? "text-slate-900 font-semibold"
                              : "text-slate-600"
                          } `}
                        >
                          <div
                            className={`shadow-md  rounded-full size-7 mr-2 flex items-center justify-center  text-xs ${
                              page == "lgu" ||
                              page == "info" ||
                              page == "complete"
                                ? "bg-blue-600 text-white "
                                : "bg-slate-100"
                            }`}
                          >
                            {" "}
                            1
                          </div>{" "}
                          <h3
                            className={`${
                              page == "lgu" ||
                              page == "info" ||
                              page == "complete"
                                ? "text-blue-600 "
                                : ""
                            } text-xs `}
                          >
                            Email
                          </h3>
                        </div>

                        <hr className="border max-w-8 w-full "></hr>

                        <div
                          className={`flex  items-center cursor-pointer  ${
                            page == "info"
                              ? "text-slate-900 font-semibold"
                              : "text-[#6B7280]"
                          } `}
                        >
                          <div
                            className={`shadow-md  rounded-full size-7 mr-2 flex items-center justify-center  text-xs ${
                              page == "lgu" || page == "complete"
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100"
                            }`}
                          >
                            {" "}
                            2
                          </div>{" "}
                          <h3
                            className={`${
                              page == "lgu" || page == "complete"
                                ? "text-blue-600 "
                                : ""
                            } text-xs `}
                          >
                            Personal Info
                          </h3>
                        </div>

                        <hr className="border max-w-8 w-full "></hr>

                        <div
                          className={`flex  items-center cursor-pointer  ${
                            page == "lgu"
                              ? "text-slate-900 font-semibold"
                              : "text-[#6B7280]"
                          } `}
                        >
                          <div
                            className={`shadow-md  rounded-full size-7 mr-2 flex items-center justify-center  text-xs ${
                              page == "complete"
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100"
                            }`}
                          >
                            {" "}
                            3
                          </div>{" "}
                          <h3
                            className={`${
                              page == "complete" ? "text-blue-600 " : ""
                            } text-xs `}
                          >
                            LGU
                          </h3>
                        </div>
                      </div>
                      {page == "email" && (
                        <m.div
                          key="email"
                          {...animation}
                          className="mx-auto w-full overflow-hidden space-y-2"
                        >
                          {" "}
                          <Card className="w-full p-8">
                            <CardContent className="p-0">
                              <div className="flex w-full flex-col gap-3 pb-8">
                                <div className="flex flex-col gap-1 py-2">
                                  {" "}
                                  <h1 className="text-sm font-semibold text-slate-900">
                                    Email
                                  </h1>
                                  <div className="relative">
                                    <Field
                                      type="email"
                                      name="email"
                                      autoComplete="off"
                                      placeholder="Enter Email"
                                      as={Input}
                                      className="space-y-8 h-[46px] rounded-md bg-white pl-10"
                                    />
                                    <Mail
                                      size={18}
                                      color="#6B7280"
                                      className="absolute top-1/2 -translate-y-1/2 left-3"
                                    />
                                  </div>
                                  <ErrorMessage
                                    name="email"
                                    component="div"
                                    className=" text-xs text-red-500 font-semibold"
                                  />
                                  <p className="text-sm font-medium text-gray-400 mt-1">
                                    As the authorized representative of the LGU,
                                    you will be responsible for gathering and
                                    consolidating all entries and submissions of
                                    the various programs and projects within
                                    your jurisdiction.
                                  </p>
                                </div>
                              </div>

                              {/*  <div className="relative mt-8 flex items-center justify-center">
               <Image alt="" src={""} className="animate-spin-custom" />
             </div> */}
                            </CardContent>
                            <div className="flex gap-4 justify-center">
                              <Button
                                disabled={!values.email || !!errors.email}
                                onClick={() => {
                                  verifyEmail(values);
                                }}
                                className={`bg-[#1F2937] flex justify-center w-full gap-2 text-sm font-semibold items-center transition-colors duration-300  hover:bg-slate-700 text-white p-2.5 px-6 rounded-md`}
                              >
                                Next
                              </Button>
                            </div>
                            <div className="text-sm text-gray-400 mt-4">
                              Already have an account?{" "}
                              <span
                                onClick={() => router.push("/sign-in")}
                                className="text-blue-400 font-semibold hover:text-blue-600 cursor-pointer"
                              >
                                Login here
                              </span>
                            </div>
                          </Card>
                          <div className="text-sm text-gray-500 mt-4 text-center font-normal">
                            By continuing to sign up, you agree to our{" "}
                            <Dialog>
                              <DialogTrigger>
                                <div className="text-teal-500 font-semibold hover:text-teal-600 cursor-pointer">
                                  Terms of Service and Privacy Policy.{" "}
                                </div>{" "}
                              </DialogTrigger>
                              <DialogContent x className="sm:max-w-3xl">
                                <DialogHeader>
                                  <DialogTitle>
                                    <div className="flex items-center gap-1 text-teal-600 font-semibold">
                                      <FileTextIcon size={15} />
                                      Terms of Service and Privacy Policy
                                    </div>
                                  </DialogTitle>
                                  <DialogDescription></DialogDescription>
                                </DialogHeader>
                                <ScrollArea className="h-full max-h-[80vh] w-full">
                                  <div className=" mx-auto p-6">
                                    {terms.map((term, index) => (
                                      <div key={index} className="mb-6">
                                        <h2 className="text-lg font-bold mb-2">
                                          {index + 1}. {term.title}
                                        </h2>
                                        {Array.isArray(term.content) ? (
                                          <ul className="list-disc pl-5">
                                            {term.content.map((point, i) => (
                                              <li key={i}>{point}</li>
                                            ))}
                                          </ul>
                                        ) : (
                                          <p
                                            className="text-gray-700"
                                            dangerouslySetInnerHTML={{
                                              __html: term.content,
                                            }}
                                          />
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </ScrollArea>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </m.div>
                      )}
                      {page == "lgu" && (
                        <m.div
                          key="lgu"
                          {...animation}
                          className="flex space-y-2 "
                        >
                          <div className="mx-auto w-full overflow-hidden">
                            {" "}
                            <Card className="w-full p-8">
                              <CardContent className="p-0">
                                <div className="flex w-full flex-col gap-3 pb-8">
                                  <div className="  lg:pr-4 ">
                                    <div className="flex gap-1 items-center">
                                      <Label className="font-semibold text-sm text-[#1F2937]">
                                        LGU{" "}
                                      </Label>
                                      <ErrorMessage
                                        name="lgu"
                                        component="div"
                                        className=" text-xs text-red-500 font-semibold"
                                      />
                                    </div>

                                    <Popover
                                      open={lguPopover}
                                      onOpenChange={setLguPopover}
                                    >
                                      <PopoverTrigger asChild>
                                        <div
                                          onClick={() => {
                                            setSearchQuery(""),
                                              setFieldTouched("lgu", true);
                                          }}
                                          id="popover-trigger"
                                          className="flex items-center justify-between  cursor-pointer border w-full rounded-md p-2 my-2 shadow-sm px-3 text-sm"
                                        >
                                          {values.lgu
                                            ? values.lgu
                                            : "Select LGU"}
                                          <ChevronDown
                                            size={15}
                                            className="text-slate-500"
                                          />
                                        </div>
                                      </PopoverTrigger>

                                      <PopoverContent
                                        side="bottom"
                                        align="start"
                                        className="w-[var(--radix-popover-trigger-width)] cursor-pointer relative"
                                      >
                                        <div className="relative bg-white z-10 shadow-sm py-2">
                                          <Input
                                            type="text"
                                            autoComplete="off"
                                            name="lgu_website"
                                            placeholder="Search LGU"
                                            onChange={(e) => {
                                              setSearchQuery(e.target.value);
                                            }}
                                            className=" space-y-8 rounded-md bg-white pl-9"
                                          />
                                          <Search
                                            size={15}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                                          />
                                        </div>
                                        {(() => {
                                          const itemsPerPage = 10;
                                          const paginatedList = LguList?.slice(
                                            0,
                                            lguPage * itemsPerPage
                                          );
                                          return (
                                            <ScrollArea className="max-h-[200px] overflow-y-auto p-0 ">
                                              {searchQuery ? (
                                                <>
                                                  {LguList.filter((item) =>
                                                    item.lgu
                                                      .toLowerCase()
                                                      .includes(
                                                        searchQuery
                                                          .trim()
                                                          .toLowerCase()
                                                      )
                                                  )
                                                    .slice(
                                                      0,
                                                      lguPage * itemsPerPage
                                                    )
                                                    .map((item, index) => (
                                                      <div
                                                        key={index}
                                                        onClick={() => {
                                                          setFieldValue(
                                                            "lgu",
                                                            item.lgu
                                                          );
                                                          setFieldValue(
                                                            "province",
                                                            item.province
                                                          );
                                                          setFieldValue(
                                                            "region",
                                                            item.region
                                                          );
                                                          setTimeout(() => {},
                                                          500);

                                                          setLguPopover(false);
                                                        }}
                                                        className=" group hover:text-blue-700  cursor-pointer py-0.5 p-2 rounded-md my-1"
                                                      >
                                                        {item.lgu.trim()}
                                                        {item.province && (
                                                          <span>, </span>
                                                        )}

                                                        <span className="group-hover:text-blue-700 text-slate-500">
                                                          {item.province}
                                                        </span>
                                                      </div>
                                                    ))}

                                                  {LguList.filter((item) =>
                                                    item.lgu
                                                      .toLowerCase()
                                                      .includes(
                                                        searchQuery
                                                          .trim()
                                                          .toLowerCase()
                                                      )
                                                  ).length >
                                                    lguPage * itemsPerPage && (
                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        setLguPage(lguPage + 1)
                                                      }
                                                      className="text-slate-500 text-sm w-full cursor-pointer hover:underline py-1"
                                                    >
                                                      Load More
                                                    </button>
                                                  )}
                                                </>
                                              ) : (
                                                <>
                                                  {paginatedList.map(
                                                    (item, index) => (
                                                      <div
                                                        key={index}
                                                        onClick={() => {
                                                          setFieldValue(
                                                            "lgu",
                                                            item.lgu
                                                          );
                                                          setFieldValue(
                                                            "province",
                                                            item.province
                                                          );
                                                          setFieldValue(
                                                            "region",
                                                            item.region
                                                          );
                                                          setTimeout(() => {},
                                                          500);

                                                          setLguPopover(false);
                                                        }}
                                                        className=" group hover:text-blue-700  cursor-pointer py-0.5 p-2 rounded-md my-1"
                                                      >
                                                        {item.lgu.trim()}
                                                        {item.province && (
                                                          <span>, </span>
                                                        )}

                                                        <span className="group-hover:text-blue-700 text-slate-500">
                                                          {item.province}
                                                        </span>
                                                      </div>
                                                    )
                                                  )}
                                                  {LguList.length >
                                                    paginatedList.length && (
                                                    <button
                                                      onClick={() => {
                                                        setLguPage(lguPage + 1);
                                                      }}
                                                      className="text-slate-500 text-sm  w-full cursor-pointer hover:underline py-1"
                                                    >
                                                      Load More
                                                    </button>
                                                  )}
                                                </>
                                              )}
                                            </ScrollArea>
                                          );
                                        })()}
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                  <div className="  lg:pr-4 ">
                                    <div className="flex gap-1 items-center">
                                      <Label className="font-semibold text-sm text-[#1F2937]">
                                        LGU Abbreviation{" "}
                                      </Label>

                                      <ErrorMessage
                                        name="abbr"
                                        component="div"
                                        className=" text-xs text-red-500 font-semibold"
                                      />
                                    </div>

                                    <Field
                                      type="text"
                                      autoComplete="off"
                                      name="abbr"
                                      placeholder="Enter LGU Abbreviation"
                                      as={Input}
                                      className=" space-y-8 rounded-md bg-white "
                                    />
                                  </div>
                                  <div>
                                    <div className="flex flex-col-reverse">
                                      <Input value={values.province} disabled />
                                      <div className="flex gap-1 items-center">
                                        <Label className="opacity-50 font-semibold text-sm text-[#1F2937]">
                                          Province{" "}
                                        </Label>
                                        <ErrorMessage
                                          name="lgu_region"
                                          component="div"
                                          className=" text-xs text-red-500 font-semibold"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex flex-col-reverse">
                                      <Input value={values.region} disabled />

                                      <div className="flex gap-1 items-center">
                                        <Label className="opacity-50 font-semibold text-sm text-[#1F2937]">
                                          Region{" "}
                                        </Label>
                                        <ErrorMessage
                                          name="lgu_region"
                                          component="div"
                                          className=" text-xs text-red-500 font-semibold"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col-reverse gap-1 pb-2">
                                    <Field
                                      type="text"
                                      autoComplete="off"
                                      name="joinCount"
                                      placeholder="Enter Number of Times Joined"
                                      as={Input}
                                      onInput={(e: any) => {
                                        e.target.value = e.target.value.replace(
                                          /[^0-9]/g,
                                          ""
                                        );
                                      }}
                                      className="peer space-y-8 rounded-md h-[46px] bg-white "
                                    />
                                    <div className="flex justify-between">
                                      <div className="flex gap-1 items-center">
                                        <Label className="text-sm font-semibold text-slate-900">
                                          Number of Times Joined{" "}
                                        </Label>
                                        <ErrorMessage
                                          name="joinCount"
                                          component="div"
                                          className=" text-xs text-red-500 font-semibold"
                                        />
                                      </div>
                                      <TooltipProvider>
                                        <Tooltip delayDuration={0}>
                                          <TooltipTrigger asChild>
                                            <Info
                                              className="text-emerald-400"
                                              size={18}
                                            />
                                          </TooltipTrigger>
                                          <TooltipContent side="right">
                                            <p className="max-w-[230px] text-center">
                                              Number of times in joining eGOV,
                                              Digital Cities Awards, Digital
                                              Governance Awards from 2012 to
                                              2022.
                                            </p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-2 items-center my-4">
                                    <Label className="text-sm peer-disabled:text-slate-500 font-semibold text-slate-900">
                                      Upload Authorization Letter
                                    </Label>
                                    <p className="text-sm text-slate-700">
                                      Please upload an official letter as proof
                                      of your authorization.{" "}
                                    </p>
                                    <div>
                                      <div className="overflow-hidden">
                                        {values.authLetter ? (
                                          <div className="flex items-center gap-2 ">
                                            {" "}
                                            <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                                              <div className="flex items-center gap-2">
                                                <Image src={pdf} alt="" />
                                                <span className="line-clamp-2">
                                                  {values.authLetter
                                                    .split("-")
                                                    .pop()}
                                                </span>
                                              </div>
                                              <FileViewer
                                                url={values.authLetter}
                                              />
                                            </div>
                                            <Trash2
                                              size={18}
                                              color="red"
                                              className="shrink-0 cursor-pointer"
                                              onClick={() =>
                                                setFieldValue("authLetter", "")
                                              }
                                            />
                                          </div>
                                        ) : (
                                          <Input
                                            value={""}
                                            type="file"
                                            accept="application/pdf"
                                            placeholder="Enter Project/Program Name"
                                            className="w-full"
                                            onChange={async (e) => {
                                              const file =
                                                await handleFileUpload(e);

                                              setFieldValue("authLetter", file);
                                            }}
                                          />
                                        )}
                                      </div>
                                      <ErrorMessage
                                        name="innovationAnswer_file"
                                        component="div"
                                        className=" text-sm text-red-500 font-semibold"
                                      />
                                      <p className="text-slate-500 text-sm">
                                        Accepted format: PDF (Max file size:
                                        3MB).{" "}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                              <section className="flex w-full items-center gap-4">
                                <Button
                                  type="button"
                                  onClick={() => setPage("info")}
                                  variant={"secondary"}
                                  className="w-full"
                                >
                                  Back
                                </Button>
                                <Button
                                  disabled={
                                    !values.email ||
                                    !values.lgu ||
                                    !values.abbr ||
                                    !values.region ||
                                    !values.joinCount ||
                                    !values.authLetter ||
                                    !!errors.email ||
                                    !!errors.lgu ||
                                    !!errors.abbr ||
                                    !!errors.region ||
                                    !!errors.joinCount ||
                                    !!errors.authLetter
                                  }
                                  type="submit"
                                  onClick={() => handleSubmit(values)}
                                  className="w-full"
                                >
                                  Sign Up
                                </Button>
                              </section>
                            </Card>
                          </div>
                        </m.div>
                      )}
                      {page == "info" && (
                        <m.div
                          key="info"
                          {...animation}
                          className="flex space-y-2 "
                        >
                          <div className="mx-auto w-full overflow-hidden">
                            {" "}
                            <Card className="w-full p-8">
                              <CardContent className="p-0">
                                <div className="flex w-full flex-col gap-3 pb-8">
                                  <div className="flex flex-col-reverse gap-1 pb-2">
                                    <Field
                                      type="text"
                                      autoComplete="off"
                                      name="firstname"
                                      placeholder="Enter First Name"
                                      as={Input}
                                      className="peer space-y-8 rounded-md h-[46px] bg-white "
                                    />
                                    <div className="flex items-center gap-1">
                                      <Label className="text-sm  font-semibold text-slate-900">
                                        First Name{" "}
                                      </Label>
                                      <ErrorMessage
                                        name="firstname"
                                        component="div"
                                        className=" text-xs text-red-500 font-semibold"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-col-reverse gap-1 pb-2">
                                    <Field
                                      type="text"
                                      autoComplete="off"
                                      name="middlename"
                                      placeholder="Enter Middle Name"
                                      as={Input}
                                      className="peer space-y-8 rounded-md h-[46px] bg-white "
                                    />
                                    <div className="flex justify-between items-center">
                                      <Label className="text-sm  font-semibold text-slate-900">
                                        Middle Name{" "}
                                      </Label>
                                      <h2 className="text-slate-500 text-sm">
                                        Optional
                                      </h2>
                                    </div>
                                    <ErrorMessage
                                      name="middlename"
                                      component="div"
                                      className=" text-xs text-red-500 font-semibold"
                                    />
                                  </div>
                                  <div className="flex flex-col-reverse gap-1 pb-2">
                                    <Field
                                      type="text"
                                      autoComplete="off"
                                      name="lastname"
                                      placeholder="Enter Last Name"
                                      as={Input}
                                      className="peer space-y-8 rounded-md h-[46px] bg-white "
                                    />
                                    <div className="flex gap-1 items-center">
                                      <Label className="text-sm  font-semibold text-slate-900">
                                        Last Name
                                      </Label>
                                      <ErrorMessage
                                        name="lastname"
                                        component="div"
                                        className=" text-xs text-red-500 font-semibold"
                                      />
                                    </div>
                                  </div>

                                  <div className="flex flex-col-reverse gap-1 pb-2">
                                    <Field
                                      type="text"
                                      autoComplete="off"
                                      name="suffix"
                                      placeholder="Enter Suffix Name"
                                      as={Input}
                                      className="peer space-y-8 rounded-md h-[46px] bg-white "
                                    />
                                    <div className="flex justify-between items-center">
                                      <Label className="text-sm  font-semibold text-slate-900">
                                        Suffix Name
                                      </Label>
                                      <h2 className="text-slate-500 text-sm">
                                        Optional
                                      </h2>
                                    </div>
                                    <ErrorMessage
                                      name="suffix"
                                      component="div"
                                      className=" text-xs text-red-500 font-semibold"
                                    />
                                  </div>
                                  <div className="flex flex-col gap-1 pb-2">
                                    <div className="flex gap-1 items-center">
                                      <Label className="text-sm  font-semibold text-slate-900">
                                        Mobile Number
                                      </Label>
                                      <ErrorMessage
                                        name="mobile"
                                        component="div"
                                        className=" text-xs text-red-500 font-semibold"
                                      />
                                    </div>
                                    <div className="relative">
                                      <Field
                                        type="text"
                                        autoComplete="off"
                                        name="mobile"
                                        placeholder="9876543210"
                                        as={Input}
                                        onInput={(
                                          e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                          let value = e.target.value.replace(
                                            /[^0-9]/g,
                                            ""
                                          );
                                          value = value.replace(/^0+/, "");
                                          if (value.length > 0) {
                                            e.target.value = value;
                                          }
                                        }}
                                        className="pl-[70px] space-y-8 h-[46px] rounded-md bg-white "
                                      />

                                      <span className="absolute left-10 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                                        +63
                                      </span>
                                      <Image
                                        src={ph}
                                        alt=""
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </CardContent>

                              <section className="flex w-full items-center gap-4">
                                <Button
                                  type="button"
                                  onClick={() => setPage("email")}
                                  variant={"secondary"}
                                  className="w-full"
                                >
                                  Back
                                </Button>
                                <Button
                                  disabled={
                                    !values.firstname ||
                                    !values.lastname ||
                                    !values.mobile ||
                                    !!errors.firstname ||
                                    !!errors.lastname ||
                                    !!errors.mobile
                                  }
                                  type="button"
                                  className="w-full"
                                  onClick={() => setPage("lgu")}
                                >
                                  Next
                                </Button>
                              </section>
                            </Card>
                          </div>
                        </m.div>
                      )}
                      {page == "complete" && (
                        <m.div key="complete" {...animation}>
                          <h2 className="font-semibold mt-12 text-center text-lg text-blue-700">
                            Complete Your Setup!
                          </h2>
                          <p className="text-gray-600 text-center mt-[10px]">
                            Please check your email for a link to set up your
                            password and complete your account setup.
                          </p>
                          <div className="w-full flex justify-center mt-8"></div>
                        </m.div>
                      )}
                    </div>
                  </div>
                </AnimatePresence>{" "}
                <div className="flex flex-col gap-2 mt-10 items-center justify-end">
                  <h2 className="text-xs text-slate-400">DEVELOPED BY </h2>
                  <Image
                    src={dict}
                    alt="logo"
                    className="max-w-[186px] w-full mx-auto"
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </m.div>
  );
}
