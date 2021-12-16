import { gql } from "graphql-request";
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

      if (res.error) reject(res);

      // resolve promise if API call is successful
      if (res) resolve(res);
    } catch (err) {
      // else reject the promise
      reject(err);
    }
  });
};
