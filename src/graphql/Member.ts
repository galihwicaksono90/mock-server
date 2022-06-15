import { objectType, extendType, nonNull, intArg, stringArg } from "nexus";
import faker from "@faker-js/faker";

const createMember = (id: number, field: string) => ({
  id,
  name: faker.name.findName(),
  title: faker.name.jobTitle(),
  image: faker.image.avatar(),
  email: faker.internet.email(),
  field,
  classYear: faker.mersenne.rand(2018, 1960),
});

export const Member = objectType({
  name: "Member",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.string("title");
    t.nonNull.string("image");
    t.nonNull.string("field");
    t.nonNull.string("email");
    t.nonNull.int("classYear");
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
