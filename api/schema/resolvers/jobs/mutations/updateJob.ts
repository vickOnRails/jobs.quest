import { Job } from ".prisma/client";
import { ApolloServerContext } from "../../../../server";

export default async (
  _: any,
  args: { job: Job; id: string },
  context: ApolloServerContext
) => {
  const { prisma } = context;
  const { id, job } = args;

  // confirm that the job exists;

  const updatedJob = prisma.job.update({
    where: { id },
    data: {
      ...job,
    },
  });

  return updatedJob;
};
