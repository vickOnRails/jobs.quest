import { ApolloServerContext } from "../../../../server";
import { User } from ".prisma/client";
import jwt from "jsonwebtoken";

type IUserForAuthentication = Pick<User, "email" | "fullname">;

// FIXME: remove bcrypt since there's no need to make use of the passwords
export default async (
  _: any,
  { user }: { user: IUserForAuthentication },
  context: ApolloServerContext
) => {
  const { prisma } = context;
  const { email, fullname } = user;
  let userToReturn: User | null = null;

  try {
    // we need just the email address to create a user or return an already created one

    // if a user exists in the database, return their details alongside a JWT token
    const userInDb = await prisma.user.findUnique({ where: { email } });

    // if a user doesn't exist, create a new one and return the user
    if (!userInDb) {
      userToReturn = await prisma.user.create({ data: { email, fullname } });
    } else {
      userToReturn = userInDb;
    }

    const token = await jwt.sign(
      {
        userId: userToReturn?.id,
        email: userToReturn?.email,
      },
      process.env.TOKEN_KEY as string,
      { expiresIn: "30d" }
    );

    return { ...userToReturn, token };
  } catch (err) {
    // @ts-ignore
    console.log(err.message);
  }
};
