'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/lib/interfaces';
import Link from 'next/link';
import { getPostsBySearch } from '@/lib/utils';

export default function SearchModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const search = async () => {
            if (query.trim()) {
                setIsLoading(true);
                const results = await getPostsBySearch(query);
                setResults(results);
                setIsLoading(false);
            } else {
                setResults([]);
                setIsLoading(false);
            }
        };

        const debouncedSearch = setTimeout(() => {
            search();
        }, 300);

        return () => {
            clearTimeout(debouncedSearch);
            setIsLoading(false);
        };
    }, [query]);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
                搜索
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsOpen(false)}>
                    <div className="relative top-20 mx-auto max-w-xl" onClick={e => e.stopPropagation()}>
                        <div className="bg-white rounded-lg shadow-xl p-4">
                            <input
                                type="text"
                                placeholder="输入关键词搜索..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoFocus
                            />

                            {isLoading ? (
                                <div className="p-3 text-gray-500">搜索中...</div>
                            ) : (
                                query.length > 0 && (
                                    results.length > 0 && (
                                        <div className="mt-4 max-h-96 overflow-y-auto">
                                            {results.map(post => (
                                                <Link
                                                    key={post.fileName}
                                                    href={`/post/${post.fileName.replace(/\.md$/, "").replace(/ /g, "-")}`}
                                                    className="block p-3 hover:bg-gray-100 rounded-lg transition-colors"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <h3 className="font-medium">{post.title}</h3>
                                                    <p className="text-sm text-gray-500 mt-1">{post.preview}</p>
                                                </Link>
                                            ))}
                                        </div>
                                    )
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
} 