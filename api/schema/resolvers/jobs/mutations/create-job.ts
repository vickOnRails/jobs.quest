import { Job } from ".prisma/client";
import { ApolloError, AuthenticationError } from "apollo-server-errors";
import { ApolloServerContext } from "../../../../server";

export default async (
  _: any,
  args: { job: Job },
  context: ApolloServerContext
) => {
  const { prisma, user } = context;

  try {
    if (!user)
      throw new AuthenticationError(
        "You have to be authenticated to see this page"
      );

    const { job } = args;

    const newJob = await prisma.job.create({
      data: {
        ...job,
        applicationStage: "SAVED",
        ownerId: user?.id as string,
      },
    });

    return newJob;
  } catch (err) {
    console.log(err);
    if (err instanceof Error) throw new ApolloError(err.message);
  }
};
