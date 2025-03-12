import { BaseEntity } from './Base';
import { RoomType } from './Room';

export class PricingRule extends BaseEntity {
  constructor(
    public readonly roomType: RoomType,
    public readonly basePrice: number,
    public readonly weekendIncrement: number,
  ) {
    super();
  }

  calculateWeekendPrice(): number {
    return this.basePrice * (1 + this.weekendIncrement / 100);
  }
}
