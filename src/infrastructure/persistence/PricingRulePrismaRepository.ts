import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { PricingRuleRepository } from '../../domain/repositories/PricingRuleRepository';
import { PricingRule } from '../../domain/entities/PricingRule';
import { RoomType } from '../../domain/entities/Room';

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
