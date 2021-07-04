import { dbConnect } from "../../../utils";
import Job from "../../../models/job.model";
import { getSession } from "next-auth/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Job as TJob } from "../../../components";

const jobs: TJob[] = [
  {
    position: "Lead User Experience Designer",
    location: "Lagos, Nigeria",
    date: Date.now(),
    companyName: "Youtube",
    stage: "saved",
  },
  {
    position: "Frontend Engineer",
    location: "San Francisco, US",
    date: Date.now(),
    companyName: "google",
    stage: "preparing",
  },
  {
    position: "Lead User Experience Designer",
    location: "Lagos, Nigeria",
    date: Date.now(),
    companyName: "Youtube",
    stage: "applied",
  },
  {
    position: "Software Engineer",
    location: "Berlin, Germany",
    date: Date.now(),
    companyName: "Twitter",
    stage: "preparing",
  },
  {
    position: "Software Engineer Intern",
    location: "England, London",
    date: Date.now(),
    companyName: "Google",
    stage: "preparing",
  },
];

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // ensure database is connecte
  await dbConnect();

  // get current session information
  const session = await getSession({ req });

  //   console.log({ session });

  //   return for unauthorized users
  //   if (!session) {
  //     return res.status(401).json({
  //       success: false,
  //       message: `Not Authorized`,
  //     });
  //   }

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        // const jobs = await Job.find();
        return res.status(200).json({
          jobs,
          success: true,
        });
      } catch (err) {
        return res.status(400).json({ success: false });
      }

    case "POST":
      const {
        body: { position },
      } = req;
      try {
        const newJob = new Job({
          position,
        });

        await newJob.save();

        return res.status(201).json({
          success: true,
          pet: newJob,
        });
      } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
      }

    default:
      return res.status(400).json({ success: false });
  }
};
