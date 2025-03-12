import { DiscountRuleRepository } from '../repositories/DiscountRuleRepository';

export class DiscountService {
  constructor(private readonly discountRepo: DiscountRuleRepository) {}

  async applyDiscount(nights: number, basePrice: number): Promise<number> {
    const discountRule = await this.discountRepo.findApplicableRule(nights);
    if (!discountRule) return basePrice;

    const discountAmount = discountRule.calculateDiscount(nights);
    return basePrice - discountAmount;
  }
}
