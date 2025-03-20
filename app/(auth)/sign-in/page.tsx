"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import {
  Eye,
  EyeOffIcon,
  Loader2,
  LogIn,
  Mail,
  Lock,
  Send,
  SendIcon,
  SendHorizontal,
} from "lucide-react";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AnimatePresence, m } from "motion/react";
import { decrypt, encrypt, setCookie } from "@/utils/utility";
import { apiGet, apiPost, apiPut } from "@/utils/api";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import carousel from "@/public/assets/images/carousel1.webp";
import login from "@/public/assets/images/login.webp";
import egov from "@/public/assets/images/egov.svg";

import lgus from "@/public/assets/images/lgus.webp";

import dict from "@/public/assets/images/dict2.webp";
import { Label } from "@/components/ui/label";
import Loading from "@/components/shared/loading";
import { storage } from "@/utils/useStorage";
import FloatingIcons from "@/components/shared/floating-icons";

export default function SignInPage() {
  const [index, setIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const { setItem } = storage;
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [action, setAction] = useState("login");
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    if (action === "login") {
      try {
        const res = await apiPost("/api/auth/login", values);
        const { success, message, data } = res;
        if (success) {
          setItem("account_data", encrypt(JSON.stringify(data)));

          setTimeout(() => {
            setShowLoading(true);
            setTimeout(() => {
              router.push("/");
            }, 2500);
          }, 2000);
        }
      } catch (e) {
        console.error("Error:", e);
        setIsLoading(false);
        toast({
          title: "Login failed",
          variant: "destructive",
          description: "Invalid email or password",
          duration: 2000,
        });
      }
    } else if (action === "email") {
      try {
        const res = await apiGet(
          `/api/auth/forgot-password/verify/${values.email}`
        );
        const { success, message, data } = res;
        if (success) {
          setIsSubmitted(true);
          setTimer(30);
          setIsLoading(false);
        }
      } catch (e) {
        console.error("Error:", e);
        setIsLoading(false);
        toast({
          title: "Invalid Email",
          description: "Enter a valid email.",
          variant: "destructive",
          duration: 2000,
        });
      }
    }
  };
  return (
    <div className="overflow-hidden min-h-screen  -z-10 size-full ">
      {showLoading && <Loading />}

      <div className="size-full overflow-hidden items-center justify-center">
        <div className="size-full">
          <m.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="z-30 flex size-full relative items-center justify-center"
          >
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={
                action === "login"
                  ? Yup.object().shape({
                      email: Yup.string()
                        .email("Invalid email")
                        .required("This field is required"),
                      password: Yup.string().required("This field is required"),
                    })
                  : action === "email"
                  ? Yup.object().shape({
                      email: Yup.string()
                        .email("Invalid email")
                        .required("This field is required"),
                    })
                  : {}
              }
              onSubmit={handleSubmit}
            >
              {({ isValid, dirty, values }) => {
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
                  <Form className="max-w-[380px]  mx-auto lg:mx-0  overflow-hidden w-full">
                    {" "}
                    <h2 className="font-bold text-base uppercase mb-4 text-center text-blue-600">
                      {action == "login"
                        ? "Login"
                        : action == "email"
                        ? "FORGOT PASSWORD"
                        : "Set up password"}
                    </h2>{" "}
                    <AnimatePresence mode="wait">
                      {action == "login" && (
                        <m.div
                          {...animation}
                          key="login"
                          className="min-h-[300px]"
                        >
                          <Card className=" p-4">
                            <CardContent className="grid gap-4">
                              <div className=" flex w-full flex-col gap-4">
                                <div className="flex w-full flex-col gap-4">
                                  <div className="space-y-3">
                                    <div className="flex flex-col gap-1 py-2">
                                      {" "}
                                      <h1 className="text-sm font-medium text-slate-900">
                                        Email
                                      </h1>
                                      <Field
                                        type="email"
                                        name="email"
                                        autoComplete="off"
                                        placeholder="johndoe@egovawards.com"
                                        as={Input}
                                        className="space-y-8 rounded-md bg-white"
                                      />
                                      <ErrorMessage
                                        name="email"
                                        component="div"
                                        className=" text-xs text-red-500"
                                      />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                      <h1 className="text-sm font-medium text-slate-900">
                                        Password
                                      </h1>
                                      <div className=" relative">
                                        <Field
                                          type={
                                            isPasswordVisible
                                              ? "text"
                                              : "password"
                                          }
                                          autoComplete="off"
                                          name="password"
                                          placeholder="••••••••"
                                          as={Input}
                                          className="space-y-8 rounded-md bg-white"
                                        />

                                        <div
                                          className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                          onClick={togglePasswordVisibility}
                                        >
                                          <AnimatePresence
                                            mode="wait"
                                            initial={false}
                                          >
                                            {isPasswordVisible ? (
                                              <m.span
                                                key="eyeOff"
                                                initial={{
                                                  clipPath:
                                                    "circle(0% at 50% 50%)",
                                                }}
                                                animate={{
                                                  clipPath:
                                                    "circle(100% at 50% 50%)",
                                                }}
                                                transition={{
                                                  duration: 0.3,
                                                  ease: "easeOut",
                                                }}
                                              >
                                                <EyeOffIcon
                                                  size={15}
                                                  className="text-slate-500"
                                                />
                                              </m.span>
                                            ) : (
                                              <m.span
                                                key="eye"
                                                initial={{
                                                  clipPath:
                                                    "circle(0% at 50% 50%)",
                                                }}
                                                animate={{
                                                  clipPath:
                                                    "circle(100% at 50% 50%)",
                                                }}
                                                transition={{
                                                  duration: 0.3,
                                                  ease: "easeOut",
                                                }}
                                              >
                                                <Eye
                                                  size={15}
                                                  className="text-slate-500"
                                                />
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
                                    <p
                                      onClick={() => setAction("email")}
                                      className=" text-blue-600  w-fit cursor-pointer hover:text-blue-800 text-palette-neutral-primary text-xs"
                                    >
                                      Forgot Password?
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/*  <div className="relative mt-8 flex items-center justify-center">
                         <Image alt="" src={""} className="animate-spin-custom" />
                       </div> */}
                            </CardContent>
                            <Button
                              disabled={isLoading}
                              className={`bg-white-900 mt-8 w-full mx-auto transition-all duration-300 ease-out bg-slate-900 normal-case text-white  hover:bg-slate-500 `}
                              type="submit"
                            >
                              {isLoading ? (
                                <Loader2 size={18} className=" animate-spin" />
                              ) : (
                                <span>Login</span>
                              )}
                            </Button>
                          </Card>
                        </m.div>
                      )}

                      {action == "email" && (
                        <m.div
                          key="email"
                          {...animation}
                          className="min-h-[300px]"
                        >
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
                                      className="space-y-8 rounded-md bg-white pl-10"
                                    />
                                    <Mail
                                      size={18}
                                      color="#6B7280"
                                      className="absolute top-1/2 -translate-y-1/2 left-3"
                                    />
                                  </div>
                                  {isSubmitted && (
                                    <m.p
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      className="text-xs text-emerald-500"
                                    >
                                      Password reset link sent.
                                    </m.p>
                                  )}
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
                              <Button
                                type="button"
                                onClick={() => setAction("login")}
                                className={`text-slate-900 flex justify-center  w-full  gap-2 text-sm font-semibold items-center hover:bg-slate-200 bg-[#F3F4F6] p-2.5 px-6 rounded-md transition-colors duration-300`}
                              >
                                Cancel
                              </Button>
                              <Button
                                disabled={!isValid || !dirty || timer > 0}
                                type="button"
                                onClick={() => handleSubmit(values)}
                                className={`bg-[#1F2937] flex justify-center w-full gap-2 text-sm font-semibold items-center transition-colors duration-300  hover:bg-slate-700 text-white p-2.5 px-6 rounded-md`}
                              >
                                {isLoading ? (
                                  <Loader2
                                    size={18}
                                    className=" animate-spin"
                                  />
                                ) : (
                                  <span>
                                    {" "}
                                    {isSubmitted ? (
                                      timer > 0 ? (
                                        `Resend in ${timer}s`
                                      ) : (
                                        <div className="flex gap-2 items-center">
                                          Resend <SendHorizontal size={10} />
                                        </div>
                                      )
                                    ) : (
                                      "Submit"
                                    )}
                                  </span>
                                )}
                              </Button>
                            </div>
                          </Card>
                        </m.div>
                      )}
                    </AnimatePresence>
                    <div className="flex flex-col gap-2 mt-9 items-center justify-end">
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
          </m.div>
        </div>
      </div>
    </div>
  );
}
