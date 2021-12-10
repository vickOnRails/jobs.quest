// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { dbConnect } from "../../utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  // const session = await getSession({ req });

  // if (!session) {
  //   return res.status(401).json({
  //     message: "Not Authorized",
  //   });
  // }

  res.status(200).json({ name: "John Doe" });
};
