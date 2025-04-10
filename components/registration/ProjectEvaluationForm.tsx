"use client";

import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import pdf from "@/public/assets/svgs/pdf.svg";

import Editor from "@/components/shared/rich-text-editor";
import Image from "next/image";
import FileViewer from "../shared/file-viewer";
import { Trash2 } from "lucide-react";
import { handleFileChange, WordCounter } from "./registration";
import {
  ErrorMessage,
  Field,
  FieldArray,
  FormikValues,
  useFormikContext,
} from "formik";
import { handleFileUpload } from "@/utils/file-upload";
import { Label } from "../ui/label";
interface IProjectEvaluationForm {
  FieldName: string;
}
const infos = [
  {
    title: "IMPACT OF THE PROJECT",
    fieldName: "impactAnswer",
    question: [
      "Describe the ways in which the project has enhanced the quality of life for residents or increased effectiveness, transparency and accountability in local governance? (You may cite several major impacts)",
    ],
  },
  {
    title: "RELEVANCE OF THE PROJECT",
    fieldName: "relevanceAnswer",
    question: [
      "Describe the specific problem or challenge in your local government unit that the the project was designed to address.",
      "How does the project directly address and mitigate the identified problem or challenge?",
      "What measurable improvements or outcomes have been observed since the implementation of the project in relation to the problem it aims to solve?",
    ],
  },
  {
    title: "SUSTAINABILITY AND REPLICABILITY OF THE PROJECT",
    fieldName: "sustainabilityAnswer",
    question: [
      "Describe how you ensure the project long-term sustainability and the strategies in place to maintain the project over the years.",
      "What measures have been implemented to continuously update and improve the project to keep pace with technological advancements?",
      "How does the project incorporate community engagement and capacity-building to ensure ongoing local support and ownership?",
    ],
  },
  {
    title: "INNOVATION ASPECT OF THE PROJECT",
    fieldName: "innovationAnswer",
    question: [
      "How has the innovation in your project improved service delivery and operational efficiency within your local government unit?",
      "What specific technological advancements or digital solutions were implemented in your project, and how have they contributed to addressing the problems?",
    ],
  },
];

