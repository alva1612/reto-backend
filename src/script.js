import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    const newLink = await prisma.link.create({
        data: {
            description: 'INSERT DE ALVARO',
            url: 'www.gobi.fun'
        },
    })

    const allLinks = await prisma.link.findMany()
    console.log(allLinks)
}

main()
  .catch(e => {
    throw e
  })
  // 5
  .finally(async () => {
    await prisma.$disconnect()
  })