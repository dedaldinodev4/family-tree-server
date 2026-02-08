import { prisma } from '../src/lib/prisma'

async function seed() {
  await prisma.member.create({
    data: {
      name: "Member Root"
    }
  })
}

seed().then(() => {
  console.log('Database seeded!');
  prisma.$disconnect()
})