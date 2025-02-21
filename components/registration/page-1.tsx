import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import ph from "@/public/assets/svgs/ph.svg";
import fb from "@/public/assets/svgs/fb.svg";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Globe, Mail, Phone } from "lucide-react";
import ModalWrapper from "./modal-wrapper";
import { Button } from "@/components/ui/button";
import { PSGC } from "@/constants";
export default function Page1() {
  return (
    <div>
      <section className="space-y-2 pt-6 lg:pt-0">
        <h2 className="font-bold text-lg text-blue-900">ABOUT THE LGU</h2>
        <hr className="border border-blue-900"></hr>
      </section>
      <div className="space-y-10 lg:space-y-16 py-6">
        <section className="grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-4 gap-2">
          <div className="lg:col-span-2 lg:w-1/2 lg:pr-4 ">
            <Label className="text-sm font-semibold text-slate-900">LGU</Label>
            <Select>
              <SelectTrigger className="h-[46px]">
                <SelectValue placeholder="Select LGU" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {PSGC.regions.map((region, index) => (
                    <SelectItem key={index} value={region.id}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="font-semibold text-sm text-[#1F2937]">
              Region
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select LGU" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="font-semibold text-sm text-[#1F2937]">
              Province
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select LGU" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="font-semibold text-sm text-[#1F2937]">
              Name of LCE
            </Label>
            <Input placeholder="Enter Name of LCE" />
          </div>
          <div>
            <Label className="font-semibold text-sm text-[#1F2937]">
              Name of Office in LGU
            </Label>
            <Input placeholder="Enter Name of LCE" />
          </div>
        </section>
        <section className="grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-4 gap-2">
          <div>
            <Label className="font-semibold text-sm text-[#1F2937]">
              Contact Person
            </Label>
            <Input placeholder="Enter Contact Person" />
          </div>
          <div>
            <Label className="font-semibold text-sm text-[#1F2937]">
              Email
            </Label>
            <div className="relative">
              <Input placeholder="Enter Email" className="pl-9" />
              <Mail
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>
          <div>
            <Label className="font-semibold text-sm text-[#1F2937]">
              Office Number
            </Label>
            <div className="relative">
              <Input placeholder="(02) 000 000" className="pl-9" />
              <Phone
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>
          <div>
            <Label className="font-semibold text-sm text-[#1F2937]">
              Mobile Number
            </Label>
            <div className="relative">
              <Input placeholder="9876543210" className="pl-[70px]" />
              <span className="absolute left-10 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                +63
              </span>
              <Image
                src={ph}
                alt=""
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>
        </section>
        <section className="grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-4 gap-2">
          <div>
            <Label className="font-semibold text-sm text-[#1F2937]">
              Website
            </Label>
            <div className="relative">
              <Input placeholder="Enter Website" className="pl-9" />
              <Globe
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>

          <div>
            <Label className="font-semibold text-sm text-[#1F2937]">
              Facebook Page
            </Label>
            <div className="relative">
              <Input placeholder="Enter Website" className="pl-9" />
              <Image
                src={fb}
                alt=""
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>
        </section>
        <div className="lg:w-1/2 lg:pr-4">
          <p className="font-semibold text-sm text-[#1F2937]">
            Number of times in joining eGOV, Digital Cities Awards, Digital
            Governance Awards from 2012 to 2022.{" "}
          </p>

          <Input placeholder="Enter times in joining eGOV, DCA, DGA" />
        </div>
      </div>
    </div>
  );
}

const lgus = [
  {
    name: "Quezon City",
    region: "National Capital Region",
    province: "Metro Manila",
    type: "Highly Urbanized City",
  },
  {
    name: "Cebu City",
    region: "Region VII - Central Visayas",
    province: "Cebu",
    type: "Highly Urbanized City",
  },
  {
    name: "Davao City",
    region: "Region XI - Davao Region",
    province: "Davao del Sur",
    type: "Highly Urbanized City",
  },
];
