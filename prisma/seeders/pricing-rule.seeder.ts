import { PrismaClient, RoomType } from '@prisma/client';

export class PricingRuleSeeder {
  constructor(private readonly prisma: PrismaClient) {}

  async seed() {
    const pricingRules = [
      { roomType: RoomType.SINGLE, basePrice: 60000, weekendIncrement: 20 },
      { roomType: RoomType.DOUBLE, basePrice: 100000, weekendIncrement: 20 },
      {
        roomType: RoomType.PRESIDENTIAL,
        basePrice: 160000,
        weekendIncrement: 20,
      },
    ];

    await this.prisma.pricingRule.createMany({
      data: pricingRules,
      skipDuplicates: true,
    });
  }
}
