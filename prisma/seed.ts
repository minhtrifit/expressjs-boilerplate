import { faker } from '@faker-js/faker';
import { prisma } from '../src/libs/prisma';
import { hashPassword } from '../src/libs/auth';
import { Role } from '../src/models/User';

async function main() {
  const password = await hashPassword('123456');

  const baseUsers = [
    {
      email: 'admin@gmail.com',
      password,
      fullName: 'Admin',
      role: Role.ADMIN,
      isActive: true
    }
  ];

  const generatedUsers = Array.from({ length: 30 }).map(() => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      email: faker.internet.email({
        firstName,
        lastName,
        provider: 'gmail.com'
      }),
      password,
      fullName: `${firstName} ${lastName}`,
      isActive: faker.datatype.boolean()
    };
  });

  // Seed user
  await prisma.user.createMany({
    data: [...baseUsers, ...generatedUsers],
    skipDuplicates: true
  });

  console.log('✅ Seed successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
