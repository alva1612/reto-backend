import links from '../data/dummy.js'

const resolvers = {
    Query: {
        info: () => `API de alvaro`,
        feed: () => links,
        link: (parent, args) => {
            const id = args.id;
            links.filter((e) => {
                if(e.id == id) return e;
            })
        }
    },
    Mutation: {
        // 2
        post: (parent, args) => {
      
        let idCount = links.length
    
           const link = {
            id: `link-${idCount++}`,
            description: args.description,
            url: args.url,
          }
          links.push(link)
          return link
        }
      },
}

export default resolvers;