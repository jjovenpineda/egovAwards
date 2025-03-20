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
import { handleFileUpload } from "@/utils/file-upload";

export default function Page4() {
  const { values, setFieldValue, setFieldTouched, validateField, errors } =
    useFormikContext<FormikValues>();
  const [count, setCount] = useState(0);
  const [fileURL, setFileURL] = useState<string>("");

  useEffect(() => {
    if (values.relevanceAnswer.file instanceof File) {
      setFileURL(URL.createObjectURL(values.relevanceAnswer.file));
    }
    WordCounter(values.relevanceAnswer.text, setCount, () => {
      setFieldValue("relevanceAnswer.text", "");
    });
  }, [values.relevanceAnswer.text, values.relevanceAnswer.file]);

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
            </p>{" "}
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
              setFieldTouched("relevanceAnswer.text", true),
                validateField("relevanceAnswer");
            }}
            onBlur={() => {
              validateField("relevanceAnswer");
            }}
            className="h-min"
          >
            <Editor
              defaultValue={values.relevanceAnswer.text}
              onChange={(e) => {
                setFieldValue("relevanceAnswer.text", e);
                setFieldTouched("relevanceAnswer.text", true);
              }}
            />
          </div>
          <ErrorMessage
            name="relevanceAnswer.text"
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
                {values.relevanceAnswer.file &&
                typeof values.relevanceAnswer.file === "string" ? (
                  <div className="flex items-center gap-2 ">
                    {" "}
                    <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                      <div className="flex items-center gap-2">
                        <Image src={pdf} alt="" />
                        {values.relevanceAnswer.file}{" "}
                      </div>
                      <FileViewer url={fileURL} />
                    </div>
                    <Trash2
                      size={18}
                      color="red"
                      className="shrink-0"
                      onClick={() => setFieldValue("relevanceAnswer.file", "")}
                    />
                  </div>
                ) : (
                  <Input
                    value={""}
                    type="file"
                    onFocus={() => {
                      setTimeout(() => {
                        setFieldTouched("relevanceAnswer.file", true),
                          validateField("relevanceAnswer.file");
                      }, 3000);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        validateField("relevanceAnswer.file");
                      }, 3000);
                    }}
                    accept="application/pdf"
                    placeholder="Enter Project/Program Name"
                    className="w-full"
                    onChange={async (e) => {
                      const file = await handleFileUpload(e, () => {
                        setFieldValue("relevanceAnswer.file", e),
                          setFieldTouched("relevanceAnswer.file", true),
                          validateField("relevanceAnswer.file");
                      });

                      setFieldValue("relevanceAnswer.file", file);
                    }}
                  />
                )}
              </div>
              <ErrorMessage
                name="relevanceAnswer.file"
                component="div"
                className=" text-sm text-red-500 font-semibold"
              />
              <p className="text-slate-500 text-sm">
                File size must not exceed 3MB.{" "}
              </p>
            </div>
          </div>
          {errors.relevanceAnswer &&
            typeof errors.relevanceAnswer === "string" && (
              <ErrorMessage
                name="relevanceAnswer"
                component="div"
                className=" text-sm text-red-500 font-semibold"
              />
            )}
        </div>
      </div>
    </div>
  );
}
