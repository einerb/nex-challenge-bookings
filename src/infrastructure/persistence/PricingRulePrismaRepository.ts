import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { PricingRuleRepository } from 'src/domain/repositories/PricingRuleRepository';
import { PricingRule } from 'src/domain/entities/PricingRule';
import { RoomType } from 'src/domain/entities/Room';

@Injectable()
export class PricingRulePrismaRepository implements PricingRuleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByRoomType(type: RoomType): Promise<PricingRule | null> {
    const rule = await this.prisma.pricingRule.findFirst({
      where: { roomType: type },
    });

    return rule
      ? new PricingRule(
          rule.id,
          rule.roomType as RoomType,
          rule.basePrice,
          rule.weekendIncrement,
        )
      : null;
  }
}
