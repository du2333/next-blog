"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { generatePagination } from "@/lib/utils";
import Link from "next/link";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="join">
      <PaginationArrow
        href={createPageURL(currentPage - 1)}
        direction="left"
        isDisabled={currentPage <= 1}
      />

      {allPages.map((page, index) => {
        let position: "ellipsis" | "single" = "single";

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

      <PaginationArrow
        href={createPageURL(currentPage + 1)}
        direction="right"
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const directionText = direction === "left" ? "<<" : ">>";

  return isDisabled ? (
    <button className="join-item btn btn-disabled">{directionText}</button>
  ) : (
    <Link href={href} className="join-item btn">
      <button>{directionText}</button>
    </Link>
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
  position: "ellipsis" | "single";
}) {
  if (isActive || position === "single") {
    return <button className="join-item btn btn-active">{pageNumber}</button>;
  }

  if (position === "ellipsis") {
    return <button className="join-item btn btn-disabled">{pageNumber}</button>;
  }

  return (
    <Link href={href} className="join-item btn">
      <button>{pageNumber}</button>
    </Link>
  );
}
