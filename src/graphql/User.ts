import { enumType, objectType } from "nexus";

export const UserRole = enumType({
  name: "UserRole",
  members: ["user", "guess", "admin"],
});

export const User = objectType({
  name: "User",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("fullName");
    t.nonNull.string("role");
    t.nonNull.string("email");
  },
});
