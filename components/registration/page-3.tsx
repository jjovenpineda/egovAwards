"use client";

import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import pdf from "@/public/assets/svgs/pdf.svg";

import Editor from "@/components/shared/rich-text-editor";
import Image from "next/image";
import FileViewer from "../shared/file-viewer";
import { Trash2 } from "lucide-react";
import { handleFileChange, WordCounter } from "./registration";
interface Iprops {
  setFieldValue: Function;
  values: any;
}
export default function Page3({ setFieldValue, values }: Iprops) {
  const [count, setCount] = useState(0);
  const [fileURL, setFileURL] = useState<string>("");

  useEffect(() => {
    if (values.impact.file instanceof File) {
      setFileURL(URL.createObjectURL(values.impact.file));
    }
    WordCounter(values.impact.text, setCount, () => {
      setFieldValue("impact.text", "");
    });
  }, [values.impact]);

  return (
    <div>
      <section className="space-y-2 pt-6 lg:pt-0">
        <h2 className="font-bold text-lg text-blue-900">
          IMPACT OF THE PROJECT
        </h2>
        <hr className="border border-blue-900"></hr>
      </section>
      <div className=" my-10">
        <p className="text-base">
          Describe the ways in which the project has enhanced the quality of
          life for residents or increased effectiveness, transparency and
          accountability in local governance? (You may cite several major
          impacts)
        </p>
        <p className="text-red-500">
          Please limit your answers to 500 - 1000 words
        </p>
        <div className="my-2 rounded-full ">
          <Editor
            defaultValue={values.impact.text}
            onChange={(e) => setFieldValue("impact.text", e)}
          />
        </div>

        <div className="flex justify-end">
          <div
            className={` text-sm ${
              count >= 1000 ? "text-red-500" : "text-gray-500"
            }`}
          >
            {count}/500
          </div>
        </div>

        <div className="flex flex-wrap gap-2 items-center my-10">
          <p>or Upload File </p>
          <div>
            <div className="overflow-hidden">
              {values.impact.file ? (
                <div className="flex items-center gap-2 ">
                  {" "}
                  <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                    <div className="flex items-center gap-2">
                      <Image src={pdf} alt="" />
                      {values.impact.file.name}
                    </div>
                    <FileViewer url={fileURL} />
                  </div>
                  <Trash2
                    size={18}
                    color="red"
                    className="shrink-0"
                    onClick={() => setFieldValue("impact.file", null)}
                  />
                </div>
              ) : (
                <Input
                  value={values.impact.name}
                  type="file"
                  accept="application/pdf"
                  placeholder="Enter Project/Program Name"
                  className="w-full"
                  onChange={(e) =>
                    handleFileChange(e, "impact.file", setFieldValue)
                  }
                />
              )}
            </div>

            <p className="text-slate-500 text-sm">
              Files must not exceed 3MB in size.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
