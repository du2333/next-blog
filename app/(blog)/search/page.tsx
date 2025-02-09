import Search from "@/components/Search";
import SearchResults from "@/components/SearchResults";
import { Suspense } from "react";

export default async function SearchPage(props: {
    searchParams: Promise<{ q: string }>
}) {
    const searchParams = await props.searchParams;
    const query = searchParams.q || '';

    return (
        <div className="w-full">
            <Search />
            <Suspense fallback={<div className="text-gray-500">搜索中...</div>}>
                <SearchResults query={query} />
            </Suspense>
        </div>
    )

}