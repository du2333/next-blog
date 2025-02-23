"use client";

import { deletePost } from "@/lib/posts";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";

export default function ConfirmationDialog({ fileName }: { fileName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setIsLoading(true);
    const result = await deletePost(fileName);
    if (result.success) {
      setIsOpen(false);
    } else {
      setError(result.error || "删除失败");
    }
    setIsLoading(false);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-red-500 hover:underline"
      >
        删除
      </button>

      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setError(null);
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded bg-white p-6">
            <DialogTitle className="text-lg font-medium">删除文章</DialogTitle>
            <Description className="mt-2 text-gray-500">
              确定要删除这篇文章吗？
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </Description>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setError(null);
                }}
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                取消
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                disabled={isLoading || !!error}
              >
                {isLoading ? "删除中..." : "确认删除"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
