import { gql } from "graphql-request";

import { Job } from "../../components";
// import client from "../../apollo-client";
import { graphqlClient } from "../../pages/_app";

const baseUrl = process.env.NEXT_PUBLIC_APP_ROOT;

const url = `${baseUrl}/api/jobs`;

interface JobsResponse extends Response {
  success: boolean;
  jobs: Job[];
  message?: string;
}

export const getJobs = async (): Promise<JobsResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await graphqlClient.request(gql`
        query GetAllJobs {
          jobs {
            applicationStage
            companyName
            appliedAt
            companyWebsite
            confidenceLevel
            id
            jobLocation
            createdAt
            link
            title
            updatedAt
          }
        }
      `);

      if (res) resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};
