import { objectType, extendType, nonNull, stringArg, unionType } from "nexus";
import argon2 from "argon2";
import { COOKIE_NAME } from "../constants";

export const Auth = unionType({
  name: "Auth",
  definition: (t) => {
    t.members("User", "FieldErrors");
  },
  resolveType(data) {
    const __typename =
      "password" in data ? "User" : "errors" ? "FieldErrors" : null;
    return __typename;
  },
});

export const AuthMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.nonNull.field("register", {
      type: "Auth",
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, args, ctx) => {
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

          return { ...user, __typename: "User" };
        } catch (error) {
          return {
            __typename: "FieldsErrors",
            errors: [
              {
                field: "username",
                message: "Username is already taken",
              },
            ],
          };
        }
      },
    });

    t.field("login", {
      type: "Auth",
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(parent, args, ctx) {
        const { password, username } = args;

        const user = await ctx.prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (!user) {
          return {
            __typename: "FieldErrors",
            errors: [
              {
                field: "username",
                message: "Username not found",
                __typename: "FieldError",
              },
            ],
          };
        }

        const valid = await argon2.verify(user.password, password);

        if (!valid) {
          return {
            __typename: "FieldErrors",
            errors: [
              {
                field: "password",
                message: "Wrong Password",
              },
            ],
          };
        }

        ctx.req.session.userId = user.id;

        return { ...user, __typename: "User" };
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
