"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Eye, EyeOffIcon, Lock } from "lucide-react";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AnimatePresence, m } from "motion/react";
import { apiGet, apiPost } from "@/utils/api";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

import dict from "@/public/assets/images/dict2.webp";
import { Label } from "@/components/ui/label";
import FloatingIcons from "@/components/shared/floating-icons";
import Loading from "@/components/shared/loading";
import { storage } from "@/utils/useStorage";
import { decrypt } from "@/utils/utility";

export default function SignInPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);

  const [verified, setVerified] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const verifyCode = async () => {
    const code = decrypt(storage.getItem("verification_Code"));
    if (code) {
      const { data } = await apiGet(`/api/auth/signup/verify/${code}`);
      if (data.isVerified) {
        setVerified(true);
      }
    }
    setIsLoaded(true);
    /*
     */
  };
  useEffect(() => {
    verifyCode();
  }, []);
  const handleSubmit = async (values: any) => {
    const { success, data, message } = await apiPost("/api/auth/login", values);

    if (success) {
      /*  setItem("account_data", encrypt(JSON.stringify(data)));

      setTimeout(() => {
        setShowLoading(true);
        setTimeout(() => {
          router.push("/");
        }, 2500);
      }, 2000); */
    } else if (message?.includes("not found.")) {
      /*       setFieldError("password", "Please check your credentials");
       */
      toast({
        title: "Login failed",
        variant: "destructive",
        description: "Invalid email or password",
        duration: 2000,
      });
    } else {
      toast({
        title: "Submission Failed",
        variant: "destructive",
        description: "Something went wrong. Please try again.",
        duration: 2000,
      });
    }
  };
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(8, "At least 8 characters")
      .matches(/[A-Za-z]/, "Must include a letter")
      .matches(/\d/, "Must include a number")
      .matches(/[@$!%*?&.#]/, "Must include a special character")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Required"),
  });
  return (
    <div className="size-full">
      {isLoaded && (
        <>
          {" "}
          {verified ? (
            <div className="size-full">
              <div className="relative size-full">
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
                    initialValues={{ newPassword: "", confirmPassword: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ errors }) => {
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
                        <Form className="max-w-[380px]  mx-auto lg:mx-0 max-h-screen overflow-hidden w-full">
                          {" "}
                          <h2 className="font-bold text-base uppercase mb-4 text-center text-blue-600">
                            set up password
                          </h2>{" "}
                          <AnimatePresence mode="wait">
                            <m.div
                              key="setup"
                              {...animation}
                              className="min-h-[300px]"
                            >
                              <Card className="w-full p-8">
                                <CardContent className="p-0">
                                  <div className="flex w-full flex-col gap-3 pb-8">
                                    <div className="flex w-full flex-col gap-3">
                                      <div className="flex flex-col gap-1 ">
                                        <div className="flex items-center gap-1">
                                          <Label className="text-sm font-semibold text-slate-900">
                                            Create Password
                                          </Label>
                                          <ErrorMessage
                                            name="newPassword"
                                            component="div"
                                            className=" text-xs text-red-500"
                                          />
                                        </div>
                                        <div className=" relative">
                                          <Field
                                            type={
                                              isPasswordVisible
                                                ? "text"
                                                : "password"
                                            }
                                            autoComplete="off"
                                            name="newPassword"
                                            placeholder="Enter Password"
                                            as={Input}
                                            className="space-y-8  rounded-md bg-white px-10"
                                          />
                                          <Lock
                                            size={18}
                                            color="#6B7280"
                                            className="top-1/2 -translate-y-1/2 left-3 absolute"
                                          />
                                          <div
                                            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                            onClick={() =>
                                              setIsPasswordVisible(
                                                !isPasswordVisible
                                              )
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
                                                    size={18}
                                                    color="#6B7280"
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
                                                    size={18}
                                                    color="#6B7280"
                                                  />
                                                </m.span>
                                              )}
                                            </AnimatePresence>
                                          </div>
                                        </div>
                                        <p className="text-sm font-medium text-slate-400">
                                          Must be a minimum of 8 characters, A
                                          combination of alphabetic, numeric,
                                          and special characters.
                                        </p>
                                      </div>
                                      <div className="flex flex-col gap-1 pb-2">
                                        <div className="flex items-center gap-1">
                                          <Label className="text-sm font-semibold text-slate-900">
                                            Confirm Password
                                          </Label>
                                          <ErrorMessage
                                            name="confirmPassword"
                                            component="div"
                                            className=" text-xs text-red-500"
                                          />
                                        </div>
                                        <div className=" relative">
                                          <Field
                                            type={
                                              isPasswordVisible2
                                                ? "text"
                                                : "password"
                                            }
                                            autoComplete="off"
                                            name="confirmPassword"
                                            placeholder="Enter Password"
                                            as={Input}
                                            className="space-y-8  rounded-md bg-white px-10"
                                          />
                                          <Lock
                                            size={15}
                                            color="#6B7280"
                                            className="top-1/2 -translate-y-1/2 left-3 absolute"
                                          />
                                          <div
                                            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                            onClick={() =>
                                              setIsPasswordVisible2(
                                                !isPasswordVisible2
                                              )
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
                                                    size={18}
                                                    color="#6B7280"
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
                                                    size={18}
                                                    color="#6B7280"
                                                  />
                                                </m.span>
                                              )}
                                            </AnimatePresence>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                                <div className="flex gap-4 justify-center">
                                  <Button
                                    disabled={Object.keys(errors).length > 0}
                                    /*                               onClick={() => setAction("login")}
                                     */ className={`bg-[#1F2937] flex justify-center w-full gap-2 text-sm font-semibold items-center transition-colors duration-300  hover:bg-slate-700 text-white p-2 px-6 rounded-md`}
                                  >
                                    Submit
                                  </Button>
                                </div>
                              </Card>
                            </m.div>
                          </AnimatePresence>
                          <div className="flex flex-col gap-2 mt-9 items-center justify-end">
                            <h2 className="text-xs text-slate-400">
                              DEVELOPED BY{" "}
                            </h2>
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
                <FloatingIcons />
              </div>
            </div>
          ) : (
            <>
              {" "}
              <div className="flex items-center justify-center size-full p-4">
                <Card className="w-full max-w-md p-8">
                  <CardContent className="p-0 text-center">
                    <div className="flex justify-center">
                      <div className="w-20 h-20 flex items-center justify-center rounded-full border-4 border-red-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="red"
                          className="w-12 h-12"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                      Invalid Link
                    </h2>
                    <p className="text-gray-600 mt-2">
                      To reset your password, return to the login page and
                      select{" "}
                      <span className="font-medium">
                        "Forgot Your Password"
                      </span>{" "}
                      to send a new email.
                    </p>
                    <Button
                      type="button"
                      onClick={() => router.push("/sign-in")}
                      className=" mt-10"
                    >
                      Proceed to Login
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
