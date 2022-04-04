import { makeSchema } from "nexus";
import { join } from "path";
import { fieldAuthorizePlugin } from "nexus";
import * as types from "./graphql";
import { UserInputError, AuthenticationError } from "apollo-server-core";

export const schema = makeSchema({
  types,
  outputs: {
    schema: join(__dirname, "..", "schema.graphql"),
    typegen: join(__dirname, "..", " nexus-typegen.ts"),
  },
  contextType: {
    module: join(__dirname, "..", "./src/context.ts"),
    export: "Context",
  },
  plugins: [
    fieldAuthorizePlugin({
      formatError: () => {
        throw new AuthenticationError("Not authenticated", {
          mantap: "matnap",
        });
      },
   }),
  ],
});
