"use client";
import http from "@/services/httpServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const AddComment = ({ id }: { id: string }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  let [toastCommentId, setToastCommentId] = useState<string>();
  const queryClient = useQueryClient();

  const addComment = async (data: { postId: string; title: string }) => {
    await http.post("/api/posts/addComment", { data });
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: addComment,
    mutationKey: ["add-comment"],
    onSuccess: () => {
      toast.success("Comment has been made...🔥", { id: toastCommentId });
      setTitle("");
      queryClient.invalidateQueries(["add-comment"]);
      router.refresh();
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data?.message, { id: toastCommentId });
      }
    },
  });

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setToastCommentId(
      toast.loading("Adding your comment", { id: toastCommentId })
    );
    await mutateAsync({ postId: id, title });
  };

  return (
    <div className="mt-10 flex flex-col">
      <h1 className="text-lg font-thin mb-3">Add New Comment</h1>
      <form className="flex flex-col" onSubmit={submitHandler}>
        <textarea
          className="outline-none border p-2 h-40 w-[344px] sm:w-full resize-none rounded-md"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write a comment..."
          maxLength={300}
        ></textarea>
        <div className="flex items-center space-x-3">
          <button
            disabled={isLoading}
            className="bg-zinc-950 text-white px-4 py-2 rounded-xl  block mt-3 disabled:bg-zinc-600"
          >
            Add Comment ✍
          </button>
          <span
            className={`text-sm  block mt-1 ${
              title.length === 300 ? "text-rose-600" : "text-zinc-400"
            }`}
          >
            {title.length}/300
          </span>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
