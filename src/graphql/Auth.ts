import {
  extendType,
  intArg,
  nonNull,
  nullable,
  objectType,
  stringArg,
} from "nexus";
import * as jwt from "jsonwebtoken";
import { REFRESH_SECRET } from "../utils/auth";

const APP_SECRET = "password";

const registerArgs = {
  fullName: nonNull(stringArg()),
  prefixTitle: stringArg(),
  suffixTitle: stringArg(),
  email: nonNull(stringArg()),
  phone: nonNull(intArg()),
  gender: nonNull(stringArg()),
  classYear: nonNull(stringArg()),
  nim: nonNull(intArg()),
  password: nonNull(stringArg()),
  confirmPassword: nonNull(stringArg()),
};

export const ResetToken = objectType({
  name: "ResetToken",
  definition: (t) => {
    t.nonNull.string("token");
  },
});

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition: (t) => {
    t.string("token");
    t.field("user", {
      type: "User",
    });
  },
});

export const ResetTokenMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.nonNull.boolean("validateResetToken", {
      args: { token: nullable(stringArg()) },
      resolve: (_parent, args, _ctx) => {
        if (!args.token) return false;
        return true;
      },
    });
  },
});

export const AuthMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.nonNull.field("login", {
      type: "AuthPayload",
      args: {
        nim: nonNull(intArg()),
        password: nonNull(stringArg()),
      },
      resolve: (_parent, args, ctx) => {
        const { nim, password } = args;
        const { res } = ctx;
        if (nim !== 1234 && password !== "password") {
          throw new Error("Invalid credentials");
        }
        const token = jwt.sign({ userId: 420 }, APP_SECRET, {
          expiresIn: "15m",
        });

        res.cookie(
          "jid",
          jwt.sign({ userId: 420 }, REFRESH_SECRET, { expiresIn: "7d" }),
          { httpOnly: true }
        );
        return {
          token: token,
          user: {
            id: 420,
            fullName: "Galih Wicaksono",
            role: "user",
            email: "galihwicaksono90@gmail.com",
          },
        };
      },
    });
    t.nonNull.field("register", {
      type: "User",
      args: {
        fullName: nonNull(stringArg()),
        prefixTitle: stringArg(),
        suffixTitle: stringArg(),
        email: nonNull(stringArg()),
        phone: nonNull(intArg()),
        gender: nonNull(stringArg()),
        classYear: nonNull(stringArg()),
        nim: nonNull(intArg()),
        password: nonNull(stringArg()),
        confirmPassword: nonNull(stringArg()),
      },
      resolve: (parent, args, ctx) => {
        const { fullName, email, nim } = args;
        if (nim === 1234) {
          throw new Error("Nomor Induk Mahasiswa sudah terdaftar");
        }
        return {
          id: 69,
          fullName,
          email,
          role: "user",
        };
      },
    });
  },
});
