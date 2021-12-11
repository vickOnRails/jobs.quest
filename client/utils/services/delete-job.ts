import { gql } from "graphql-request";

import { TCreateJobBody } from "../../pages/api/jobs";
import { graphqlClient } from "../../pages/_app";

/**
 * deleteJob - service to remove job from database
 * jobId - Id of job to remove
 */

const DELETE_JOB = gql`
  mutation deleteJob($deleteJobId: ID!) {
    deleteJob(id: $deleteJobId) {
      companyName
    }
  }
`;

export const deleteJob = async (jobId: string): Promise<Response> => {
  //   return a promise
  return new Promise(async (resolve, reject) => {
    try {
      const res = await graphqlClient.request(DELETE_JOB, {
        deleteJobId: jobId,
      });

      // resolve promise if API call is successful
      if (res) {
        resolve(res);
      } else {
        throw new Error(res.statusText);
      }
    } catch (err) {
      // else reject the promise
      reject(err);
    }
  });
};
