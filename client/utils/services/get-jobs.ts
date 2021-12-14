import { gql } from "graphql-request";

import { Job } from "../../components";
// import client from "../../apollo-client";
import { graphqlClient } from "../../pages/_app";

interface JobsResponse extends Response {
  success: boolean;
  jobs: Job[];
  message?: string;
}

const GET_JOBS = gql`
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
`;

export const getJobs = async (): Promise<JobsResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await graphqlClient.request(GET_JOBS);

      if (res.error) reject(res);

      if (res) resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};
