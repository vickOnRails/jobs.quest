import { ApolloError } from "apollo-server-express";
import { AuthenticationError } from "apollo-server-errors";

import { Note } from ".prisma/client";
import { ApolloServerContext } from "../../../../server";

export default async (
  _: any,
  args: { note: Note; id: string },
  context: ApolloServerContext
) => {
  try {
    const { prisma, user } = context;

    if (!user)
      throw new AuthenticationError(
        "You have to be authenticated to see this page"
      );

    const { id, note } = args;

    console.log({ id, note });

    // confirm that the job exists;
    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        ...note,
      },
    });

    return updatedNote;
  } catch (err) {
    // FIXME: Implement a way to provide a generic function to generate this message
    if (err instanceof ApolloError) throw new ApolloError(err.message);
  }
};
