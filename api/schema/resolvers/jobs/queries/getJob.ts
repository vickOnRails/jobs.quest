import { ApolloServerContext } from "../../../../server";

export const getJob = async (
  _: any,
  args: any,
  context: ApolloServerContext
) => {
  const { prisma } = context;
  return await prisma.job.findFirst({ where: { id: args.id } });
};
