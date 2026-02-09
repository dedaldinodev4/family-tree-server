import { prisma } from '../src/lib/prisma'


async function seed () {
  await prisma.member.create({
    data: {
      name: "Root Member",
      phone: "0000-00000"
    }
  })
}

seed().then(() => {
  console.log(`Database seeded!`);
  prisma.$disconnect();
})