import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer, Context } from "apollo-server-core";
import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";

import { context } from "./prisma";
import { resolvers, typeDefs } from "./schema";
import { PrismaClient } from ".prisma/client";
import { getUserFromToken } from "./util/getUserFromToken";

const { prisma } = context;

dotenv.config();

interface IContextUser {
  email: string;
  password: string;
}
export type ApolloServerContext = Context<{
  prisma: PrismaClient;
  user?: IContextUser;
}>;

async function startServer(typeDefs: any, resolvers: any) {
  const app = express();

  // app.use(cors({ origin: "https://job-quest.app" }));
  app.use(cors({ origin: "*" }));
  const httpServer = http.createServer(app);

  // create the server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV !== "production",
    context: async ({ req }) => {
      // put the token info in the context for future use in resolvers
      const token = req.headers.authorization || "";
      const user = await getUserFromToken(token);
      return { prisma, user };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // start server
  await server.start();

  server.applyMiddleware({
    app,
    path: "/",
  });

  try {
    // connect to database
    await context.prisma.$connect();

    // start server
    await new Promise<void>((resolve) =>
      httpServer.listen({ port: 5000 }, resolve)
    );

    console.log(`Server ready at http://localhost:5000${server.graphqlPath}`);
  } catch (err: any) {
    console.log(err.message, err.stack);
  }
}

try {
  startServer(typeDefs, resolvers).catch((err) => {
    console.log(err.message);
  });
} catch (err) {
  // @ts-ignore
  console.log(`error: ${err.message}`);
}
