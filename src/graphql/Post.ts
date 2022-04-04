import {
  objectType,
  extendType,
  nonNull,
  stringArg,
  intArg,
  unionType,
} from "nexus";
import { isAuth } from "../utils";
import { ApolloError } from "apollo-server-core";

export const Post = objectType({
  name: "Post",
  definition: (t) => {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.dateTime("createdAt");
    t.nonNull.dateTime("updatedAt");
    t.field("createdBy", {
      type: "User",
      resolve: async (parent, _args, ctx) =>
        ctx.prisma.post.findUnique({ where: { id: parent.id } }).postedBy(),
    });
  },
});

export const PostPayload = unionType({
  name: "PostPayload",
  definition: (t) => {
    t.members("FieldErrors", "Post");
  },
  resolveType(data) {
    const __typename =
      "title" in data ? "Post" : "errors" in data ? "FieldErrors" : null;
    return __typename;
  },
});

export const PostQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.nonNull.list.nonNull.field("posts", {
      type: "Post",
      resolve: (_parent, _args, ctx) => {
        return ctx.prisma.post.findMany();
      },
    });
    t.nonNull.field("getPostById", {
      type: "Post",
      args: { id: nonNull(intArg()) },
      async resolve(_parent, args, ctx) {
        const { id } = args;
        const post = await ctx.prisma.post.findUnique({ where: { id } });

        if (!post) {
          throw new Error("Post not found");
        }

        return post;
      },
    });
    t.nonNull.list.field("getUserPosts", {
      type: "Post",
      authorize: isAuth,
      resolve: (_parent, _args, ctx) => {
        const { userId } = ctx.req.session;

        return ctx.prisma.user.findUnique({ where: { id: userId } }).posts();
      },
    });
  },
});

export const PostMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.nonNull.field("createPost", {
      type: "PostPayload",
      args: {
        title: nonNull(stringArg()),
      },
      authorize: isAuth,
      resolve: async (_parent, args, ctx) => {
        const { userId } = ctx;
        const { title } = args;

        if (!title) {
          return {
            __typename: "FieldErrors",
            errors: [
              {
                field: "title",
                message: "Empty field",
              },
            ],
          };
        }

        const post = await ctx.prisma.post.create({
          data: {
            title,
            postedById: userId!,
          },
        });

        return { ...post, __typename: "Post" };
      },
    });
    t.nonNull.field("deletePost", {
      type: "Post",
      args: {
        id: nonNull(intArg()),
      },
      authorize: isAuth,
      resolve: async (_parent, args, ctx) => {
        const { id: postId } = args;

        const post = await ctx.prisma.post.findUnique({
          where: {
            id: postId,
          },
          select: {
            postedById: true,
          },
        });

        if (!post) {
          throw new Error("post not found");
        }

        if (post.postedById !== ctx.userId) {
          throw new Error("You are not the owner of this post");
        }

        return ctx.prisma.post.delete({
          where: { id: postId },
        });
      },
    });
  },
});
