import Link from "next/link";

function PageLink({ number, isActive }: { number: number, isActive: boolean }) {
    return (
        <Link href={`?page=${number}`} className={`px-4 py-2 ${isActive ? "bg-gray-200" : "bg-gray-100"} rounded-md`}>
            {number}
        </Link>
    )
}

export function Pagination({ currentPage, totalPages }: { currentPage: number, totalPages: number }) {
    return (
        <nav className="flex justify-center items-center gap-2">
            {currentPage > 1 && (
                <Link href={`?page=${currentPage - 1}`} className="px-4 py-2 bg-gray-200 rounded-md">{'<'}</Link>
            )}
            {[...Array(totalPages)].map((_, i) => (
                    <PageLink key={i} number={i + 1} isActive={currentPage === i + 1} />
            ))}
            {currentPage < totalPages && (
                <Link href={`?page=${currentPage + 1}`} className="px-4 py-2 bg-gray-200 rounded-md">{'>'}</Link>
            )}
        </nav>
    )
}