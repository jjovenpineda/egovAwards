import { Button } from "@/components/ui/button";
import { Copy, DotIcon, Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import ModalWrapper from "./modal-wrapper";
import Page2, { categories } from "./AboutTheEntry";
import Page3 from "./ProjectEvaluationForm";
import Page4 from "./delete/page-4";
import Page5 from "./delete/page-5";
import Page6 from "./delete/page-6";
import Page7 from "./delete/page-7";
import Image from "next/image";
import pdf from "@/public/assets/svgs/pdf.svg";

import { storage } from "@/utils/useStorage";
import FileViewer from "../shared/file-viewer";
import { ErrorMessage, FormikValues, useFormikContext } from "formik";
import ProjectEvaluationForm from "./ProjectEvaluationForm";
import AboutTheEntry from "./AboutTheEntry";
import { useUserStore } from "@/stores/useStores";
import ExpandableText from "../shared/expandable-text";
import { CopyText } from "../shared/copy-text";
export default function Summary() {
  const { values, setFieldValue, errors } = useFormikContext<FormikValues>();
  const userInfo = useUserStore((state: any) => state.userInfo);
  /* const aboutTheLguLabels = [
    { label: "LGU Name", value: "lgu_name" },
    { label: "LGU Abbreviation", value: "lgu_abbr" },
    { label: "Province", value: "lgu_province" },
    { label: "Region", value: "lgu_region" },
    { label: "Name of LCE", value: "lgu_lceName" },
    { label: "Name of Office in LGU", value: "lgu_officeName" },
    { label: "Contact Person", value: "lgu_contactPerson" },
    { label: "Email", value: "lgu_contactPersonEmail" },
    { label: "Mobile Number", value: "lgu_contactPersonMobileNo" },
    { label: "Office Number", value: "lgu_contactPersonOfficeNo" },
    { label: "Facebook Page", value: "lgu_facebook" },
    { label: "Website", value: "lgu_website" },

    {
      label:
        "Number of times in joining eGOV, Digital Cities Awards, Digital Governance Awards from 2012 to 2022",
      value: "joinCount",
    },
  ]; */

  const aboutTheEntryLabels: AboutTheEntryLabel[] = [
    { label: "Project/Program Name", value: "project" },
    { label: "Choose Category for Project", value: "category" },
    { label: "Project Period", value: "projectPeriod" },
    { label: "Project URL", value: "projectURL" },
    { label: "Supporting Documents", value: "supportingDoc" },
  ];

  interface AboutTheEntryDetails {
    projectProgramName: string;
    category: string;
    projectPeriod: string;
    projectURL: string;
    supportingDocuments: string[];
  }
  interface AboutTheEntryLabel {
    label: string;
    value: string;
  }
  const [page1Modal, setPage1Modal] = useState(false);
  const [page2Modal, setPage2Modal] = useState(false);
  const [page3Modal, setPage3Modal] = useState(false);
  const [page4Modal, setPage4Modal] = useState(false);
  const [page5Modal, setPage5Modal] = useState(false);
  const [page6Modal, setPage6Modal] = useState(false);
  const [page7Modal, setPage7Modal] = useState(false);

  return (
    <div className="space-y-14 lg:w-full">
      <section>
        <div className=" space-y-2 pt-6 lg:pt-0">
          <div className="flex flex-col">
            <h2 className="font-bold text-lg text-blue-900">ABOUT THE LGU </h2>
            <p className=" font-medium text-base text-slate-500">
              To update LGU information, please go to Account Settings to do
              changes.
            </p>

            {/*  <ModalWrapper
              isEdit={true}
              isOpen={page1Modal}
              onClose={() => setPage1Modal(false)}
              setFieldValue={setFieldValue}
              values={values}
            ></ModalWrapper> */}
          </div>
          <hr className="p-2 "></hr>
        </div>
        <div className="grid grid-cols-2">
          {/*  */}
          <div className="">
            <h2 className="text-sm font-medium text-gray-900">
              {userInfo?.authRep?.lgu + ", " + userInfo?.authRep?.province}
            </h2>
            <p className="text-slate-600 font-medium text-sm">
              {userInfo?.authRep?.region}
            </p>

            <div className="mt-4">
              <p className="text-slate-500 text-xs">Contact Person</p>
              <h3 className="text-md font-medium text-gray-900">
                {userInfo?.firstname +
                  " " +
                  userInfo?.middlename +
                  " " +
                  userInfo?.lastname}
              </h3>
              <p className="text-gray-700 text-xs">{userInfo?.email}</p>
              <p className="text-gray-700 text-xs">{`+63${userInfo?.mobile}`}</p>
            </div>
          </div>
          {/*  */}
          <div>
            <div className="space-y-2 text-gray-900 text-xs">
              <div className="flex">
                <p className="min-w-48 font-medium">Name of LCE</p>
                <p>
                  :{" "}
                  <span className="text-slate-700">
                    {userInfo?.authRep?.lceName}
                  </span>
                </p>
              </div>
              <div className="flex">
                <p className="min-w-48 font-medium">Name of Office in LGU</p>
                <p>
                  :{" "}
                  <span className="text-slate-700">
                    {userInfo?.authRep?.officeName}
                  </span>
                </p>
              </div>
              <div className="flex py-4">
                <p className="min-w-48 font-medium">Number of Times Joined</p>
                <p>: {userInfo?.authRep?.joinCount}</p>
              </div>
              <div className="flex">
                <p className="min-w-48 font-medium">Office Number</p>
                <p>: {userInfo?.authRep?.officeNo}</p>
              </div>
              <div className="flex">
                <p className="min-w-48 font-medium">Website</p>
                <p className="line-clamp-1">
                  :{" "}
                  <a
                    href="https://www.calabanga.com"
                    className="text-slate-700 hover:underline "
                  >
                    {userInfo?.authRep?.website}
                  </a>
                </p>
              </div>
              <div className="flex">
                <p className="min-w-48 font-medium">Facebook Page</p>
                <p className="line-clamp-1">
                  :{" "}
                  <a
                    href="https://facebook.com/calabanga"
                    className="text-slate-700 hover:underline"
                  >
                    {userInfo?.authRep?.facebook}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className=" space-y-2 pt-6 lg:pt-0">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg text-blue-900">
              ABOUT THE ENTRY{" "}
            </h2>
            <Button
              onClick={() => setPage2Modal(!page2Modal)}
              variant={"primary"}
              className="bg-blue-900"
              size={"sm"}
              type="button"
            >
              <Edit /> Edit
            </Button>
            <ModalWrapper
              isEdit={true}
              isOpen={page2Modal}
              onClose={() => setPage2Modal(false)}
              setFieldValue={setFieldValue}
              values={values}
            >
              <AboutTheEntry />
            </ModalWrapper>
          </div>
          <hr className="p-2 "></hr>
        </div>
        <div className="grid w-full grid-cols-2 text-base md:grid-cols-[_40%,_60%] md:gap-2">
          {aboutTheEntryLabels.map((item, index) => {
            const category = categories.find(
              (cat) => cat.value === values.category
            );
            return (
              <React.Fragment key={index}>
                <div className="flex justify-between">
                  <span
                    className={`${
                      ["supportingDoc", "projectURL"].includes(item.value) &&
                      "mt-4"
                    }`}
                  >
                    {item.label}
                  </span>{" "}
                  {item.value != "supportingDoc" &&
                    item.value != "projectURL" && (
                      <span className="mr-4">:</span>
                    )}
                </div>

                {item.value == "supportingDoc" ? (
                  <div className="mb-2 font-medium text-slate-500 col-span-2">
                    <div className="flex flex-wrap gap-2 w-full ">
                      {values.supportingDoc.length > 0 &&
                        values.supportingDoc.map((item: any, index: any) => {
                          return (
                            <>
                              {item.filename && (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 w-fit"
                                >
                                  {" "}
                                  <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                                    <div className="flex items-center gap-2">
                                      <Image src={pdf} alt="" />
                                      <span className="line-clamp-2">
                                        {item?.filename}
                                      </span>
                                    </div>
                                    <FileViewer url={item?.fileLocation} />
                                  </div>
                                </div>
                              )}
                            </>
                          );
                        })}
                    </div>{" "}
                  </div>
                ) : item.value == "category" ? (
                  <div className="mb-2 font-medium text-slate-500">
                    {category?.label}
                    <ErrorMessage
                      name={item.value}
                      component="div"
                      className=" text-base text-red-500 italic "
                    />
                  </div>
                ) : item.value == "projectURL" ? (
                  <>
                    <ErrorMessage
                      name={item.value}
                      component="div"
                      className=" text-base text-red-500 italic "
                    />
                    <div className="flex gap-4 col-span-2 font-medium text-slate-500">
                      {values[item.value].map((item: any, index: any) => (
                        <div key={index} className="max-w-xs ">
                          <CopyText key={index} text={item} />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="mb-2 font-medium text-slate-500">
                    {values[item.value]}
                    <ErrorMessage
                      name={item.value}
                      component="div"
                      className=" text-base text-red-500 italic "
                    />
                  </div>
                )}
                {/*     {values[item.value]} */}
              </React.Fragment>
            );
          })}
        </div>
      </section>
          
      <section>
        <div className=" space-y-2 pt-6 lg:pt-0">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg text-blue-900">
              IMPACT OF THE PROJECT
            </h2>
            <Button
              onClick={() => setPage3Modal(!page3Modal)}
              variant={"primary"}
              className="bg-blue-900"
              size={"sm"}
              type="button"
            >
              <Edit /> Edit
            </Button>
            <ModalWrapper
              isEdit={true}
              isOpen={page3Modal}
              onClose={() => setPage3Modal(false)}
              setFieldValue={setFieldValue}
              values={values}
            >
              <ProjectEvaluationForm category={"impact"} />
            </ModalWrapper>
          </div>
          <hr className="p-2 "></hr>
        </div>
        <div className="space-y-3">
          <h2 className="text-slate-900 text-base">
            Describe the ways in which the project has enhanced the quality of
            life for residents or increased effectiveness, transparency and
            accountability in local governance? (You may cite several major
            impacts)
          </h2>

          <ExpandableText text={values.impactAnswer.text} lines={5} />

          <div className="mb-2 font-medium text-slate-500 col-span-2">
            <div className="flex flex-wrap gap-2 w-full ">
              {!!values.impactAnswer.filename &&
                (() => {
                  /*  const fileURL = URL.createObjectURL(values.impactAnswer.file); */

                  return (
                    <div className="flex items-center gap-2 w-fit">
                      <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                        <div className="flex items-center gap-2">
                          <Image src={pdf} alt="PDF Icon" />
                          <span className="line-clamp-2">
                            {values.impactAnswer.filename}
                          </span>
                        </div>
                        <FileViewer url={values.impactAnswer.fileLocation} />
                      </div>
                    </div>
                  );
                })()}
            </div>{" "}
            {errors.impactAnswer && typeof errors.impactAnswer === "string" && (
              <ErrorMessage
                name="impactAnswer"
                component="div"
                className=" text-sm text-red-500 font-semibold"
              />
            )}
          </div>
        </div>
      </section>
      <section>
        <div className=" space-y-2 pt-6 lg:pt-0">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg text-blue-900">
              RELEVANCE OF THE PROJECT{" "}
            </h2>
            <Button
              onClick={() => setPage4Modal(!page4Modal)}
              variant={"primary"}
              className="bg-blue-900"
              size={"sm"}
              type="button"
            >
              <Edit /> Edit
            </Button>
            <ModalWrapper
              isEdit={true}
              isOpen={page4Modal}
              onClose={() => setPage4Modal(false)}
              setFieldValue={setFieldValue}
              values={values}
            >
              <ProjectEvaluationForm category={"relevance"} />
            </ModalWrapper>
          </div>
          <hr className="p-2 "></hr>
        </div>
        <div className="space-y-3">
          <h2 className="text-slate-900 text-base">
            Describe the specific problem or challenge in your local government
            unit was the project designed to address.
          </h2>
          <h2 className="text-slate-900 text-base">
            How does the project directly address and mitigate the identified
            problem or challenge?
          </h2>
          <h2 className="text-slate-900 text-base">
            What measurable improvements or outcomes have been observed since
            the implementation of the project in relation to the problem it aims
            to solve?
          </h2>

          <ExpandableText text={values.relevanceAnswer.text} lines={5} />

          <div className="mb-2 font-medium text-slate-500 col-span-2">
            <div className="flex flex-wrap gap-2 w-full ">
              {!!values.relevanceAnswer.filename &&
                (() => {
                  /*  const fileURL = URL.createObjectURL(values.relevanceAnswer.file); */
                  const fileURL = "";

                  return (
                    <div className="flex items-center gap-2 w-fit">
                      <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                        <div className="flex items-center gap-2">
                          <Image src={pdf} alt="PDF Icon" />
                          <span className="line-clamp-2">
                            {values.relevanceAnswer.filename}
                          </span>
                        </div>
                        <FileViewer url={values.relevanceAnswer.fileLocation} />
                      </div>
                    </div>
                  );
                })()}
            </div>{" "}
            {errors.relevanceAnswer &&
              typeof errors.relevanceAnswer === "string" && (
                <ErrorMessage
                  name="relevanceAnswer"
                  component="div"
                  className=" text-sm text-red-500 font-semibold"
                />
              )}
          </div>
        </div>
      </section>
      <section>
        <div className=" space-y-2 pt-6 lg:pt-0">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg text-blue-900">
              SUSTAINABILITY AND REPLICABILITY OF THE PROJECT{" "}
            </h2>
            <Button
              onClick={() => setPage5Modal(!page5Modal)}
              variant={"primary"}
              className="bg-blue-900"
              size={"sm"}
              type="button"
            >
              <Edit /> Edit
            </Button>
            <ModalWrapper
              isEdit={true}
              isOpen={page5Modal}
              onClose={() => setPage5Modal(false)}
              setFieldValue={setFieldValue}
              values={values}
            >
              <ProjectEvaluationForm category={"sustainability"} />
            </ModalWrapper>
          </div>
          <hr className="p-2 "></hr>
        </div>
        <div className="space-y-3">
          <h2 className="text-slate-900 text-base">
            Describe the specific problem or challenge in your local government
            unit was the project designed to address.
          </h2>
          <h2 className="text-slate-900 text-base">
            How does the project directly address and mitigate the identified
            problem or challenge?
          </h2>
          <h2 className="text-slate-900 text-base">
            What measurable improvements or outcomes have been observed since
            the implementation of the project in relation to the problem it aims
            to solve?
          </h2>

          <ExpandableText text={values.sustainabilityAnswer.text} lines={5} />

          <div className="mb-2 font-medium text-slate-500 col-span-2">
            <div className="flex flex-wrap gap-2 w-full ">
              {!!values.sustainabilityAnswer.filename &&
                (() => {
                  /*  const fileURL = URL.createObjectURL(values.sustainabilityAnswer.file); */
                  const fileURL = "";

                  return (
                    <div className="flex items-center gap-2 w-fit">
                      <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                        <div className="flex items-center gap-2">
                          <Image src={pdf} alt="PDF Icon" />
                          <span className="line-clamp-2">
                            {values.sustainabilityAnswer.filename}
                          </span>
                        </div>
                        <FileViewer
                          url={values.sustainabilityAnswer.fileLocation}
                        />
                      </div>
                    </div>
                  );
                })()}
            </div>{" "}
            {errors.sustainabilityAnswer &&
              typeof errors.sustainabilityAnswer === "string" && (
                <ErrorMessage
                  name="sustainabilityAnswer"
                  component="div"
                  className=" text-sm text-red-500 font-semibold"
                />
              )}
          </div>
        </div>
      </section>
      <section>
        <div className=" space-y-2 pt-6 lg:pt-0">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg text-blue-900">
              INNOVATION ASPECT OF THE PROJECT
            </h2>
            <Button
              onClick={() => setPage6Modal(!page6Modal)}
              variant={"primary"}
              className="bg-blue-900"
              size={"sm"}
              type="button"
            >
              <Edit /> Edit
            </Button>
            <ModalWrapper
              isEdit={true}
              isOpen={page6Modal}
              onClose={() => setPage6Modal(false)}
              setFieldValue={setFieldValue}
              values={values}
            >
              <ProjectEvaluationForm category={"innovation"} />
            </ModalWrapper>
          </div>
          <hr className="p-2 "></hr>
        </div>
        <div className="space-y-3">
          <h2 className="text-slate-900 text-base">
            How has the innovation in your project improved service delivery and
            operational efficiency within your local government unit?
          </h2>
          <h2 className="text-slate-900 text-base">
            What specific technological advancements or digital solutions were
            implemented in your project, and how have they contributed to
            addressing the problems?
          </h2>

          <ExpandableText text={values.innovationAnswer.text} lines={5} />

          <div className="mb-2 font-medium text-slate-500 col-span-2">
            <div className="flex flex-wrap gap-2 w-full ">
              {!!values.innovationAnswer.filename &&
                (() => {
                  /*  const fileURL = URL.createObjectURL(values.innovationAnswer.file); */
                  const fileURL = "";

                  return (
                    <div className="flex items-center gap-2 w-fit">
                      <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                        <div className="flex items-center gap-2">
                          <Image src={pdf} alt="PDF Icon" />
                          <span className="line-clamp-2">
                            {values.innovationAnswer.filename}
                          </span>
                        </div>
                        <FileViewer
                          url={values.innovationAnswer.fileLocation}
                        />
                      </div>
                    </div>
                  );
                })()}
            </div>{" "}
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
      </section>
      <section>
        <div className=" space-y-2 pt-6 lg:pt-0">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg text-blue-900">
              ALIGNMENT WITH GOALS
            </h2>
            <Button
              onClick={() => setPage7Modal(!page7Modal)}
              variant={"primary"}
              className="bg-blue-900"
              size={"sm"}
              type="button"
            >
              <Edit /> Edit
            </Button>
            <ModalWrapper
              isEdit={true}
              isOpen={page7Modal}
              onClose={() => setPage7Modal(false)}
              setFieldValue={setFieldValue}
              values={values}
            >
              <ProjectEvaluationForm category={"alignment"} />
            </ModalWrapper>
          </div>
          <hr className="p-2 "></hr>
        </div>
        <div className="space-y-6">
          <div className="my-4">
            <p className=" font-semibold text-base text-slate-900">
              Sustainable Development Goals (SDGs) that your project focuses on.
            </p>
            <ul className=" flex flex-wrap gap-2 text-slate-600">
              {values.alignmentSDG.target.map((goal: any, index: any) => (
                <li
                  key={index}
                  className="flex whitespace-nowrap bg-[#F3F4F6] px-2 rounded-full "
                >
                  <DotIcon /> {goal}
                </li>
              ))}
            </ul>
            <ErrorMessage
              name="alignmentSDG.target"
              component="div"
              className=" text-base text-red-500 italic "
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-slate-900 text-base">
              Describe how it aligns with 1 or 2 SDGs. (Which specific SDGs does
              the project primarily target, and why?
            </h2>
            <h2 className="text-slate-900 text-base">
              How does the project's focus on these SDGs address local or global
              challenges?
            </h2>
            <h2 className="text-slate-900 text-base">
              What measurable outcomes are expected from the project in relation
              to the selected SDGs?
            </h2>
            <h2 className="text-slate-900 text-base">
              Can you provide examples of how the project contributes to the
              economic, social, or environmental aspects of the chosen SDGs?){" "}
            </h2>

            <ExpandableText text={values.alignmentSDG.answer.text} lines={5} />

            <div className="mb-2 font-medium text-slate-500 col-span-2">
              <div className="flex flex-wrap gap-2 w-full ">
                {!!values.alignmentSDG.answer.filename &&
                  (() => {
                    /*  const fileURL = URL.createObjectURL(values.alignmentSDG.file); */
                    const fileURL = "";

                    return (
                      <div className="flex items-center gap-2 w-fit">
                        <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                          <div className="flex items-center gap-2">
                            <Image src={pdf} alt="PDF Icon" />
                            <span className="line-clamp-2">
                              {values.alignmentSDG.answer.filename}
                            </span>
                          </div>
                          <FileViewer
                            url={values.alignmentSDG.answer.fileLocation}
                          />
                        </div>
                      </div>
                    );
                  })()}
              </div>{" "}
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
          </div>

          <div className="space-y-2">
            <h2 className="text-slate-900 text-base">
              Describe how the project aligns with or supports the mandate and
              programs of the Department of Information and Communications
              Technology (DICT).
            </h2>

            <ExpandableText text={values.alignmentAnswerDICT.text} lines={5} />

            <div className="mb-2 font-medium text-slate-500 col-span-2">
              <div className="flex flex-wrap gap-2 w-full ">
                {!!values.alignmentAnswerDICT.filename &&
                  (() => {
                    /*  const fileURL = URL.createObjectURL(values.alignmentAnswerDICT.file); */

                    return (
                      <div className="flex items-center gap-2 w-fit">
                        <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                          <div className="flex items-center gap-2">
                            <Image src={pdf} alt="PDF Icon" />
                            <span className="line-clamp-2">
                              {values.alignmentAnswerDICT.filename}
                            </span>
                          </div>
                          <FileViewer
                            url={values.alignmentAnswerDICT.fileLocation}
                          />
                        </div>
                      </div>
                    );
                  })()}
              </div>{" "}
              {errors.alignmentAnswerDICT &&
                typeof errors.alignmentAnswerDICT === "string" && (
                  <ErrorMessage
                    name="alignmentAnswerDICT"
                    component="div"
                    className=" text-sm text-red-500 font-semibold"
                  />
                )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
