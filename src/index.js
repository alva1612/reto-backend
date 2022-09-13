import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

import { ApolloServer, PubSub } from 'apollo-server'
import { PrismaClient } from '@prisma/client'

import Query from './resolvers/Query.js'
import Mutation from './resolvers/Mutation.js'
import User from './resolvers/User.js'
import Link from './resolvers/Link.js'
import Subscription from './resolvers/Subscription.js'

import { getUserId } from './utils/authUtls.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const __dirschema = join(__dirname, 'lib', 'schema.graphql')

const prisma = new PrismaClient();

const pubsub = new PubSub();

const typeDefs = readFileSync(
    __dirschema,
    'utf-8')
 
const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        return {
            ...req,
            prisma,
            pubsub,
            userId: req && req.headers.authorization 
                    ? getUserId(req) : null
        }
    }
})


server
    .listen()
    .then(({url}) => console.log(`Server corriendo en ${url}`))