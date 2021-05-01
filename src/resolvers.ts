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

const tokenToOffset = (token: string) => Number(token)

export const resolvers: Resolvers = {
  Query: {
    user: (parent, args) => {
      return USERS.find(u => u.id === args.id)!;
    },
    posts: (parent, args) => {
      const offset = tokenToOffset(args.pageToken ?? '0')
      const limit = args.limit ?? 10
      return {
        posts: POSTS.slice(offset, limit),
        nextPageToken: (offset + limit) < POSTS.length ? undefined : ('' + offset + limit),
      }
    }
  },
};
