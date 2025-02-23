"use client";

import React, { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";

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
export default function Page5({ setFieldValue, values }: Iprops) {
  const [count, setCount] = useState(0);
  const [fileType, setFileType] = useState("");
  const [fileURL, setFileURL] = useState<string>("");

  useEffect(() => {
    if (values.sustainability instanceof File) {
      setFileType("file");
      setFileURL(URL.createObjectURL(values.sustainability));
    } else if (typeof values.sustainability === "string") {
      WordCounter(values.sustainability, setCount, setFileType, () => {
        setFieldValue("sustainability", "");
      });
    }
  }, [values.sustainability]);

  return (
    <div>
      <section className="space-y-2 pt-6 lg:pt-0">
        <h2 className="font-bold text-lg text-blue-900">
          SUSTAINABILITY AND REPLICABILITY OF THE PROJECT{" "}
        </h2>
        <hr className="border border-blue-900"></hr>
      </section>
      <div className=" my-10">
        <div className="space-y-4">
          <p className="text-base">
            Describe how you ensure the project long-term sustainability and the
            strategies in place to maintain the project over the years.
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
        <div
          className={`my-2 rounded-full ${
            fileType === "file" &&
            "opacity-50 pointer-events-none cursor-not-allowed"
          }`}
        >
          <Editor
            defaultValue={values.sustainability}
            onChange={(e) => setFieldValue("sustainability", e)}
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
              {values.sustainability instanceof File ? (
                <div className="flex items-center gap-2 ">
                  {" "}
                  <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                    <div className="flex items-center gap-2">
                      <Image src={pdf} alt="" />
                      {values.sustainability.name}
                    </div>
                    <FileViewer url={fileURL} />
                  </div>
                  <Trash2
                    size={18}
                    color="red"
                    className="shrink-0"
                    onClick={() => setFieldValue("sustainability", "")}
                  />
                </div>
              ) : (
                <Input
                  value={values.sustainability.name}
                  type="file"
                  disabled={fileType == "text"}
                  accept="application/pdf"
                  placeholder="Enter Project/Program Name"
                  className="w-full"
                  onChange={(e) =>
                    handleFileChange(e, "sustainability", setFieldValue)
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
