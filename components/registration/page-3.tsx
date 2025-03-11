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

export default function Page3() {
  const { values, setFieldValue, setFieldTouched, validateField } =
    useFormikContext<FormikValues>();
  const [count, setCount] = useState(0);
  const [fileURL, setFileURL] = useState<string>("");
  useEffect(() => {
    if (values.impactAnswer_file instanceof File) {
      setFileURL(URL.createObjectURL(values.impactAnswer_file));
    }
    WordCounter(values.impactAnswer_text, setCount, () => {
      setFieldValue("impactAnswer_text", "");
    });
  }, [values.impactAnswer_text, values.impactAnswer_file]);

  return (
    <div>
      <section className="space-y-2 pt-6 lg:pt-0">
        <h2 className="font-bold text-lg text-blue-900">
          IMPACT OF THE PROJECT
        </h2>
        <hr className="border border-blue-900"></hr>
      </section>
      <div className="grid lg:grid-cols-2 gap-8 my-10">
        <div>
          <p className="text-base">
            Describe the ways in which the project has enhanced the quality of
            life for residents or increased effectiveness, transparency and
            accountability in local governance? (You may cite several major
            impacts)
          </p>
          <p className="text-red-500">
            Please limit your answers to 500 - 1000 words
          </p>
        </div>
        <div>
          <div
            onFocus={() => {
              setFieldTouched("impactCheck", true),
                validateField("impactCheck");
            }}
            onBlur={() => {
              validateField("impactCheck");
            }}
            className="h-min"
          >
            <Editor
              defaultValue={values.impactAnswer_text}
              onChange={(e) => {
                setFieldValue("impactAnswer_text", e);
                setFieldTouched("impactAnswer_text", true);
                // Trigger validation
              }} // Trigger validation}}
            />
          </div>
          <ErrorMessage
            name="impactAnswer_text"
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
                {values.impactAnswer_file ? (
                  <div className="flex items-center gap-2 ">
                    {" "}
                    <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                      <div className="flex items-center gap-2">
                        <Image src={pdf} alt="" />
                        {values.impactAnswer_file.name}
                      </div>
                      <FileViewer url={fileURL} />
                    </div>
                    <Trash2
                      size={18}
                      color="red"
                      className="shrink-0"
                      onClick={() => setFieldValue("impactAnswer_file", null)}
                    />
                  </div>
                ) : (
                  <Input
                    value={""}
                    type="file"
                    onFocus={() => {
                      setTimeout(() => {
                        setFieldTouched("impactCheck", true),
                          validateField("impactCheck");
                      }, 3000);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        validateField("impactCheck");
                      }, 3000);
                    }}
                    accept="application/pdf"
                    placeholder="Enter Project/Program Name"
                    className="w-full"
                    onChange={(e) => {
                      handleFileChange(e, () => {
                        setFieldValue(
                          "impactAnswer_file",
                          e.target.files && e.target.files[0]
                        ),
                          setFieldTouched("impactCheck", true),
                          validateField("impactCheck");
                      });
                    }}
                  />
                )}
              </div>
              <ErrorMessage
                name="impactAnswer_file"
                component="div"
                className=" text-sm text-red-500 font-semibold"
              />
              <p className="text-slate-500 text-sm">
                File size must not exceed 3MB.{" "}
              </p>
            </div>
          </div>
          <ErrorMessage
            name="impactCheck"
            component="div"
            className=" text-xs text-red-500"
          />
        </div>
      </div>
    </div>
  );
}
