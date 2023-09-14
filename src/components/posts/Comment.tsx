import { IComment } from "@/types/Comment";
import Image from "next/image";

const Comment = ({ comment }: { comment: IComment }) => {
  return (
    <div className="p-5 border border-zinc-200 border-dashed rounded-lg">
      <div className="flex items-center space-x-3 mb-5">
        <Image
          height={36}
          width={36}
          className="w-8 rounded-full"
          src={comment.user.image || ""}
          alt="user"
          priority
        />
        <h3 className="font-medium text-sm">{comment.user.name}</h3>
        <span className="text-sm text-zinc-400">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>
      <span>{comment.message}</span>
    </div>
  );
};

export default Comment;
