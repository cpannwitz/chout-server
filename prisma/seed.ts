import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

const prisma = new PrismaClient()

async function main() {
  dotenv.config()
  console.log('Seeding...')

  const user1 = await prisma.user.create({
    data: {
      email: 'lisa@simpson.com',
      username: 'Lisa',
      role: 'USER'
    }
  })

  console.log({ user1 })
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
