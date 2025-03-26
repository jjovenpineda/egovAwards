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

export default function Page6() {
  const { values, setFieldValue, setFieldTouched, validateField, errors } =
    useFormikContext<FormikValues>();
  const [count, setCount] = useState(0);
  const [fileURL, setFileURL] = useState<string>("");

  useEffect(() => {
    if (values.innovationAnswer.file instanceof File) {
      setFileURL(URL.createObjectURL(values.innovationAnswer.file));
    }
    WordCounter(values.innovationAnswer.text, setCount, () => {
      setFieldValue("innovationAnswer.text", "");
    });
  }, [values.innovationAnswer.text, values.innovationAnswer.file]);

  return (
    <div>
      <section className="space-y-2 pt-6 lg:pt-0">
        <h2 className="font-bold text-lg text-blue-900">
          INNOVATION ASPECT OF THE PROJECT{" "}
        </h2>
        <hr className="border border-blue-900"></hr>
      </section>
      <div className="grid lg:grid-cols-2 gap-8 my-10">
        <div>
          <div className="space-y-4">
            <p className="text-base">
              How has the innovation in your project improved service delivery
              and operational efficiency within your local government unit?
            </p>
            <p className="text-base">
              What specific technological advancements or digital solutions were
              implemented in your project, and how have they contributed to
              addressing the problems?
            </p>{" "}
          </div>
          <p className="text-red-500">
            Please limit your answers to 500 - 1000 words
          </p>
        </div>
        <div>
          <div
            onFocus={() => {
              setFieldTouched("innovationAnswer.text", true),
                validateField("innovationAnswer");
            }}
            onBlur={() => {
              validateField("innovationAnswer");
            }}
            className="h-min"
          >
            <Editor
              defaultValue={values.innovationAnswer.text}
              onChange={(e) => {
                setFieldValue("innovationAnswer.text", e);
                setFieldTouched("innovationAnswer.text", true);
              }}
            />
          </div>
          <ErrorMessage
            name="innovationAnswer.text"
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
                {values.innovationAnswer.file &&
                typeof values.innovationAnswer.file === "string" ? (
                  <div className="flex items-center gap-2 ">
                    {" "}
                    <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                      <div className="flex items-center gap-2">
                        <Image src={pdf} alt="" />

                        <span className="line-clamp-2">
                          {values.innovationAnswer.file}
                        </span>
                      </div>
                      <FileViewer url={fileURL} />
                    </div>
                    <Trash2
                      size={18}
                      color="red"
                      className="shrink-0"
                      onClick={() => setFieldValue("innovationAnswer.file", "")}
                    />
                  </div>
                ) : (
                  <Input
                    value={""}
                    type="file"
                    onFocus={() => {
                      setTimeout(() => {
                        setFieldTouched("innovationAnswer.file", true),
                          validateField("innovationAnswer.file");
                      }, 3000);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        validateField("innovationAnswer.file");
                      }, 3000);
                    }}
                    accept="application/pdf"
                    placeholder="Enter Project/Program Name"
                    className="w-full"
                    onChange={async (e) => {
                      const file = await handleFileUpload(e, () => {
                        setFieldValue("innovationAnswer.file", e),
                          setFieldTouched("innovationAnswer.file", true),
                          validateField("innovationAnswer.file");
                      });

                      setFieldValue("innovationAnswer.file", file);
                    }}
                  />
                )}
              </div>
              <ErrorMessage
                name="innovationAnswer.file"
                component="div"
                className=" text-sm text-red-500 font-semibold"
              />
              <p className="text-slate-500 text-sm">
                File size must not exceed 3MB.{" "}
              </p>
            </div>
          </div>
          {errors.innovationAnswer &&
            typeof errors.innovationAnswer === "string" && (
              <ErrorMessage
                name="innovationAnswer"
                component="div"
                className=" text-sm text-red-500 font-semibold"
              />
            )}
        </div>
      </div>
    </div>
  );
}
