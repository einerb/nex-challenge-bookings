import { RoomType } from '../entities/Room';
import { PricingRuleRepository } from '../repositories/PricingRuleRepository';

export class PricingService {
  constructor(private readonly pricingRepo: PricingRuleRepository) {}

  async calculatePrice(
    roomType: RoomType,
    nights: number,
    isWeekend: boolean,
  ): Promise<number> {
    const pricing = await this.pricingRepo.findByRoomType(roomType);
    if (!pricing)
      throw new Error('There is no price rule for this type of room!');

    let price = pricing.basePrice * nights;
    if (isWeekend) price = pricing.calculateWeekendPrice() * nights;

    return price;
  }
}
