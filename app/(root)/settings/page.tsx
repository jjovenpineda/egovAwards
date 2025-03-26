"use client";
import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import ph from "@/public/assets/svgs/ph.svg";
import fb from "@/public/assets/svgs/fb.svg";
import * as Yup from "yup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import defaultAvatar from "@/public/assets/images/default-avatar.png";
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
  Save,
  Search,
  Trash2,
} from "lucide-react";

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { apiGet, apiPost } from "@/utils/api";
import test from "node:test";
import { ScrollArea } from "@/components/ui/scroll-area";
import { encrypt } from "@/utils/utility";
import { toast } from "@/hooks/use-toast";
import { storage } from "@/utils/useStorage";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { handleFileUpload } from "@/utils/file-upload";
interface ILGU {
  lgu: string;
  province: string;
  region: string;
  tenDigitCode: string;
}
export default function Page1() {
  /*   const { values, setFieldValue, setFieldTouched } =
    useFormikContext<FormikValues>(); */
  const [isloaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [LguList, setLguList] = useState<ILGU[]>([]);
  const [lguPopover, setLguPopover] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [active, setActive] = useState(false);

  const [page, setPage] = useState(1);
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

  /*  useEffect(() => {
    const selectedLgu = LguList.find((lgu) => lgu.lgu === values.name);

    if (selectedLgu) {
      setFieldValue("province", selectedLgu.province);
      setSelectedProvince(selectedLgu.province);

      setFieldValue("region", selectedLgu.region);
      setSelectedRegion(selectedLgu.region);
    }
  }, [values.name]); */

  useEffect(() => {
    getLGUList();

    setIsLoaded(true);
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setItem } = storage;
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = async (event: any, setValue?: Function) => {
    if (!event) return;
    const file = event.target.files[0];
    console.log("file :", file);
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
            return data.dir;
          } catch (e) {
            console.error("File upload failed:", e);
          }
        }
      }
    }
  };

  const handleSubmit = async (values: any) => {
    console.log("values :", values);

    /*  setIsLoading(true);

    await apiPost("/api/auth/login", values)
      .then((res) => {
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
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
        toast({
          title: "Login failed",
          variant: "destructive",
          description: "Invalid email or password",
          duration: 2000,
        });
      }); */
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        email: "",
        firstname: "",
        middlename: "",
        lastname: "",
        suffix: "",
        isActive: false,
        lgu: "",
        province: "",
        region: "",
        abbr: "",
        lceName: "",
        officeName: "",
        joinCount: "",
        officeNo: "",
        website: "",
        facebook: "",
        mobile: "",
        logo: "",
      }}
      validationSchema={/* validationSchema */ ""}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
        return (
          <Form>
            {isloaded && (
              <Tabs defaultValue="lgu" className="w-[90%]">
                <TabsList>
                  <TabsTrigger value="lgu">LGU Settings</TabsTrigger>
                  <TabsTrigger value="profile">Profile Settings</TabsTrigger>
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
                      <div className="relative flex flex-col  overflow-hidden items-center border justify-center size-[88px] bg-gray-100 rounded-full   transition-all">
                        {values.logo ? (
                          <>
                            <img
                              src={values.logo}
                              alt="Profile"
                              className="rounded-full object-cover "
                            />
                          </>
                        ) : (
                          <div className="bg-zinc-200 size-full flex items-center">
                            <LandmarkIcon
                              size={40}
                              className="text-zinc-400 m-auto"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col  w-fit gap-2">
                      <input
                        type="file"
                        className="hidden "
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={async (e) => {
                          const file = await handleImageUpload(e);

                          console.log("eeee :", e);
                          setFieldValue("logo", file);
                          e.target.value = "";
                        }}
                      />
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-slate-500 hover:bg-slate-600 font-semibold transition-colors"
                      >
                        <ArrowLeftRightIcon /> Change Picture
                      </Button>
                      <Button
                        onClick={() => setFieldValue("logo", "")}
                        variant="ghost"
                        className="outline outline-1 text-slate-800 hover:bg-slate-200 font-semibold transition-colors"
                      >
                        <Trash2 /> Delete Picture
                      </Button>
                    </div>
                  </section>
                  <div className="space-y-10 lg:space-y-16 ">
                    <section className="grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-4 gap-4">
                      <div className="  lg:pr-4 ">
                        <div className="flex gap-1 items-center">
                          <Label className="font-semibold text-sm text-[#1F2937]">
                            LGU
                          </Label>
                          <ErrorMessage
                            name="name"
                            component="div"
                            className=" text-xs text-red-500 font-semibold"
                          />
                        </div>

                        <Popover open={lguPopover} onOpenChange={setLguPopover}>
                          <PopoverTrigger asChild>
                            <div
                              onClick={() => {
                                setSearchQuery(""),
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
                                              setLguPopover(false);
                                            }}
                                            className="hover:bg-slate-100 cursor-pointer py-0.5 p-2 rounded-md my-1"
                                          >
                                            {item.lgu}
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
                                            setLguPopover(false);
                                          }}
                                          className="hover:bg-slate-100 cursor-pointer py-0.5 p-2 rounded-md  my-1"
                                        >
                                          {item.lgu}
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
                          <Input value={selectedProvince} disabled />
                          <div className="flex gap-1 items-center">
                            <Label className="opacity-50 font-semibold text-sm text-[#1F2937]">
                              Province{" "}
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
                        <div className="flex flex-col-reverse">
                          <Input value={selectedRegion} disabled />

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
                            type="number"
                            autoComplete="off"
                            name="officeNo"
                            placeholder="(02) 000 000"
                            as={Input}
                            className=" space-y-8 rounded-md bg-white pl-9"
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
                            type="number"
                            autoComplete="off"
                            name="mobile"
                            placeholder="9876543210"
                            as={Input}
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

                    <section className="grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-4 gap-2">
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
                            autoComplete="off"
                            name="contactPerson"
                            placeholder="Enter Contact Person"
                            as={Input}
                            className=" space-y-8 rounded-md pr-36 bg-white "
                          />
                          <span
                            onClick={() => setActive(!active)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[15px] cursor-pointer"
                          >
                            <>
                              {active ? (
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
                          <ErrorMessage
                            name="contactPersonEmail"
                            component="div"
                            className=" text-xs text-red-500 font-semibold"
                          />
                        </div>
                        <div className="relative">
                          <Field
                            type="email"
                            autoComplete="off"
                            name="contactPersonEmail"
                            placeholder="Enter Email"
                            as={Input}
                            className=" space-y-8 rounded-md bg-white pl-9"
                          />
                          <Mail
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                          />
                        </div>
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
                      onClick={() => handleSubmit(values)}
                      className="bg-blue-500 text-primary-foreground shadow hover:bg-blue-600"
                    >
                      <Save size={15} /> Save Changes
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="profile" className="py-6  ">
                  <section className="grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-2 gap-2">
                    <div className="col-span-2 grid grid-cols-2 gap-8 items-end mb-8">
                      <div>
                        <div className="flex gap-1 items-center">
                          <Label className="font-semibold text-sm text-[#1F2937]">
                            Email
                          </Label>
                          <ErrorMessage
                            name="contactPersonEmail"
                            component="div"
                            className=" text-xs text-red-500 font-semibold"
                          />
                        </div>
                        <div className="relative">
                          <Field
                            type="email"
                            autoComplete="off"
                            name="contactPersonEmail"
                            placeholder="Enter Email"
                            as={Input}
                            className=" space-y-8 rounded-md bg-white pl-9"
                          />
                          <Mail
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                          />
                        </div>
                      </div>
                      <Button className="font-semibold bg-slate-700 w-fit">
                        <KeyRoundIcon size={15} /> Change Password
                      </Button>
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
  );
}
