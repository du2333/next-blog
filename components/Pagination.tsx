import Link from "next/link";

function PageLink({ number, isActive }: { number: number; isActive: boolean }) {
  return (
    <Link href={`?page=${number}`}>
      <button className={`join-item btn ${isActive && "btn-active"}`}>
        {number}
      </button>
    </Link>
  );
}

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const getPageLinks = () => {
    const links = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        links.push(
          <PageLink key={i} number={i} isActive={currentPage === i} />
        );
      }
    } else {
      links.push(<PageLink key={1} number={1} isActive={currentPage === 1} />);
      if (currentPage > 3) {
          links.push(
          <button key="ellipsis-start" className="join-item btn btn-disabled">
            ...
          </button>
        );
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        links.push(
          <PageLink key={i} number={i} isActive={currentPage === i} />
        );
      }
      if (currentPage < totalPages - 2) {
        links.push(
          <button key="ellipsis-end" className="join-item btn btn-disabled">
            ...
          </button>
        );
      }
      links.push(
        <PageLink
          key={totalPages}
          number={totalPages}
          isActive={currentPage === totalPages}
        />
      );
    }
    return links;
  };

  return (
    <div className="flex justify-center items-center join">
      {currentPage > 1 && (
        <Link href={`?page=${currentPage - 1}`}>
          <button className="join-item btn">{"<"}</button>
        </Link>
      )}
      {getPageLinks()}
      {currentPage < totalPages && (
        <Link href={`?page=${currentPage + 1}`}>
          <button className="join-item btn">{">"}</button>
        </Link>
      )}
    </div>
  );
}
