import { Note } from ".prisma/client";
import { ApolloError, AuthenticationError } from "apollo-server-errors";
import { ApolloServerContext } from "../../../../server";

export default async (
  _: any,
  args: { note: Note; jobId: string },
  context: ApolloServerContext
) => {
  const { prisma, user } = context;
  const { jobId, note } = args;

  try {
    if (!user)
      throw new AuthenticationError(
        "You have to be authenticated to see this page"
      );

    const newNote = await prisma.note.create({
      data: {
        ...note,
        ownerId: user?.id as string,
        jobId,
      },
    });

    return newNote;
  } catch (err) {
    if (err instanceof Error) throw new ApolloError(err.message);
  }
};
