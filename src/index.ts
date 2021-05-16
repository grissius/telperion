import { ApolloServer } from 'apollo-server';
import { readFileSync } from 'fs';
import { times } from 'lodash';
import { join } from 'path';
import { prisma } from './prismaClient';

import { resolvers } from './resolvers';



async function main() {
  // const allUsers = await prisma.user.findMany({ where: { id: {  } } })
  // seed
  // await prisma.post.createMany({ data: times((50), i => ({ id: i, author_id: 1,  title: `Post text ${i}`, content: `Post text ${i}` })) })
  // console.log(allUsers)
}
main()

const server = new ApolloServer({ resolvers, typeDefs: readFileSync(join(__dirname, '../src/schema/main.graphql')).toString('utf-8') });

server.listen()
  .then(({ url }) => console.log(`Server ready at ${url}. `));