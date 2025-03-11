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

export default function Page4() {
  const { values, setFieldValue, setFieldTouched, validateField } =
    useFormikContext<FormikValues>();
  const [count, setCount] = useState(0);
  const [fileURL, setFileURL] = useState<string>("");
  useEffect(() => {
    if (values.relevanceAnswer_file instanceof File) {
      setFileURL(URL.createObjectURL(values.relevanceAnswer_file));
    }
    WordCounter(values.relevanceAnswer_text, setCount, () => {
      setFieldValue("relevanceAnswer_text", "");
    });
  }, [values.relevanceAnswer_text, values.relevanceAnswer_file]);

  return (
    <div>
      <section className="space-y-2 pt-6 lg:pt-0">
        <h2 className="font-bold text-lg text-blue-900">
          RELEVANCE OF THE PROJECT{" "}
        </h2>
        <hr className="border border-blue-900"></hr>
      </section>
      <div className="grid lg:grid-cols-2 gap-8 my-10">
        <div>
          <div className="space-y-4">
            <p className="text-base">
              Describe the specific problem or challenge in your local
              government unit that the the project was designed to address.
            </p>
            <p className="text-base">
              How does the project directly address and mitigate the identified
              problem or challenge?
            </p>
            <p className="text-base">
              What measurable improvements or outcomes have been observed since
              the implementation of the project in relation to the problem it
              aims to solve?
            </p>
          </div>
          <p className="text-red-500">
            Please limit your answers to 500 - 1000 words
          </p>
        </div>
        <div>
          <div
            onFocus={() => {
              setFieldTouched("relevanceCheck", true),
                validateField("relevanceCheck");
            }}
            onBlur={() => {
              validateField("relevanceCheck");
            }}
            className="h-min"
          >
            <Editor
              defaultValue={values.relevanceAnswer_text}
              onChange={(e) => {
                setFieldValue("relevanceAnswer_text", e);
                setFieldTouched("relevanceAnswer_text", true);
                // Trigger validation
              }} // Trigger validation}}
            />
          </div>
          <ErrorMessage
            name="relevanceAnswer_text"
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
                {values.relevanceAnswer_file ? (
                  <div className="flex items-center gap-2 ">
                    {" "}
                    <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                      <div className="flex items-center gap-2">
                        <Image src={pdf} alt="" />
                        {values.relevanceAnswer_file.name}
                      </div>
                      <FileViewer url={fileURL} />
                    </div>
                    <Trash2
                      size={18}
                      color="red"
                      className="shrink-0"
                      onClick={() =>
                        setFieldValue("relevanceAnswer_file", null)
                      }
                    />
                  </div>
                ) : (
                  <Input
                    value={""}
                    type="file"
                    onFocus={() => {
                      setTimeout(() => {
                        setFieldTouched("relevanceCheck", true),
                          validateField("relevanceCheck");
                      }, 3000);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        validateField("relevanceCheck");
                      }, 3000);
                    }}
                    accept="application/pdf"
                    placeholder="Enter Project/Program Name"
                    className="w-full"
                    onChange={(e) => {
                      handleFileChange(e, () => {
                        setFieldValue(
                          "relevanceAnswer_file",
                          e.target.files && e.target.files[0]
                        ),
                          setFieldTouched("relevanceCheck", true),
                          validateField("relevanceCheck");
                      });
                    }}
                  />
                )}
              </div>
              <ErrorMessage
                name="relevanceAnswer_file"
                component="div"
                className=" text-sm text-red-500 font-semibold"
              />
              <p className="text-slate-500 text-sm">
                File size must not exceed 3MB.{" "}
              </p>
            </div>
          </div>
          <ErrorMessage
            name="relevanceCheck"
            component="div"
            className=" text-xs text-red-500"
          />
        </div>
      </div>
    </div>
  );
}
