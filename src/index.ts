import { ApolloServer } from 'apollo-server';
import { readFileSync } from 'fs';
import { join } from 'path';

import { resolvers } from './resolvers';

const server = new ApolloServer({ resolvers, typeDefs: readFileSync(join(__dirname, '../src/schema/main.graphql')).toString('utf-8') });

server.listen()
  .then(({ url }) => console.log(`Server ready at ${url}. `));