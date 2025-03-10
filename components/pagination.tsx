"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { generatePagination } from "@/lib/utils";

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Pagination({
  customPathname,
  totalPages,
}: {
  customPathname?: string;
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");

  const createPageURL = (pageNumber: number | string) => {
    if (Number(pageNumber) === 1) {
      return "/";
    }
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());

    if (customPathname) {
      return `${customPathname}?${params.toString()}`;
    }

    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            className={currentPage <= 1 ? "invisible" : ""}
          />
        </PaginationItem>

        {allPages.map((page, index) => {
          let position: "ellipsis" | "single" | undefined;

          if (page === "...") {
            position = "ellipsis";
          }

          return (
            <PaginationNumber
              key={`${page}-${index}`}
              href={createPageURL(page)}
              pageNumber={page}
              isActive={page === currentPage}
              position={position}
            />
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            className={currentPage >= totalPages ? "invisible" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
}

function PaginationNumber({
  href,
  pageNumber,
  isActive,
  position,
}: {
  href: string;
  pageNumber: number | string;
  isActive: boolean;
  position?: "ellipsis" | "single";
}) {
  if (isActive || position === "single") {
    return (
      <PaginationItem>
        <PaginationLink href={href} isActive>
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );
  }

  if (position === "ellipsis") {
    return (
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
    );
  }

  return (
    <PaginationItem>
      <PaginationLink href={href}>{pageNumber}</PaginationLink>
    </PaginationItem>
  );
}
