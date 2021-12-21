import { ApolloError } from "apollo-server-express";
import { AuthenticationError } from "apollo-server-errors";

import { Job } from ".prisma/client";
import { ApolloServerContext } from "../../../../server";

export default async (
  _: any,
  args: { job: Job; id: string },
  context: ApolloServerContext
) => {
  try {
    const { prisma, user } = context;

    if (!user)
      throw new AuthenticationError(
        "You have to be authenticated to see this page"
      );
    const { id, job } = args;

    // confirm that the job exists;
    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        ...job,
      },
    });

    return updatedJob;
  } catch (err) {
    // FIXME: Implement a way to provide a generic function to generate this message
    if (err instanceof ApolloError) throw new ApolloError(err.message);
  }
};
