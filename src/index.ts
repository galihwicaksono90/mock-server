import express from "express";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";
import { context } from "./context";

const port = 4000;

const main = async () => {
  const app = express();

  const server = new ApolloServer({
    schema,
    context,
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
};

main();
