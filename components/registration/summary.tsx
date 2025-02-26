import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import Page1 from "./page-1";
import ModalWrapper from "./modal-wrapper";
import Page2, { categories } from "./page-2";
import Page3 from "./page-3";
import Page4 from "./page-4";
import Page5 from "./page-5";
import Page6 from "./page-6";
import Page7 from "./page-7";
import Image from "next/image";
import pdf from "@/public/assets/svgs/pdf.svg";

import { storage } from "@/utils/useStorage";
import { PSGC } from "@/constants";
import FileViewer from "../shared/file-viewer";
import { ErrorMessage, FormikValues, useFormikContext } from "formik";

export default function Summary() {
  const { values, setFieldValue } = useFormikContext<FormikValues>();
  const aboutTheLguLabels = [
    { label: "LGU Name", value: "lgu" },
    { label: "LGU Abbreviation", value: "lgu" },
    { label: "Province", value: "province" },
    { label: "Region", value: "region" },
    { label: "Name of LCE", value: "nameOfLCE" },
    { label: "Name of Office in LGU", value: "nameOfOffice" },
    { label: "Contact Person", value: "contactPerson" },
    { label: "Email", value: "email" },
    { label: "Mobile Number", value: "mobileNumber" },
    { label: "Office Number", value: "officeNumber" },
    { label: "Facebook Page", value: "facebookPage" },
    { label: "Website", value: "website" },

    {
      label:
        "Number of times in joining eGOV, Digital Cities Awards, Digital Governance Awards from 2012 to 2022",
      value: "egovAwardsCount",
    },
  ];

  const aboutTheEntryLabels: AboutTheEntryLabel[] = [
    { label: "Project/Program Name", value: "projectName" },
    { label: "Choose Category for Project", value: "projectCategory" },
    { label: "Project Period", value: "projectPeriod" },
    { label: "Project URL", value: "projectURL" },
    { label: "Supporting Documents", value: "documents" },
  ];

  interface AboutTheEntryDetails {
    projectProgramName: string;
    projectCategory: string;
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
    <div className="space-y-14 lg:w-3/4">
      {/*    <section className="space-y-8">
        <div className="space-y-3">
          <p className="text-[#1E3A8A] text-base">
            <strong>11th eGOV Awards:</strong> Excellence in Governance Through
            Information and Communications Technology Awards Application Form
          </p>
          <h1 className="font-bold text-3xl texxt-slate-900">
            Registration Form
          </h1>
          <p className="text-[#CC3535] text-base py-2">
            Please review if all information are correct and accurate before you
            submit.
          </p>
        </div>
      </section> */}
      <section>
        <div className=" space-y-2 pt-6 lg:pt-0">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg text-blue-900">ABOUT THE LGU </h2>
            <Button
              type="button"
              onClick={() => setPage1Modal(!page1Modal)}
              variant={"primary"}
              className="bg-blue-900"
              size={"sm"}
            >
              <Edit /> Edit
            </Button>

            <ModalWrapper
              isEdit={true}
              isOpen={page1Modal}
              onClose={() => setPage1Modal(false)}
              setFieldValue={setFieldValue}
              values={values}
            >
              <Page1 />
            </ModalWrapper>
          </div>
          <hr className="p-2 "></hr>
        </div>
        <div className="grid text-base w-full grid-cols-2 md:grid-cols-[_40%,_60%] md:gap-2">
          {aboutTheLguLabels.map((item, index) => {
            const region = PSGC.regions.find((region) =>
              values.lgu.startsWith(region.id)
            );
            const province = PSGC.regions
              .find((region) => values.lgu.startsWith(region.id))
              ?.provinces.find((province) =>
                values.lgu.startsWith(province.id)
              );
            const lgu = PSGC.regions
              .find((region) => values.lgu.startsWith(region.id))
              ?.provinces.find((province) => values.lgu.startsWith(province.id))
              ?.lgus.find((lgu) => lgu.id === values.lgu);

            return (
              <React.Fragment key={index}>
                <div className="flex justify-between">
                  {item.label} <span className="mr-4">:</span>
                </div>
                <div>
                  <div className=" font-medium text-slate-500">
                    {item.value == "region"
                      ? region?.name
                      : item.value == "province"
                      ? province?.name
                      : item.value == "lgu"
                      ? lgu?.name
                      : values[item.value]}
                  </div>
                  <ErrorMessage
                    name={item.value}
                    component="div"
                    className=" text-base text-red-500 italic "
                  />
                </div>
              </React.Fragment>
            );
          })}
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
              <Page2 />
            </ModalWrapper>
          </div>
          <hr className="p-2 "></hr>
        </div>
        <div className="grid w-full grid-cols-2 text-base md:grid-cols-[_40%,_60%] md:gap-2">
          {aboutTheEntryLabels.map((item, index) => {
            const category = categories.find(
              (cat) => cat.value === values.projectCategory
            );
            return (
              <React.Fragment key={index}>
                <div className="flex justify-between">
                  {item.label}{" "}
                  {item.value != "documents" && <span className="mr-4">:</span>}
                </div>

                {item.value == "documents" ? (
                  <div className="mb-2 font-medium text-slate-500 col-span-2">
                    <div className="flex flex-wrap gap-2 w-full ">
                      {values.documents.length > 0 &&
                        values.documents.map((item: any, index: any) => {
                          const fileURL =
                            item.name && URL.createObjectURL(item);
                          return (
                            <>
                              {item.name != "" && item.name != undefined && (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 w-fit"
                                >
                                  {" "}
                                  <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                                    <div className="flex items-center gap-2">
                                      <Image src={pdf} alt="" />
                                      {item.name}
                                    </div>
                                    <FileViewer url={fileURL} />
                                  </div>
                                </div>
                              )}
                            </>
                          );
                        })}
                    </div>{" "}
                  </div>
                ) : item.value == "projectCategory" ? (
                  <div className="mb-2 font-medium text-slate-500">
                    {category?.label}
                    <ErrorMessage
                      name={item.value}
                      component="div"
                      className=" text-base text-red-500 italic "
                    />
                  </div>
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
              <Page3 />
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
          <p
            className="text-slate-500 text-base font-light leading-normal line-clamp-6"
            dangerouslySetInnerHTML={{ __html: values.impactText }}
          />
          <div className="mb-2 font-medium text-slate-500 col-span-2">
            <div className="flex flex-wrap gap-2 w-full ">
              {values.impactFile &&
                values.impactFile.name &&
                (() => {
                  const fileURL = URL.createObjectURL(values.impactFile);

                  return (
                    <div className="flex items-center gap-2 w-fit">
                      <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                        <div className="flex items-center gap-2">
                          <Image src={pdf} alt="PDF Icon" />
                          {values.impactFile.name}
                        </div>
                        <FileViewer url={fileURL} />
                      </div>
                    </div>
                  );
                })()}
            </div>{" "}
            <ErrorMessage
              name="impactCheck"
              component="div"
              className=" text-base text-red-500 italic "
            />
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
              <Page4 />
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
          <p
            className="text-slate-500 text-base font-light leading-normal line-clamp-6"
            dangerouslySetInnerHTML={{ __html: values.relevanceText }}
          />
          <div className="mb-2 font-medium text-slate-500 col-span-2">
            <div className="flex flex-wrap gap-2 w-full ">
              {values.relevanceFile &&
                values.relevanceFile.name &&
                (() => {
                  const fileURL = URL.createObjectURL(values.relevanceFile);

                  return (
                    <div className="flex items-center gap-2 w-fit">
                      <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                        <div className="flex items-center gap-2">
                          <Image src={pdf} alt="PDF Icon" />
                          {values.relevanceFile.name}
                        </div>
                        <FileViewer url={fileURL} />
                      </div>
                    </div>
                  );
                })()}
            </div>{" "}
            <ErrorMessage
              name="relevanceCheck"
              component="div"
              className=" text-base text-red-500 italic "
            />
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
              <Page5 />
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
          <p
            className="text-slate-500 text-base font-light leading-normal line-clamp-6"
            dangerouslySetInnerHTML={{ __html: values.sustainabilityText }}
          />
          <div className="mb-2 font-medium text-slate-500 col-span-2">
            <div className="flex flex-wrap gap-2 w-full ">
              {values.sustainabilityFile &&
                values.sustainabilityFile.name &&
                (() => {
                  const fileURL = URL.createObjectURL(
                    values.sustainabilityFile
                  );

                  return (
                    <div className="flex items-center gap-2 w-fit">
                      <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                        <div className="flex items-center gap-2">
                          <Image src={pdf} alt="PDF Icon" />
                          {values.sustainabilityFile.name}
                        </div>
                        <FileViewer url={fileURL} />
                      </div>
                    </div>
                  );
                })()}
            </div>
            <ErrorMessage
              name="sustainabilityCheck"
              component="div"
              className=" text-base text-red-500 italic "
            />
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
              <Page6 />
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

          <p
            className="text-slate-500 text-base font-light leading-normal line-clamp-6"
            dangerouslySetInnerHTML={{ __html: values.innovationText }}
          />
          <div className="mb-2 font-medium text-slate-500 col-span-2">
            <div className="flex flex-wrap gap-2 w-full ">
              {values.innovationFile &&
                values.innovationFile.name &&
                (() => {
                  const fileURL = URL.createObjectURL(values.innovationFile);

                  return (
                    <div className="flex items-center gap-2 w-fit">
                      <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                        <div className="flex items-center gap-2">
                          <Image src={pdf} alt="PDF Icon" />
                          {values.innovationFile.name}
                        </div>
                        <FileViewer url={fileURL} />
                      </div>
                    </div>
                  );
                })()}
            </div>{" "}
            <ErrorMessage
              name="innovationCheck"
              component="div"
              className=" text-base text-red-500 italic "
            />
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
              <Page7 />
            </ModalWrapper>
          </div>
          <hr className="p-2 "></hr>
        </div>
        <div className="space-y-6">
          <div className="my-4">
            <p className=" font-semibold text-base text-slate-900">
              Sustainable Development Goals (SDGs) that your project focuses on.
            </p>
            <ul className="list-disc list-inside ml-2 text-slate-600">
              {values.goals.map((goal: any, index: any) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
            <ErrorMessage
              name="goals"
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

            <p
              className="text-slate-500 text-base font-light leading-normal line-clamp-6"
              dangerouslySetInnerHTML={{ __html: values.goalText1 }}
            />
            <div className="mb-2 font-medium text-slate-500 col-span-2">
              <div className="flex flex-wrap gap-2 w-full ">
                {values.goalFile1 &&
                  values.goalFile1.name &&
                  (() => {
                    const fileURL = URL.createObjectURL(values.goalFile1);

                    return (
                      <div className="flex items-center gap-2 w-fit">
                        <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                          <div className="flex items-center gap-2">
                            <Image src={pdf} alt="PDF Icon" />
                            {values.goalFile1.name}
                          </div>
                          <FileViewer url={fileURL} />
                        </div>
                      </div>
                    );
                  })()}
              </div>{" "}
              <ErrorMessage
                name="goal1Check"
                component="div"
                className=" text-base text-red-500 italic "
              />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-slate-900 text-base">
              Describe how the project aligns with or supports the mandate and
              programs of the Department of Information and Communications
              Technology (DICT).
            </h2>

            <p
              className="text-slate-500 text-base font-light leading-normal line-clamp-6"
              dangerouslySetInnerHTML={{ __html: values.goalText2 }}
            />
            <div className="mb-2 font-medium text-slate-500 col-span-2">
              <div className="flex flex-wrap gap-2 w-full ">
                {values.goalFile2 &&
                  values.goalFile2.name &&
                  (() => {
                    const fileURL = URL.createObjectURL(values.goalFile2);

                    return (
                      <div className="flex items-center gap-2 w-fit">
                        <div className="flex justify-between w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
                          <div className="flex items-center gap-2">
                            <Image src={pdf} alt="PDF Icon" />
                            {values.goalFile2.name}
                          </div>
                          <FileViewer url={fileURL} />
                        </div>
                      </div>
                    );
                  })()}
              </div>{" "}
              <ErrorMessage
                name="goal2Check"
                component="div"
                className=" text-base text-red-500 italic "
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
