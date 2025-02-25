import Search from "@/components/Search";
import SearchResults from "@/components/SearchResults";
import { Suspense } from "react";

export default async function SearchPage(props: {
  searchParams: Promise<{ q: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.q || "";

  return (
    <div className="w-full">
      <Search />
      {query && (
        <Suspense
          fallback={
            <span className="loading loading-spinner loading-lg text-base-content"></span>
          }
        >
          <SearchResults query={query} />
        </Suspense>
      )}
    </div>
  );
}
