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

export default function Page3() {
  const { values, setFieldValue, setFieldTouched, validateField, errors } =
    useFormikContext<FormikValues>();
  const [count, setCount] = useState(0);
  const [fileURL, setFileURL] = useState<string>("");

  useEffect(() => {
    if (values.impactAnswer.file instanceof File) {
      setFileURL(URL.createObjectURL(values.impactAnswer.file));
    }
    WordCounter(values.impactAnswer.text, setCount, () => {
      setFieldValue("impactAnswer.text", "");
    });
  }, [values.impactAnswer.text, values.impactAnswer.file]);

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
              setFieldTouched("impactAnswer.text", true),
                validateField("impactAnswer");
            }}
            onBlur={() => {
              validateField("impactAnswer");
            }}
            className="h-min"
          >
            <Editor
              defaultValue={values.impactAnswer.text}
              onChange={(e) => {
                setFieldValue("impactAnswer.text", e);
                setFieldTouched("impactAnswer.text", true);
              }}
            />
          </div>
          <ErrorMessage
            name="impactAnswer.text"
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
                {values.impactAnswer.file &&
                typeof values.impactAnswer.file === "string" ? (
                  <div className="flex items-center gap-2 ">
                    {" "}
                    <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                      <div className="flex items-center gap-2">
                        <Image src={pdf} alt="" />
                        <span className="line-clamp-2">
                          {values.impactAnswer.file
                            .split("/")
                            .pop()
                            .split("-")
                            .slice(1)
                            .join("-")}
                        </span>
                      </div>
                      <FileViewer url={fileURL} />
                    </div>
                    <Trash2
                      size={18}
                      color="red"
                      className="shrink-0"
                      onClick={() => setFieldValue("impactAnswer.file", "")}
                    />
                  </div>
                ) : (
                  <Input
                    value={""}
                    type="file"
                    onFocus={() => {
                      setTimeout(() => {
                        setFieldTouched("impactAnswer.file", true),
                          validateField("impactAnswer.file");
                      }, 3000);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        validateField("impactAnswer.file");
                      }, 3000);
                    }}
                    accept="application/pdf"
                    placeholder="Enter Project/Program Name"
                    className="w-full"
                    onChange={async (e) => {
                      const file = await handleFileUpload(e, () => {
                        setFieldValue("impactAnswer.file", e),
                          setFieldTouched("impactAnswer.file", true),
                          validateField("impactAnswer.file");
                      });

                      setFieldValue("impactAnswer.file", file);
                    }}
                  />
                )}
              </div>
              <ErrorMessage
                name="impactAnswer.file"
                component="div"
                className=" text-sm text-red-500 font-semibold"
              />
              <p className="text-slate-500 text-sm">
                File size must not exceed 3MB.{" "}
              </p>
            </div>
          </div>
          {errors.impactAnswer && typeof errors.impactAnswer === "string" && (
            <ErrorMessage
              name="impactAnswer"
              component="div"
              className=" text-sm text-red-500 font-semibold"
            />
          )}
        </div>
      </div>
    </div>
  );
}
