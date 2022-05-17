import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { schema } from "./schema";
import session from "express-session";
import { createClient } from "redis";
import connectRedis from "connect-redis";
import cors from "cors";
import { COOKIE_NAME, __prod__ } from "./constants";

const port = process.env.PORT || 4000;

const RedisStore = connectRedis(session);

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

const main = async () => {
  // sendEmail("bob@bob.com", "Excellent performance!");
  const app = express();

  const redisClient = createClient({ legacyMode: true });
  redisClient.on("connect", () => {
    console.log("redis client connected");
  });
  redisClient.connect().catch(console.error);

  // app.use(
  //   cors({
  //     origin: "http://localhost:3000",
  //     credentials: true,
  //   })
  // );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
        disableTTL: true,
      }),
      saveUninitialized: false,
      secret: "keyboard cat",
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      },
    })
  );

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    debug: true,
  });

  await server.start();

  server.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
};

main();
