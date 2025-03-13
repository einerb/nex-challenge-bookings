import { PrismaClient } from '@prisma/client';

import {
  RoomSeeder,
  UserSeeder,
  PricingRuleSeeder,
  DiscountRuleSeeder,
} from './';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const prisma = new PrismaClient();

async function main() {
  if (process.env.NODE_ENV === 'production') {
    console.warn('El seeding no se ejecuta en producción.');
    return;
  }

  try {
    const userSeeder = new UserSeeder(prisma);
    const roomSeeder = new RoomSeeder(prisma);
    const pricingRuleSeeder = new PricingRuleSeeder(prisma);
    const discountRuleSeeder = new DiscountRuleSeeder(prisma);

    await userSeeder.seed();
    await roomSeeder.seed();
    await pricingRuleSeeder.seed();
    await discountRuleSeeder.seed();
  } catch (error) {
    console.error('Error when run seeding:', error);
    throw error;
  }
}

main()
  .then(async () => {
    console.log('Seeding completed!');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error in proccesing seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
