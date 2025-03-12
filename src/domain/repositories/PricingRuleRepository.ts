import { PricingRule } from '../entities/PricingRule';
import { RoomType } from '../entities/Room';

export interface PricingRuleRepository {
  findByRoomType(type: RoomType): Promise<PricingRule | null>;
}
