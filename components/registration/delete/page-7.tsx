"use client";

import React, { useCallback, useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Editor from "@/components/shared/rich-text-editor";
import { debounce } from "lodash";
import {
  ErrorMessage,
  Field,
  FieldArray,
  FormikValues,
  useFormikContext,
} from "formik";
import pdf from "@/public/assets/svgs/pdf.svg";
import FileViewer from "../../shared/file-viewer";
import { Trash2 } from "lucide-react";
import { handleFileChange, WordCounter } from "../registration";
import { handleFileUpload } from "@/utils/file-upload";

const goals = [
  {
    id: 1,
    title: "No Poverty",
    description: "Eradicate poverty in all forms.",
    selected: true,
  },
  {
    id: 2,
    title: "Zero Hunger",
    description:
      "End hunger, improve nutrition, and promote sustainable agriculture.",
    selected: false,
  },
  {
    id: 3,
    title: "Good Health and Well-being",
    description: "Ensure healthy lives and promote well-being for all.",
    selected: false,
  },
  {
    id: 4,
    title: "Quality Education",
    description: "Provide inclusive, equitable, and quality education.",
    selected: false,
  },
  {
    id: 5,
    title: "Gender Equality",
    description: "Achieve gender equality and empower all women and girls.",
    selected: true,
  },
  {
    id: 6,
    title: "Clean Water and Sanitation",
    description: "Ensure access to water and sanitation for all.",
    selected: false,
  },
  {
    id: 7,
    title: "Affordable and Clean Energy",
    description: "Promote sustainable and modern energy solutions.",
    selected: false,
  },
  {
    id: 8,
    title: "Decent Work and Economic Growth",
    description: "Promote inclusive and sustainable economic growth.",
    selected: false,
  },
  {
    id: 9,
    title: "Industry, Innovation, and Infrastructure",
    description: "Build resilient infrastructure and foster innovation.",
    selected: true,
  },
  {
    id: 10,
    title: "Reduced Inequalities",
    description: "Reduce inequality within and among countries.",
    selected: false,
  },
  {
    id: 11,
    title: "Sustainable Cities and Communities",
    description: "Make cities inclusive, safe, resilient, and sustainable.",
    selected: false,
  },
  {
    id: 12,
    title: "Responsible Consumption and Production",
    description: "Ensure sustainable consumption and production patterns.",
    selected: false,
  },
  {
    id: 13,
    title: "Climate Action",
    description: "Take urgent action to combat climate change.",
    selected: true,
  },
  {
    id: 14,
    title: "Life Below Water",
    description: "Conserve and sustainably use ocean and marine resources.",
    selected: false,
  },
  {
    id: 15,
    title: "Life on Land",
    description: "Protect, restore, and promote sustainable land ecosystems.",
    selected: false,
  },
  {
    id: 16,
    title: "Peace, Justice, and Strong Institutions",
    description: "Promote peaceful societies and strong governance.",
    selected: true,
  },
  {
    id: 17,
    title: "Partnerships for the Goals",
    description: "Strengthen global partnerships for sustainable development.",
    selected: true,
  },
];

export default function Page7() {
  const { values, setFieldValue, setFieldTouched, errors, validateField } =
    useFormikContext<FormikValues>();
  const [content, setContent] = useState("");
  const [count, setCount] = useState(0);

  const [fileURL1, setFileURL1] = useState<string>("");
  const [fileURL2, setFileURL2] = useState<string>("");

  useEffect(() => {
    if (values.alignmentSDG.answer.file instanceof File) {
      setFileURL1(URL.createObjectURL(values.alignmentSDG.answer.file));
    }
    WordCounter(values.alignmentSDG.answer.text, setCount, () => {
      setFieldValue("alignmentSDG.answer.text", "");
    });
  }, [values.alignmentSDG.answer.text, values.alignmentSDG.answer.file]);
  useEffect(() => {
    if (values.alignmentAnswerDICT.file instanceof File) {
      setFileURL2(URL.createObjectURL(values.alignmentAnswerDICT.file));
    }
    WordCounter(values.alignmentAnswerDICT.text, setCount, () => {
      setFieldValue("alignmentAnswerDICT.text", "");
    });
  }, [values.alignmentAnswerDICT.text, values.alignmentAnswerDICT.file]);
  return (
    <div>
      <section className="space-y-2 pt-6 lg:pt-0">
        <h2 className="font-bold text-lg text-blue-900">
          ALIGNMENT WITH GOALS{" "}
        </h2>
        <hr className="border border-blue-900"></hr>
      </section>
    </div>
  );
}
