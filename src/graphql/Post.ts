import { objectType, extendType } from "nexus";

export const Post = objectType({
  name: "Post",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.dateTime("createdAt");
    t.nonNull.dateTime("updatedAt");
  },
});

export const PostQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.list.nonNull.field("posts", {
      type: "Post",
      resolve(_parent, _args, context) {
        const posts = context.prisma.post.findMany();
        return posts;
      },
    });
  },
});
