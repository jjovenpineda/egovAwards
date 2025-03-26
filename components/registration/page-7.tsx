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
import FileViewer from "../shared/file-viewer";
import { Trash2 } from "lucide-react";
import { handleFileChange, WordCounter } from "./registration";
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
      <section className="mb-20">
        <div className="flex flex-wrap gap-1 items-center">
          <p className="text-base text-slate-900 italic py-4">
            <strong className="not-italic">
              Sustainable Development Goals Target
            </strong>{" "}
            (Select all that apply.){" "}
            <span className="text-red-500 text-base">*</span>
          </p>
          <ErrorMessage
            name="alignmentSDG.target"
            component="div"
            className=" text-xs text-red-500 font-semibold"
          />
        </div>
        <FieldArray
          name="alignmentSDG.target"
          render={(arrayHelpers) => (
            <div className="grid items-start lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
              {goals.map((goal, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Field
                    type="checkbox"
                    name="alignmentSDG.target"
                    className=" mt-1.5"
                    id={goal.title}
                    value={goal.title}
                    checked={values.alignmentSDG.target.includes(goal.title)}
                    onChange={(e: any) => {
                      if (e.target.checked) {
                        arrayHelpers.push(goal.title);
                      } else {
                        const idx = values.alignmentSDG.target.indexOf(
                          goal.title
                        );
                        arrayHelpers.remove(idx);
                      }
                    }}
                  />
                  <div className="flex flex-col cursor-pointer">
                    <Label
                      htmlFor={goal.title}
                      className="font-bold text-base text-slate-900"
                    >
                      {goal.title}{" "}
                      <span className="text-slate-500 text-sm">{`(SDG ${
                        index + 1
                      })`}</span>
                    </Label>

                    <Label
                      htmlFor={goal.title}
                      className="text-slate-500 text-base"
                    >
                      {goal.description}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          )}
        />
      </section>
      <section className="grid gap-8 lg:grid-cols-2 my-10">
        <div>
          <div className="space-y-2">
            <p className="text-base">
              Describe how it aligns with 1 or 2 SDGs. (Which specific SDGs does
              the project primarily target, and why?
            </p>
            <p className="text-base">
              How does the project's focus on these SDGs address local or global
              challenges?
            </p>
            <p className="text-base">
              What measurable outcomes are expected from the project in relation
              to the selected SDGs?
            </p>
            <p className="text-base">
              Can you provide examples of how the project contributes to the
              economic, social, or environmental aspects of the chosen SDGs?)
            </p>
          </div>
          <p className="text-red-500">
            Please limit your answers to 500 - 1000 words
          </p>
        </div>
        <div>
          <div
            onFocus={() => {
              setFieldTouched("alignmentSDG.answer.text", true),
                validateField("alignmentSDG.answer");
            }}
            onBlur={() => {
              validateField("alignmentSDG.answer");
            }}
            className="h-min"
          >
            <Editor
              defaultValue={values.alignmentSDG.answer.text}
              onChange={(e) => {
                setFieldValue("alignmentSDG.answer.text", e);
                setFieldTouched("alignmentSDG.answer.text", true);
              }}
            />
          </div>
          <ErrorMessage
            name="alignmentSDG.answer.text"
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
            <div className="flex flex-wrap gap-2 items-center my-4">
              <p>or Upload File </p>
              <div>
                <div className="overflow-hidden">
                  {values.alignmentSDG.answer.file &&
                  typeof values.alignmentSDG.answer.file === "string" ? (
                    <div className="flex items-center gap-2 ">
                      {" "}
                      <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                        <div className="flex items-center gap-2">
                          <Image src={pdf} alt="" />
                          <span className="line-clamp-2">
                            {values.alignmentSDG.answer.file}
                          </span>
                        </div>
                        <FileViewer url={fileURL1} />
                      </div>
                      <Trash2
                        size={18}
                        color="red"
                        className="shrink-0"
                        onClick={() =>
                          setFieldValue("alignmentSDG.answer.file", "")
                        }
                      />
                    </div>
                  ) : (
                    <Input
                      value={""}
                      type="file"
                      onFocus={() => {
                        setTimeout(() => {
                          setFieldTouched("alignmentSDG.answer.file", true),
                            validateField("alignmentSDG.answer.file");
                        }, 3000);
                      }}
                      onBlur={() => {
                        setTimeout(() => {
                          validateField("alignmentSDG.answer.file");
                        }, 3000);
                      }}
                      accept="application/pdf"
                      placeholder="Enter Project/Program Name"
                      className="w-full"
                      onChange={async (e) => {
                        const file = await handleFileUpload(e, () => {
                          setFieldValue("alignmentSDG.answer.file", e),
                            setFieldTouched("alignmentSDG.answer.file", true),
                            validateField("alignmentSDG.answer.file");
                        });

                        setFieldValue("alignmentSDG.answer.file", file);
                      }}
                    />
                  )}
                </div>
                <ErrorMessage
                  name="alignmentSDG.answer.file"
                  component="div"
                  className=" text-sm text-red-500 font-semibold"
                />
                <p className="text-slate-500 text-sm">
                  File size must not exceed 3MB.{" "}
                </p>
              </div>
            </div>
          </div>
          {errors.alignmentSDG &&
            typeof errors.alignmentSDG === "object" &&
            "answer" in errors.alignmentSDG &&
            typeof errors.alignmentSDG.answer === "string" && (
              <ErrorMessage
                name="alignmentSDG.answer"
                component="div"
                className=" text-sm text-red-500 font-semibold"
              />
            )}
        </div>
      </section>
      <section className="grid gap-8 lg:grid-cols-2 my-10">
        <div>
          <div className="space-y-2">
            <p className="text-base ">
              Describe how the project aligns with or supports the mandate and
              programs of the Department of Information and Communications
              Technology (DICT).
            </p>
          </div>
          <p className="text-red-500">
            Please limit your answers to 500 - 1000 words
          </p>
        </div>
        <div>
          <div
            onFocus={() => {
              setFieldTouched("alignmentAnswerDICT.text", true),
                validateField("alignmentAnswerDICT");
            }}
            onBlur={() => {
              validateField("alignmentAnswerDICT");
            }}
            className="h-min"
          >
            <Editor
              defaultValue={values.alignmentAnswerDICT.text}
              onChange={(e) => {
                setFieldValue("alignmentAnswerDICT.text", e);
                setFieldTouched("alignmentAnswerDICT.text", true);
              }}
            />
          </div>
          <ErrorMessage
            name="alignmentAnswerDICT.text"
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
                {values.alignmentAnswerDICT.file &&
                typeof values.alignmentAnswerDICT.file === "string" ? (
                  <div className="flex items-center gap-2 ">
                    {" "}
                    <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                      <div className="flex items-center gap-2">
                        <Image src={pdf} alt="" />{" "}
                        <span className="line-clamp-2">
                          {values.alignmentAnswerDICT.file}
                        </span>
                      </div>
                      <FileViewer url={fileURL2} />
                    </div>
                    <Trash2
                      size={18}
                      color="red"
                      className="shrink-0"
                      onClick={() =>
                        setFieldValue("alignmentAnswerDICT.file", "")
                      }
                    />
                  </div>
                ) : (
                  <Input
                    value={""}
                    type="file"
                    onFocus={() => {
                      setTimeout(() => {
                        setFieldTouched("alignmentAnswerDICT.file", true),
                          validateField("alignmentAnswerDICT.file");
                      }, 3000);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        validateField("alignmentAnswerDICT.file");
                      }, 3000);
                    }}
                    accept="application/pdf"
                    placeholder="Enter Project/Program Name"
                    className="w-full"
                    onChange={async (e) => {
                      const file = await handleFileUpload(e, () => {
                        setFieldValue("alignmentAnswerDICT.file", e),
                          setFieldTouched("alignmentAnswerDICT.file", true),
                          validateField("alignmentAnswerDICT.file");
                      });

                      setFieldValue("alignmentAnswerDICT.file", file);
                    }}
                  />
                )}
              </div>
              <ErrorMessage
                name="alignmentAnswerDICT.file"
                component="div"
                className=" text-sm text-red-500 font-semibold"
              />
              <p className="text-slate-500 text-sm">
                File size must not exceed 3MB.{" "}
              </p>
            </div>
          </div>
          {errors.alignmentAnswerDICT &&
            typeof errors.alignmentAnswerDICT === "string" && (
              <ErrorMessage
                name="alignmentAnswerDICT"
                component="div"
                className=" text-sm text-red-500 font-semibold"
              />
            )}
        </div>
      </section>
    </div>
  );
}
