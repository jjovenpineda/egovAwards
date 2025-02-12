import React from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { File, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
export default function Page2() {
  return (
    <div>
      <section className="space-y-4 pt-6 lg:pt-0">
        <h2 className="font-bold text-lg text-blue-900">ABOUT THE ENTRY</h2>
        <hr className="border border-blue-900"></hr>
      </section>
      <div className="py-6 space-y-4">
        <div>
          <Label className="font-semibold text-sm text-[#1F2937]">
            Project/Program Name
          </Label>
          <Input placeholder="Enter Project/Program Name" />
        </div>
        <div>
          <h2 className="font-semibold py-2 text-sm text-[#1F2937]">
            Choose Category for Project
          </h2>
          <RadioGroup defaultValue="comfortable">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem value={category.value} id={category.id} />
                <Label
                  htmlFor={category.id}
                  className="text-slate-800 text-sm font-medium"
                >
                  {category.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <div className="flex flex-wrap justify-between">
              <Label className="font-semibold text-sm text-[#1F2937]">
                Project Period{" "}
              </Label>
              <p className="text-slate-500 text-sm">
                (*Must be existing for a minimum of one year)
              </p>
            </div>
            <Input placeholder="Enter Project/Program Name" />
          </div>
          <div>
            <Label className="font-semibold text-sm text-[#1F2937]">
              Project URL{" "}
            </Label>
            <Input placeholder="Enter Project/Program Name" />
            <p className="text-slate-500 text-sm">
              Please provide any link for virtual access to the project.
            </p>
          </div>
        </div>
        <div className="space-y-3 py-20">
          <div className="text-sm text-slate-800">
            <h3 className="font-semibold">
              Upload Supporting Documents (Maximum of 5 documents)
            </h3>
            <p className="max-w-md">
              Example of supporting documents: performance ratings, transparency
              reports, competitive analysis, photo documentation, feedback
              reports,
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex w-full gap-2 items-center bg-slate-500 p-2 rounded-md text-sm text-white font-semibold">
              <File size={15} />
              Document A.pdf
            </div>
            <Trash2 size={18} color="red" />
          </div>
          <div>
            <Input type="file" placeholder="Enter Project/Program Name" />
            <p className="text-slate-500 text-sm">
              Files must not exceed 3MB in size.{" "}
            </p>
          </div>
          <Button variant={"primary"} size={"sm"}>
            {" "}
            <Plus />
            Add Document
          </Button>
        </div>
      </div>
    </div>
  );
}
