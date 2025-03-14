import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { DiscountRuleRepository } from '../../domain/repositories/DiscountRuleRepository';
import { DiscountRule } from '../../domain/entities/DiscountRule';

@Injectable()
export class DiscountRulePrismaRepository implements DiscountRuleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findApplicableRule(nights: number): Promise<DiscountRule | null> {
    const rule = await this.prisma.discountRule.findFirst({
      where: { minNights: { lte: nights }, maxNights: { gte: nights } },
    });

    return rule
      ? new DiscountRule(rule.id, rule.minNights, rule.maxNights, rule.discount)
      : null;
  }
}
