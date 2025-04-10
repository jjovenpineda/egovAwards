import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
interface IPagination {
  page: number;
  setPage: (page: number) => void;
  data: any;
}
export default function CustomPagination({ page, setPage, data }: IPagination) {
  if (data?.pages < 2) return null; // Hide pagination if only one page exists

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= data?.pages) {
      setPage(newPage);
    }
  };
  return (
    <Pagination className="text-slate-500">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(page - 1)}
            className={`hover:cursor-pointer hover:bg-slate-200 rounded-md mr-2 active:bg-slate-300 ${
              page === 1
                ? "opacity-50 cursor-not-allowed pointer-events-none"
                : ""
            }`}
          />
        </PaginationItem>

        {/* First Page */}
        <PaginationItem>
          <PaginationLink
            className={`hover:cursor-pointer hover:bg-slate-200 rounded-md active:bg-slate-300 ${
              page === 1 ? "bg-slate-200" : ""
            }`}
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {/* Ellipsis before middle pages */}
        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis className="hover:bg-slate-200 p-1 rounded-md" />
          </PaginationItem>
        )}

        {Array.from({ length: data?.pages }, (_, i) => i + 1)
          .filter(
            (item) =>
              item >= Math.max(2, page - 1) &&
              item <= Math.min(page + 1, data?.pages - 1)
          )
          .map((item) => (
            <PaginationItem key={item}>
              <PaginationLink
                className={`hover:cursor-pointer hover:bg-slate-200 rounded-md active:bg-slate-300 ${
                  page === item ? "bg-slate-200" : ""
                }`}
                onClick={() => handlePageChange(item)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ))}

        {page < data?.pages - 2 && (
          <PaginationItem>
            <PaginationEllipsis className=" p-1 rounded-md" />
          </PaginationItem>
        )}

        {data?.pages > 1 && (
          <PaginationItem>
            <PaginationLink
              className={`hover:cursor-pointer hover:bg-slate-200 rounded-md active:bg-slate-300 ${
                page === data?.pages ? "bg-slate-200" : ""
              }`}
              onClick={() => handlePageChange(data?.pages)}
            >
              {data?.pages}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(page + 1)}
            className={`hover:cursor-pointer hover:bg-slate-200 rounded-md ml-2 active:bg-slate-300 ${
              page === data?.pages
                ? "opacity-50 cursor-not-allowed pointer-events-none"
                : ""
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
