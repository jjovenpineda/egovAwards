import React, { useEffect, useState } from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import FileViewer from "../shared/file-viewer";
import pdf from "@/public/assets/svgs/pdf.svg";
import {
  ArrayHelpers,
  ErrorMessage,
  Field,
  FieldArray,
  FormikValues,
  useFormikContext,
} from "formik";

import { toast } from "@/hooks/use-toast";
import { apiPost } from "@/utils/api";
import { set } from "lodash";
export const categories = [
  {
    id: "r1",
    value: "G2A",
    label:
      "G2A Government Solutions Providing Access through Interoperability to Stakeholders",
  },
  {
    id: "r2",
    value: "G2B",
    label: "G2B Government Solutions to Improve Business Climate",
  },
  {
    id: "r3",
    value: "G2C",
    label: "G2C Governments Solutions to Serve Citizens Needs",
  },
  {
    id: "r4",
    value: "G2D",
    label: "G2D Government Solutions to Harnessing Data for Specific Use Cases",
  },
  {
    id: "r5",
    value: "G2E",
    label:
      "G2E Government solutions providing Education and Training to citizens",
  },
];

export default function AboutTheEntry() {
  const [years, setYears] = useState<any>(null);
  const [month, setMonth] = useState<any>(null);

  useEffect(() => {
    if (month && Number(month) >= 12) {
      setYears((prev: any) => (Number(prev ?? 0) + 1).toString());
      setMonth("");
    }
  }, [month]);

  useEffect(() => {
    let period = "";
    if (years) {
      period += `${years} Year${years === "1" ? "" : "s"}`;
    }
    if (month) {
      if (period) period += " - ";
      period += `${month} Month${month === "1" ? "" : "s"}`;
    }
    setFieldValue("projectPeriod", period);
    console.log("period :", period);
  }, [years, month]);

  const { values, setFieldValue, setFieldTouched, errors } =
    useFormikContext<FormikValues>();
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    arrayHelpers: any
  ) => {
    const files = event.target.files?.[0];
    const size = event.target.files?.[0]?.size;
    if (size) {
      if (size > 3 * 1024 * 1024) {
        toast({
          title: "File too large!",
          description: "Please upload a file smaller than 3MB.",
          variant: "destructive",
          duration: 2500,
        });
        return;
      }
    }

    if (files) {
      if (values.supportingDoc.map((e: any) => e).includes(files.name)) {
        toast({
          title: "Duplicate File",
          description: "This file has already been uploaded.",
          variant: "destructive",
          duration: 2500,
        });
      } else {
        const formData = new FormData();
        formData.append("file", files);

        try {
          const { data } = await apiPost("/api/entry/upload", formData);
          setFieldValue(`supportingDoc.${index}.filename`, data.filename);
          setFieldValue(`supportingDoc.${index}.fileLocation`, data.location);
        } catch (e) {
          console.error("File upload failed:", e);
        }
      }
      setFieldTouched("supportingDoc", true, true);
    }
  };

  return (
    <div className="">
      <section className="space-y-2 pt-6 lg:pt-0">
        <h2 className="font-bold text-lg text-blue-900">ABOUT THE ENTRY</h2>
        <hr className="border border-blue-900"></hr>
      </section>
      <div className="py-6 space-y-4 lg:w-1/2">
        <div>
          <div className="flex gap-1 items-center">
            <Label className="font-semibold text-sm text-[#1F2937]">
              Project/Program Name{" "}
              <span className="text-red-500 text-base">*</span>
            </Label>
            <ErrorMessage
              name="project"
              component="div"
              className=" text-xs text-red-500 font-semibold"
            />
          </div>
          <Field
            type="text"
            autoComplete="off"
            name="project"
            placeholder="Enter Project/Program Name"
            as={Input}
            className=" space-y-8 rounded-md bg-white "
          />
        </div>
        <div>
          <div className="flex gap-1 items-center">
            <div className="flex items-center gap-1">
              <h2 className="font-semibold py-2 text-sm text-[#1F2937]">
                Choose Category for Project{" "}
              </h2>
              <div className="flex gap-1">
                <span className="text-red-500 text-base font-semibold">*</span>
                <h2 className="text-xs font-semibold text-red-500 mt-1">
                  This field is required
                </h2>
              </div>
            </div>
          </div>
          <RadioGroup
            onValueChange={(e) => setFieldValue("category", e)}
            defaultValue={values.category}
          >
            {categories.map((category, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={category.value} id={category.id} />
                <Label
                  htmlFor={category.id}
                  className="text-slate-800 text-sm font-medium"
                >
                  {category.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex flex-wrap justify-between">
              <div className="flex gap-1 items-center">
                <Label className="font-semibold text-sm text-[#1F2937]">
                  Project Period{" "}
                  <span className="text-red-500 text-base">*</span>
                </Label>
                <ErrorMessage
                  name="projectPeriod"
                  component="div"
                  className=" text-xs text-red-500 font-semibold"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 my-1">
                <Input
                  type="text"
                  autoComplete="off"
                  name={""}
                  value={years ?? ""}
                  onChange={(e: any) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .replace(/^0+(?!$)/, "");
                    if (e.target.value.length > 2) {
                      e.target.value = e.target.value.slice(0, 2);
                    }
                    setYears(e.target.value);
                  }}
                  className="w-11"
                />
                <label className="text-slate-900 text-sm font-semibold">
                  Year(s)
                </label>
              </div>
              <div className="flex items-center gap-1">
                <Input
                  type="text"
                  autoComplete="off"
                  name={""}
                  value={month ?? ""}
                  onChange={(e: any) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .replace(/^0+(?!$)/, "");
                    if (e.target.value.length > 2) {
                      e.target.value = e.target.value.slice(0, 2);
                    }
                    setMonth(e.target.value);
                  }}
                  className="w-11"
                />
                <label className="text-slate-900 text-sm font-semibold">
                  Month(s)
                </label>
              </div>
            </div>

            <p className="text-slate-500 text-sm">
              Must be existing for a minimum of one year
            </p>
          </div>
          <FieldArray
            name="projectURL"
            render={(arrayHelpers: ArrayHelpers) => (
              <div className="flex flex-col gap-2 w-full relative">
                <div>
                  <div className="flex flex-col gap-1 ">
                    <div className="flex gap-1 items-center">
                      <Label className="font-semibold text-sm text-[#1F2937]">
                        Project URL{" "}
                        <span className="text-red-500 text-base">*</span>
                      </Label>
                      {Array.isArray(errors.projectURL) ? null : (
                        <div className="text-xs text-red-500 font-semibold">
                          {typeof errors.projectURL === "string"
                            ? errors.projectURL
                            : null}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-slate-900 ">
                      Please provide at least one (1) link for virtual access to
                      the project.
                    </p>
                  </div>

                  {values.projectURL &&
                    values.projectURL.length > 0 &&
                    values.projectURL.map((item: any, index: any) => {
                      return (
                        <React.Fragment key={index}>
                          <div className="space-y-2">
                            <div className="flex gap-2 items-center my-2">
                              <Field
                                type="text"
                                name={`projectURL.${index}`}
                                placeholder="Enter Project URL"
                                as={Input}
                              />
                              {index != 0 && (
                                <Trash2
                                  onClick={() => {
                                    arrayHelpers.remove(index);
                                  }}
                                  className="cursor-pointer text-red-500 hover:text-red-400"
                                  size={15}
                                />
                              )}
                            </div>
                            {/* Show individual error for each URL */}
                            {errors?.projectURL != "This field is required" && (
                              <ErrorMessage
                                name={`projectURL[${index}]`} // This targets the individual URL in the array
                                component="div"
                                className={`text-xs text-red-500 font-semibold ${errors?.projectURL}`}
                              />
                            )}
                          </div>
                        </React.Fragment>
                      );
                    })}

                  <p className="text-slate-500 text-sm">
                    The link should be publicly available for viewing.
                  </p>
                </div>

                <Button
                  variant={"primary"}
                  size={"sm"}
                  type="button"
                  onClick={() => arrayHelpers.push("")}
                  className="w-fit"
                >
                  <Plus />
                  Add Link
                </Button>
              </div>
            )}
          />
        </div>
        <div className="space-y-3 pt-20 pb-10">
          <div className="flex gap-1 items-center">
            <div className="text-sm text-slate-800">
              <div className="flex items-center gap-1">
                <h3 className="font-semibold">
                  Upload Supporting Documents (Maximum of 5 documents)
                </h3>
              </div>
              <p className="max-w-md">
                Example of supporting documents: performance ratings,
                transparency reports, competitive analysis, photo documentation,
                feedback reports,
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FieldArray
              name="supportingDoc"
              render={(arrayHelpers: ArrayHelpers) => (
                <div className="flex flex-col gap-2 w-full relative">
                  {values.supportingDoc &&
                    values.supportingDoc.length > 0 &&
                    values.supportingDoc.map((item: any, index: any) => {
                      return (
                        <div key={index} className="overflow-hidden">
                          {item.filename ? (
                            <div className="flex items-center gap-2 ">
                              {" "}
                              <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                                <div className="flex items-center gap-2">
                                  <Image src={pdf} alt="" />
                                  <span className="line-clamp-2">
                                    {item.filename}
                                  </span>
                                </div>
                                <FileViewer url={item.fileLocation} />
                              </div>
                              <Trash2
                                size={15}
                                color="red"
                                className="cursor-pointer text-red-500 hover:text-red-400"
                                onClick={() =>
                                  setFieldValue(`supportingDoc.${index}`, "")
                                }
                              />
                              <ErrorMessage
                                name={`supportingDoc`}
                                component="div"
                                className=" text-xs text-red-500 font-semibold"
                              />
                            </div>
                          ) : (
                            <div className="flex gap-2 items-center ">
                              <Input
                                value={values.supportingDoc[index].filename}
                                type="file"
                                accept="application/pdf"
                                className="w-full"
                                onChange={(e) => {
                                  handleFileChange(e, index, arrayHelpers);
                                }}
                              />

                              <Trash2
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                }}
                                className="cursor-pointer text-red-500 hover:text-red-400"
                                size={15}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}

                  {values.supportingDoc.length < 5 && (
                    <>
                      <p className="text-slate-500 text-sm">
                        File size must not exceed 3MB.{" "}
                      </p>
                      <Button
                        variant={"primary"}
                        size={"sm"}
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            filename: "",
                            fileLocation: "",
                          })
                        }
                        className="w-fit"
                      >
                        {" "}
                        <Plus />
                        Add Document
                      </Button>
                    </>
                  )}
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
