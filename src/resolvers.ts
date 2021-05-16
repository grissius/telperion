import { Resolvers } from "./resolvers-types";
import { times } from "lodash";
import { prisma } from "./prismaClient";
import { post } from "@prisma/client";

const USERS = [
  {
    id: "1",
    email: "email@test.com",
    profile: {
      age: 20,
      name: "Dotan"
    }
  }
];

const POSTS = times((50), i => ({ id: i, text: `Post text ${i}` }))
const postToOut = (x: post) => ({...x, id: String(x.id)})

const tokenToOffset = (token: string) => Number(token)

export const resolvers: Resolvers = {
  Query: {
    user: (parent, args) => {
      return USERS.find(u => u.id === args.id)!;
    },
    posts: async (parent, args) => {
      const anchor = tokenToOffset(args.after ?? '-1')
      const limit = args.first ?? 10
      const posts = await prisma.post.findMany({ where: { id: { gt: anchor } }, take: limit })
      console.log({ posts, limit, anchor, args })
      return {
        edges: posts.map(v => ({ cursor: String(v.id), node: postToOut(v) })),
        pageInfo: {
          hasNextPage: posts.length === limit,
          endCursor: String(posts[posts.length - 1]?.id ?? '')
        },
        posts: posts.map(postToOut),
        nextPageToken: undefined,
      }
    },
    post: (parent, args) => {
      return prisma.post.findFirst({ where: { id: { equals: Number(args.id) } }, rejectOnNotFound: true }).then(postToOut)
    }
  },
};
