import { createJob, updateJob, deleteJob } from "./mutations";
import { getAllJobs as jobs, getJob as job } from "./queries";

export const jobMutations = {
  createJob,
  deleteJob,
  updateJob,
};

export const jobQueries = {
  jobs,
  job,
};
