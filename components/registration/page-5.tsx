"use client";

import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import pdf from "@/public/assets/svgs/pdf.svg";

import Editor from "@/components/shared/rich-text-editor";
import Image from "next/image";
import FileViewer from "../shared/file-viewer";
import { Trash2 } from "lucide-react";
import { handleFileChange, WordCounter } from "./registration";
import { ErrorMessage, Field, FormikValues, useFormikContext } from "formik";

export default function Page5() {
  const { values, setFieldValue, setFieldTouched, validateField } =
    useFormikContext<FormikValues>();
  const [count, setCount] = useState(0);
  const [fileURL, setFileURL] = useState<string>("");
  useEffect(() => {
    if (values.sustainabilityFile instanceof File) {
      setFileURL(URL.createObjectURL(values.sustainabilityFile));
    }
    WordCounter(values.sustainabilityText, setCount, () => {
      setFieldValue("sustainabilityText", "");
    });
  }, [values.sustainabilityText, values.sustainabilityFile]);

  return (
    <div>
      <section className="space-y-2 pt-6 lg:pt-0">
        <h2 className="font-bold text-lg text-blue-900">
          SUSTAINABILITY AND REPLICABILITY OF THE PROJECT{" "}
        </h2>
        <hr className="border border-blue-900"></hr>
      </section>
      <div className="grid lg:grid-cols-2 gap-8 my-10">
        <div>
          <div className="space-y-4">
            <p className="text-base">
              Describe how you ensure the project long-term sustainability and
              the strategies in place to maintain the project over the years.
            </p>
            <p className="text-base">
              What measures have been implemented to continuously update and
              improve the project to keep pace with technological advancements?
            </p>
            <p className="text-base">
              How does the project incorporate community engagement and
              capacity-building to ensure ongoing local support and ownership?
            </p>
          </div>
          <p className="text-red-500">
            Please limit your answers to 500 - 1000 words
          </p>
        </div>
        <div>
          <div
            onFocus={() => {
              setFieldTouched("sustainabilityCheck", true),
                validateField("sustainabilityCheck");
            }}
            onBlur={() => {
              validateField("sustainabilityCheck");
            }}
            className="h-min"
          >
            <Editor
              defaultValue={values.sustainabilityText}
              onChange={(e) => {
                setFieldValue("sustainabilityText", e);
                setFieldTouched("sustainabilityText", true);
                // Trigger validation
              }} // Trigger validation}}
            />
          </div>
          <ErrorMessage
            name="sustainabilityText"
            component="div"
            className=" text-xs text-red-500 font-semibold"
          />
          <div className="flex justify-end">
            <div
              className={` text-sm ${
                count > 1000 ? "text-red-500" : "text-gray-500"
              }`}
            >
              {count}/1000
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center my-4">
            <p>or Upload File </p>
            <div>
              <div className="overflow-hidden">
                {values.sustainabilityFile ? (
                  <div className="flex items-center gap-2 ">
                    {" "}
                    <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                      <div className="flex items-center gap-2">
                        <Image src={pdf} alt="" />
                        {values.sustainabilityFile.name}
                      </div>
                      <FileViewer url={fileURL} />
                    </div>
                    <Trash2
                      size={18}
                      color="red"
                      className="shrink-0"
                      onClick={() => setFieldValue("sustainabilityFile", null)}
                    />
                  </div>
                ) : (
                  <Input
                    value={""}
                    type="file"
                    onFocus={() => {
                      setTimeout(() => {
                        setFieldTouched("sustainabilityCheck", true),
                          validateField("sustainabilityCheck");
                      }, 3000);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        validateField("sustainabilityCheck");
                      }, 3000);
                    }}
                    accept="application/pdf"
                    placeholder="Enter Project/Program Name"
                    className="w-full"
                    onChange={(e) => {
                      handleFileChange(e, () => {
                        setFieldValue(
                          "sustainabilityFile",
                          e.target.files && e.target.files[0]
                        ),
                          setFieldTouched("sustainabilityCheck", true),
                          validateField("sustainabilityCheck");
                      });
                    }}
                  />
                )}
              </div>
              <ErrorMessage
                name="sustainabilityFile"
                component="div"
                className=" text-sm text-red-500 font-semibold"
              />
              <p className="text-slate-500 text-sm">
                Files must not exceed 3MB in size.{" "}
              </p>
            </div>
          </div>
          <ErrorMessage
            name="sustainabilityCheck"
            component="div"
            className=" text-xs text-red-500"
          />
        </div>
      </div>
    </div>
  );
}
