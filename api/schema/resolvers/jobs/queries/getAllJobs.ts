import { ApolloServerContext } from "../../../../server";

export const getAllJobs = async (
  _: any,
  args: any,
  context: ApolloServerContext
) => {
  try {
    const { prisma, user } = context;

    if (!user) throw new Error("You have to be authenticated to see this page");

    const userFromDb = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!userFromDb)
      throw new Error("You have to be authenticated to see this page");

    return await prisma.job.findMany();
  } catch (err) {
    //@ts-ignore
    throw new Error(err.message);
  }
};
