export function generatePagination(currentPage: number, totalPages: number) {
  // if total pages is less than 7, return all pages
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // if current page is less than 3, show first 3 pages and last 2 pages
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // if current page is among the last 3 pages, show first 2 pages and last 3 pages
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // if current page is in the middle, show first 2 pages, current page, and last 2 pages
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}
