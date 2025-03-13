import { PrismaClient } from '@prisma/client';

export class DiscountRuleSeeder {
  constructor(private readonly prisma: PrismaClient) {}

  async seed() {
    const discountRules = [
      { minNights: 1, maxNights: 3, discount: 0 },
      { minNights: 4, maxNights: 6, discount: 10000 },
      { minNights: 7, maxNights: 9, discount: 20000 },
      { minNights: 10, maxNights: null, discount: 30000 },
    ];

    await this.prisma.discountRule.createMany({
      data: discountRules,
      skipDuplicates: true,
    });
  }
}
