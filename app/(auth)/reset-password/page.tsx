"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Check,
  CheckCircle2Icon,
  Dot,
  Eye,
  EyeOffIcon,
  Loader2,
  Lock,
  X,
} from "lucide-react";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AnimatePresence, m } from "motion/react";
import { apiGet, apiPost, apiPut } from "@/utils/api";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

import dict from "@/public/assets/images/dict2.webp";
import { Label } from "@/components/ui/label";
import FloatingIcons from "@/components/shared/floating-icons";
import Loading from "@/components/shared/loading";
import { storage } from "@/utils/useStorage";
import { decrypt } from "@/utils/utility";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("verificationCode");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const [successReset, setSuccessReset] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [DisableSubmit, setDisableSubmit] = useState(false);
  const router = useRouter();

  const verifyCode = async () => {
    const res = await apiGet(`/api/auth/signup/verify/${code}`);
    if (res) {
      res.success && setIsAuth(true);
    }

    setIsLoaded(true);
  };
  useEffect(() => {
    verifyCode();
  }, []);

  const handleSubmit = async (values: any) => {
    setDisableSubmit(true);
    values = { password: values.newPassword };
    try {
      const { success } = await apiPut(
        `/api/auth/change/password/${code}`,
        values
      );
      if (success) {
        setSuccessReset(true);

        setTimeout(() => {
          router.push("/sign-in");
        }, 2500);
      }
    } catch (e) {
      console.error("Error:", e);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
        duration: 2000,
      });
      setDisableSubmit(false);
    }
  };
  return (
    <div className="size-full relative z-10">
      <>
        {isLoaded && (
          <>
            {" "}
            {isAuth ? (
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
                      validationSchema={Yup.object().shape({
                        newPassword: Yup.string()
                          .min(8, "At least 8 characters")
                          .matches(/[A-Za-z]/, "Must include a letter")
                          .matches(/\d/, "Must include a number")
                          .matches(
                            /[@$!%*?&.#]/,
                            "Must include a special character"
                          )
                          .required("Required"),
                        confirmPassword: Yup.string()
                          .oneOf(
                            [Yup.ref("newPassword")],
                            "Passwords must match"
                          )
                          .required("Required"),
                      })}
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
                          <>
                            {" "}
                            <Form className="max-w-[380px]  mx-auto lg:mx-0 max-h-screen overflow-hidden w-full">
                              {" "}
                              {!successReset && (
                                <h2 className="font-bold text-base uppercase mb-4 text-center text-blue-600">
                                  set up password
                                </h2>
                              )}{" "}
                              <AnimatePresence mode="wait">
                                <m.div
                                  key="setup"
                                  {...animation}
                                  className="min-h-[300px]"
                                >
                                  {!successReset ? (
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
                                                Must be a minimum of 8
                                                characters, A combination of
                                                alphabetic, numeric, and special
                                                characters.
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
                                          disabled={
                                            !isValid || !dirty || DisableSubmit
                                          }
                                          onClick={() => handleSubmit(values)}
                                          className={`bg-[#1F2937] flex justify-center w-full gap-2 text-sm font-semibold items-center transition-colors duration-300  hover:bg-slate-700 text-white p-2 px-6 rounded-md`}
                                        >
                                          {DisableSubmit ? (
                                            <Loader2
                                              size={18}
                                              className=" animate-spin"
                                            />
                                          ) : (
                                            <span>Submit</span>
                                          )}
                                        </Button>
                                      </div>
                                    </Card>
                                  ) : (
                                    <Card className="w-full p-8">
                                      <CardContent className="p-0 text-center">
                                        <m.div
                                          initial={{
                                            opacity: 0,
                                            scale: 0.5,
                                            rotate: -10,
                                          }}
                                          animate={{
                                            opacity: 1,
                                            scale: 1,
                                            rotate: 0,
                                          }}
                                          transition={{
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 12,
                                          }}
                                          className="flex justify-center"
                                        >
                                          <div className="size-12 flex items-center justify-center rounded-full border-4 border-emerald-500 text-emerald-500">
                                            <Check size={35} />
                                          </div>
                                        </m.div>
                                        <h2 className="text-xl font-semibold text-gray-800 mt-4">
                                          Password Reset Successful
                                        </h2>
                                        <div className="text-gray-800 text-sm">
                                          You can now log in with your new
                                          credentials.
                                        </div>
                                        <div className="flex text-xl font-bold items-center justify-center mt-4">
                                          <m.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [0, 1, 0] }}
                                            transition={{
                                              duration: 1.5,
                                              repeat: Infinity,
                                              ease: "easeInOut",
                                            }}
                                            className="flex "
                                          >
                                            ...
                                          </m.div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  )}
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
                          </>
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
                <div className="flex flex-col  items-center justify-center size-full p-4">
                  <Card className="w-full max-w-md p-8">
                    <CardContent className="p-0 text-center">
                      <m.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex justify-center"
                      >
                        <div className="size-12 flex items-center justify-center rounded-full border-4 border-red-500 text-red-500">
                          <X size={35} />
                        </div>
                      </m.div>
                      <h2 className="text-xl font-semibold text-gray-800 mt-4">
                        Invalid Link
                      </h2>
                      <p className="text-gray-600 mt-2 text-sm">
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
                        Back to Login{" "}
                      </Button>
                    </CardContent>
                  </Card>
                  <div className="flex flex-col gap-2 mt-9 items-center justify-end">
                    <h2 className="text-xs text-slate-400">DEVELOPED BY </h2>
                    <Image
                      src={dict}
                      alt="logo"
                      className="max-w-[186px] w-full mx-auto"
                    />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </>
    </div>
  );
}
