import {
  objectType,
  extendType,
  nonNull,
  intArg,
  enumType,
  stringArg,
} from "nexus";
import faker from "@faker-js/faker";

const createMember = (id: number, field: string) => ({
  id,
  name: faker.name.findName(),
  title: faker.name.jobTitle(),
  image: faker.image.avatar(),
  field,
});

export const Member = objectType({
  name: "Member",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.string("title");
    t.nonNull.string("image");
    t.nonNull.string("field");
  },
});

export const MemberQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.list.nonNull.field("getMembers", {
      type: "Member",
      args: {
        limit: nonNull(intArg()),
        field: nonNull(stringArg()),
      },
      resolve: (_parent, args, _ctx) => {
        const { limit, field } = args;
        const members = [];

        for (let i = 0; i < limit ?? 4; i++) {
          members.push(createMember(i, field));
        }

        return members;
      },
    });
  },
});
