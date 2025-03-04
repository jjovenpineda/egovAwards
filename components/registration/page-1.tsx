"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import ph from "@/public/assets/svgs/ph.svg";
import fb from "@/public/assets/svgs/fb.svg";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Globe, Mail, Phone } from "lucide-react";
import ModalWrapper from "./modal-wrapper";
import { Button } from "@/components/ui/button";
import { PSGC } from "@/constants";
import { ErrorMessage, Field, FormikValues, useFormikContext } from "formik";

export default function Page1() {
  const { values, setFieldValue, validateField, setFieldTouched } =
    useFormikContext<FormikValues>();
  const [isloaded, setIsLoaded] = useState(false);
  const findLGU = () => {
    const region = PSGC.regions.find((region) =>
      values.lgu.startsWith(region.id)
    );
    const province = region?.provinces.find((province) =>
      province.lgus.find((lgu) => lgu.id === values.lgu)
    );
    region &&
      province &&
      (setFieldValue("province", province.id),
      setFieldValue("region", region.id));
  };
  useEffect(() => {
    findLGU();
  }, [values.lgu]);
  useEffect(() => {
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
                    name="lgu"
                    component="div"
                    className=" text-xs text-red-500 font-semibold"
                  />
                </div>
                <Select
                  onValueChange={(e) => {
                    setFieldValue("lgu", e);
                  }}
                  defaultValue={values.lgu}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select LGU" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {PSGC.regions.map((region) =>
                        region.provinces.map((province) =>
                          province.lgus.map((lgu, index) => (
                            <SelectItem key={index} value={lgu.id}>
                              {lgu.name}
                            </SelectItem>
                          ))
                        )
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                    name="lguAbbreviation"
                    component="div"
                    className=" text-xs text-red-500 font-semibold"
                  />
                </div>

                <Field
                  type="text"
                  autoComplete="off"
                  name="lguAbbreviation"
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
                  <Select
                    disabled={values.lgu ? false : true}
                    value={values.province}
                    onValueChange={(e) => setFieldValue("province", e)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Province" />
                    </SelectTrigger>
                    <SelectContent>
                      {PSGC.regions
                        .filter((region) => values.lgu.startsWith(region.id))
                        .map((i) =>
                          i.provinces.map((province, index) => (
                            <SelectItem key={index} value={province.id}>
                              {province.name}
                            </SelectItem>
                          ))
                        )}
                    </SelectContent>
                  </Select>

                  <div className="flex gap-1 items-center">
                    <Label className="peer-disabled:opacity-50 font-semibold text-sm text-[#1F2937]">
                      Province <span className="text-red-500 text-base">*</span>
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
                  <Select
                    disabled={values.province ? false : true}
                    value={values.region}
                    onValueChange={(e) => setFieldValue("region", e)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                      {PSGC.regions
                        .filter((i) => values.lgu.startsWith(i.id))
                        .map((region, index) => (
                          <SelectItem key={index} value={region.id}>
                            {region.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  <div className="flex gap-1 items-center">
                    <Label className="peer-disabled:opacity-50 font-semibold text-sm text-[#1F2937]">
                      Region <span className="text-red-500 text-base">*</span>
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
                    Name of LCE{" "}
                    <span className="text-red-500 text-base">*</span>
                  </Label>
                  <ErrorMessage
                    name="nameOfLCE"
                    component="div"
                    className=" text-xs text-red-500 font-semibold"
                  />
                </div>
                <Field
                  type="text"
                  autoComplete="off"
                  name="nameOfLCE"
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
                    name="nameOfOffice"
                    component="div"
                    className=" text-xs text-red-500 font-semibold"
                  />
                </div>
                <Field
                  type="text"
                  autoComplete="off"
                  name="nameOfOffice"
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
                    name="contactPerson"
                    component="div"
                    className=" text-xs text-red-500 font-semibold"
                  />
                </div>
                <Field
                  type="text"
                  autoComplete="off"
                  name="contactPerson"
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
                    name="email"
                    component="div"
                    className=" text-xs text-red-500 font-semibold"
                  />
                </div>
                <div className="relative">
                  <Field
                    type="email"
                    autoComplete="off"
                    name="email"
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
                    name="officeNumber"
                    component="div"
                    className=" text-xs text-red-500 font-semibold"
                  />
                </div>
                <div className="relative">
                  <Field
                    type="number"
                    autoComplete="off"
                    name="officeNumber"
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
                    name="mobileNumber"
                    component="div"
                    className=" text-xs text-red-500 font-semibold"
                  />
                </div>
                <div className="relative">
                  <Field
                    type="number"
                    autoComplete="off"
                    name="mobileNumber"
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
                    placeholder="Enter Website"
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
                    name="egovAwardsCount"
                    component="span"
                    className="text-xs text-red-500 font-semibold ml-1"
                  />
                </Label>
              </div>
              <Field
                type="number"
                autoComplete="off"
                name="egovAwardsCount"
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
