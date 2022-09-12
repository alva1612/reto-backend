const resolvers = {
    Query: {
        info: () => `API de alvaro`,
        feed: async (parent, args, context, info) => {
            const newLink = context.prisma.link.findMany()
        },
        link: (parent, args) => {
            const id = args.id;
            const result = links.find(link => link.id == id)
            return result;
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
        },
        updateLink: async (parent, args) => {
            const {id, description, url} = args;
            const linkIndex = links.findIndex(link => link.id == id) || -1 
            
            if(linkIndex >= 0) {
                links[linkIndex].description = description
                links[linkIndex].url = url
                return links[linkIndex]
            }
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

export default resolvers;