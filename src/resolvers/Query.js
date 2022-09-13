async function feed (parent, args, context, info) {
  return context.prisma.link.findMany()
}

export default { feed }
