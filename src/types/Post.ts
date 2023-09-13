import { User, Comment, Post } from "@prisma/client";

export interface IPost extends Post {
  user: User;
  comments: Comment[];
}
