import { PrismaClient } from '@prisma/client';

export class UserSeeder {
  constructor(private readonly prisma: PrismaClient) {}

  async seed() {
    const users = [{ name: 'Jane Doe', email: 'jane.doe@example.com' }];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const existingEmails = await this.prisma.user.findMany({
      where: {
        email: {
          in: users.map((user) => user.email),
        },
      },
    });

    if (existingEmails.length > 0) {
      console.warn('Users already in the database');
      return;
    }

    await this.prisma.user.createMany({
      data: users,
      skipDuplicates: true,
    });
  }
}
