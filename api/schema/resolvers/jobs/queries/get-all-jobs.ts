import { ApolloError, AuthenticationError } from "apollo-server-errors";
import { ApolloServerContext } from "../../../../server";

export const getAllJobs = async (
  _: any,
  args: any,
  context: ApolloServerContext
) => {
  try {
    const { prisma, user } = context;

    if (!user)
      throw new AuthenticationError(
        "You have to be authenticated to see this page"
      );

    return await prisma.job.findMany({
      where: { ownerId: user.id },
      include: { notes: true },
    });
  } catch (err) {
    if (err instanceof ApolloError) throw new Error(err.message);
  }
};
