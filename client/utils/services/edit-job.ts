import { gql } from "graphql-request";
import { graphqlClient } from "../../pages/_app";

import { Job } from "../../components";
import { TCreateJobBody } from "../../pages/api/jobs";

/**
 * editJob - service to take care of API calls for editing a  job
 * values - Value of jobs to be replaced
 */

const EDIT_JOB = gql`
  mutation updateJob($updateJobId: ID!, $job: UpdateJobInput!) {
    updateJob(id: $updateJobId, job: $job) {
      id
      appliedAt
      companyName
      title
      applicationStage
      companyWebsite
      confidenceLevel
      createdAt
      expiringAt
      jobLocation
      link
      postedAt
    }
  }
`;
export const editJob = async (
  values:
    | (TCreateJobBody & Pick<Job, "applicationStage">)
    | Pick<Job, "applicationStage">,
  jobId: string
): Promise<Response> => {
  // return a promise
  return new Promise(async (resolve, reject) => {
    try {
      // const res = await fetch(`/api/jobs/${jobId}`, {

      const res = await graphqlClient.request(EDIT_JOB, {
        updateJobId: jobId,
        job: values,
      });

      // resolve promise if API call is successful
      if (res.error) reject(res);

      if (res) resolve(res);
    } catch (err) {
      // else reject the promise
      reject(err);
    }
  });
};
