import { RoomType } from './Room';

export class PricingRule {
  constructor(
    public readonly id: string,
    public roomType: RoomType,
    public basePrice: number,
    public weekendIncrement: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  calculateWeekendPrice(): number {
    return this.basePrice * (1 + this.weekendIncrement / 100);
  }
}
