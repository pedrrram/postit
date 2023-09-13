import Image from "next/image";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/services/httpServices";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface EditPostProps {
  id: string;
  avatar: string | null;
  name: string | null;
  title: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
}

const EditPost = ({ id, avatar, name, title, comments }: EditPostProps) => {
  const queryClient = useQueryClient();
  const [toggle, setToggle] = useState(false);
  let [toastPostId, setToastPostId] = useState<string>();

  const deletePost = async (id: string) => {
    await http.delete("/api/posts/deletePost", { data: id });
  };

  const { mutateAsync } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      setToggle(false);
      toast.success("Post has been deleted...", { id: "toastPostId" });
      queryClient.invalidateQueries(["get-user-posts"]);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data?.message, { id: "toastPostId" });
      }
    },
  });

  const deleteHandler = async () => {
    setToastPostId(
      toast.loading("deleting the post...", { id: "toastPostId" })
      );
      await mutateAsync(id);
  };

  return (
    <>
      <div className="px-3 py-5 shadow-lg rounded-lg flex flex-col">
        <div className="flex items-center space-x-3 mb-5">
          <Image
            height={36}
            width={36}
            className="w-9 rounded-full"
            src={avatar || ""}
            alt="user"
            priority
          />
          <h3 className="font-medium">{name}</h3>
        </div>
        <div className="font-black text-lg">{title}</div>
        <div className="flex items-center justify-between font-medium text-sm cursor-pointer mt-5">
          <div className="flex items-center gap-x-2">
            Comments
            <span className="text-white text-sm flex items-center justify-center w-5 h-5 bg-zinc-950 rounded-full">
              {comments?.length}
            </span>
          </div>
          <button
            onClick={() => setToggle(true)}
            className="bg-rose-600 px-3 py-1 rounded-xl text-white text-sm"
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && (
        <DeleteModal setToggle={setToggle} deletePost={deleteHandler} />
      )}
    </>
  );
};

export default EditPost;
