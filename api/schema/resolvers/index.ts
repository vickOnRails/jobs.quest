import { authenticationMutations } from "./authentication";
import { jobMutations, jobQueries } from "./jobs";
import { noteMutations } from "./notes";

export default {
  Query: {
    ...jobQueries,
  },
  Mutation: {
    ...jobMutations,
    ...authenticationMutations,
    ...noteMutations,
  },
};
