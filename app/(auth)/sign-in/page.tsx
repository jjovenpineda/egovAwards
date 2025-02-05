"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
/* import asiaPacific from "@/public/asia-pacific.svg"
 */ /* import logo from "@/public/logo.png"; */

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { Eye, EyeOffIcon, Loader2, LogIn } from "lucide-react";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AnimatePresence, m } from "motion/react";
import { encrypt, setCookie } from "@/utils/utility";
import { apiPost } from "@/utils/api";
import { toast } from "@/hooks/use-toast";

export default function SignInPage() {
  const router = useRouter();
  /*   const { setItem } = useStorage()
   */ const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex ">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="mx-auto max-h-screen overflow-hidden">
              {" "}
              <Card className="w-[380px] p-4">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {" "}
                    <div className="flex items-center gap-2 text-white">
                      <h1 className="text-slate-800 py-4 text-4xl font-bold">
                        Log In
                      </h1>
                      <LogIn color="black" />
                    </div>
                  </CardTitle>
                  {/*     x      <CardDescription>You have 3 unread messages.</CardDescription>
                   */}{" "}
                </CardHeader>
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
                            placeholder="Joe@email.com"
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
                              type={isPasswordVisible ? "text" : "password"}
                              autoComplete="off"
                              name="password"
                              placeholder="*****"
                              as={Input}
                              className="space-y-8 rounded-md bg-white"
                            />

                            <div
                              className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                              onClick={togglePasswordVisibility}
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
                                    <EyeOffIcon />
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
                                    <Eye />
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
                        <p className="text-palette-neutral-primary text-xs">
                          Forgot Password? <br /> Kindly get in touch with your
                          administrator.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/*  <div className="relative mt-8 flex items-center justify-center">
                    <Image alt="" src={""} className="animate-spin-custom" />
                  </div> */}
                </CardContent>
                <CardFooter>
                  <Button
                    disabled={isLoading}
                    className={`bg-white-900 w-full mx-auto transition-all duration-300 ease-out bg-slate-900 normal-case text-white  hover:bg-slate-500 ${
                      isLoading && "w-[50px] rounded-full"
                    }`}
                    type="submit"
                  >
                    {isLoading ? (
                      <Loader2 size={18} className=" animate-spin" />
                    ) : (
                      <span>Login</span>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
