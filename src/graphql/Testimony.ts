import { extendType, intArg, nonNull, objectType } from "nexus";
import faker from "@faker-js/faker";

export const Testimony = objectType({
  name: "Testimony",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.int("startYear");
    t.nonNull.int("endYear");
    t.nonNull.string("description");
    t.nonNull.string("image");
  },
});

const createTestimony = (id: number) => ({
  id,
  name: faker.name.findName(),
  description: faker.lorem.paragraph(5),
  startYear: 2013,
  endYear: 2015,
  image: faker.image.avatar(),
});

export const TestimonyQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.list.nonNull.field("getTestimonies", {
      type: "Testimony",
      args: { limit: nonNull(intArg()) },
      resolve: (_parent, args, _ctx) => {
        const { limit } = args;

        const testimony = [];
        for (let i = 0; i < limit ?? 4; i++) {
          testimony.push(createTestimony(i));
        }
        return testimony;
      },
    });
  },
});
