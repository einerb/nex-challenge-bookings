import { PricingRule } from '../entities';
import { RoomType } from '../entities/Room';
import { CustomError } from '../exceptions/custom-error';
import { PricingRuleRepository } from '../repositories/PricingRuleRepository';

export class PricingService {
  constructor(private readonly pricingRepo: PricingRuleRepository) {}

  async calculatePrice(
    roomType: RoomType,
    nights: number,
    weekendNights: number,
    guests: number,
    isAllInclusive: boolean,
  ): Promise<number> {
    const pricing = await this.getPricingRule(roomType);

    const basePricePerNight = pricing.basePrice;
    const weekdayNights = nights - weekendNights;
    let totalPrice = basePricePerNight * weekdayNights;

    if (weekendNights > 0) {
      const weekendPricePerNight = pricing.calculateWeekendPrice();
      totalPrice += weekendPricePerNight * weekendNights;
    }

    if (isAllInclusive) {
      const allInclusiveFee = 25000 * guests * nights;
      totalPrice += allInclusiveFee;
    }

    return totalPrice;
  }

  async calculateWeekendIncrement(
    roomType: RoomType,
    weekendNights: number,
  ): Promise<number> {
    const pricing = await this.getPricingRule(roomType);
    const weekendPrice = pricing.calculateWeekendPrice();

    console.log({ pricing, weekendPrice });

    return weekendPrice * weekendNights;
  }

  async getBasePrice(roomType: RoomType): Promise<number> {
    const pricing = await this.getPricingRule(roomType);
    return pricing.basePrice;
  }

  async findByRoomType(roomType: RoomType): Promise<PricingRule> {
    return this.getPricingRule(roomType);
  }

  private async getPricingRule(roomType: RoomType): Promise<PricingRule> {
    const pricingRule = await this.pricingRepo.findByRoomType(roomType);

    if (!pricingRule) {
      throw new CustomError(
        'There is no price rule for this type of room!',
        'PRICE_RULE_NOT_FOUND',
        404,
      );
    }

    return pricingRule;
  }
}
