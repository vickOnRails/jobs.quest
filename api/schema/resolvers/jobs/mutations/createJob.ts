import { Job } from ".prisma/client";
import { ApolloError } from "apollo-server-errors";
import { ApolloServerContext } from "../../../../server";
import { EntryNotFound } from "../../../../util/entry-not-found";

export default async (
  _: any,
  args: { job: Job },
  context: ApolloServerContext
) => {
  const { prisma } = context;
  try {
    const { job } = args;

    const newJob = await prisma.job.create({
      data: {
        ...job,
        applicationStage: "SAVED",
      },
    });

    return newJob;
  } catch (err) {
    if (err instanceof Error) throw new ApolloError(err.message);
  }
};
