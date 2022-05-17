import { extendType, intArg, objectType, nonNull, enumType } from "nexus";
import faker from "@faker-js/faker";

export const ArticleType = enumType({
  name: "ArticleType",
  members: ["scientific", "nonScientific"],
});

export const Article = objectType({
  name: "Article",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.dateTime("postedAt");
    t.nonNull.string("description");
    t.nonNull.string("image");
  },
});

const createArticle = (id: number) => ({
  id,
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  postedAt: faker.date.past().toISOString(),
  image: faker.image.technics(680, 480, true),
});

export const ArticleQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getArticle", {
      type: "Article",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_parent, args, _ctx) => {
        return createArticle(args.id);
      },
    });
    t.nonNull.list.nonNull.field("getArticles", {
      type: "Article",
      args: { limit: nonNull(intArg()), type: nonNull(ArticleType) },
      resolve: async (_parent, args, _ctx) => {
        const { limit = 4 } = args;
        const articles = [];

        for (let i = 0; i < (limit || 4); i++) {
          articles.push(createArticle(i));
        }

        return articles;
      },
    });
  },
});
