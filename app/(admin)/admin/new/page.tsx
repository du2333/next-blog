import { createPost } from '@/lib/posts';
import { redirect } from 'next/navigation';

export default function NewPostPage() {
    async function createAction(formData: FormData) {
        'use server'
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const tags = formData.get('tags') as string;
        await createPost({ title, content, tags: tags.split(',') });
        redirect('/admin');
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">新建文章</h1>
            <form action={createAction}>
                <input
                    type="text"
                    name="title"
                    placeholder="文章标题"
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <input
                    type="text"
                    name="tags"
                    placeholder="标签（多个标签用逗号分隔）"
                    className="w-full p-2 border rounded mb-4"
                />
                <textarea
                    name="content"
                    placeholder="文章内容（Markdown格式）"
                    className="w-full h-96 p-2 border rounded font-mono"
                    required
                />
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    保存文章
                </button>
            </form>
        </div>
    );
} 