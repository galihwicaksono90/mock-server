import { objectType, extendType, nonNull, stringArg } from "nexus";
import { UserInputError } from "apollo-server-express";
import argon2 from "argon2";
import { COOKIE_NAME } from "../constants";

export const Auth = objectType({
  name: "AuthObject",
  definition: (t) => {
    t.nonNull.field("user", {
      type: "User",
    });
  },
});

export const AuthMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.nonNull.field("register", {
      type: "User",
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (parent, args, ctx) => {
        const { password, username } = args;

        const hashedPassword = await argon2.hash(password);

        try {
          const user = await ctx.prisma.user.create({
            data: {
              username,
              password: hashedPassword,
            },
          });

          ctx.req.session.userId = user.id;

          return user;
        } catch (error) {
          console.log({ error });
          throw new UserInputError("Username is already taken");
        }
      },
    });

    t.nonNull.field("login", {
      type: "User",
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (parent, args, ctx) => {
        const { password, username } = args;
        const user = await ctx.prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (!user) {
          throw new UserInputError("Username does not exist");
        }

        const valid = await argon2.verify(user.password, password);

        if (!valid) {
          throw new UserInputError("Password does not match");
        }

        ctx.req.session.userId = user.id;

        return user;
      },
    });

    t.boolean("logout", {
      resolve: (_parent, _args, ctx) => {
        return new Promise((res) =>
          ctx.req.session.destroy((err) => {
            if (err) {
              res(err);
              return;
            }
            res(true);
            ctx.res.clearCookie(COOKIE_NAME);
          })
        );
      },
    });
  },
});
