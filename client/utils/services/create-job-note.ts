import { gql } from "graphql-request";

import { graphqlClient } from "../../pages/_app";

type JobNote = {
  note: {
    body: string;
  };
  jobId?: string;
};

/**
 * createJob - service to take care of API calls for creating a new job
 * values - Value of jobs to be created
 */

const CREATE_JOB_NOTE = gql`
  mutation CreateJobNote($note: CreateNoteInput!, $jobId: String!) {
    createNote(note: $note, jobId: $jobId) {
      id
      body
    }
  }
`;

interface NewNoteResponse extends Response {
  createNote: {
    id: string;
    body: string;
  };
}

export const createJobNote = async (
  values: JobNote
): Promise<NewNoteResponse> => {
  // return a promise
  return new Promise(async (resolve, reject) => {
    if (!values.jobId) throw new Error("Please link notes to a job");
    try {
      const res = await graphqlClient.request(CREATE_JOB_NOTE, {
        ...values,
      });

      if (res.error) reject(res);

      if (res) resolve(res);
    } catch (err) {
      // else reject the promise
      reject(err);
    }
  });
};
