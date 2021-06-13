import { ApolloServer } from 'apollo-server';
import { readFileSync } from 'fs';
import { times } from 'lodash';
import { join } from 'path';
import { prisma } from './prismaClient';
import * as firebaseAdmin from 'firebase-admin';

import { resolvers } from './resolvers';
import config from './config';

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(config.services.firebaseServiceAccount),
});


const server = new ApolloServer({ resolvers, typeDefs: readFileSync(join(__dirname, '../src/schema/main.graphql')).toString('utf-8'), context: async ({ req }) => {
  const token = req.headers['authorization']?.match(/bearer (\S+)/i)?.[1]
  if (token) {
    const decoded = await firebaseAdmin.auth().verifyIdToken(token ?? '')
    const user = await prisma.user.upsert({ where: { uid: decoded.uid }, create: { uid: decoded.uid, email: decoded.email, name: decoded.name }, update: { uid: decoded.uid, email: decoded.email, name: decoded.name } })
    return { user }
  }
  return {}
} });

server.listen()
  .then(({ url }) => console.log(`Server ready at ${url}. `));