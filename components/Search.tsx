'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearch = useDebouncedCallback((query: string) => {
        const params = new URLSearchParams(searchParams);

        if (query) {
            params.set('q', query);
        } else {
            params.delete('q');
        }

        router.replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="w-full">
            <input
                type="text"
                placeholder="输入关键词搜索..."
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full p-4 text-lg border-b-2 focus:outline-none focus:border-blue-500 mb-8"
                autoFocus
                defaultValue={searchParams.get('q')?.toString()}
            />
        </div>
    );
} 