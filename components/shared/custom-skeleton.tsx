import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
interface IVariants {
  variant: "table" | "dashboard" | "card";
}
export default function CustomSkeleton({ variant }: IVariants) {
  return (
    <>
      {variant == "table" && (
        <div className="w-full overflow-x-auto ">
          <div className="flex justify-between gap-4">
            <div className="flex gap-2 w-[300px] mb-4">
              <Skeleton className="h-10 w-full flex-1" />{" "}
              <Skeleton className="h-10 w-full flex-[2]" />
            </div>{" "}
            <div>
              <Skeleton className="h-10 w-32 flex-1" />{" "}
            </div>
          </div>
          <div className="w-full border border-gray-200 animate-pulse rounded-lg overflow-hidden">
            <div className="bg-slate-200 flex border-b">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={`p-4 text-left border-r last:border-r-0 ${
                    index === 2 ? "flex-[2]" : "flex-1"
                  }`}
                >
                  <div className="h-2 bg-slate-300 rounded" />
                </div>
              ))}
            </div>

            {Array.from({ length: 10 }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex border-b last:border-b-0">
                {Array.from({ length: 4 }).map((_, colIndex) => (
                  <div
                    key={colIndex}
                    className={`p-3 py-6  last:border-r-0 ${
                      colIndex === 2 ? "flex-[2]" : "flex-1"
                    }`}
                  >
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
      {variant == "dashboard" && (
        <div className="w-full overflow-x-auto">
          <div className="min-h-screen py-4 flex flex-col items-center bg-gray-100">
            <main className="flex-1 flex flex-col items-center w-full px-4 sm:px-6 lg:px-8 ">
              <section className="w-full mb-8">
                <div className="flex justify-between gap-2 mb-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                      key={`header-top-${index}`}
                      className="w-full h-20  rounded-lg"
                    />
                  ))}
                </div>
                <div className="flex gap-4 mt-4 justify-between">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                      key={`header-bottom-${index}`}
                      className={`w-full h-14  rounded-lg ${
                        index == 3 ? "flex-[2]" : "flex-1"
                      }`}
                    />
                  ))}
                </div>
              </section>

              <section className="w-full grid grid-cols-2 gap-4">
                <div className="w-full">
                  <Skeleton className="w-full h-full rounded-lg" />
                </div>
                <div className="w-full  flex flex-col gap-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                      key={`content-right-${index}`}
                      className="w-full h-24  rounded-lg"
                    />
                  ))}
                </div>
              </section>
            </main>
          </div>
        </div>
      )}
      {variant == "card" && (
        <div className="w-full overflow-x-auto space-y-10 ">
          <div className="space-y-6">
            <Skeleton className="h-32 w-[80%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-32 w-[80%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-32 w-[60%]" />
            <Skeleton className="h-4 w-[60%]" />
            <Skeleton className="h-4 w-[40%]" />
          </div>
        </div>
      )}
    </>
  );
}
