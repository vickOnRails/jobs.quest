import { gql } from "graphql-request";

import { graphqlClient } from "../../pages/_app";

import { Job } from "../../components";

const baseUrl = process.env.NEXT_PUBLIC_APP_ROOT;

interface JobResponse extends Response {
  success: boolean;
  job: Job;
  message?: string;
}

const GET_JOB = gql`
  query getJob($jobId: ID!) {
    job(id: $jobId) {
      companyName
      title
      jobLocation
      createdAt
      updatedAt
      id
      applicationStage
      confidenceLevel
      appliedAt
      companyWebsite
      link
      postedAt

      notes {
        id
        body
        createdAt
      }
    }
  }
`;

export const getJob = async (
  jobId: string | null
): Promise<JobResponse | null> => {
  if (jobId)
    return new Promise(async (resolve, reject) => {
      // FIXME: type the error return type properly
      const url = `${baseUrl}/api/jobs/${jobId}`;
      try {
        const res = await graphqlClient.request(GET_JOB, {
          jobId,
        });

        if (res.error) reject(res);

        if (res) resolve(res);
      } catch (err) {
        reject(err);
      }
    });

  return null;
};
