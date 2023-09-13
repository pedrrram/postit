import Link from "next/link";
import Image from "next/image";
import { IPost } from "@/types/Post";

const Post = ({ post }: { post: IPost }) => {
  return (
    <div className="px-3 py-5 shadow-lg rounded-lg flex flex-col">
      <div className="flex items-center space-x-3 mb-5">
        <Image
          height={36}
          width={36}
          className="w-9 rounded-full"
          src={post.user.image || ""}
          alt="user"
          priority
        />
        <h3 className="font-medium">{post.user.name}</h3>
      </div>
      <div className="font-black text-lg">{post.title}</div>
      <div className="font-medium text-sm cursor-pointer mt-5">
        <Link href={`/post/${post.id}`} className="flex items-center gap-x-2">
          Comments
          <span className="text-white text-sm flex items-center justify-center w-5 h-5 bg-zinc-950 rounded-full">
            {post.comments.length}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Post;
