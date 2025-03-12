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
      throw new Error('No hay regla de precio para este tipo de habitación');

    let price = pricing.basePrice * nights;
    if (isWeekend) price = pricing.calculateWeekendPrice() * nights;

    return price;
  }
}
