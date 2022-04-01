import { objectType, extendType } from "nexus";
import { isAuth } from "../utils";

export const User = objectType({
  name: "User",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("username");
    t.nonNull.dateTime("createdAt");
    t.nonNull.dateTime("updatedAt");
    t.nonNull.list.nonNull.field("posts", {
      type: "Post",
      resolve: (parent, _args, ctx) =>
        ctx.prisma.user.findUnique({ where: { id: parent.id } }).posts(),
    });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("me", {
      type: "User",
      authorize: isAuth,
      resolve: async (_parent, _args, ctx) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: ctx.userId,
          },
        });

        if (!user) {
          return null;
        }

        return user;
      },
    });
    t.nonNull.list.nonNull.field("users", {
      type: "User",
      resolve: (_parent, _args, ctx) => {
        const users = ctx.prisma.user.findMany();
        return users;
      },
    });
  },
});
