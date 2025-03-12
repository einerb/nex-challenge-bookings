import { DiscountRule } from '../entities/DiscountRule';

export interface DiscountRuleRepository {
  findApplicableRule(nights: number): Promise<DiscountRule | null>;
}
