import { objectType, extendType } from "nexus";

export const User = objectType({
  name: "User",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("username");
    t.nonNull.dateTime("createdAt");
    t.nonNull.dateTime("updatedAt");
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("me", {
      type: "User",
      resolve: async (_parent, _args, ctx) => {
        const userId = ctx.req.session.userId;

        if (!userId) {
          return null;
        }

        const user = await ctx.prisma.user.findUnique({
          where: {
            id: userId,
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
