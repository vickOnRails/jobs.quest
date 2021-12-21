import {
  ApolloError,
  AuthenticationError,
  UserInputError,
} from "apollo-server-errors";
import { ApolloServerContext } from "../../../../server";

export default async (
  _: any,
  args: { id: string },
  context: ApolloServerContext
) => {
  const { prisma, user } = context;

  if (!user)
    throw new AuthenticationError(
      "You have to be authenticated to see this page"
    );

  try {
    const { id } = args;

    // FIXME: cater for cases where someone else can try to delete the note
    // only owners of notes can delete them
    const deletedNote = await prisma.note.delete({
      where: { id },
    });

    return deletedNote;
  } catch (err) {
    if (err instanceof ApolloError) throw new ApolloError(err.message);
  }
};
