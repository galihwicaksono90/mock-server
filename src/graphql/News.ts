import { extendType, intArg, nonNull, objectType } from "nexus";
import faker from "@faker-js/faker";

const tags = ["Berita Umum", "Berita IKATA", "Berita Tambang", "Berita Dunia"];

const createNews = (id: number) => ({
  id,
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  content: faker.lorem.paragraphs(faker.mersenne.rand(10, 4)),
  image: faker.image.technics(),
  author: faker.name.findName(),
  createdAt: faker.date.past(),
  tags: faker.helpers.arrayElements(tags),
});

export const News = objectType({
  name: "News",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.string("description");
    t.nonNull.string("content");
    t.nonNull.string("image");
    t.nonNull.string("author");
    t.nonNull.dateTime("createdAt");
    t.nonNull.list.nonNull.string("tags");
  },
});

export const NewsQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.list.nonNull.field("getNewsItems", {
      type: "News",
      args: {
        limit: nonNull(intArg()),
      },
      resolve: (_parent, args, _ctx) => {
        const { limit } = args;
        const news = [];

        for (let i = 0; i < limit ?? 4; i++) {
          news.push(createNews(i));
        }

        return news;
      },
    });
    t.field("getNews", {
      type: "News",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (parent, args, ctx) => {
        const { id } = args;
        return createNews(id);
      },
    });
  },
});
