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

export default function Page6() {
  const { values, setFieldValue, setFieldTouched, validateField } =
    useFormikContext<FormikValues>();
  const [count, setCount] = useState(0);
  const [fileURL, setFileURL] = useState<string>("");
  useEffect(() => {
    if (values.innovationFile instanceof File) {
      setFileURL(URL.createObjectURL(values.innovationFile));
    }
    WordCounter(values.innovationText, setCount, () => {
      setFieldValue("innovationText", "");
    });
  }, [values.innovationText, values.innovationFile]);

  return (
    <div>
      <section className="space-y-2 pt-6 lg:pt-0">
        <h2 className="font-bold text-lg text-blue-900">
          INNOVATION ASPECT OF THE PROJECT{" "}
        </h2>
        <hr className="border border-blue-900"></hr>
      </section>
      <div className="grid lg:grid-cols-2 gap-8 my-10">
        <div className="space-y-4">
          <p className="text-base">
            How has the innovation in your project improved service delivery and
            operational efficiency within your local government unit?
          </p>
          <p className="text-base">
            What specific technological advancements or digital solutions were
            implemented in your project, and how have they contributed to
            addressing the problems?
          </p>
        </div>
        <div>
          <div
            onFocus={() => {
              setFieldTouched("innovationCheck", true),
                validateField("innovationCheck");
            }}
            onBlur={() => {
              validateField("innovationCheck");
            }}
            className="h-min"
          >
            <Editor
              defaultValue={values.innovationText}
              onChange={(e) => {
                setFieldValue("innovationText", e);
                setFieldTouched("innovationText", true);
                // Trigger validation
              }} // Trigger validation}}
            />
          </div>
          <ErrorMessage
            name="innovationText"
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
                {values.innovationFile ? (
                  <div className="flex items-center gap-2 ">
                    {" "}
                    <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                      <div className="flex items-center gap-2">
                        <Image src={pdf} alt="" />
                        {values.innovationFile.name}
                      </div>
                      <FileViewer url={fileURL} />
                    </div>
                    <Trash2
                      size={18}
                      color="red"
                      className="shrink-0"
                      onClick={() => setFieldValue("innovationFile", null)}
                    />
                  </div>
                ) : (
                  <Input
                    value={""}
                    type="file"
                    onFocus={() => {
                      setTimeout(() => {
                        setFieldTouched("innovationCheck", true),
                          validateField("innovationCheck");
                      }, 3000);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        validateField("innovationCheck");
                      }, 3000);
                    }}
                    accept="application/pdf"
                    placeholder="Enter Project/Program Name"
                    className="w-full"
                    onChange={(e) => {
                      handleFileChange(e, () => {
                        setFieldValue(
                          "innovationFile",
                          e.target.files && e.target.files[0]
                        ),
                          setFieldTouched("innovationCheck", true),
                          validateField("innovationCheck");
                      });
                    }}
                  />
                )}
              </div>
              <ErrorMessage
                name="innovationFile"
                component="div"
                className=" text-sm text-red-500 font-semibold"
              />
              <p className="text-slate-500 text-sm">
                Files must not exceed 3MB in size.{" "}
              </p>
            </div>
          </div>
          <ErrorMessage
            name="innovationCheck"
            component="div"
            className=" text-xs text-red-500"
          />
        </div>
      </div>
    </div>
  );
}
