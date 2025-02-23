"use client";

import React, { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";

import { Input } from "@/components/ui/input";
import pdf from "@/public/assets/svgs/pdf.svg";

import Editor from "@/components/shared/rich-text-editor";
import Image from "next/image";
import FileViewer from "../shared/file-viewer";
import { Trash2 } from "lucide-react";
interface Iprops {
  setFieldValue: Function;
  values: any;
}
export default function Page4({ setFieldValue, values }: Iprops) {
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState("");
  const [fileURL, setFileURL] = useState<string>("");
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFieldValue("relevance", files[0]);
    }
  };
  const wordCounter = useCallback(
    debounce((value: string) => {
      const plainText = value.replace(/<[^>]*>/g, "");
      const words = plainText
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
      setCount(words);
      if (words <= 0) {
        setSelected("");
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (values.relevance instanceof File) {
      setSelected("file");
      setFileURL(URL.createObjectURL(values.relevance));
    } else if (typeof values.relevance === "string") {
      wordCounter(values.relevance);
      setSelected("text");
    }
  }, [values.relevance]);

  return (
    <div>
      <section className="space-y-2 pt-6 lg:pt-0">
        <h2 className="font-bold text-lg text-blue-900">
          RELEVANCE OF THE PROJECT{" "}
        </h2>
        <hr className="border border-blue-900"></hr>
      </section>
      <div className=" my-10">
        <div className="space-y-4">
          <p className="text-base">
            Describe the specific problem or challenge in your local government
            unit that the the project was designed to address.
          </p>
          <p className="text-base">
            How does the project directly address and mitigate the identified
            problem or challenge?
          </p>
          <p className="text-base">
            What measurable improvements or outcomes have been observed since
            the implementation of the project in relation to the problem it aims
            to solve?
          </p>
        </div>
        <p className="text-red-500">
          Please limit your answers to 500 - 1000 words
        </p>
        <div
          className={`my-2 rounded-full ${
            selected === "file" && "opacity-50 cursor-not-allowed"
          }`}
        >
          <Editor onChange={(e) => setFieldValue("relevance", e)} />
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
              {values.relevance instanceof File ? (
                <div className="flex items-center gap-2 ">
                  {" "}
                  <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                    <div className="flex items-center gap-2">
                      <Image src={pdf} alt="" />
                      {values.relevance.name}
                    </div>
                    <FileViewer url={fileURL} />
                  </div>
                  <Trash2
                    size={18}
                    color="red"
                    className="shrink-0"
                    onClick={() => setFieldValue("relevance", "")}
                  />
                </div>
              ) : (
                <Input
                  value={values.relevance.name}
                  type="file"
                  disabled={selected == "text"}
                  accept="application/pdf"
                  placeholder="Enter Project/Program Name"
                  className="w-full"
                  onChange={(e) => handleFileChange(e, values.relevance)}
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
