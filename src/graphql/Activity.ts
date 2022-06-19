import { extendType, intArg, objectType, nonNull, enumType } from "nexus";
import faker from "@faker-js/faker";

export const Activity = objectType({
  name: "Activity",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.dateTime("postedAt");
    t.nonNull.string("description");
    t.nonNull.string("image");
  },
});

const createActivities = (id: number) => ({
  id,
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(9),
  postedAt: faker.date.past().toISOString(),
  image: faker.image.sports(680, 480, true),
});

export const ActivityQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getActivity", {
      type: "Activity",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_parent, args, _ctx) => {
        return createActivities(args.id);
      },
    });
    t.nonNull.list.nonNull.field("getActivities", {
      type: "Activity",
      args: { limit: nonNull(intArg()) },
      resolve: async (_parent, args, _ctx) => {
        const { limit = 4 } = args;
        const activities = [];

        for (let i = 0; i < (limit || 4); i++) {
          activities.push(createActivities(i));
        }

        return activities;
      },
    });
  },
});
