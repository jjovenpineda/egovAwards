import React from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { File, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import FileViewer from "../shared/file-viewer";
import pdf from "@/public/assets/svgs/pdf.svg";
import { ArrayHelpers, ErrorMessage, Field, FieldArray } from "formik";
import { AnimatePresence, m } from "motion/react";
import { toast } from "@/hooks/use-toast";
const categories = [
  {
    id: "r1",
    value: "1",
    label:
      "G2A Government Solutions Providing Access through Interoperability to Stakeholders",
  },
  {
    id: "r2",
    value: "2",
    label: "G2B Government Solutions to Improve Business Climate",
  },
  {
    id: "r3",
    value: "3",
    label: "G2B Government Solutions to Improve Business Climate",
  },
  {
    id: "r4",
    value: "4",
    label: "G2C Governments Solutions to Serve Citizens Needs",
  },
  {
    id: "r5",
    value: "5",
    label: "G2D Government Solutions to Harnessing Data for Specific Use Cases",
  },
  {
    id: "r6",
    value: "6",
    label:
      "G2E Government solutions providing Education and Training to citizens",
  },
];
interface Iprops {
  setFieldValue: Function;
  values: any;
}
export default function Page2({ setFieldValue, values }: Iprops) {
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    arrayHelpers: any
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (values.documents.map((e: any) => e.name).includes(files[0].name)) {
        toast({
          title: "Duplicate File",
          description: "This file has already been uploaded.",
          variant: "destructive",
          duration: 2000,
        });
      } else {
        setFieldValue(`documents.${index}`, files[0]);
      }
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
          <Label className="font-semibold text-sm text-[#1F2937]">
            Project/Program Name
          </Label>
          <Field
            type="text"
            autoComplete="off"
            name="projectName"
            placeholder="Enter Project/Program Name"
            as={Input}
            className=" space-y-8 rounded-md bg-white "
          />
          <ErrorMessage
            name="projectName"
            component="div"
            className=" text-xs text-red-500"
          />
        </div>
        <div>
          <h2 className="font-semibold py-2 text-sm text-[#1F2937]">
            Choose Category for Project
          </h2>
          <RadioGroup
            onValueChange={(e) => setFieldValue("projectCategory", e)}
            defaultValue={values.projectCategory}
          >
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
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
          <ErrorMessage
            name="projectCategory"
            component="div"
            className=" text-xs text-red-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <div className="flex flex-wrap justify-between">
              <Label className="font-semibold text-sm text-[#1F2937]">
                Project Period{" "}
              </Label>
              <p className="text-slate-500 text-sm">
                (*Must be existing for a minimum of one year)
              </p>
            </div>
            <Field
              type="text"
              autoComplete="off"
              name="projectPeriod"
              placeholder="Enter Project Period"
              as={Input}
              className=" space-y-8 rounded-md bg-white "
            />
            <ErrorMessage
              name="projectPeriod"
              component="div"
              className=" text-xs text-red-500"
            />
          </div>
          <div>
            <Label className="font-semibold text-sm text-[#1F2937]">
              Project URL{" "}
            </Label>
            <Field
              type="text"
              autoComplete="off"
              name="projectURL"
              placeholder="Enter Project URL"
              as={Input}
              className=" space-y-8 rounded-md bg-white "
            />
            <ErrorMessage
              name="projectURL"
              component="div"
              className=" text-xs text-red-500"
            />
            <p className="text-slate-500 text-sm">
              Please provide any link for virtual access to the project.
            </p>
          </div>
        </div>
        <div className="space-y-3 pt-20 pb-10">
          <div className="text-sm text-slate-800">
            <h3 className="font-semibold">
              Upload Supporting Documents (Maximum of 5 documents)
            </h3>
            <p className="max-w-md">
              Example of supporting documents: performance ratings, transparency
              reports, competitive analysis, photo documentation, feedback
              reports,
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FieldArray
              name="documents"
              render={(arrayHelpers: ArrayHelpers) => (
                <div className="flex flex-col gap-2 w-full relative">
                  <AnimatePresence>
                    {values.documents &&
                      values.documents.length > 0 &&
                      values.documents.map((item: any, index: any) => {
                        const fileURL = item.name && URL.createObjectURL(item);

                        return (
                          <m.div
                            initial={{
                              opacity: 0,
                            }}
                            animate={{
                              opacity: 1,
                            }}
                            key={item.lastModified}
                            className="overflow-hidden"
                          >
                            {item.name ? (
                              <m.div
                                exit={{
                                  opacity: 0,
                                  x: 50,
                                }}
                                transition={{ duration: 0.5 }}
                                className="flex items-center gap-2 "
                              >
                                {" "}
                                <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                                  <div className="flex items-center gap-2">
                                    <Image src={pdf} alt="" />
                                    {item.name}
                                  </div>
                                  <FileViewer url={fileURL} />
                                </div>
                                <Trash2
                                  size={18}
                                  color="red"
                                  className="shrink-0"
                                  onClick={() => arrayHelpers.remove(index)}
                                />
                              </m.div>
                            ) : (
                              <Input
                                value={values.documents[index].name}
                                type="file"
                                accept="application/pdf"
                                placeholder="Enter Project/Program Name"
                                className="w-full"
                                onChange={(e) =>
                                  handleFileChange(e, index, arrayHelpers)
                                }
                              />
                            )}
                          </m.div>
                        );
                      })}
                  </AnimatePresence>
                  {values.documents.length < 5 && (
                    <>
                      <p className="text-slate-500 text-sm">
                        Files must not exceed 3MB in size.{" "}
                      </p>
                      <Button
                        variant={"primary"}
                        size={"sm"}
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            name: "",
                            lastModified: Date.now(),
                            type: "application/pdf",
                            size: 1,
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
