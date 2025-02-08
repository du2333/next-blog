import Link from "next/link";

function PageLink({ number, isActive }: { number: number; isActive: boolean }) {
    return (
        <Link href={`?page=${number}`} className={`px-4 py-2 ${isActive ? "bg-blue-500 text-white" : "text-gray-700"} rounded-md transition-opacity duration-200 hover:opacity-80`}>
            {number}
        </Link>
    );
}

export function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
    const getPageLinks = () => {
        const links = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                links.push(<PageLink key={i} number={i} isActive={currentPage === i} />);
            }
        } else {
            links.push(<PageLink key={1} number={1} isActive={currentPage === 1} />);
            if (currentPage > 3) {
                links.push(<span key="ellipsis-start">...</span>);
            }
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) {
                links.push(<PageLink key={i} number={i} isActive={currentPage === i} />);
            }
            if (currentPage < totalPages - 2) {
                links.push(<span key="ellipsis-end">...</span>);
            }
            links.push(<PageLink key={totalPages} number={totalPages} isActive={currentPage === totalPages} />);
        }
        return links;
    };

    return (
        <nav className="flex justify-center items-center gap-2">
            {currentPage > 1 && (
                <Link href={`?page=${currentPage - 1}`} className="px-4 py-2 text-gray-700 rounded-md hover:opacity-80">{'<'}</Link>
            )}
            {getPageLinks()}
            {currentPage < totalPages && (
                <Link href={`?page=${currentPage + 1}`} className="px-4 py-2 text-gray-700 rounded-md hover:opacity-80">{'>'}</Link>
            )}
        </nav>
    );
}