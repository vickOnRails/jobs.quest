import { gql } from "graphql-request";

import { TCreateJobBody } from "../../pages/api/jobs";
import { graphqlClient } from "../../pages/_app";

/**
 * createJob - service to take care of API calls for creating a new job
 * values - Value of jobs to be created
 */

const CREATE_JOB = gql`
  mutation CreateJobs($job: CreateJobInput!) {
    createJob(job: $job) {
      id
    }
  }
`;

export const createJob = async (values: TCreateJobBody): Promise<Response> => {
  // return a promise
  return new Promise(async (resolve, reject) => {
    try {
      const res = await graphqlClient.request(CREATE_JOB, {
        job: values,
      });

      if (res.error) reject(res);

      if (res) resolve(res);
    } catch (err) {
      // else reject the promise
      reject(err);
    }
  });
};
