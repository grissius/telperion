import { Resolvers } from "./resolvers-types";
import { times } from "lodash";

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
const postToOut = <T extends { id: number }>(x: T) => ({...x, id: String(x.id)})

const tokenToOffset = (token: string) => Number(token)

export const resolvers: Resolvers = {
  Query: {
    user: (parent, args) => {
      return USERS.find(u => u.id === args.id)!;
    },
    posts: (parent, args) => {
      const anchor = tokenToOffset(args.pageToken ?? '0')
      const limit = args.limit ?? 10
      const posts = POSTS.filter(p => p.id >= anchor).slice(0, limit)
      return {
        edges: posts.map(v => ({ cursor: String(v.id), node: postToOut(v) })),
        pageInfo: {
          hasNextPage: posts.length === limit,
          endCursor: String(posts[posts.length - 1].id)
        },
        posts: posts.map(postToOut),
        nextPageToken: undefined,
      }
    }
  },
};
