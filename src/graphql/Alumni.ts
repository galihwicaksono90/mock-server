import { extendType, intArg, nonNull, objectType } from "nexus";
import faker from "@faker-js/faker";

const createAlumni = (id: number) => ({
  id,
  name: faker.company.companyName(),
  image: faker.image.business(undefined, undefined, true),
});

export const Alumni = objectType({
  name: "Alumni",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.string("image");
  },
});

export const AlumniQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.list.field("getAlumniBusinesses", {
      type: "Alumni",
      args: {
        limit: nonNull(intArg()),
      },
      resolve: (_parent, args, _ctx) => {
        const { limit } = args;
        const alumni = [];
        for (let i = 0; i < limit ?? 4; i++) {
          alumni.push(createAlumni(i));
        }
        return alumni;
      },
    });
  },
});
