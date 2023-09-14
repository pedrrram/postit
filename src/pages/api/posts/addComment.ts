import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      res.status(401).json({ message: "Please login to make a post" });

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    try {
      const { title, postId } = req.body.data;

      if (!title.length)
        return res.status(401).json({ message: "Please enter something..." });

      const result = await prisma.comment.create({
        data: {
          message: title,
          userId: user?.id,
          postId,
        },
      });
      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(503)
        .json({ message: "Error has occured while deleting the post..." });
    }
  }
}
