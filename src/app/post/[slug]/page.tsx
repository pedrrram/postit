import AddComment from "@/components/posts/AddComment";
import Comment from "@/components/posts/Comment";
import Post from "@/components/posts/Post";
import http from "@/services/httpServices";
import { IComment } from "@/types/Comment";

const fetchDetails = async (slug: string) => {
  const res = await http.get(`/api/posts/${slug}`);
  return res.data;
};

const PostDetail = async ({ params }: { params: { slug: string } }) => {
  const data = await fetchDetails(params.slug);
  const post = data || {};

  return (
    <div>
      <Post post={post} />
      <div className="flex flex-col gap-y-5 mb-10">
        <AddComment id={data?.id} />
        {post?.comments.map((comment: IComment) => (
          <Comment comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default PostDetail;
