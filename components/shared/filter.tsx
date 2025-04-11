import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RotateCcw, Sliders, X } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { AnimatePresence, m } from "motion/react";
import { ScrollArea } from "../ui/scroll-area";
interface IFilter {
  label: string;
  data: any[];
  reset: () => void;
  selectedFilter: string[];
  setSelectedFilter: (value: string) => void;
}
export default function Filter({
  label,
  data,
  reset,
  selectedFilter,
  setSelectedFilter,
}: IFilter) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [categoriesWithSelectAll, setCategoriesWithSelectAll] = React.useState<
    string[]
  >([]);

  return (
    <div className="">
      <Label className="font-semibold text-xs text-slate-500">{label}</Label>
      <m.div
        initial={{ width: "fit-content", opacity: 0.8, paddingRight: 0 }}
        animate={{
          width: selectedFilter.length > 0 ? "auto" : "fit-content",
          opacity: selectedFilter.length > 0 ? 1 : 0.8,
          paddingRight: selectedFilter.length > 0 ? "12px" : "0px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex items-center gap-4"
      >
        <div
          className={`flex gap-1  items-center transition-all duration-300 w-fit text-slate-900 h-[46px] border group text-sm bg-white  rounded-lg ${
            selectedFilter.length > 0 && "pr-3"
          }`}
        >
          <Popover>
            <PopoverTrigger className="size-full px-4 hover:bg-slate-200 transition-colors duration-300">
              <Sliders size={10} className="text-slate-500 max-h-10" />
            </PopoverTrigger>
            <AnimatePresence>
              {Array.isArray(data?.[0]?.options) ? (
                <>
                  {data.map((category) => {
                    const selected = category.options.filter((cat: any) =>
                      selectedFilter.includes(cat)
                    );
                    return (
                      <>
                        {" "}
                        <>
                          {selected.length < 3 ? (
                            selected.map((item: any, index: any) => (
                              <m.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{
                                  duration: 0.2,
                                  ease: "easeInOut",
                                }}
                                className={`${
                                  item == "Graded"
                                    ? "text-teal-600 border-green-300"
                                    : item == "For Review"
                                    ? "text-orange-400 border-orange-300"
                                    : ""
                                } flex gap-1 items-center border p-1 px-1.5 rounded-full text-xs font-medium text-[#6B7280] ml-2`}
                              >
                                <div className="whitespace-nowrap">{item}</div>
                                <div
                                  className={`flex items-center  shrink-0 justify-center bg-[#E5E7EB] cursor-pointer hover:bg-red-400 transition-color duration-200 rounded-full size-3.5 ${
                                    item == "Graded"
                                      ? " bg-green-100 hover:bg-green-400"
                                      : item == "For Review"
                                      ? " bg-orange-100 hover:bg-orange-400"
                                      : ""
                                  }`}
                                >
                                  <X
                                    size={10}
                                    onClick={() => setSelectedFilter(item)}
                                    className={`text-black ${
                                      item == "Graded"
                                        ? " text-green-800"
                                        : item == "For Review"
                                        ? " text-orange-800"
                                        : ""
                                    }`}
                                  />
                                </div>
                              </m.div>
                            ))
                          ) : (
                            <div className="flex gap-1 items-center border p-1 px-1.5 rounded-full text-xs font-medium text-[#6B7280] ml-2">
                              <div className="whitespace-nowrap">
                                {selected.length}{" "}
                                {category.title === "FILTER BY SDGs"
                                  ? "SDGs"
                                  : category.title
                                      .split(" ")
                                      .pop()
                                      .toLowerCase()
                                      .slice(0, 1)
                                      .toUpperCase() +
                                    category.title
                                      .split(" ")
                                      .pop()
                                      .toLowerCase()
                                      .slice(1)}{" "}
                                Selected
                              </div>
                              <div className="flex items-center  shrink-0 justify-center bg-[#E5E7EB] cursor-pointer hover:bg-red-400 transition-color duration-200 rounded-full size-3.5 ">
                                <X
                                  size={10}
                                  onClick={() => {
                                    selected.map((item: any) =>
                                      setSelectedFilter(item)
                                    );
                                    setCategoriesWithSelectAll(
                                      (prevCategories) =>
                                        prevCategories.includes(category?.title)
                                          ? prevCategories.filter(
                                              (item) => item !== category?.title
                                            )
                                          : [...prevCategories, category?.title]
                                    );
                                  }}
                                  className=" text-black "
                                />
                              </div>
                            </div>
                          )}
                        </>
                      </>
                    );
                  })}
                </>
              ) : (
                <>
                  {" "}
                  {selectedFilter.length < 3 ? (
                    selectedFilter.map((item, index) => (
                      <m.div
                        key={item}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="flex gap-1 items-center border p-1 px-1.5 rounded-full text-xs font-medium text-[#6B7280] ml-2"
                      >
                        <div className="whitespace-nowrap">{item}</div>
                        <div className="flex items-center  shrink-0 justify-center bg-[#E5E7EB] cursor-pointer hover:bg-red-400 transition-color duration-200 rounded-full size-3.5 ">
                          <X
                            size={10}
                            onClick={() => setSelectedFilter(item)}
                            className=" text-black "
                          />
                        </div>
                      </m.div>
                    ))
                  ) : (
                    <div className="flex gap-1 items-center border p-1 px-1.5 rounded-full text-xs font-medium text-[#6B7280] ml-2">
                      <div className="whitespace-nowrap">
                        {selectedFilter.length} Roles Selected
                      </div>
                      <div className="flex items-center  shrink-0 justify-center bg-[#E5E7EB] cursor-pointer hover:bg-red-400 transition-color duration-200 rounded-full size-3.5 ">
                        <X
                          size={10}
                          onClick={() => reset()}
                          className=" text-black "
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </AnimatePresence>
            {Array.isArray(data?.[0]?.options) ? (
              <PopoverContent align="start" className=" z-50">
                <ScrollArea className="max-h-[60vh] overflow-scroll">
                  <div className="grid grid-cols-2 size-full">
                    {data.map((section, index) => (
                      <div
                        key={index}
                        className={`${index > 1 && "col-span-2 "}`}
                      >
                        {index > 1 && <hr className="my-6"></hr>}
                        <h3 className="text-xs text-slate-500 font-semibold mb-3">
                          {section.title}
                        </h3>
                        <div
                          className={`grid gap-y-1 ${
                            index > 1
                              ? "grid-flow-col grid-rows-6 gap-x-6 "
                              : "grid-rows-3 grid-flow-col"
                          }`}
                        >
                          <div className="flex items-start space-x-3 ">
                            <Checkbox
                              id={`check${index}`}
                              className="mt-0.5"
                              checked={categoriesWithSelectAll?.includes(
                                section?.title
                              )}
                              onCheckedChange={(e) => {
                                setCategoriesWithSelectAll((prevCategories) =>
                                  prevCategories.includes(section?.title)
                                    ? prevCategories.filter(
                                        (item) => item !== section?.title
                                      )
                                    : [...prevCategories, section?.title]
                                );
                                e
                                  ? section.options.map(
                                      (item: any) =>
                                        item !== "Select All" &&
                                        !selectedFilter.includes(item) &&
                                        setSelectedFilter(item)
                                    )
                                  : section.options.map(
                                      (item: any) =>
                                        item !== "Select All" &&
                                        selectedFilter.includes(item) &&
                                        setSelectedFilter(item)
                                    );
                              }}
                            />
                            <label
                              htmlFor={`check${index}`}
                              className="text-sm hover:text-blue-500 transition-colors font-medium max-w-[200px] cursor-pointer"
                            >
                              Select All
                            </label>
                          </div>
                          {section.options.map((option: any, index: any) => (
                            <React.Fragment key={index}>
                              {option != "Select All" && (
                                <div
                                  key={option}
                                  className="flex hover:text-blue-500 transition-colors items-start space-x-3 "
                                >
                                  <Checkbox
                                    checked={selectedFilter.includes(option)}
                                    onCheckedChange={() =>
                                      setSelectedFilter(option)
                                    }
                                    id={option}
                                    className="mt-0.5"
                                  />
                                  <label
                                    htmlFor={option}
                                    className="text-sm font-medium max-w-[200px] cursor-pointer"
                                  >
                                    {option}
                                  </label>
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </PopoverContent>
            ) : (
              <PopoverContent align="start" className="">
                <ScrollArea className="max-h-[60vh] overflow-scroll">
                  <div className="flex flex-col gap-2">
                    {" "}
                    {data?.map((role, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 hover:text-blue-500  "
                      >
                        {" "}
                        <Checkbox
                          id={role}
                          checked={selectedFilter.includes(role)}
                          onCheckedChange={() => setSelectedFilter(role)}
                          className="mt-0.5"
                        />
                        <label
                          htmlFor={role}
                          className="text-sm   font-medium max-w-[200px] cursor-pointer"
                        >
                          {role}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </PopoverContent>
            )}
          </Popover>
        </div>
        {selectedFilter.length > 0 && (
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() =>
              setTimeout(() => {
                reset();
                setCategoriesWithSelectAll([]);
              }, 200)
            }
            className="rounded-full py-3 hover:bg-red-200 text-sm bg-transparent text-slate-500 px-2"
          >
            Reset <RotateCcw size={9} />
          </Button>
        )}
      </m.div>
    </div>
  );
}
