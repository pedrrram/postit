"use client";
import http from "@/services/httpServices";
import { IUserPosts } from "@/types/UserPosts";
import { useQuery } from "@tanstack/react-query";
import EditPost from "./EditPost";

const getUserPosts = async () => {
  const res = await http.get("/api/posts/userPosts");
  return res.data;
};

const MyPosts = () => {
  const { data, isLoading } = useQuery<IUserPosts>({
    queryFn: getUserPosts,
    queryKey: ["get-user-posts"],
  });

  if (isLoading) {
    return <h1 className="text-xl font-thin">Posts are loading...</h1>;
  }
  return (
    <div>
      <h1 className="font-thin text-xl mb-5">Edit Posts</h1>
      <div className="space-y-8">
        {data?.Post.map((post) => (
          <EditPost
            key={post.id}
            id={post.id}
            avatar={data.image}
            name={data.name}
            title={post.title}
            comments={post.comments}
          />
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
