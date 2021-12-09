import jsonWT from "jsonwebtoken";

const getUserFromToken = async (jwt: string) => {
  try {
    if (!jwt) return null;
    const actualJWT = jwt.split(" ")[1];

    return await jsonWT.verify(actualJWT, process.env.TOKEN_KEY as string);
  } catch (err) {
    throw new Error(`An error occurred while generating the token: ${err}`);
  }
};

export { getUserFromToken };
