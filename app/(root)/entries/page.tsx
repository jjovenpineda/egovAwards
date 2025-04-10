/* "use client";

import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import Link from "next/link";
import dayjs from "dayjs";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

import { useSearchParams } from "next/navigation";
import {
  ChevronDown,
  ClipboardCheckIcon,
  Download,
  Eye,
  Lock,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Field, Form, Formik } from "formik";
import { apiGet, apiPut } from "@/utils/api";
import CustomPagination from "@/components/shared/pagination";
import Filter from "@/components/shared/filter";
import { filterChecklist } from "../registrations/page";
import { m } from "motion/react";
import CustomSkeleton from "@/components/shared/custom-skeleton";
export default function Entries() {
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");

  const downloadRef = useRef<HTMLButtonElement>(null);
  const [entriesList, setEntriesList] = useState<any>();
  const [selectedFilter, setSelectedFilter] = useState<any>([]);
  const [quickScoreList, setQuickScoreList] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const getEntryList = async (withLoading: boolean) => {
    withLoading && setIsLoading(true);

    try {
      const res = await apiGet(
        `/api/entry/view?status=${
          filterParams === "All" ? "all" : filterParams
        }&page=${page}&limit=${limit}&order=desc`
      );
      const { data } = res;
      if (!data) return;
      setEntriesList(data);
    } catch (e) {
      console.error("Error fetching entries list:", e);
    } finally {
      withLoading &&
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
    }
  };

  useEffect(() => {
    getEntryList(true);
  }, [page, filterParams]);

  const validationSchema = Yup.object().shape({
    impact: Yup.number()
      .typeError("Must be a number")
      .max(50, "Number must not be above 50"),
    relevance: Yup.number()
      .typeError("Must be a number")
      .max(50, "Number must not be above 50"),
    sustainability: Yup.number()
      .typeError("Must be a number")
      .max(50, "Number must not be above 50"),
    innovation: Yup.number()
      .typeError("Must be a number")
      .max(50, "Number must not be above 50"),
    alignment: Yup.number()
      .typeError("Must be a number")
      .max(50, "Number must not be above 50"),
  });
  return (
    <div className="min-h-screen flex w-full">
      <div className="space-y-2 h-full w-full">
        <h1 className="text-slate-600 font-bold text-2xl uppercase">
          {filterParams}
        </h1>
        <h2 className="text-blue-900 text-base py-4">
          Theme: 11th eGOV Awards: Excellence in Governance Through Information
          and Communications Technology Awards
        </h2>
        {isLoading ? (
          <CustomSkeleton variant="table" />
        ) : (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-2"
          >
            <div className="flex gap-3 pb-4">
              <Popover>
                <PopoverTrigger className="text-slate-900 h-fit border group text-sm  flex items-center gap-2 bg-white p-2 rounded-lg">
                  2025
                  <ChevronDown
                    size={10}
                    className="transition-transform duration-200 group-data-[state=open]:rotate-180"
                  />
                </PopoverTrigger>
                <PopoverContent align="start">
                  Place content for the popover here.
                </PopoverContent>
              </Popover>
              <div className="relative w-full max-w-[350px]">
                {" "}
                <Input
                  type="text"
                  placeholder="Search by reference number or keyword"
                  className="pl-10 "
                />{" "}
                <Search
                  size={15}
                  className="absolute -translate-y-1/2 top-1/2 left-3 text-slate-500"
                />
              </div>
            </div>
            <div className="flex gap-4 items-center mt-1 pb-4">
              <Filter
                label="Filter"
                data={filterChecklist}
                selectedFilter={selectedFilter}
                setSelectedFilter={(data: string) =>
                  setSelectedFilter((currentData: any) =>
                    currentData.includes(data)
                      ? currentData.filter((item: string) => item !== data)
                      : [...currentData, data]
                  )
                }
                reset={() => setSelectedFilter([])}
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  {(() => {
                    const headers =
                      filterParams === "Final"
                        ? [
                            "Application",
                            "LGU",
                            "Project Name",
                            "Category",
                            "Ranking",
                            "Action",
                          ]
                        : [
                            "Application",
                            "LGU",
                            "Project Name",
                            "Category",
                            "Action",
                          ];

                    return headers.map((th, index) => (
                      <TableHead
                        key={index}
                        className={` font-medium ${
                          filterParams === "Final"
                            ? th === "Application"
                              ? "w-[167px]"
                              : th == "LGU"
                              ? "w-[208px]"
                              : th === "Project Name"
                              ? "w-[500px]"
                              : th === "Ranking"
                              ? "w-[0px] text-center"
                              : th == "Category"
                              ? "w-0 text-center"
                              : th == "Action"
                              ? "w-20 text-center"
                              : ""
                            : th === "Application"
                            ? "w-[167px]"
                            : th == "LGU"
                            ? "w-[208px]"
                            : th === "Project Name"
                            ? "w-[500px]"
                            : th == "Category"
                            ? "w-0 text-center"
                            : th == "Action"
                            ? "w-20 text-center"
                            : ""
                        }`}
                      >
                        {th}
                      </TableHead>
                    ));
                  })()}
                </TableRow>
              </TableHeader>
              <TableBody>
                {(() => {
                  const toggleQuickScore = (number: number) => {
                    setQuickScoreList((prev) =>
                      prev.includes(number.toString())
                        ? prev.filter((item) => item !== number.toString())
                        : [...prev, number.toString()]
                    );
                  };

                  return entriesList?.entries.map((item: any, index: any) => (
                    <React.Fragment key={index}>
                      <TableRow
                        key={index}
                        className="border-b-0 hover:bg-transparent"
                      >
                        <TableCell className="font-medium">
                          <div className="">
                            <div className="font-semibold flex gap-1 ">
                              <h2 className="text-slate-900 text-base">
                                {item.refNo}
                              </h2>
                              {item.status != "For Review" && (
                                <div className="flex  font-bold gap-0.5 items-center text-emerald-800">
                                  <ClipboardCheckIcon size={12} />
                                  <h3 className="text-xs">92.10</h3>
                                </div>
                              )}
                            </div>
                            <h3
                              className={`${
                                item.status == "For Review"
                                  ? "text-orange-400"
                                  : "text-emerald-500"
                              } font-bold flex gap-1 items-center whitespace-nowrap`}
                            >
                              {filterParams === "Final" && (
                                <Lock size={12} className="" />
                              )}
                              {item.status} |{" "}
                              {dayjs(item.createdAt).format("MM/DD/YY")}
                            </h3>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-base">
                            <h2 className="text-slate-900 line-clamp-2">
                              {item?.authRepData?.lgu +
                                " " +
                                item?.authRepData?.province}
                            </h2>{" "}
                            <h3 className="line-clamp-1 text-slate-500 ">
                              {item?.authRepData?.region}{" "}
                            </h3>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-base">
                            <h2 className="text-slate-900 line-clamp-2">
                              {item.project}
                            </h2>{" "}
                            <a href="#" className="line-clamp-1 text-blue-400 ">
                              {item.projectURL}
                            </a>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div>
                            <TooltipProvider delayDuration={0}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <h2 className="font-medium text-base text-slate-900 cursor-pointer ">
                                    {item.category}
                                  </h2>
                                </TooltipTrigger>
                                <TooltipContent side="left">
                                  <p>Lorem ipsum dolor sit </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <div className="bg-slate-100 text-[10px]  mx-auto px-2 w-fit rounded-full">
                              {item.alignmentSDG.target.length} SDGs
                            </div>
                          </div>
                        </TableCell>
                        {filterParams === "Final" && (
                          <TableCell className="text-center">
                            <div className="bg-[#CCFBF1] py-1.5 mx-auto px-2.5 w-fit rounded-full">
                              {item.ranking}
                            </div>
                          </TableCell>
                        )}

                        <TableCell className="flex flex-col text-center space-y-1">
                          <Link
                            href={{
                              pathname: "/entries/entry",
                              query: { id: item?._id, filter: filterParams },
                            }}
                            draggable={false}
                            className="bg-[#DBEAFE] h-[24px] whitespace-nowrap hover:bg-[#bcd9ff] w-fit text-xs text-[#1E40AF] px-1.5 rounded-full flex gap-1 items-center p-1"
                          >
                            <Eye size={15} />
                            View Details
                          </Link>
                          <Button
                            onClick={() => toggleQuickScore(index)}
                            variant={"outline"}
                            size={"sm"}
                            className={`${
                              quickScoreList.includes(index.toString())
                                ? "bg-teal-500 hover:bg-teal-500 text-slate-50 hover:text-slate-50"
                                : "bg-[#CCFBF1] hover:bg-[#b0f6e7] text-[#115E59] hover:text-[#115E59]"
                            }      h-[24px] rounded-full w-min px-1.5 p-1`}
                          >
                            <div className="flex gap-1">
                              <ClipboardCheckIcon size={15} />
                              Quickscore
                            </div>
                          </Button>
                          <Button
                            variant={"outline"}
                            size={"sm"}
                            disabled={isDownloading}
                            onClick={() => {
                              if (downloadRef.current) {
                                downloadRef.current.click();
                              }
                            }}
                            className="bg-[#F3F4F6]  h-[24px] hover:bg-[#e3e3e3] text-[#1F2937] p-1 px-1.5 rounded-full w-min "
                          >
                            <div className="flex gap-1">
                              {isDownloading ? (
                                <div className="px-6 h-4">
                                  <Loaders loader={"orbit"} size={25} />
                                </div>
                              ) : (
                                <>
                                  {" "}
                                  <Download size={15} />
                                  Download
                                </>
                              )}
                            </div>
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={6} className="p-0 border-0">
                          <Accordion
                            type="multiple"
                            value={quickScoreList}
                            onValueChange={setQuickScoreList}
                          >
                            <AccordionItem
                              value={index.toString()}
                              className="border-0 "
                            >
                              <Formik
                                initialValues={{
                                  impactAnswer_score:
                                    item?.impactAnswer?.score || 0,
                                  relevanceAnswer_score:
                                    item?.relevanceAnswer?.score || 0,
                                  sustainabilityAnswer_score:
                                    item?.sustainabilityAnswer?.score || 0,
                                  innovationAnswer_score:
                                    item?.innovationAnswer?.score || 0,
                                  alignmentSDG_score:
                                    item?.alignmentSDG?.score || 0,
                                }}
                                validationSchema={validationSchema}
                                onSubmit={async (values, actions) => {
                                  try {
                                    const res = await apiPut(
                                      `/api/entry/cast/scores/${item._id}`,
                                      values
                                    );
                                    const { data } = res;
                                    if (!data) return;
                                  } catch (e) {
                                    console.error("Error updating score:", e);
                                  }
                                  getEntryList(false);
                                }}
                                className="flex gap-16"
                              >
                                {({ values, setFieldValue }) => {
                                  return (
                                    <Form>
                                      <AccordionContent className="flex w-full justify-around items-center bg-green-100 p-6 ">
                                        {Object.keys(values).map(
                                          (item, index) => (
                                            <div
                                              key={index}
                                              className="flex flex-col items-center"
                                            >
                                              <h3 className="text-xs font-medium text-green-900">
                                                {item === "alignment"
                                                  ? " Alignment with Goals"
                                                  : item
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                    item.slice(1)}
                                              </h3>
                                              <div className="flex items-center gap-1">
                                                <Field
                                                  type="text"
                                                  autoComplete="off"
                                                  name={item}
                                                  as={Input}
                                                  onChange={(e: any) => {
                                                    e.target.value =
                                                      e.target.value.replace(
                                                        /\D/g,
                                                        ""
                                                      );
                                                    if (
                                                      e.target.value.length > 2
                                                    ) {
                                                      e.target.value =
                                                        e.target.value.slice(
                                                          0,
                                                          2
                                                        );
                                                    }
                                                    if (
                                                      Number(
                                                        e.target.value > 50
                                                      )
                                                    ) {
                                                      setFieldValue(item, 50);
                                                    } else {
                                                      setFieldValue(
                                                        item,
                                                        Number(e.target.value)
                                                      );
                                                    }
                                                  }}
                                                  className="w-11"
                                                />

                                                <h3 className="text-base font-medium">
                                                  /50
                                                </h3>
                                              </div>
                                            </div>
                                          )
                                        )}

                                        <div className="text-center font-bold">
                                          <h2 className="text-xs text-green-900">
                                            Total
                                          </h2>
                                          <h3 className="text-base">
                                            {Object.values(values).reduce(
                                              (accumulator, currentValue) =>
                                                accumulator + currentValue
                                            )}
                                            /250
                                          </h3>
                                        </div>
                                        <div className="flex gap-2">
                                          {" "}
                                          <Button
                                            type="submit"
                                            className="bg-emerald-500 hover:bg-emerald-400 font-semibold"
                                          >
                                            Save
                                          </Button>
                                          <Button
                                            type="button"
                                            onClick={() =>
                                              toggleQuickScore(index)
                                            }
                                            className="bg-white hover:bg-slate-100 text-emerald-400 hover:text-emerald-700 font-semibold"
                                          >
                                            Cancel
                                          </Button>
                                        </div>
                                      </AccordionContent>
                                    </Form>
                                  );
                                }}
                              </Formik>
                            </AccordionItem>
                          </Accordion>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ));
                })()}
              </TableBody>
            </Table>
            <div className="">
              <div className="flex justify-between items-center text-base font-medium text-[#6B7280]">
                <div>
                  Showing {(page - 1) * limit + 1} to{" "}
                  {entriesList?.pages == page
                    ? entriesList?.totalItems
                    : page * limit}{" "}
                  of {entriesList?.totalItems}{" "}
                  {filterParams == "All" ? "" : filterParams} Entries{" "}
                </div>

                <div>
                  <CustomPagination
                    page={page}
                    setPage={(value: any) => setPage(value)}
                    data={entriesList}
                  />
                </div>
              </div>
            </div>
          </m.div>
        )}
      </div>
      <DownloadEntries
        isLoading={isDownloading}
        setIsLoading={setIsDownloading}
        ref={downloadRef}
      />
    </div>
  );
}
 */
import React from "react";

export default function page() {
  return <div>page</div>;
}
