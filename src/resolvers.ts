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

export const resolvers: Resolvers = {
  Query: {
    user: (parent, args) => {
      return USERS.find(u => u.id === args.id)!;
    },
    posts: (parent, args) => {
      return {
        posts: times((args.limit ?? 10), i => ({ text: `Post text ${i}` })),
        nextPageToken: '',
      }
    }
  },
};
