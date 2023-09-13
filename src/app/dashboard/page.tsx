import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import MyPosts from "@/components/dashboard/MyPosts";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="pb-10">
      <h1 className="text-xl lg:text-3xl font-black whitespace-nowrap text-center mb-7">
        Welcome back {session?.user?.name}
      </h1>
      <MyPosts />
    </div>
  );
};

export default Dashboard;
