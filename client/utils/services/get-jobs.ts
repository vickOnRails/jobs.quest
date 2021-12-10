import { gql } from "@apollo/client";

import { Job } from "../../components";
import client from "../../apollo-client";

const baseUrl = process.env.NEXT_PUBLIC_APP_ROOT;

const url = `${baseUrl}/api/jobs`;

interface JobsResponse extends Response {
  success: boolean;
  jobs: Job[];
  message?: string;
}

export const getJobsLegacy = async (): Promise<JobsResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(url);
      if (res.ok) resolve(res.json());
    } catch (err) {
      reject(err);
    }
  });
};

const GET_ALL_JOBS = gql`
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
    }
  }
`;

export const getJobs = async (email: string): Promise<JobsResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, error } = await client.query({
        query: GET_ALL_JOBS,
        variables: { email },
        context: {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmNjM2JmMC0yMDRmLTQ3NmEtOGE4Ny1iZmY0OTU1YTZkYjAiLCJlbWFpbCI6InZpY3Rvcm9vZWd1MDAwOUBnbWFpbC5jb20iLCJpYXQiOjE2MzkwNjk0MzgsImV4cCI6MTY0MTY2MTQzOH0.qCU-wpueEmM1jNU6LN4FV5F5NVr4O1IeypBpu_PhLyA`,
          },
        },
      });

      console.log({ data, error });

      if (error) {
        reject(error);
      }

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};
