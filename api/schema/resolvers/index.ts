import { authenticationMutations } from "./authentication";
import { jobMutations, jobQueries } from "./jobs";

export default {
  Query: {
    ...jobQueries,
  },
  Mutation: {
    ...jobMutations,
    ...authenticationMutations,
  },
};
