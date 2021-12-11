import { dbConnect } from "../../../utils";
import Job from "../../../models/job.model";
import { getSession } from "next-auth/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Job as TJob } from "../../../components";

export type TCreateJobBody = Pick<
  TJob,
  | "companyName"
  | "jobLocation"
  | "title"
  | "companyWebsite"
  | "confidenceLevel"
  | "link"
>;
interface JobRequest extends NextApiRequest {
  body: TCreateJobBody;
}

export default async (req: JobRequest, res: NextApiResponse) => {
  // ensure database is connecte
  await dbConnect();

  // get current session information
  // const session = await getSession({ req });

  // return for unauthorized users
  // if (!session) {
  //   return res.status(401).json({
  //     success: false,
  //     message: `Not Authorized`,
  //   });
  // }

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const jobs = await Job.find();
        return res.status(200).json({
          jobs,
          success: true,
        });
      } catch (err) {
        return res.status(400).json({ success: false });
      }

    // Create New Job Entry
    case "POST":
      const { body } = req;

      const {
        companyName,
        jobLink,
        position,
        companySite,
        location,
        confidenceLevel,
      } = body;

      try {
        const newJob = new Job({
          position,
          companyName,
          confidenceLevel,
          jobLink,
          location,
          companySite,
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
