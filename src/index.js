import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import resolvers from './lib/resolvers.js'
import { ApolloServer } from 'apollo-server'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const __dirschema = join(__dirname, 'lib', 'schema.graphql')

const typeDefs = readFileSync(
    __dirschema,
    'utf-8')

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server
    .listen()
    .then(({url}) => console.log(`Server corriendo en ${url}`))