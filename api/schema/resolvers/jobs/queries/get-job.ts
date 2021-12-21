import { ApolloError, AuthenticationError } from "apollo-server-errors";
import { ApolloServerContext } from "../../../../server";

export const getJob = async (
  _: any,
  args: any,
  context: ApolloServerContext
) => {
  const { prisma, user } = context;

  if (!user)
    throw new AuthenticationError(
      "You have to be authenticated to see this page"
    );

  try {
    return await prisma.job.findFirst({
      where: { id: args.id, ownerId: user?.id },
      include: { notes: { orderBy: { createdAt: "desc" } }, owner: true },
    });
  } catch (err) {
    if (err instanceof ApolloError) throw new ApolloError(err.message);
  }
};
