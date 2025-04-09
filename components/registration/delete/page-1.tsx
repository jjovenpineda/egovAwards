"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import ph from "@/public/assets/svgs/ph.svg";
import fb from "@/public/assets/svgs/fb.svg";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChevronDown, Globe, Mail, Phone, Search } from "lucide-react";

import { ErrorMessage, Field, FormikValues, useFormikContext } from "formik";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { apiGet } from "@/utils/api";
import test from "node:test";
import { ScrollArea } from "../ui/scroll-area";
import { ILGU } from "@/types";

export default function Page1() {
  const { values, setFieldValue, setFieldTouched } =
    useFormikContext<FormikValues>();
  const [isloaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [LguList, setLguList] = useState<ILGU[]>([]);
  const [lguPopover, setLguPopover] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
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

  useEffect(() => {
    const selectedLgu = LguList.find((lgu) => lgu.lgu === values.lgu_name);

    if (selectedLgu) {
      setFieldValue("lgu_province", selectedLgu.province);
      setSelectedProvince(selectedLgu.province);

      setFieldValue("lgu_region", selectedLgu.region);
      setSelectedRegion(selectedLgu.region);
    }
  }, [values.lgu_name]);

  useEffect(() => {
    getLGUList();

    setIsLoaded(true);
  }, []);
  return (
    <>
      {isloaded && (
        <div>
          <section className="space-y-2 pt-6 lg:pt-0">
            <h2 className="font-bold text-lg text-blue-900">ABOUT THE LGU</h2>
            <hr className="border border-blue-900"></hr>
          </section>
          <div className="space-y-10 lg:space-y-16 py-6">
            <section className="grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-4 gap-4">
              <div className="  lg:pr-4 ">
                <div className="flex gap-1 items-center">
                  <Label className="font-semibold text-sm text-[#1F2937]">
                    LGU <span className="text-red-500 text-base"> *</span>
                  </Label>
                  <ErrorMessage
                    name="lgu_name"
                    component="div"
                    className=" text-xs text-red-500 font-semibold"
                  />
                </div>

                <Popover open={lguPopover} onOpenChange={setLguPopover}>
                  <PopoverTrigger asChild>
                    <div
                      onClick={() => {
                        setSearchQuery(""), setFieldTouched("lgu_name", true);
                      }}
                      id="popover-trigger"
                      className="flex items-center justify-between  cursor-pointer border w-full rounded-md p-2 my-2 shadow-sm px-3 text-sm"
                    >
                      {values.lgu_name ? values.lgu_name : "Select LGU"}
                      <ChevronDown size={15} className="text-slate-500" />
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
                        page * itemsPerPage
                      );
                      return (
                        <ScrollArea className="max-h-[200px] overflow-y-auto p-0 ">
                          {searchQuery ? (
                            <>
                              {LguList.filter((item) =>
                                item.lgu
                                  .toLowerCase()
                                  .includes(searchQuery.trim().toLowerCase())
                              )
                                .slice(0, page * itemsPerPage)
                                .map((item, index) => (
                                  <div
                                    key={index}
                                    onClick={() => {
                                      setFieldValue("lgu_name", item.lgu);
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
                                  .includes(searchQuery.trim().toLowerCase())
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
                                    setFieldValue("lgu_name", item.lgu);
                                    setLguPopover(false);
                                  }}
                                  className="hover:bg-slate-100 cursor-pointer py-0.5 p-2 rounded-md  my-1"
                                >
                                  {item.lgu}
                                </div>
                              ))}
                              {LguList.length > paginatedList.length && (
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

                <p className="font-medium my-1 text-gray-400 text-sm lg:max-w-[80%]">
                  If you cannot find your LGU, kindly get in touch with the{" "}
                  <a className="underline text-blue-400">
                    egovawards@dict.gov.ph
                  </a>{" "}
                  to provide the province, region, and name of your LGU.{" "}
                </p>
              </div>
              <div className="  lg:pr-4 ">
                <div className="flex gap-1 items-center">
                  <Label className="font-semibold text-sm text-[#1F2937]">
                    LGU Abbreviation{" "}
                    <span className="text-red-500 text-base">*</span>
                  </Label>

                  <ErrorMessage
                    name="lgu_abbr"
                    component="div"
                    className=" text-xs text-red-500 font-semibold"
                  />
                </div>

                <Field
                  type="text"
                  autoComplete="off"
                  name="lgu_abbr"
                  placeholder="Enter LGU Abbreviation"
                  as={Input}
                  className=" space-y-8 rounded-md bg-white "
                />
                <p className="font-medium my-1 text-gray-400 text-sm">
                  e.g. QC{" "}
                </p>
              </div>
              <div>
                <div className="flex flex-col-reverse">
                  <Input value={selectedProvince} disabled />
                  <div className="flex gap-1 items-center">
                    <Label className="opacity-50 font-semibold text-sm text-[#1F2937]">
                      Province <span className="text-red-500 text-base">*</span>
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
                  <Input value={selectedRegion} disabled />

                  <div className="flex gap-1 items-center">
                    <Label className="opacity-50 font-semibold text-sm text-[#1F2937]">
                      Region <span className="text-red-500 text-base">*</span>
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
                <div className="flex gap-1 items-center">
                  <Label className="font-semibold text-sm text-[#1F2937]">
                    Name of LCE
                    <span className="text-red-500 text-base">*</span>
                  </Label>
                  <ErrorMessage
                    name="lgu_lceName"
                    component="div"
                    className=" text-xs text-red-500 font-semibold"
                  />
                </div>
                <Field
                  type="text"
                  autoComplete="off"
                  name="lgu_lceName"
                  placeholder="Enter Name of LCE"
                  as={Input}
                  className=" space-y-8 rounded-md bg-white "
                />
              </div>

              <div>
                <div className="flex gap-1 items-center">
                  <Label className="font-semibold text-sm text-[#1F2937]">
                    Name of Office in LGU{" "}
                    <span className="text-red-500 text-base">*</span>
                  </Label>
                  <ErrorMessage
                    name="lgu_officeName"
                    component="div"
                    className=" text-xs text-red-500 font-semibold"
                  />
                </div>
                <Field
                  type="text"
                  autoComplete="off"
                  name="lgu_officeName"
                  placeholder="Enter Name of Office in LGU"
                  as={Input}
                  className=" space-y-8 rounded-md bg-white "
                />
              </div>
            </section>
            <section className="grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-4 gap-2">
              <div>
                <div className="flex gap-1 items-center">
                  <Label className="font-semibold text-sm text-[#1F2937]">
                    Contact Person{" "}
                    <span className="text-red-500 text-base">*</span>
                  </Label>
                  <ErrorMessage
                    name="lgu_contactPerson"
                    component="div"
                    className=" text-xs text-red-500 font-semibold"
                  />
                </div>
                <Field
                  type="text"
                  autoComplete="off"
                  name="lgu_contactPerson"
                  placeholder="Enter Contact Person"
                  as={Input}
                  className=" space-y-8 rounded-md bg-white "
                />
                <p className="font-medium my-1 text-gray-400 text-sm">
                  Name of Authorized Official Representative.
                </p>
              </div>
              <div>
                <div className="flex gap-1 items-center">
                  <Label className="font-semibold text-sm text-[#1F2937]">
                    Email <span className="text-red-500 text-base">*</span>
                  </Label>
                  <ErrorMessage
                    name="lgu_contactPersonEmail"
                    component="div"
                    className=" text-xs text-red-500 font-semibold"
                  />
                </div>
                <div className="relative">
                  <Field
                    type="email"
                    autoComplete="off"
                    name="lgu_contactPersonEmail"
                    placeholder="Enter Email"
                    as={Input}
                    className=" space-y-8 rounded-md bg-white pl-9"
                  />
                  <Mail
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
                <p className="font-medium my-1 text-gray-400 text-sm">
                  Kindly ensure that your email is accurate to receive updates.{" "}
                </p>
              </div>
              <div>
                <div className="flex gap-1 items-center">
                  <Label className="font-semibold text-sm text-[#1F2937]">
                    Office Number{" "}
                    <span className="text-red-500 text-base">*</span>
                  </Label>
                  <ErrorMessage
                    name="lgu_contactPersonOfficeNo"
                    component="div"
                    className=" text-xs text-red-500 font-semibold"
                  />
                </div>
                <div className="relative">
                  <Field
                    type="number"
                    autoComplete="off"
                    name="lgu_contactPersonOfficeNo"
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
                    <span className="text-red-500 text-base">*</span>
                  </Label>
                  <ErrorMessage
                    name="lgu_contactPersonMobileNo"
                    component="div"
                    className=" text-xs text-red-500 font-semibold"
                  />
                </div>
                <div className="relative">
                  <Field
                    type="number"
                    autoComplete="off"
                    name="lgu_contactPersonMobileNo"
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
              <div>
                <div className="flex gap-1 items-center">
                  <Label className="font-semibold text-sm text-[#1F2937]">
                    Website
                  </Label>
                  <ErrorMessage
                    name="lgu_website"
                    component="div"
                    className=" text-xs text-red-500 font-semibold"
                  />
                </div>
                <div className="relative">
                  <Field
                    type="text"
                    autoComplete="off"
                    name="lgu_website"
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
                    name="lgu_facebook"
                    component="div"
                    className=" text-xs text-red-500 font-semibold"
                  />
                </div>
                <div className="relative">
                  <Field
                    type="text"
                    autoComplete="off"
                    name="lgu_facebook"
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
            </section>
            <div className="lg:w-1/2 lg:pr-4">
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
