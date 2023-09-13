import { User } from "@prisma/client";

export interface IUserPosts extends User {
  Post: {
    createdAt: string;
    id: string;
    title: string;
    comments?: {
      createdAt: string;
      id: string;
      postId: string;
      title: string;
      userId: string;
    }[];
  }[];
}
