"use client";

import React, { useCallback, useEffect, useState } from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { File, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/rich-text-editor";
import Tiptap from "@/components/rich-text-editor";
import Editor from "@/components/rich-text-editor";
import { debounce } from "lodash";
const categories = [
  {
    id: "r1",
    value: "1",
    label:
      "G2A Government Solutions Providing Access through Interoperability to Stakeholders",
  },
  {
    id: "r2",
    value: "2",
    label: "G2B Government Solutions to Improve Business Climate",
  },
  {
    id: "r3",
    value: "3",
    label: "G2B Government Solutions to Improve Business Climate",
  },
  {
    id: "r4",
    value: "4",
    label: "G2C Governments Solutions to Serve Citizens Needs",
  },
  {
    id: "r5",
    value: "5",
    label: "G2D Government Solutions to Harnessing Data for Specific Use Cases",
  },
  {
    id: "r6",
    value: "6",
    label:
      "G2E Government solutions providing Education and Training to citizens",
  },
];
export default function Page5() {
  const [content, setContent] = useState("");
  const [count, setCount] = useState(0);

  const wordCounter = useCallback(
    debounce((value: string) => {
      const plainText = value.replace(/<[^>]*>/g, "");
      const words = plainText
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
      setCount(words);
    }, 500),
    []
  );

  useEffect(() => {
    wordCounter(content);
  }, [content]);
  return (
    <div>
      <section className="space-y-2 pt-6 lg:pt-0">
        <h2 className="font-bold text-lg text-blue-900">
          SUSTAINABILITY AND REPLICABILITY OF THE PROJECT{" "}
        </h2>
        <hr className="border border-blue-900"></hr>
      </section>
      <div className=" my-10">
        <div className="space-y-2">
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
        <div className="my-2">
          <Editor onChange={(e) => setContent(e)} />
        </div>
        {/*  <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="prose max-w-none"
        /> */}
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
            <Input type="file" placeholder="Enter Project/Program Name" />
            <p className="text-slate-500 text-sm">
              Files must not exceed 3MB in size.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
