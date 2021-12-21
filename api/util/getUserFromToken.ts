import { User } from ".prisma/client";
import jsonWT, { JwtPayload } from "jsonwebtoken";

const getUserFromToken = async (jwt: string): Promise<null | User> => {
  try {
    if (!jwt) return null;
    const actualJWT = jwt.split(" ")[1];

    return (await jsonWT.verify(
      actualJWT,
      process.env.TOKEN_KEY as string
    )) as User;
  } catch (err) {
    throw new Error(`An error occurred while generating the token: ${err}`);
  }
};

export { getUserFromToken };
