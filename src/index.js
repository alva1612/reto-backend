import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

import { ApolloServer } from 'apollo-server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const __dirschema = join(__dirname, 'lib', 'schema.graphql')

const typeDefs = readFileSync(
    __dirschema,
    'utf-8')
 
const resolvers = {
    Query: {
        info: () => `API de alvaro`,
        feed: async (parent, args, context, info) => {
            return context.prisma.link.findMany()
        },
        link: async (parent, args, context) => {
            return context.prisma.link.findUnique({
                where: {
                    id: parseInt(args.id)
                }
            })
        }
    },
    Mutation: {
        // 2
        post: (parent, args, context) => {
            const newLink = context.prisma.link.create({
                data: {
                    url: args.url,
                    description: args.description,
                }
            })
            return newLink
        },
        updateLink: async (parent, args, context) => {
            const {id, description, url} = args;
            const linkIndex = await context.prisma.link.findUnique({
                where: {
                    id: parseInt(args.id)
                },
                select: {
                    id: true
                }
            });

            if(!linkIndex.id) 
                return null;
            
            await context.prisma.link
        },
/*         deleteLink: (parent, args) => {
            const id = args.id
            const linkIndex = links.findIndex(link => link.id == id) || -1 
            
            if(linkIndex >= 0) {
                links = links.filter(link => link.id != links[linkIndex].id)
                return links
            }
        } */
        },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        prisma,
    }
})


server
    .listen()
    .then(({url}) => console.log(`Server corriendo en ${url}`))