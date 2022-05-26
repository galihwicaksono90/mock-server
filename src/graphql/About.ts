import faker from "@faker-js/faker";
import { extendType, objectType, enumType, nonNull } from "nexus";

const createAbout = (type: string) => {
  let images: string[] = [];
  for (let i = 0; i < 3; i++) {
    images.push(faker.image.business(undefined, undefined, true));
  }
  return {
    description: faker.lorem.paragraphs(5),
    images,
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
    t.nonNull.list.nonNull.string("images");
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
