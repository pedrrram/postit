import Post from "@/components/posts/Post";
import http from "../services/httpServices";
import { IPost } from "@/types/Post";

export const dynamic = "force-dynamic";
export const revalidate = "force-cache";

const Home = async () => {
  const { data }: { data: IPost[] } = await http.get("/api/posts/getPosts");

  return (
    <main className="font-thin ">
      <h1 className="text-5xl">Recent Posts</h1>
      <div className="space-y-5 mt-10">
        {data.map((post: IPost) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default Home;
