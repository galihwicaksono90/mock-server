import faker from "@faker-js/faker";
import { extendType, objectType, enumType, nonNull } from "nexus";

const createAbout = (type: string) => {
  return {
    description: faker.lorem.paragraphs(50, "\n\n"),
    image: faker.image.business(undefined, undefined, true),
    type,
  };
};

export const AboutType = enumType({
  name: "AboutType",
  members: ["jurusan", "organisasi"],
});

export const About = objectType({
  name: "About",
  definition: (t) => {
    t.nonNull.string("description");
    t.nonNull.string("image");
    t.nonNull.string("type");
  },
});

export const AboutQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getAbout", {
      type: "About",
      args: { type: nonNull(AboutType) },
      resolve: (_parent, args, _ctx) => {
        return createAbout(args.type);
      },
    });
  },
});
