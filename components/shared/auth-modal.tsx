"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import egovAwards from "@/public/assets/images/egovAwards.webp";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import ph from "@/public/assets/svgs/ph.svg";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { Eye, EyeOffIcon, Loader2, Lock, Mail, Send } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { DialogClose } from "../ui/dialog";
import dynamic from "next/dynamic";
import Loaders from "../ui/loaders";
interface IAuthModal {
  action: string | null;
  page: number;
}
export default function AuthModal({ action, page }: IAuthModal) {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const [timer, setTimer] = useState(0);
  const [resetDisable, setResetDisable] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOTPValid, setIsOTPValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResetDisable(false);
    }
  }, [timer]);
  useEffect(() => {
    if (page === 6 && action === "signup") {
      setTimeout(
        () =>
          (window.location.href =
            "http://localhost:3000/registration?action=register&page=1"),
        5000
      );
    }
  }, []);
  const handleResend = () => {
    console.log(" reset:");
    setTimer(60);
    setResetDisable(true);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (
    values: { email: string; password: string },
    { setFieldError }: FormikHelpers<{ email: string; password: string }>
  ) => {
    setIsLoading(true);

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

    setTimeout(() => {
      router.push("/");
      setIsLoading(false);
    }, 2000);
  };
  return (
    <div className="">
      <Tabs
        defaultValue={action ? action : "login"}
        className="max-w-[438px] min-h-[55vh] mx-auto"
      >
        {![4, 5, 6].includes(page) && action != "reset" && (
          <TabsList className="grid w-full grid-cols-2 h-auto bg-slate-100">
            <Link
              draggable="false"
              href={{
                href: "/registration",
                query: { action: "login", page: 1 },
              }}
              className=""
            >
              <TabsTrigger
                value="login"
                className="data-[state=active]:text-blue-600 w-full text-slate-600  font-bold text-base"
              >
                Login Account
              </TabsTrigger>
            </Link>
            <Link
              draggable="false"
              href={{
                href: "/registration",
                query: { action: "signup", page: 1 },
              }}
              className=""
            >
              <TabsTrigger
                value="signup"
                className="data-[state=active]:text-blue-600 w-full text-slate-600 font-bold text-base"
              >
                Sign Up
              </TabsTrigger>
            </Link>
          </TabsList>
        )}

        <TabsContent value="login">
          <div>
            {action === "login" && page === 1 && (
              <div className="space-y-2">
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {() => (
                    <Form className="mx-auto w-full overflow-hidden">
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
                                className=" text-xs text-red-500"
                              />
                            </div>

                            <div className="flex flex-col gap-1 pb-2">
                              <h1 className="text-sm font-semibold text-slate-900">
                                Password
                              </h1>
                              <div className=" relative">
                                <Field
                                  type={isPasswordVisible ? "text" : "password"}
                                  autoComplete="off"
                                  name="password"
                                  placeholder="Enter Password"
                                  as={Input}
                                  className="space-y-8 h-[46px] rounded-md bg-white px-10"
                                />
                                <Lock
                                  size={18}
                                  color="#6B7280"
                                  className="top-1/2 -translate-y-1/2 left-3 absolute"
                                />
                                <div
                                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                  onClick={() =>
                                    setIsPasswordVisible(!isPasswordVisible)
                                  }
                                >
                                  <AnimatePresence mode="wait" initial={false}>
                                    {isPasswordVisible ? (
                                      <m.span
                                        key="eyeOff"
                                        initial={{
                                          clipPath: "circle(0% at 50% 50%)",
                                        }}
                                        animate={{
                                          clipPath: "circle(100% at 50% 50%)",
                                        }}
                                        transition={{
                                          duration: 0.3,
                                          ease: "easeOut",
                                        }}
                                      >
                                        <EyeOffIcon size={18} color="#6B7280" />
                                      </m.span>
                                    ) : (
                                      <m.span
                                        key="eye"
                                        initial={{
                                          clipPath: "circle(0% at 50% 50%)",
                                        }}
                                        animate={{
                                          clipPath: "circle(100% at 50% 50%)",
                                        }}
                                        transition={{
                                          duration: 0.3,
                                          ease: "easeOut",
                                        }}
                                      >
                                        <Eye size={18} color="#6B7280" />
                                      </m.span>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>
                              <ErrorMessage
                                name="password"
                                component="div"
                                className=" text-xs text-red-500"
                              />
                            </div>
                            <Link
                              draggable="false"
                              href={{
                                pathname: "/registration",
                                query: { action: "reset", page: 1 },
                              }}
                              className="text-blue-500 font-medium  w-fit text-xs hover:text-blue-700 cursor-pointer"
                            >
                              Forgot Password?
                            </Link>
                          </div>

                          {/*  <div className="relative mt-8 flex items-center justify-center">
                    <Image alt="" src={""} className="animate-spin-custom" />
                  </div> */}
                        </CardContent>
                        <div className="flex justify-center">
                          <Button
                            disabled={isLoading}
                            className={`bg-white-900 w-full transition-all duration-300 ease-out bg-[#1F2937] normal-case text-white  hover:bg-slate-700 ${
                              isLoading &&
                              "scale-95 w-[15%] rounded-full bg-slate-950"
                            }`}
                            type="submit"
                          >
                            {isLoading ? (
                              <Loader2 size={18} className=" animate-spin" />
                            ) : (
                              <span className="font-semibold">Login</span>
                            )}
                          </Button>
                        </div>
                      </Card>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
            {action === "reset" && page === 1 && (
              <div className="space-y-2">
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {() => (
                    <Form className="mx-auto w-full overflow-hidden">
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
                                className=" text-xs text-red-500"
                              />
                            </div>
                          </div>

                          {/*  <div className="relative mt-8 flex items-center justify-center">
               <Image alt="" src={""} className="animate-spin-custom" />
             </div> */}
                        </CardContent>
                        <div className="flex gap-4 justify-center">
                          <Link
                            draggable="false"
                            href={{
                              pathname: "/registration",
                              query: { action: "login", page: 1 },
                            }}
                            className={`text-slate-900 flex justify-center  w-full  gap-2 text-sm font-semibold items-center hover:bg-slate-200 bg-[#F3F4F6] p-2.5 px-6 rounded-md transition-colors duration-300`}
                          >
                            Cancel
                          </Link>
                          <Link
                            draggable="false"
                            href={{
                              pathname: "/registration",
                              query: { action: "reset", page: page + 1 },
                            }}
                            className={`bg-[#1F2937] flex justify-center w-full gap-2 text-sm font-semibold items-center transition-colors duration-300  hover:bg-slate-700 text-white p-2.5 px-6 rounded-md`}
                          >
                            Submit
                          </Link>
                        </div>
                      </Card>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
            {action === "reset" && page === 2 && (
              <div className="space-y-2">
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {() => (
                    <Form className="mx-auto w-full overflow-hidden">
                      {" "}
                      <Card className="w-full p-8">
                        <CardContent className="p-0">
                          <div className="flex w-full flex-col gap-3 pb-8">
                            <div className="flex w-full flex-col gap-3">
                              <div className="flex flex-col gap-1 ">
                                <Label className="text-sm font-semibold text-slate-900">
                                  Create Password
                                </Label>
                                <div className=" relative">
                                  <Field
                                    type={
                                      isPasswordVisible ? "text" : "password"
                                    }
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Enter Password"
                                    as={Input}
                                    className="space-y-8 h-[46px] rounded-md bg-white px-10"
                                  />
                                  <Lock
                                    size={18}
                                    color="#6B7280"
                                    className="top-1/2 -translate-y-1/2 left-3 absolute"
                                  />
                                  <div
                                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                    onClick={() =>
                                      setIsPasswordVisible(!isPasswordVisible)
                                    }
                                  >
                                    <AnimatePresence
                                      mode="wait"
                                      initial={false}
                                    >
                                      {isPasswordVisible ? (
                                        <m.span
                                          key="eyeOff"
                                          initial={{
                                            clipPath: "circle(0% at 50% 50%)",
                                          }}
                                          animate={{
                                            clipPath: "circle(100% at 50% 50%)",
                                          }}
                                          transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                          }}
                                        >
                                          <EyeOffIcon
                                            size={18}
                                            color="#6B7280"
                                          />
                                        </m.span>
                                      ) : (
                                        <m.span
                                          key="eye"
                                          initial={{
                                            clipPath: "circle(0% at 50% 50%)",
                                          }}
                                          animate={{
                                            clipPath: "circle(100% at 50% 50%)",
                                          }}
                                          transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                          }}
                                        >
                                          <Eye size={18} color="#6B7280" />
                                        </m.span>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </div>
                                <p className="text-sm font-medium text-slate-400">
                                  Must be a minimum of 8 characters, A
                                  combination of alphabetic, numeric, and
                                  special characters.
                                </p>
                                <ErrorMessage
                                  name="password"
                                  component="div"
                                  className=" text-xs text-red-500"
                                />
                              </div>
                              <div className="flex flex-col gap-1 pb-2">
                                <Label className="text-sm font-semibold text-slate-900">
                                  Confirm Password
                                </Label>
                                <div className=" relative">
                                  <Field
                                    type={
                                      isPasswordVisible2 ? "text" : "password"
                                    }
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Enter Password"
                                    as={Input}
                                    className="space-y-8 h-[46px] rounded-md bg-white px-10"
                                  />
                                  <Lock
                                    size={18}
                                    color="#6B7280"
                                    className="top-1/2 -translate-y-1/2 left-3 absolute"
                                  />
                                  <div
                                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                    onClick={() =>
                                      setIsPasswordVisible2(!isPasswordVisible2)
                                    }
                                  >
                                    <AnimatePresence
                                      mode="wait"
                                      initial={false}
                                    >
                                      {isPasswordVisible2 ? (
                                        <m.span
                                          key="eyeOff"
                                          initial={{
                                            clipPath: "circle(0% at 50% 50%)",
                                          }}
                                          animate={{
                                            clipPath: "circle(100% at 50% 50%)",
                                          }}
                                          transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                          }}
                                        >
                                          <EyeOffIcon
                                            size={18}
                                            color="#6B7280"
                                          />
                                        </m.span>
                                      ) : (
                                        <m.span
                                          key="eye"
                                          initial={{
                                            clipPath: "circle(0% at 50% 50%)",
                                          }}
                                          animate={{
                                            clipPath: "circle(100% at 50% 50%)",
                                          }}
                                          transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                          }}
                                        >
                                          <Eye size={18} color="#6B7280" />
                                        </m.span>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </div>
                                <ErrorMessage
                                  name="password"
                                  component="div"
                                  className=" text-xs text-red-500"
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <div className="flex gap-4 justify-center">
                          <Link
                            draggable="false"
                            href={{
                              pathname: "/registration",
                              query: { action: "login", page: 1 },
                            }}
                            className={`bg-[#1F2937] flex justify-center w-full gap-2 text-sm font-semibold items-center transition-colors duration-300  hover:bg-slate-700 text-white p-2.5 px-6 rounded-md`}
                          >
                            Submit
                          </Link>
                        </div>
                      </Card>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="signup">
          <div className="space-y-2">
            <div className="flex ">
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form className="mx-auto w-full overflow-hidden">
                    {" "}
                    <Card className="w-full p-8">
                      <CardContent className="p-0">
                        {page === 1 && action === "signup" && (
                          <div className="flex w-full flex-col gap-3 pb-8">
                            <div className="flex flex-col gap-1 py-2">
                              {" "}
                              <Label className="text-sm font-semibold text-slate-900">
                                LGU
                              </Label>
                              <Select>
                                <SelectTrigger className="h-[46px]">
                                  <SelectValue placeholder="Select LGU" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="apple">
                                      lorem ipsum
                                    </SelectItem>
                                    <SelectItem value="banana">
                                      Dolor sit amet
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <ErrorMessage
                                name="email"
                                component="div"
                                className=" text-xs text-red-500"
                              />
                            </div>

                            <div className="flex flex-col-reverse gap-1 pb-2">
                              <Field
                                type="text"
                                autoComplete="off"
                                name="province"
                                placeholder="Select Province"
                                as={Input}
                                disabled
                                className="peer space-y-8 rounded-md h-[46px] bg-white "
                              />
                              <Label className="text-sm peer-disabled:text-slate-500 font-semibold text-slate-900">
                                Province
                              </Label>
                              <ErrorMessage
                                name="province"
                                component="div"
                                className=" text-xs text-red-500"
                              />
                            </div>

                            <div className="flex flex-col-reverse gap-1 pb-2">
                              <Field
                                type="text"
                                autoComplete="off"
                                name="region"
                                placeholder="Select Region"
                                as={Input}
                                disabled
                                className="peer space-y-8 h-[46px] rounded-md bg-white "
                              />
                              <Label
                                aria-disabled
                                className="text-sm peer-disabled:text-slate-500 font-semibold text-slate-900"
                              >
                                Region
                              </Label>

                              <ErrorMessage
                                name="region"
                                component="div"
                                className=" text-xs text-red-500"
                              />
                            </div>
                          </div>
                        )}
                        {page === 2 && action === "signup" && (
                          <div className="flex w-full flex-col gap-3 pb-8">
                            <div className="flex flex-col gap-1 py-2">
                              {" "}
                              <Label className="text-sm font-semibold text-slate-900">
                                First Name
                              </Label>
                              <Field
                                type="text"
                                autoComplete="off"
                                name="name"
                                placeholder="Enter First Name"
                                as={Input}
                                className=" space-y-8 rounded-md h-[46px]  bg-white "
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className=" text-xs text-red-500"
                              />
                            </div>

                            <div className="flex flex-col gap-1 pb-2">
                              <Label className="text-sm  font-semibold text-slate-900">
                                Last Name
                              </Label>
                              <Field
                                type="text"
                                autoComplete="off"
                                name="lastname"
                                placeholder="Enter Last Name"
                                as={Input}
                                className=" space-y-8 rounded-md h-[46px]  bg-white "
                              />

                              <ErrorMessage
                                name="lastname"
                                component="div"
                                className=" text-xs text-red-500"
                              />
                            </div>

                            <div className="flex flex-col gap-1 pb-2">
                              <Label className="text-sm  font-semibold text-slate-900">
                                Mobile Number
                              </Label>
                              <div className="relative">
                                <Field
                                  type="text"
                                  autoComplete="off"
                                  name="lastname"
                                  placeholder="9876543210"
                                  as={Input}
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

                              <ErrorMessage
                                name="lastname"
                                component="div"
                                className=" text-xs text-red-500"
                              />
                            </div>
                          </div>
                        )}
                        {page === 3 && action === "signup" && (
                          <div className="flex w-full flex-col gap-3 pb-8">
                            <div className="flex w-full flex-col gap-3">
                              <div className="flex flex-col gap-1 py-2">
                                <Label className="text-sm font-semibold text-slate-900">
                                  Email
                                </Label>
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
                                  className=" text-xs text-red-500"
                                />
                              </div>
                              <div className="flex flex-col gap-1 ">
                                <Label className="text-sm font-semibold text-slate-900">
                                  Create Password
                                </Label>
                                <div className=" relative">
                                  <Field
                                    type={
                                      isPasswordVisible ? "text" : "password"
                                    }
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Enter Password"
                                    as={Input}
                                    className="space-y-8 h-[46px] rounded-md bg-white px-10"
                                  />
                                  <Lock
                                    size={18}
                                    color="#6B7280"
                                    className="top-1/2 -translate-y-1/2 left-3 absolute"
                                  />
                                  <div
                                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                    onClick={() =>
                                      setIsPasswordVisible(!isPasswordVisible)
                                    }
                                  >
                                    <AnimatePresence
                                      mode="wait"
                                      initial={false}
                                    >
                                      {isPasswordVisible ? (
                                        <m.span
                                          key="eyeOff"
                                          initial={{
                                            clipPath: "circle(0% at 50% 50%)",
                                          }}
                                          animate={{
                                            clipPath: "circle(100% at 50% 50%)",
                                          }}
                                          transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                          }}
                                        >
                                          <EyeOffIcon
                                            size={18}
                                            color="#6B7280"
                                          />
                                        </m.span>
                                      ) : (
                                        <m.span
                                          key="eye"
                                          initial={{
                                            clipPath: "circle(0% at 50% 50%)",
                                          }}
                                          animate={{
                                            clipPath: "circle(100% at 50% 50%)",
                                          }}
                                          transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                          }}
                                        >
                                          <Eye size={18} color="#6B7280" />
                                        </m.span>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </div>
                                <p className="text-sm font-medium text-slate-400">
                                  Must be a minimum of 8 characters, A
                                  combination of alphabetic, numeric, and
                                  special characters.
                                </p>
                                <ErrorMessage
                                  name="password"
                                  component="div"
                                  className=" text-xs text-red-500"
                                />
                              </div>
                              <div className="flex flex-col gap-1 pb-2">
                                <Label className="text-sm font-semibold text-slate-900">
                                  Confirm Password
                                </Label>
                                <div className=" relative">
                                  <Field
                                    type={
                                      isPasswordVisible2 ? "text" : "password"
                                    }
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Enter Password"
                                    as={Input}
                                    className="space-y-8 h-[46px] rounded-md bg-white px-10"
                                  />
                                  <Lock
                                    size={18}
                                    color="#6B7280"
                                    className="top-1/2 -translate-y-1/2 left-3 absolute"
                                  />
                                  <div
                                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                    onClick={() =>
                                      setIsPasswordVisible2(!isPasswordVisible2)
                                    }
                                  >
                                    <AnimatePresence
                                      mode="wait"
                                      initial={false}
                                    >
                                      {isPasswordVisible2 ? (
                                        <m.span
                                          key="eyeOff"
                                          initial={{
                                            clipPath: "circle(0% at 50% 50%)",
                                          }}
                                          animate={{
                                            clipPath: "circle(100% at 50% 50%)",
                                          }}
                                          transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                          }}
                                        >
                                          <EyeOffIcon
                                            size={18}
                                            color="#6B7280"
                                          />
                                        </m.span>
                                      ) : (
                                        <m.span
                                          key="eye"
                                          initial={{
                                            clipPath: "circle(0% at 50% 50%)",
                                          }}
                                          animate={{
                                            clipPath: "circle(100% at 50% 50%)",
                                          }}
                                          transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                          }}
                                        >
                                          <Eye size={18} color="#6B7280" />
                                        </m.span>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </div>
                                <ErrorMessage
                                  name="password"
                                  component="div"
                                  className=" text-xs text-red-500"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {page === 4 && action === "signup" && (
                          <div className="space-y-8">
                            <div>
                              <h2 className="font font-semibold text-xl">
                                Verify Email
                              </h2>
                              <p className="text-base text-[#1F2937]">
                                Please enter the one-time password sent to your
                                email.
                              </p>
                            </div>
                            <div className="flex flex-col gap-1 pb-8">
                              <Label className="text-sm font-semibold text-slate-900">
                                Email
                              </Label>
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
                              <button
                                type="button"
                                disabled={resetDisable}
                                onClick={() => handleResend()}
                                className="text-blue-500 w-fit pt-1 disabled:hover:cursor-not-allowed disabled:text-blue-500 disabled:opacity-50 font-medium text-xs hover:text-blue-700 cursor-pointer"
                              >
                                Resend OTP{" "}
                                {timer != 0 && <span>{`${timer}s`}</span>}
                              </button>
                              <ErrorMessage
                                name="email"
                                component="div"
                                className=" text-xs text-red-500"
                              />
                            </div>
                          </div>
                        )}
                        {page === 5 && action === "signup" && (
                          <div className="space-y-8">
                            <div>
                              <h2 className="font font-semibold text-xl">
                                Verify Email
                              </h2>
                              <p className="text-base text-[#1F2937]">
                                Please enter the one-time password sent to your
                                email.
                              </p>
                            </div>
                            <div className="flex flex-col gap-1 pb-8">
                              <Label className="text-sm font-semibold text-slate-900">
                                Enter OTP
                              </Label>

                              <InputOTP
                                maxLength={6}
                                className=""
                                isValid={isOTPValid}
                                onChange={(value) => {
                                  value.length === 6 /* && value === "123456" */
                                    ? setIsOTPValid(true)
                                    : value.length === 6 && value != "123456"
                                    ? setIsOTPValid(false)
                                    : setIsOTPValid(null);

                                  if (
                                    value.length === 6 /* &&
                                    value === "123456" */
                                  ) {
                                    setTimeout(() => {
                                      window.location.href =
                                        "http://localhost:3000/registration?action=signup&page=6";
                                    }, 3000);
                                  }
                                }}
                              >
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                  <InputOTPSlot index={3} />
                                  <InputOTPSlot index={4} />
                                  <InputOTPSlot index={5} />
                                </InputOTPGroup>
                              </InputOTP>

                              <div
                                className={`${
                                  isOTPValid ? "text-green-500" : "text-red-500"
                                } w-fit pt-1 text-xs mx-auto text-center`}
                              >
                                {isOTPValid == true
                                  ? "Verified"
                                  : isOTPValid == false
                                  ? "Invalid OTP"
                                  : ""}
                                {isOTPValid == true && (
                                  <div className="mx-auto mt-4">
                                    <Loaders
                                      loader={"lineWobble"}
                                      color="#c4c4c4"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                        {page === 6 && action === "signup" && (
                          <div className="space-y-8">
                            <Image
                              src={egovAwards}
                              alt="egov awards logo"
                              className="object-contain mx-auto"
                            />

                            <div>
                              <h2 className="font text-center font-semibold text-xl text-[#14B8A6]">
                                Successful Email Verification
                              </h2>
                              <p className="text-base text-center text-[##F2937]">
                                Congratulations! You’ve successfully created
                                your eGov Awards account. Submit your entry now
                                to get started!
                              </p>
                              <div className="flex justify-center mt-6">
                                {" "}
                                <Loaders
                                  loader={"lineWobble"}
                                  color="#c4c4c4"
                                ></Loaders>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                      {page < 5 && (
                        <section className="flex items-center gap-2">
                          <Link
                            draggable="false"
                            href={{
                              pathname: "/registration",
                              query: { action: "signup", page: page - 1 },
                            }}
                            className={`text-slate-900 flex justify-center  w-full  gap-2 text-sm font-semibold items-center hover:bg-slate-200 bg-[#F3F4F6] p-2.5 px-6 rounded-md transition-colors duration-300 ${
                              [1, 4].includes(page)
                                ? "invisible absolute"
                                : "visible block"
                            }`}
                          >
                            Back
                          </Link>
                          {page < 8 ? (
                            <Link
                              draggable="false"
                              href={{
                                pathname: "/registration",
                                query: { action: "signup", page: page + 1 },
                              }}
                              className={`bg-[#1F2937] flex justify-center w-full gap-2 text-sm font-semibold items-center transition-colors duration-300  hover:bg-slate-700 text-white p-2.5 px-6 rounded-md ${
                                [1, 4].includes(page) && "w-full"
                              }`}
                            >
                              {page === 3
                                ? "Sign Up"
                                : page === 4
                                ? "Submit"
                                : "Next"}
                            </Link>
                          ) : (
                            <Button
                            /*     onClick={() => {
                              setSubmitDialog(true);
                            }} */
                            >
                              <Send />
                              Submit
                            </Button>
                          )}
                        </section>
                      )}
                    </Card>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
