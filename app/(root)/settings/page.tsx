"use client";
import React, { use, useEffect, useRef, useState } from "react";
import pdf from "@/public/assets/svgs/pdf.svg";

import Image from "next/image";
import ph from "@/public/assets/svgs/ph.svg";
import fb from "@/public/assets/svgs/fb.svg";
import * as Yup from "yup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  ArrowLeftRightIcon,
  CheckCircle2,
  ChevronDown,
  Globe,
  KeyRoundIcon,
  LandmarkIcon,
  Mail,
  MinusCircle,
  Phone,
  Repeat,
  Save,
  Search,
  Trash2,
} from "lucide-react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { apiGet, apiPost, apiPut } from "@/utils/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { handleFileUpload } from "@/utils/file-upload";
import FileViewer from "@/components/shared/file-viewer";
import Loaders from "@/components/ui/loaders";
import { m } from "motion/react";
import { useUserStore } from "@/stores/useStores";
import { getUserInfo } from "@/utils/utility";
interface ILGU {
  lgu: string;
  province: string;
  region: string;
  tenDigitCode: string;
  cityClass: string;
}
export default function Page() {
  const [page, setPage] = useState(1);
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [active, setActive] = useState(false);
  const [isloaded, setIsLoaded] = useState(false);
  const [LguList, setLguList] = useState<ILGU[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [lguPopover, setLguPopover] = useState(false);
  const [selectedPage, setSelectedPage] = useState("lgu");
  const [pwdBtnLoading, setPwdBtnLoading] = useState(false);
  const setUserInfo = useUserStore((state: any) => state.setUserInfo);
  const userInfo = useUserStore((state: any) => state.userInfo);
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
  const getUser = async () => {
    try {
      const { _id } = getUserInfo();
      const res = await apiGet(`/api/auth/fetch/user/${_id}`);
      const { data } = res;
      if (!data) return;
      setUserInfo(data);
    } catch (e) {
      console.error("Error fetching User info:", e);
    }
  };
  useEffect(() => {
    getLGUList();
    setIsLoaded(true);
  }, []);

  const validationSchema =
    selectedPage === "lgu"
      ? Yup.object().shape({
          lgu: Yup.string().trim().required("Required"),
          abbr: Yup.string()
            .trim()
            .max(10, "Max 10 characters")
            .required("Required"),
          province: Yup.string().trim(),
          region: Yup.string().trim().required("Required"),
          authLetter: Yup.string().required("Required"),
          lceName: Yup.string()
            .required("This field is required")
            .max(100, "Limit: 100 characters"),
          officeName: Yup.string()
            .required("This field is required")
            .max(100, "Limit: 100 characters"),

          officeNo: Yup.string()
            .required("This field is required")
            .max(15, "Invalid"),

          website: Yup.string()
            .matches(
              /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/.*)?$/i,
              "Must be a valid website URL"
            )
            .max(100, "Limit: 100 characters"),
          mobile: Yup.string()
            .matches(/^[1-9]\d{9}$/, "Invalid number")
            .required("Required"),
          facebook: Yup.string()
            .matches(
              /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/.*)?$/i,
              "Must be a valid website URL"
            )
            .max(100, "Limit: 100 characters"),
        })
      : Yup.object().shape({
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

          middlename: Yup.string()
            .trim()
            .max(50, "Max 50 characters")
            .nullable(),
          suffix: Yup.string().trim().max(10, "Max 10 characters").nullable(),
        });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const AuthRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = async (event: any, setValue?: Function) => {
    if (!event) return;
    const file = event.target.files[0];
    const size = event.target.files?.[0]?.size;
    if (size) {
      if (size > 5 * 1024 * 1024) {
        toast({
          title: "File too large!",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
          duration: 2500,
        });
        return;
      } else {
        if (file) {
          setValue && setValue();
          const formData = new FormData();
          formData.append("file", file);

          try {
            const { data } = await apiPost("/api/entry/upload", formData);
            return data;
          } catch (e) {
            console.error("File upload failed:", e);
          }
        }
      }
    }
  };

  const handleSubmit = async (values: any, errors: any) => {
    if (errors.length >= 0) return null;
    try {
      setIsLoading(true);

      const { success } = await apiPut(`/api/lgu/add/info`, values);

      if (success) {
        getUser();
        toast({
          title: "Update Successful",
          description: "Your changes have been saved.",
          variant: "default",
          duration: 2000,
        });
      }
    } catch (e) {
      console.error("Error:", e);

      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={
          selectedPage === "lgu"
            ? {
                lgu: userInfo?.authRep?.lgu || "",
                cityClass: userInfo?.authRep?.cityClass || "",
                province: userInfo?.authRep?.province || "",
                region: userInfo?.authRep?.region || "",
                abbr: userInfo?.authRep?.abbr || "",
                lceName: userInfo?.authRep?.lceName || "",
                officeName: userInfo?.authRep?.officeName || "",
                officeNo: userInfo?.authRep?.officeNo || "",
                website: userInfo?.authRep?.website || "",
                facebook: userInfo?.authRep?.facebook || "",
                mobile: userInfo?.mobile || "",
                logoFilename: userInfo?.authRep?.logoFilename || "",
                logoFileLocation: userInfo?.authRep?.logoFileLocation || "",
                authLetterFilename: userInfo?.authRep?.authLetterFilename || "",
                authLetterFileLocation:
                  userInfo?.authRep?.authLetterFileLocation || "",
              }
            : {
                firstname: userInfo?.firstname || "",
                middlename: userInfo?.middlename || "",
                lastname: userInfo?.lastname || "",
                suffix: userInfo?.suffix || "",
              }
        }
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          setFieldValue,
          setFieldTouched,
          dirty,
          isValid,
          errors,
        }) => {
          useEffect(() => {
            setSearchQuery(values.lgu);
          }, [values.lgu]);

          return (
            <Form>
              {isloaded && (
                <Tabs defaultValue="lgu" className="w-[90%]">
                  <TabsList>
                    <TabsTrigger
                      value="lgu"
                      onClick={() => setSelectedPage("lgu")}
                    >
                      LGU Settings
                    </TabsTrigger>
                    <TabsTrigger
                      value="profile"
                      onClick={() => setSelectedPage("profile")}
                    >
                      Profile Settings
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="lgu" className="py-6 space-y-4">
                    <h2 className="text-base text-red-500">
                      Please provide the required LGU details below to proceed
                      with your application or entry registration.
                    </h2>
                    <h2 className="text-slate-500 font-medium">
                      LGU Information
                    </h2>
                    <section className="flex gap-8 items-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative flex flex-col  overflow-hidden items-center border-[8px] border-slate-200 justify-center size-[88px] bg-gray-100 rounded-full   transition-all">
                          {values.logoFileLocation ? (
                            <>
                              <img
                                src={values.logoFileLocation}
                                alt="Profile"
                                className="rounded-full object-cover "
                              />
                            </>
                          ) : (
                            <div className="bg-slate-300 size-full flex justify-center uppercase items-center">
                              <svg
                                width="42"
                                height="29"
                                viewBox="0 0 42 29"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0 11.1555V0.643723H2.33536V9.32314H7.0708V11.1555H0Z"
                                  fill="#94A3B8"
                                />
                                <path
                                  d="M18.4136 5.89962C18.4136 7.04593 18.1853 8.02115 17.7287 8.82527C17.2756 9.6294 16.6572 10.2436 15.8733 10.6679C15.0931 11.0888 14.2157 11.2992 13.2413 11.2992C12.2597 11.2992 11.3788 11.0871 10.5985 10.6628C9.81829 10.2385 9.20164 9.62427 8.74859 8.82014C8.29554 8.01602 8.06901 7.04251 8.06901 5.89962C8.06901 4.75332 8.29554 3.7781 8.74859 2.97397C9.20164 2.16985 9.81829 1.55734 10.5985 1.13646C11.3788 0.712155 12.2597 0.5 13.2413 0.5C14.2157 0.5 15.0931 0.712155 15.8733 1.13646C16.6572 1.55734 17.2756 2.16985 17.7287 2.97397C18.1853 3.7781 18.4136 4.75332 18.4136 5.89962ZM16.0459 5.89962C16.0459 5.15709 15.9291 4.5309 15.6953 4.02105C15.4652 3.5112 15.1398 3.12453 14.7191 2.86105C14.2984 2.59757 13.8058 2.46583 13.2413 2.46583C12.6768 2.46583 12.1842 2.59757 11.7635 2.86105C11.3428 3.12453 11.0156 3.5112 10.7819 4.02105C10.5518 4.5309 10.4367 5.15709 10.4367 5.89962C10.4367 6.64216 10.5518 7.26834 10.7819 7.77819C11.0156 8.28804 11.3428 8.67472 11.7635 8.93819C12.1842 9.20167 12.6768 9.33341 13.2413 9.33341C13.8058 9.33341 14.2984 9.20167 14.7191 8.93819C15.1398 8.67472 15.4652 8.28804 15.6953 7.77819C15.9291 7.26834 16.0459 6.64216 16.0459 5.89962Z"
                                  fill="#94A3B8"
                                />
                                <path
                                  d="M27.5438 4.04158C27.4683 3.79179 27.3622 3.57108 27.2256 3.37945C27.089 3.18441 26.9218 3.02017 26.724 2.88672C26.5298 2.74984 26.3069 2.64548 26.0552 2.57362C25.8071 2.50176 25.5321 2.46583 25.23 2.46583C24.6655 2.46583 24.1693 2.59928 23.7414 2.86618C23.3171 3.13309 22.9864 3.52147 22.749 4.03132C22.5117 4.53774 22.3931 5.15709 22.3931 5.88936C22.3931 6.62163 22.5099 7.2444 22.7436 7.75767C22.9774 8.27094 23.3082 8.66274 23.736 8.93306C24.1639 9.19996 24.6691 9.33341 25.2516 9.33341C25.7801 9.33341 26.2314 9.24444 26.6053 9.06651C26.9829 8.88515 27.2705 8.63023 27.4683 8.30173C27.6697 7.97324 27.7703 7.58487 27.7703 7.13661L28.245 7.20333H25.3972V5.53006H30.0194V6.85431C30.0194 7.7782 29.8144 8.57206 29.4045 9.23589C28.9946 9.8963 28.4301 10.4061 27.711 10.7654C26.9919 11.1213 26.1685 11.2992 25.2408 11.2992C24.2053 11.2992 23.2956 11.082 22.5117 10.6474C21.7279 10.2094 21.1166 9.58834 20.678 8.78421C20.2429 7.97666 20.0254 7.01855 20.0254 5.90989C20.0254 5.05786 20.1548 4.29822 20.4137 3.63097C20.6762 2.96029 21.0429 2.39226 21.5139 1.9269C21.985 1.46153 22.5333 1.10738 23.1589 0.864431C23.7846 0.621482 24.4624 0.5 25.1923 0.5C25.8179 0.5 26.4004 0.587261 26.9397 0.761774C27.4791 0.932865 27.9573 1.17581 28.3744 1.49062C28.7951 1.80543 29.1385 2.18012 29.4045 2.61469C29.6706 3.04584 29.8414 3.52146 29.9169 4.04158H27.5438Z"
                                  fill="#94A3B8"
                                />
                                <path
                                  d="M42 5.89962C42 7.04593 41.7717 8.02115 41.315 8.82527C40.862 9.6294 40.2435 10.2436 39.4597 10.6679C38.6794 11.0888 37.8021 11.2992 36.8277 11.2992C35.8461 11.2992 34.9652 11.0871 34.1849 10.6628C33.4047 10.2385 32.788 9.62427 32.335 8.82014C31.8819 8.01602 31.6554 7.04251 31.6554 5.89962C31.6554 4.75332 31.8819 3.7781 32.335 2.97397C32.788 2.16985 33.4047 1.55734 34.1849 1.13646C34.9652 0.712155 35.8461 0.5 36.8277 0.5C37.8021 0.5 38.6794 0.712155 39.4597 1.13646C40.2435 1.55734 40.862 2.16985 41.315 2.97397C41.7717 3.7781 42 4.75332 42 5.89962ZM39.6323 5.89962C39.6323 5.15709 39.5154 4.5309 39.2817 4.02105C39.0516 3.5112 38.7262 3.12453 38.3055 2.86105C37.8848 2.59757 37.3922 2.46583 36.8277 2.46583C36.2632 2.46583 35.7706 2.59757 35.3499 2.86105C34.9292 3.12453 34.602 3.5112 34.3683 4.02105C34.1382 4.5309 34.0231 5.15709 34.0231 5.89962C34.0231 6.64216 34.1382 7.26834 34.3683 7.77819C34.602 8.28804 34.9292 8.67472 35.3499 8.93819C35.7706 9.20167 36.2632 9.33341 36.8277 9.33341C37.3922 9.33341 37.8848 9.20167 38.3055 8.93819C38.7262 8.67472 39.0516 8.28804 39.2817 7.77819C39.5154 7.26834 39.6323 6.64216 39.6323 5.89962Z"
                                  fill="#94A3B8"
                                />
                                <path
                                  d="M1.80208 28.5V17.9882H4.13744V22.3253H8.87827V17.9882H11.2082V28.5H8.87827V24.1577H4.13744V28.5H1.80208Z"
                                  fill="#94A3B8"
                                />
                                <path
                                  d="M13.2096 28.5V17.9882H20.6526V19.8206H15.545V22.3253H20.2696V24.1577H15.545V26.6676H20.6742V28.5H13.2096Z"
                                  fill="#94A3B8"
                                />
                                <path
                                  d="M22.5852 28.5V17.9882H26.9431C27.7773 17.9882 28.4892 18.1302 29.0789 18.4142C29.6722 18.6948 30.1234 19.0934 30.4327 19.6101C30.7455 20.1234 30.9019 20.7274 30.9019 21.422C30.9019 22.12 30.7437 22.7206 30.4273 23.2236C30.1109 23.7232 29.6524 24.1064 29.052 24.3733C28.4551 24.6402 27.7324 24.7736 26.8838 24.7736H23.9659V22.9875H26.5062C26.9521 22.9875 27.3224 22.9293 27.6173 22.813C27.9121 22.6966 28.1315 22.5221 28.2753 22.2894C28.4227 22.0567 28.4964 21.7676 28.4964 21.422C28.4964 21.073 28.4227 20.7787 28.2753 20.5392C28.1315 20.2996 27.9103 20.1183 27.6119 19.9951C27.3171 19.8685 26.9449 19.8052 26.4955 19.8052H24.9206V28.5H22.5852ZM28.5504 23.7163L31.2956 28.5H28.7176L26.0316 23.7163H28.5504Z"
                                  fill="#94A3B8"
                                />
                                <path
                                  d="M32.6282 28.5V17.9882H40.0712V19.8206H34.9636V22.3253H39.6882V24.1577H34.9636V26.6676H40.0928V28.5H32.6282Z"
                                  fill="#94A3B8"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col  w-fit gap-2">
                        <input
                          type="file"
                          className="hidden "
                          accept=".png, .jpg, .jpeg"
                          ref={fileInputRef}
                          onChange={async (e) => {
                            const file = await handleImageUpload(e);
                            setFieldValue("logoFilename", file.filename);
                            setFieldValue("logoFileLocation", file.location);
                            e.target.value = "";
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-slate-500 hover:bg-slate-600 font-semibold transition-colors"
                        >
                          <ArrowLeftRightIcon /> Change Picture
                        </Button>
                        <Button
                          type="button"
                          onClick={() => {
                            setFieldValue("logoFilename", ""),
                              setFieldValue("logoFileLocation", "");
                          }}
                          variant="ghost"
                          className="outline outline-1 text-slate-800 hover:bg-slate-200 font-semibold transition-colors"
                        >
                          <Trash2 /> Delete Picture
                        </Button>
                      </div>
                    </section>
                    <div className="space-y-10 lg:space-y-16 ">
                      <section className="grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-4 gap-4">
                        <div className=" ">
                          <div className="flex gap-1 items-center">
                            <Label className="font-semibold text-sm text-[#1F2937]">
                              LGU
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
                                  setFieldTouched("lgu", true);
                                }}
                                id="popover-trigger"
                                className="flex items-center justify-between h-9 cursor-pointer border w-full rounded-md p-2  shadow-sm px-3 text-sm"
                              >
                                {values.lgu ? values.lgu : "Select LGU"}
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
                                  name="website"
                                  defaultValue={searchQuery}
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
                                  page * itemsPerPage
                                );
                                return (
                                  <ScrollArea className="max-h-[200px] overflow-y-auto p-0 ">
                                    {searchQuery ? (
                                      <>
                                        {LguList.filter((item) =>
                                          item.lgu
                                            .toLowerCase()
                                            .includes(
                                              searchQuery.trim().toLowerCase()
                                            )
                                        )
                                          .slice(0, page * itemsPerPage)
                                          .map((item, index) => (
                                            <div
                                              key={index}
                                              onClick={() => {
                                                setFieldValue("lgu", item.lgu);
                                                setFieldValue(
                                                  "province",
                                                  item.province
                                                );
                                                setFieldValue(
                                                  "region",
                                                  item.region
                                                );
                                                setFieldValue(
                                                  "cityClass",
                                                  item.cityClass
                                                );
                                                setTimeout(() => {}, 500);

                                                setLguPopover(false);
                                              }}
                                              className=" group hover:text-blue-700  cursor-pointer py-0.5 p-2 rounded-md my-1"
                                            >
                                              {item.lgu.trim()}
                                              {item.province && <span>, </span>}

                                              <span className="group-hover:text-blue-700 text-slate-500">
                                                {item.province}
                                              </span>
                                            </div>
                                          ))}

                                        {LguList.filter((item) =>
                                          item.lgu
                                            .toLowerCase()
                                            .includes(
                                              searchQuery.trim().toLowerCase()
                                            )
                                        ).length >
                                          page * itemsPerPage && (
                                          <button
                                            onClick={() => setPage(page + 1)}
                                            className="text-slate-500 text-sm w-full cursor-pointer hover:underline py-1"
                                          >
                                            Load More
                                          </button>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {paginatedList.map((item, index) => (
                                          <div
                                            key={index}
                                            onClick={() => {
                                              setFieldValue("lgu", item.lgu);
                                              setFieldValue(
                                                "province",
                                                item.province
                                              );
                                              setFieldValue(
                                                "region",
                                                item.region
                                              );
                                              setFieldValue(
                                                "cityClass",
                                                item.cityClass
                                              );
                                              setTimeout(() => {}, 500);

                                              setLguPopover(false);
                                            }}
                                            className=" group hover:text-blue-700  cursor-pointer py-0.5 p-2 rounded-md my-1"
                                          >
                                            {item.lgu.trim()}
                                            {item.province && <span>, </span>}

                                            <span className="group-hover:text-blue-700 text-slate-500">
                                              {item.province}
                                            </span>
                                          </div>
                                        ))}
                                        {LguList.length >
                                          paginatedList.length && (
                                          <button
                                            onClick={() => {
                                              setPage(page + 1);
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
                        <div className=" ">
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
                                name="province"
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
                                name="region"
                                component="div"
                                className=" text-xs text-red-500 font-semibold"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex gap-1 items-center">
                            <Label className="font-semibold text-sm text-[#1F2937]">
                              Name of LCE
                            </Label>
                            <ErrorMessage
                              name="lceName"
                              component="div"
                              className=" text-xs text-red-500 font-semibold"
                            />
                          </div>
                          <Field
                            type="text"
                            autoComplete="off"
                            name="lceName"
                            placeholder="Enter Name of LCE"
                            as={Input}
                            className=" space-y-8 rounded-md bg-white "
                          />
                        </div>

                        <div>
                          <div className="flex gap-1 items-center">
                            <Label className="font-semibold text-sm text-[#1F2937]">
                              Name of Office in LGU{" "}
                            </Label>
                            <ErrorMessage
                              name="officeName"
                              component="div"
                              className=" text-xs text-red-500 font-semibold"
                            />
                          </div>
                          <Field
                            type="text"
                            autoComplete="off"
                            name="officeName"
                            placeholder="Enter Name of Office in LGU"
                            as={Input}
                            className=" space-y-8 rounded-md bg-white "
                          />
                        </div>
                      </section>

                      <section className="grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-4 gap-2">
                        <h2 className="text-slate-500 font-medium col-span-2">
                          LGU Contact Information{" "}
                        </h2>

                        <div>
                          <div className="flex gap-1 items-center">
                            <Label className="font-semibold text-sm text-[#1F2937]">
                              Website
                            </Label>
                            <ErrorMessage
                              name="website"
                              component="div"
                              className=" text-xs text-red-500 font-semibold"
                            />
                          </div>
                          <div className="relative">
                            <Field
                              type="text"
                              autoComplete="off"
                              name="website"
                              placeholder="Enter Website"
                              as={Input}
                              className=" space-y-8 rounded-md bg-white pl-9"
                            />
                            <Globe
                              size={15}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                            />
                          </div>
                          <p className="font-medium my-1 text-gray-400 text-sm">
                            e.g. www.egovawards.gov.ph{" "}
                          </p>
                        </div>
                        <div>
                          <div className="flex gap-1 items-center">
                            <Label className="font-semibold text-sm text-[#1F2937]">
                              Facebook Page
                            </Label>
                            <ErrorMessage
                              name="facebook"
                              component="div"
                              className=" text-xs text-red-500 font-semibold"
                            />
                          </div>
                          <div className="relative">
                            <Field
                              type="text"
                              autoComplete="off"
                              name="facebook"
                              placeholder="Enter Facebook Page"
                              as={Input}
                              className=" space-y-8 rounded-md bg-white pl-9"
                            />{" "}
                            <Image
                              src={fb}
                              alt=""
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                            />
                          </div>
                          <p className="font-medium my-1 text-gray-400 text-sm">
                            e.g. facebook.com/egovawards{" "}
                          </p>
                        </div>
                        <div>
                          <div className="flex gap-1 items-center">
                            <Label className="font-semibold text-sm text-[#1F2937]">
                              Office Number{" "}
                            </Label>
                            <ErrorMessage
                              name="officeNo"
                              component="div"
                              className=" text-xs text-red-500 font-semibold"
                            />
                          </div>
                          <div className="relative">
                            <Field
                              type="text"
                              autoComplete="off"
                              name="officeNo"
                              className=" space-y-8 h-9 rounded-md bg-white pl-9"
                              placeholder="Enter office number"
                              as={Input}
                              onInput={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                let value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );

                                if (value.length > 10)
                                  value = value.slice(0, 10);

                                let formattedValue = value;
                                if (value.length > 6) {
                                  formattedValue = `(${value.slice(
                                    0,
                                    2
                                  )}) ${value.slice(2, 6)}-${value.slice(6)}`;
                                } else if (value.length > 2) {
                                  formattedValue = `(${value.slice(
                                    0,
                                    2
                                  )}) ${value.slice(2)}`;
                                } else if (value.length > 0) {
                                  formattedValue = `(${value}`;
                                }

                                e.target.value = formattedValue;
                              }}
                            />
                            <Phone
                              size={15}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex gap-1 items-center">
                            <Label className="font-semibold text-sm text-[#1F2937]">
                              Mobile Number{" "}
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
                              className=" space-y-8 rounded-md bg-white pl-[70px]"
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
                      </section>

                      <section className="grid  lg:grid-cols-2 lg:gap-x-8 lg:gap-y-4 gap-2">
                        {" "}
                        <h2 className="text-slate-500 font-medium col-span-2">
                          Authorized LGU Representative{" "}
                        </h2>
                        <div>
                          <div className="flex gap-1 items-center">
                            <Label className="font-semibold text-sm text-[#1F2937]">
                              Contact Person{" "}
                            </Label>
                            <ErrorMessage
                              name="contactPerson"
                              component="div"
                              className=" text-xs text-red-500 font-semibold"
                            />
                          </div>
                          <div className="relative">
                            <Field
                              type="text"
                              disabled
                              value={
                                userInfo?.firstname +
                                " " +
                                userInfo?.middlename +
                                " " +
                                userInfo?.lastname +
                                " " +
                                userInfo?.suffix
                              }
                              autoComplete="off"
                              as={Input}
                              className=" space-y-8 rounded-md pr-36 bg-white "
                            />

                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[15px] cursor-pointer">
                              <>
                                {userInfo?.authRep?.isApproved ? (
                                  <div className="text-[#14B8A6] flex gap-2 items-center">
                                    <CheckCircle2 size={15} /> Verified
                                  </div>
                                ) : (
                                  <div className="text-[#BF6A02] flex gap-2 items-center">
                                    <MinusCircle size={15} /> For Verification
                                  </div>
                                )}
                              </>
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="flex gap-1 items-center">
                            <Label className="font-semibold text-sm text-[#1F2937]">
                              Email
                            </Label>
                          </div>
                          <div className="relative">
                            <Field
                              disabled
                              autoComplete="off"
                              name="email"
                              value={userInfo?.email}
                              as={Input}
                              className=" space-y-8 rounded-md bg-white pl-9"
                            />
                            <Mail
                              size={15}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                            />
                          </div>
                        </div>
                        <div className="">
                          {!userInfo?.authRep?.isApproved && (
                            <div className="flex flex-col flex-wrap gap-2 my-4">
                              <div className="overflow-hidden">
                                {values.authLetterFileLocation ? (
                                  <div className="flex items-center gap-2 ">
                                    {" "}
                                    <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                                      <div className="flex items-center gap-2">
                                        <Image src={pdf} alt="" />
                                        <span className="line-clamp-2">
                                          {values.authLetterFilename}
                                        </span>
                                      </div>
                                      <FileViewer
                                        url={
                                          values.authLetterFileLocation ?? ""
                                        }
                                      />
                                    </div>
                                    <Repeat
                                      size={18}
                                      className="text-slate-400 hover:text-slate-600 cursor-pointer transition-color"
                                      onClick={() => AuthRef.current?.click()}
                                    />
                                    {/*   <Trash2
                                    size={18}
                                    color="red"
                                    className="shrink-0"
                                    onClick={() =>
                                      setFieldValue("authLetter", "")
                                    }
                                  /> */}
                                  </div>
                                ) : (
                                  <div className="space-y-1">
                                    <p className="text-sm text-slate-700">
                                      Please upload an official letter as proof
                                      of your authorization.{" "}
                                    </p>
                                    <Input
                                      ref={AuthRef}
                                      value={""}
                                      type="file"
                                      accept="application/pdf"
                                      placeholder="Enter Project/Program Name"
                                      className="w-full"
                                      onChange={async (e) => {
                                        const file = await handleFileUpload(e);
                                        setFieldValue(
                                          "authLetterFilename",
                                          file.filename
                                        );
                                        setFieldValue(
                                          "authLetterFileLocation",
                                          file.location
                                        );
                                      }}
                                    />

                                    <ErrorMessage
                                      name="innovationAnswer_file"
                                      component="div"
                                      className=" text-sm text-red-500 font-semibold"
                                    />
                                    <p className="text-slate-500 text-sm">
                                      Accepted format: PDF (Max file size: 3MB).{" "}
                                    </p>
                                  </div>
                                )}
                                <Input
                                  ref={AuthRef}
                                  value={""}
                                  type="file"
                                  accept="application/pdf"
                                  placeholder="Enter Project/Program Name"
                                  className="w-full invisible"
                                  onChange={async (e) => {
                                    const file = await handleFileUpload(e);
                                    setFieldValue(
                                      "authLetterFilename",
                                      file.filename
                                    );
                                    setFieldValue(
                                      "authLetterFileLocation",
                                      file.location
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </section>
                      {/*  <div className="lg:w-1/2 lg:pr-4">
                   <div className="flex gap-4 items-center">
                     <Label className="font-semibold text-sm text-[#1F2937]">
                       Number of times in joining eGOV, Digital Cities Awards,
                       Digital Governance Awards from 2012 to 2022.
                       <span className="text-red-500 text-base"> *</span>
                       <ErrorMessage
                         name="joinCount"
                         component="span"
                         className="text-xs text-red-500 font-semibold ml-1"
                       />
                     </Label>
                   </div>
                   <Field
                     type="number"
                     autoComplete="off"
                     name="joinCount"
                     placeholder="Enter times in joining eGOV, DCA, DGA"
                     as={Input}
                     className=" space-y-8 rounded-md bg-white"
                   />
                 </div> */}
                    </div>{" "}
                    <div className="flex justify-end pt-16">
                      <Button
                        type="submit"
                        onClick={() => handleSubmit(values, errors)}
                        className="bg-blue-500 text-primary-foreground shadow hover:bg-blue-600"
                      >
                        {isLoading ? (
                          <div className="px-11">
                            <Loaders loader={"orbit"} size={25} color="white" />
                          </div>
                        ) : (
                          <>
                            <Save size={15} /> Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="profile" className="py-6  ">
                    <section className="grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-2 gap-2">
                      <div className="col-span-2 grid md:grid-cols-2 gap-4 lg:gap-8 mt-8 items-start mb-8">
                        <div>
                          <div className="flex relative gap-1 items-center">
                            <Label className="font-semibold absolute -top-6 text-sm text-[#1F2937]">
                              Email
                            </Label>
                          </div>
                          <div className="relative">
                            <Input
                              disabled
                              type="email"
                              value={userInfo?.email}
                              autoComplete="off"
                              className="space-y-8 rounded-md bg-white pl-9  border-gray-300 focus:border-blue-500"
                            />
                            <Mail
                              size={15}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                            />
                          </div>
                        </div>
                        <div className="relative  justify-self-end  md:justify-self-start">
                          <Button
                            type="button"
                            onClick={() => {
                              setPwdBtnLoading(true);
                              setTimeout(async () => {
                                try {
                                  const res = await apiGet(
                                    `/api/auth/forgot-password/verify/ven@yopmail.com`
                                  );
                                  const { success } = res;
                                  if (success) {
                                    setIsLinkSent(true);

                                    setPwdBtnLoading(false);
                                    setTimeout(
                                      () => setIsLinkSent(false),
                                      10000
                                    );
                                  }
                                } catch (e) {
                                  console.error("Error:", e);
                                  setPwdBtnLoading(false);
                                  setIsLoading(false);
                                  toast({
                                    title: "Invalid Email",
                                    description: "Enter a valid email.",
                                    variant: "destructive",
                                    duration: 2000,
                                  });
                                }
                              }, 2000);
                            }}
                            className="font-semibold bg-slate-700 w-fit"
                          >
                            {pwdBtnLoading ? (
                              <div className="px-14">
                                <Loaders
                                  loader={"orbit"}
                                  size={25}
                                  color="white"
                                />
                              </div>
                            ) : (
                              <>
                                <KeyRoundIcon size={15} /> Change Password
                              </>
                            )}
                          </Button>
                          {isLinkSent && (
                            <m.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-xs text-emerald-500 pt-1 max-w-[75%]  relative col-span-2 "
                            >
                              Password reset link sent. Please check your email
                              for the password reset link.
                            </m.p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col-reverse gap-1 pb-2">
                        <Field
                          type="text"
                          autoComplete="off"
                          name="firstname"
                          placeholder="Enter First Name"
                          as={Input}
                          className="peer space-y-8 rounded-md    bg-white "
                        />
                        <Label className="text-sm  font-semibold text-slate-900">
                          First Name{" "}
                        </Label>
                        <ErrorMessage
                          name="firstname"
                          component="div"
                          className=" text-xs text-red-500"
                        />
                      </div>
                      <div className="flex flex-col-reverse gap-1 pb-2">
                        <Field
                          type="text"
                          autoComplete="off"
                          name="middlename"
                          placeholder="Enter Middle Name"
                          as={Input}
                          className="peer space-y-8 rounded-md    bg-white "
                        />
                        <div className="flex justify-between items-center">
                          <Label className="text-sm  font-semibold text-slate-900">
                            Middle Name{" "}
                          </Label>
                          <h2 className="text-slate-500 text-sm">Optional</h2>
                        </div>
                        <ErrorMessage
                          name="middlename"
                          component="div"
                          className=" text-xs text-red-500"
                        />
                      </div>
                      <div className="flex flex-col-reverse gap-1 pb-2">
                        <Field
                          type="text"
                          autoComplete="off"
                          name="lastname"
                          placeholder="Enter Last Name"
                          as={Input}
                          className="peer space-y-8 rounded-md    bg-white "
                        />
                        <Label className="text-sm  font-semibold text-slate-900">
                          Last Name
                        </Label>
                        <ErrorMessage
                          name="lastname"
                          component="div"
                          className=" text-xs text-red-500"
                        />
                      </div>

                      <div className="flex flex-col-reverse gap-1 pb-2">
                        <Field
                          type="text"
                          autoComplete="off"
                          name="suffix"
                          placeholder="Enter Suffix Name"
                          as={Input}
                          className="peer space-y-8 rounded-md    bg-white "
                        />
                        <div className="flex justify-between items-center">
                          <Label className="text-sm  font-semibold text-slate-900">
                            Suffix Name
                          </Label>
                          <h2 className="text-slate-500 text-sm">Optional</h2>
                        </div>
                        <ErrorMessage
                          name="suffix"
                          component="div"
                          className=" text-xs text-red-500"
                        />
                      </div>
                    </section>
                    <div className="flex justify-end pt-16">
                      <Button className="bg-blue-500 text-primary-foreground shadow hover:bg-blue-600">
                        <Save size={15} /> Save Changes
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
