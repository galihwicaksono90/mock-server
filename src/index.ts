import express from "express";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { schema } from "./schema";
import { context } from "./context";
import cors from "cors";
import { COOKIE_NAME, __prod__ } from "./constants";
const port = process.env.PORT || 4000;

const main = async () => {
  const app = express();

  var corsOptions = {
    origin: "*",
    credentials: true,
  };

  const whitelist = [
    "https://studio.apollographql.com",
    "https://dev.ikataupn.or.id",
    "https://ikata.vercel.app",
    "http://localhost:3000",
  ];

  //app.use(cors());
  //
  app.use(
    cors({
      origin: "*",
      credentials: false,
    })
  );

  const server = new ApolloServer({
    schema,
    context,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
    debug: true,
    introspection: true,
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: false,
  });

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
};

main();
