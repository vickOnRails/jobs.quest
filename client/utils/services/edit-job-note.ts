import { gql } from "graphql-request";
import { graphqlClient } from "../../pages/_app";

const EDIT_JOB_NOTE = gql`
  mutation UpdateJobNote($updateNoteId: ID!, $note: UpdateNoteInput!) {
    updateNote(id: $updateNoteId, note: $note) {
      body
    }
  }
`;

interface EditJobNoteResponse extends Response {
  updateNote: {
    id: string;
    body: string;
  };
}

export const editJobNote = async (
  noteId: string,
  note: {
    body: string;
  }
): Promise<EditJobNoteResponse> => {
  //   return a promise
  return new Promise(async (resolve, reject) => {
    try {
      const res = await graphqlClient.request(EDIT_JOB_NOTE, {
        updateNoteId: noteId,
        note: { ...note },
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
