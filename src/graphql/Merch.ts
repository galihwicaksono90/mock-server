import { objectType, extendType, nonNull, intArg } from "nexus";
import faker from "@faker-js/faker";

const createMerch = (id: number) => ({
  id,
  name: faker.commerce.productName(),
  image: faker.image.food(680, 480, true),
  price: faker.commerce.price(10000, 1000000, 0, "Rp."),
});

export const Merch = objectType({
  name: "Merch",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.string("price");
    t.nonNull.string("image");
  },
});

export const MerchQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.list.nonNull.field("getMerchList", {
      type: "Merch",
      args: {
        limit: nonNull(intArg()),
      },
      resolve: (_parent, args, _ctx) => {
        const { limit } = args;
        const merch = [];

        for (let i = 0; i < limit ?? 4; i++) {
          merch.push(createMerch(i));
        }

        return merch;
      },
    });
  },
});
