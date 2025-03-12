import { BaseEntity } from './Base';

export class DiscountRule extends BaseEntity {
  constructor(
    public readonly minNights: number,
    public readonly maxNights: number | null,
    public readonly discount: number,
  ) {
    super();
  }

  appliesTo(nights: number): boolean {
    return (
      nights >= this.minNights &&
      (this.maxNights === null || nights <= this.maxNights)
    );
  }

  calculateDiscount(nights: number): number {
    return this.appliesTo(nights) ? this.discount * nights : 0;
  }
}
