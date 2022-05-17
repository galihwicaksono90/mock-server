import { extendType, objectType, nonNull, intArg } from "nexus";
import faker from "@faker-js/faker";

export const HeroImage = objectType({
  name: "HeroImage",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("image");
  },
});

const createImages = (id: number) => ({
  id,
  image: faker.image.technics(1440, 674, true),
});

export const HeroImageQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.list.field("getHeroImages", {
      type: "HeroImage",
      args: {
        limit: nonNull(intArg()),
      },
      resolve: (_parent, args, _ctx) => {
        const { limit } = args;
        const images = [];

        for (let i = 0; i < limit ?? 3; i++) {
          images.push(createImages(i));
        }

        return images;
      },
    });
  },
});
