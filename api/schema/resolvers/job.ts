import { createJob, deleteJob, updateJob } from "./jobs/mutations";
import { getAllJobs, getJob } from "./jobs/queries";

export const jobsResolvers = {
  jobs: getAllJobs,
  job: getJob,
};

export const jobsMutation = {
  createJob,
  deleteJob,
  updateJob,
};