const alignmentPagedetails = [
  {
    title: "ALIGNMENT WITH GOALS",
    fieldName: "alignmentSDG",
    question: [
      "Describe how it aligns with 1 or 2 SDGs. (Which specific SDGs does the project primarily target, and why?",
      "How does the project's focus on these SDGs address local or global challenges?",
      "What measurable outcomes are expected from the project in relation to the selected SDGs?",
      "Can you provide examples of how the project contributes to the economic, social, or environmental aspects of the chosen SDGs?)",
    ],
  },
  {
    title: "ALIGNMENT WITH GOALS",
    fieldName: "alignmentAnswerDICT",
    question: [
      "Describe how the project aligns with or supports the mandate and programs of the Department of Information and Communications Technology (DICT).",
    ],
  },
];
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
export default function ProjectEvaluationForm({ category }: any) {
  const { values, setFieldValue, setFieldTouched, validateField, errors } =
    useFormikContext<FormikValues>();
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const pageDetails = infos.find((info) => info.fieldName?.includes(category));

  const [fieldName, setFieldName] = useState<any>("");

  useEffect(() => {
    setFieldName(pageDetails?.fieldName);
  }, [pageDetails]);
  useEffect(() => {
    WordCounter(values[fieldName]?.text, setCount, () => {
      setFieldValue(`${fieldName}.text`, "");
    });
  }, [values[fieldName]?.text]);

  useEffect(() => {
    WordCounter(values?.alignmentAnswerDICT.text, setCount1, () => {
      setFieldValue(`alignmentAnswerDICT.text`, "");
    });
  }, [values.alignmentAnswerDICT.text]);

  useEffect(() => {
    WordCounter(values?.alignmentSDG.answer.text, setCount2, () => {
      setFieldValue("alignmentSDG.answer.text", "");
    });
  }, [values.alignmentSDG.answer.text]);
  return (
    <div>
      <section className="space-y-2 pt-6 lg:pt-0">
        <h2 className="font-bold text-lg text-blue-900">
          {category != "alignment"
            ? pageDetails?.title
            : "ALIGNMENT WITH GOALS"}
        </h2>
        <hr className="border border-blue-900"></hr>
      </section>
      <div>
        {category != "alignment" && fieldName ? (
          <div className="grid lg:grid-cols-2 gap-8 my-10">
            {" "}
            <div>
              <div className="space-y-4">
                {pageDetails?.question.map((question, index) => (
                  <p key={index} className="text-base">
                    {question}
                  </p>
                ))}
              </div>
              <p className="text-red-500">
                Please limit your answers to 500 - 1000 words
              </p>
            </div>
            <div>
              <div
                onFocus={() => {
                  setFieldTouched(`${fieldName}.text`, true),
                    validateField(`${fieldName}.text`);
                }}
                onBlur={() => {
                  validateField(`${fieldName}.text`);
                }}
                className="h-min"
              >
                <Editor
                  defaultValue={values[fieldName]?.text}
                  onChange={(e) => {
                    setFieldValue(`${fieldName}.text`, e);
                    setFieldTouched(`${fieldName}.text`, true);
                  }}
                />
              </div>

              <ErrorMessage
                name={`${fieldName}.text`}
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
                    {values[fieldName]?.filename ? (
                      <div className="flex items-center gap-2 ">
                        {" "}
                        <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                          <div className="flex items-center gap-2">
                            <Image src={pdf} alt="" />
                            <span className="line-clamp-2">
                              {values[fieldName]?.filename}
                            </span>
                          </div>
                          <FileViewer url={values[fieldName]?.fileLocation} />
                        </div>
                        <Trash2
                          size={18}
                          color="red"
                          className="shrink-0"
                          onClick={() => {
                            setFieldValue(`${fieldName}.filename`, "");
                            setFieldValue(`${fieldName}.fileLocation`, "");
                          }}
                        />
                      </div>
                    ) : (
                      <Input
                        value={""}
                        type="file"
                        onFocus={() => {
                          setTimeout(() => {
                            setFieldTouched(`${fieldName}.fileLocation`, true),
                              validateField(`${fieldName}.fileLocation`);
                          }, 3000);
                        }}
                        onBlur={() => {
                          setTimeout(() => {
                            validateField(`${fieldName}.fileLocation`);
                          }, 3000);
                        }}
                        accept="application/pdf"
                        placeholder="Enter Project/Program Name"
                        className="w-full"
                        onChange={async (e) => {
                          const file = await handleFileUpload(e, () => {
                            setFieldTouched(`${fieldName}.fileLocation`, true),
                              validateField(`${fieldName}.fileLocation`);
                          });
                          console.log("file :", file);
                          if (file) {
                            setFieldValue(
                              `${fieldName}.filename`,
                              file?.filename
                            );
                            setFieldValue(
                              `${fieldName}.fileLocation`,
                              file?.location
                            );
                          }
                        }}
                      />
                    )}
                  </div>
                  <ErrorMessage
                    name={`${fieldName}.file`}
                    component="div"
                    className=" text-xs text-red-500 font-semibold"
                  />
                  <p className="text-slate-500 text-sm">
                    File size must not exceed 3MB.{" "}
                  </p>
                </div>
              </div>
              {typeof errors[fieldName] === "string" && (
                <ErrorMessage
                  name={`${fieldName}`}
                  component="div"
                  className=" text-xs text-red-500 font-semibold "
                />
              )}
            </div>
          </div>
        ) : (
          <>
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
                          checked={values.alignmentSDG.target.includes(
                            goal.title
                          )}
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
            <section className="">
              {alignmentPagedetails?.map((item, index) => {
                const fieldName =
                  item.fieldName == "alignmentSDG"
                    ? "alignmentSDG.answer"
                    : item.fieldName;

                return (
                  <div key={index} className="grid lg:grid-cols-2 gap-8 my-10">
                    <div>
                      <div className="space-y-4">
                        {item?.question.map((question, index) => (
                          <p key={index} className="text-base">
                            {question}
                          </p>
                        ))}
                      </div>
                      <p className="text-red-500">
                        Please limit your answers to 500 - 1000 words
                      </p>
                    </div>
                    <div>
                      <div
                        onFocus={() => {
                          setFieldTouched(`${fieldName}.text`, true),
                            validateField(`${fieldName}.text`);
                        }}
                        onBlur={() => {
                          validateField(`${fieldName}`);
                        }}
                        className="h-min"
                      >
                        <Editor
                          defaultValue={
                            item.fieldName == "alignmentSDG"
                              ? values.alignmentSDG.answer.text
                              : values[fieldName]?.text
                          }
                          onChange={(e) => {
                            setFieldValue(`${fieldName}.text`, e);
                            setFieldTouched(`${fieldName}.text`, true);
                          }}
                        />
                      </div>
                      <ErrorMessage
                        name={`${fieldName}.text`}
                        component="div"
                        className=" text-xs text-red-500 font-semibold"
                      />
                      <div className="flex justify-end">
                        <div
                          className={` text-sm ${
                            (item.fieldName == "alignmentSDG"
                              ? count2
                              : count1) > 1000
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        >
                          {item.fieldName == "alignmentSDG" ? count2 : count1}
                          /1000
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 items-center my-4">
                        <p>or Upload File </p>
                        <div>
                          <div className="overflow-hidden">
                            {(
                              item.fieldName != "alignmentSDG"
                                ? values[fieldName]?.filename
                                : values.alignmentSDG?.answer?.filename
                            ) ? (
                              <div className="flex items-center gap-2 ">
                                {" "}
                                <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                                  <div className="flex items-center gap-2">
                                    <Image src={pdf} alt="" />
                                    <span className="line-clamp-2">
                                      {values[fieldName]?.filename ||
                                        values.alignmentSDG?.answer?.filename}
                                    </span>
                                  </div>
                                  <FileViewer
                                    url={
                                      values[fieldName]?.fileLocation ||
                                      values.alignmentSDG?.answer?.fileLocation
                                    }
                                  />
                                </div>
                                <Trash2
                                  size={18}
                                  color="red"
                                  className="shrink-0"
                                  onClick={() => {
                                    setFieldValue(`${fieldName}.filename`, "");
                                    setFieldValue(
                                      `${fieldName}.fileLocation`,
                                      ""
                                    );
                                  }}
                                />
                              </div>
                            ) : (
                              <Input
                                value={""}
                                type="file"
                                onFocus={() => {
                                  setTimeout(() => {
                                    setFieldTouched(
                                      `${fieldName}.fileLocation`,
                                      true
                                    ),
                                      validateField(
                                        `${fieldName}.fileLocation`
                                      );
                                  }, 3000);
                                }}
                                onBlur={() => {
                                  setTimeout(() => {
                                    validateField(`${fieldName}.fileLocation`);
                                  }, 3000);
                                }}
                                accept="application/pdf"
                                placeholder="Enter Project/Program Name"
                                className="w-full"
                                onChange={async (e) => {
                                  const file = await handleFileUpload(e, () => {
                                    setFieldTouched(
                                      `${fieldName}.fileLocation`,
                                      true
                                    ),
                                      validateField(
                                        `${fieldName}.fileLocation`
                                      );
                                  });
                                  if (file) {
                                    setFieldValue(
                                      `${fieldName}.filename`,
                                      file?.filename
                                    );
                                    setFieldValue(
                                      `${fieldName}.fileLocation`,
                                      file?.location
                                    );
                                  }
                                }}
                              />
                            )}
                          </div>
                          <ErrorMessage
                            name={`${fieldName}.file`}
                            component="div"
                            className=" text-xs text-red-500 font-semibold"
                          />
                          <p className="text-slate-500 text-sm">
                            File size must not exceed 3MB.{" "}
                          </p>
                        </div>
                      </div>
                      {typeof errors[fieldName] === "string" && (
                        <ErrorMessage
                          name={`${fieldName}`}
                          component="div"
                          className=" text-xs text-red-500 font-semibold "
                        />
                      )}
                      {item.fieldName == "alignmentSDG" &&
                        typeof (errors?.alignmentSDG as any)?.answer ===
                          "string" && (
                          <ErrorMessage
                            name={"alignmentSDG.answer"}
                            component="div"
                            className="text-xs text-red-500 font-semibold"
                          />
                        )}
                    </div>
                  </div>
                );
              })}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
