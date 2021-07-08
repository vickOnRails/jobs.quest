import jobModel from "../../../models/job.model";

/**
 * Function to fetch a job by its id.
 */
export default async (req: any, res: any) => {
  // extract jobId from query
  const { jobId } = req.query;

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
};
