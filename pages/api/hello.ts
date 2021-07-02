// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { dbConnect } from "../../utils";

export default async (req: Request, res: any) => {
  await dbConnect();
  res.status(200).json({ name: "John Doe" });
};
