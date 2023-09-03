import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../../prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      res.status(401).json({ message: 'Please login to make a post' });

    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    const title: string = req.body.title;
    // check title
    if (title.length > 300) {
      return res
        .status(403)
        .json({ message: 'Please write a shorter post...' });
    }
    if (!title.length) {
      return res
        .status(403)
        .json({ message: 'Please do not leave this empty...' });
    }

    //create post
    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser.id,
        },
      });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(503).json({ message: 'Error has occured...' });
    }
  }
}
