'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post } from '@/lib/interfaces';
import { getSortedPosts } from '@/lib/posts';

export default function AdminPage() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        getSortedPosts().then(setPosts);
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">文章管理</h1>
            <div className="mb-4">
                <Link
                    href="/admin/new"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    新建文章
                </Link>
            </div>
            <div className="space-y-4">
                {posts.map(post => (
                    <div key={post.fileName} className="border p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p className="text-sm text-gray-500 mt-1">{post.fileName}</p>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                href={`/admin/edit/${post.fileName.replace(/\.md$/, "")}`}
                                className="text-blue-500 hover:underline"
                            >
                                编辑
                            </Link>
                            <button className="text-red-500 hover:underline">删除</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 