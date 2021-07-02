// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  res.status(200).json({ name: "John Doe" });
};
