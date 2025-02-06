"use client";

import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  /*   CardFooter,
   */ CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { m } from "motion/react";
import { storage } from "@/utils/useStorage";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
export default function Home() {
  const [hasAnimated, setHasAnimated] = useState(
    JSON.parse(storage.getItem("hasAnimated") || "false")
  );

  useEffect(() => {
    storage.setItem("hasAnimated", JSON.stringify(hasAnimated));
  }, [hasAnimated]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      storage.removeItem("hasAnimated");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <div className="min-h-screen flex w-full px-8 py-4 ">
      <m.div
        initial={!hasAnimated && { y: 100, opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onAnimationComplete={() => setHasAnimated(true)}
        className="space-y-2 h-full w-full"
      >
        <h1 className="main-title">Home</h1>{" "}
        <Card>
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Name of your project" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Framework</Label>
                  <Select>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="sveltekit">SvelteKit</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </m.div>
    </div>
  );
}
const regions = [
  "National Capital Region (NCR)",
  "Ilocos Region (Region I)",
  "Cagayan Valley (Region II)",
  "Central Luzon (Region III)",
  "CALABARZON (Region IV-A)",
  "MIMAROPA (Region IV-B)",
  "Bicol Region (Region V)",
  "Western Visayas (Region VI)",
  "Central Visayas (Region VII)",
  "Eastern Visayas (Region VIII)",
  "Zamboanga Peninsula (Region IX)",
  "Northern Mindanao (Region X)",
  "Davao Region (Region XI)",
  "SOCCSKSARGEN (Region XII)",
  "Caraga (Region XIII)",
  "BARMM (Bangsamoro Autonomous Region in Muslim Mindanao)",
  "Cordillera Administrative Region (CAR)",
];

const headers = [
  { item: "region" },
  { item: "province" },
  { item: "municipality/Zip code" },
  { item: "barangay" },
];

const Column = ({
  title,
  data,
  className,
}: {
  title: string;
  data: any;
  className: string;
}) => {
  return (
    <div className={`w-full ${className}`}>
      <h2 className="text-base py-4 font-bold text-blue-800 uppercase text-center">
        {title}
      </h2>
      <ScrollArea className="h-[75vh] w-full">
        <ul>
          {data.map((item: any, index: number) => (
            <li
              key={index}
              className="hover:bg-slate-200 rounded-sm cursor-pointer px-2 mx-2 text-base text-slate-700 "
            >
              {item}
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};
