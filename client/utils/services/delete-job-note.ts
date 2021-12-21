import { gql } from "graphql-request";
import { graphqlClient } from "../../pages/_app";

const DELETE_JOB_NOTE = gql`
  mutation ($deleteNoteId: ID!) {
    deleteNote(id: $deleteNoteId) {
      id
    }
  }
`;

export const deleteJobNote = async (noteId: string): Promise<Response> => {
  //   return a promise
  return new Promise(async (resolve, reject) => {
    try {
      const res = await graphqlClient.request(DELETE_JOB_NOTE, {
        deleteNoteId: noteId,
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
