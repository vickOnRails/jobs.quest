import { NextApiRequest, NextApiResponse } from "next";
import jobModel from "../../../models/job.model";
import { dbConnect } from "../../../utils";

interface JobInfoRequest extends NextApiRequest {
  query: {
    jobId: string;
  };
}
/**
 * Function to fetch a job by its id.
 */
export default async (req: JobInfoRequest, res: NextApiResponse) => {
  // ensure database is connected
  await dbConnect();

  const { method } = req;

  // extract jobId from query
  const { jobId } = req.query;

  switch (method) {
    case "GET":
      try {
        const job = await jobModel.findOne({ _id: jobId });
        if (!job)
          return res.status(401).json({
            message: "Job not found",
          });

        return res.json({
          success: true,
          job,
        });
      } catch (err) {
        return res.status(405).json({
          message: `An error occured: ${err.message}`,
        });
      }

    case "DELETE":
      try {
        // find the job and delete it
        const job = await jobModel.deleteOne({ _id: jobId });

        if (!job.deletedCount) {
          res.status(404);
          throw new Error("Job not found");
        }

        return res.status(200).json({
          success: true,
          message: `Job Deleted successfully`,
        });
      } catch (err) {
        return res.json({
          success: false,
          message: err.message,
        });
      }

    case "PUT":
      try {
        // find the job and update it
        const job = await jobModel.findOneAndUpdate({ _id: jobId }, req.body, {
          new: true,
        });

        if (!job) {
          res.status(404);
          throw new Error("Job not found");
        }

        return res.json({
          success: true,
          job,
        });
      } catch (err) {
        return res.json({
          success: false,
          message: err.message,
        });
      }

    default:
      return;
  }
};
