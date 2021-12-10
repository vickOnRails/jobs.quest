import { Job } from ".prisma/client";
import { ApolloServerContext } from "../../../../server";

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
  } catch (err) {}
};
