import { ApolloServerContext } from "../../../../server";

export default async (
  _: any,
  args: { id: string },
  context: ApolloServerContext
) => {
  const { prisma } = context;
  try {
    const { id } = args;
    const job = await prisma.job.delete({
      where: { id },
    });

    return job;
  } catch (err) {}
};
