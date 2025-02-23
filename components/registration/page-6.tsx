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
    if (values.innovation instanceof File) {
      setFileType("file");
      setFileURL(URL.createObjectURL(values.innovation));
    } else if (typeof values.innovation === "string") {
      WordCounter(values.innovation, setCount, setFileType, () => {
        setFieldValue("innovation", "");
      });
    }
  }, [values.innovation]);

  return (
    <div>
      <section className="space-y-2 pt-6 lg:pt-0">
        <h2 className="font-bold text-lg text-blue-900">
          INNOVATION ASPECT OF THE PROJECT{" "}
        </h2>
        <hr className="border border-blue-900"></hr>
      </section>
      <div className=" my-10">
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
            defaultValue={values.innovation}
            onChange={(e) => setFieldValue("innovation", e)}
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
              {values.innovation instanceof File ? (
                <div className="flex items-center gap-2 ">
                  {" "}
                  <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                    <div className="flex items-center gap-2">
                      <Image src={pdf} alt="" />
                      {values.innovation.name}
                    </div>
                    <FileViewer url={fileURL} />
                  </div>
                  <Trash2
                    size={18}
                    color="red"
                    className="shrink-0"
                    onClick={() => setFieldValue("innovation", "")}
                  />
                </div>
              ) : (
                <Input
                  value={values.innovation.name}
                  type="file"
                  disabled={fileType == "text"}
                  accept="application/pdf"
                  placeholder="Enter Project/Program Name"
                  className="w-full"
                  onChange={(e) =>
                    handleFileChange(e, "innovation", setFieldValue)
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
